Vue.component('Media', {
    props: {
        msg: String
    },
    // 动态props
    watch: {
        msg: function (newVal) {
            if (newVal == "media") {
                this.displayDrawer = true; //newVal即是msg
            }
        },
    },
    mounted() {
        if (this.msg == "media") {
            this.displayDrawer = true;
        }
    },
    data() {
        return {
            displayDrawer: false,
            mainStyle: {
                width: this.getWidth() + 'px',
                height: this.getHeight() * 0.7 + 'px',
                overflowY: "scroll",
                textAlign: "center"
            },
            codeArea: ""
        }
    },
    methods: {
        getWidth() {
            return parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
        },
        getHeight() {
            return parseInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
        },
        // video drag and drop
        allowDrop(ev) {
            ev.preventDefault();
        },
        drag(ev) {
            ev.dataTransfer.setData("Text", ev.target.innerText);
        },
        drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            ev.target.src = data;
        },
        // get Camera & get DisplayMedia & take photo/screenshot 
        getCamera() {
            let video = document.getElementById("video001");
            let constraints = {
                video: { width: 300, height: 300 },
                audio: true
            };
            if (navigator.mediaDevices.getUserMedia(constraints) == 'undefined') {
                alert("can't use media devices!");
            } else {
                var promise = navigator.mediaDevices.getUserMedia(constraints);
            }
            promise.then(function (MediaStream) {
                video.srcObject = MediaStream;
                video.play();
            }).catch(function (PermissionDeniedError) {
                console.log(PermissionDeniedError);
            })
        },
        getScreenShot() {
            let video = document.getElementById("video001");
            let constraints = {
                video: { width: 300, height: 300 },
                audio: true
            };
            if (navigator.mediaDevices.getDisplayMedia(constraints) == 'undefined') {
                alert("can't use media devices!");
            } else {
                var promise = navigator.mediaDevices.getDisplayMedia(constraints);
            }
            promise.then(function (MediaStream) {
                video.srcObject = MediaStream;
                video.play();
            }).catch(function (PermissionDeniedError) {
                console.log(PermissionDeniedError);
            })
        },
        takePhoto() {
            let video = document.getElementById("video001");
            let canvas = document.getElementById("canvas001");
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 240, 240);
            this.postImage(canvas.toDataURL("image/jpg"));
        },
        // 传image给后台,接收字符串
        postImage(params) {
            axios.post(`http://127.0.0.1:5000/api/image/`, { key: JSON.stringify(params) })
                .then((response) => {
                    if (response.data.error == "error") {
                        console.log("bakend error");
                        iframe.srcdoc = "未通过身份验证";
                    } else {
                        let iframe = document.getElementById("iframe001");
                        if (response.data.result == "You") {
                            let video = document.getElementById("video001");
                            video.style.display = "none";
                            iframe.srcdoc = "通过身份验证";
                            const record = document.getElementById('start');
                            record.disabled = false;
                        } else {
                            iframe.srcdoc = "未通过身份验证";
                        }
                    }
                },
                    function (err) {
                        console.log(err.data);
                    }
                );
        },

        // 录制声音
        // 传值给后台
        postAudio(params) {
            axios.post(`http://127.0.0.1:5000/api/audio/`, { key: JSON.stringify(params) })
                .then((response) => {
                    if (response.data.error == "error") {
                        console.log("bakend error");
                        this.codeArea = "语音错误";
                    } else {
                        let textList = response.data.result;
                        this.codeArea = this.codeArea + "\n" + `${textList[0]}(${textList[1]})`;
                    }
                }, (err) => {
                    console.log(err.data);
                }
                );
        },
        recordAudio() {
            const record = document.getElementById('start');
            const stops = document.getElementById('stop');
            stops.disabled = true;
            const visualizer = document.getElementById('visualizer');
            let audioCtx;
            const canvasCtx = visualizer.getContext("2d");
            if (navigator.mediaDevices.getUserMedia) {
                const constraints = { audio: true };
                let chunks = [];
                let onSuccess = (stream) => {
                    const mediaRecorder = new MediaRecorder(stream);
                    this.visualizeAudio(audioCtx, canvasCtx, stream);
                    record.onclick = function () {
                        mediaRecorder.start();
                        record.innerText = "Recording..."
                        stops.disabled = false;
                        record.disabled = true;
                    }
                    stops.onclick = function () {
                        mediaRecorder.stop();
                        record.innerText = "Record"
                        stops.disabled = true;
                        record.disabled = false;
                    }
                    mediaRecorder.onstop = (e) => {
                        const audio = document.createElement('audio');
                        document.getElementById("historys").appendChild(audio);
                        audio.controls = true;
                        const blobs = new Blob(chunks, { 'type': 'audio/mp3' });
                        chunks = [];
                        const audioURL = window.URL.createObjectURL(blobs);
                        audio.src = audioURL;
                    }
                    mediaRecorder.ondataavailable = (e) => {
                        let postAudio = this.postAudio;
                        chunks.push(e.data);
                        // blob转base64
                        function blobToDataURL(blob) {
                            let a = new FileReader();
                            a.onload = (e) => {
                                postAudio(e.target.result);
                            }
                            a.readAsDataURL(blob);
                        }
                        blobToDataURL(e.data);
                    }
                }
                let onError = function (err) {
                    console.log('Error:' + err);
                }
                navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
            } else {
                console.log('getUserMedia not supported!');
            }
        },
        visualizeAudio(audioCtx, canvasCtx, stream) {
            if (!audioCtx) {
                audioCtx = new AudioContext();
            }
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            source.connect(analyser);
            draw()
            function draw() {
                const WIDTH = visualizer.width
                const HEIGHT = visualizer.height;
                requestAnimationFrame(draw);
                analyser.getByteTimeDomainData(dataArray);
                let grd = canvasCtx.createLinearGradient(0, 60, 0, 0);
                grd.addColorStop(0, "darkblue");
                grd.addColorStop(0.5, "lightblue");
                grd.addColorStop(1, "darkblue");
                canvasCtx.fillStyle = grd;
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = "white";
                canvasCtx.beginPath();
                let sliceWidth = WIDTH * 1.0 / bufferLength;
                let x = 0;
                for (let i = 0; i < bufferLength; i++) {
                    let v = dataArray[i] / 128.0;
                    let y = v * HEIGHT / 2;
                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }
                    x += sliceWidth;
                }
                canvasCtx.lineTo(visualizer.width, visualizer.height / 2);
                canvasCtx.stroke();
            }
        },
    },
    template:
        `
 <el-drawer title="Parameters" :visible.sync="displayDrawer" size="70%" direction="btt" :with-header="false">
    <section :style="mainStyle">
        <el-divider></el-divider>
        <el-divider content-position="left">Drag Drop Media</el-divider>
        <div @dragstart="drag($event)" draggable="true">./static/123.xlsx</div>

        <!- drag drop video ->
        <video height="300px" width="300px" @drop="drop($event)" control autoplay
        @dragover="allowDrop($event)" class="bordered"></video>

        <!- drag drop embed ->
        <embed type="application/pdf" height="300px" width="300px" 
        @drop="drop($event)" control autoplay @dragover="allowDrop($event)" class="bordered"/>

        <!- Camera ->
        <el-divider></el-divider>
        <el-divider content-position="left">Get Media</el-divider>
        <video id="video001" height="300px" width="300px" autoplay class="bordered"></video>
        <canvas id="canvas001" height="300px" width="300px" class="bordered"></canvas>
        <button @click="getCamera">Open Camera</button>
        <button @click="getScreenShot">Open ScreenShot</button>
        <button @click="takePhoto">Take Photo</button>
        <iframe id="iframe001"></iframe>

        <!- Audio ->
        <el-divider></el-divider>
        <el-divider content-position="left">Audio</el-divider>
        <canvas class="bordered" id="visualizer" height="60px"></canvas>
        <button id="run" @click="recordAudio">Run Audio</button>
        <button id="start">Record</button>
        <button id="stop">Stop</button>
        <section id="historys">Records</section>
        <code v-text="codeArea"></code>
    </section>
 </el-drawer>
`
})