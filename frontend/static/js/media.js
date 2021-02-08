Vue.component('Media', {
    props:{
        msg:String
    },
    // 动态props
    watch: {
        msg: function (newVal) {
            if(newVal=="media"){
                this.displayDrawer = true; //newVal即是msg
            }
        },
    },
    mounted(){
        if(this.msg=="media"){
            this.displayDrawer = true;
        }
    },
    data(){
        return{
            displayDrawer:false,
            mainStyle:{
                width: this.getWidth()+ 'px',
                height: this.getHeight()*0.7 + 'px',
                overflowY:"scroll",
                textAlign:"center"
            },
        }
    },
    methods:{
        getWidth(){
			return parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
		},
		getHeight(){
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
        getScreenShot(){
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
        <el-divider></el-divider>
        <el-divider content-position="left">Get Media</el-divider>
        <video id="video001" height="300px" width="300px" autoplay class="bordered"></video>
        <canvas id="canvas001" height="300px" width="300px" class="bordered"></canvas>
        <button @click="getCamera">Open Camera</button>
        <button @click="getScreenShot">Open ScreenShot</button>
        <button @click="takePhoto">Take Photo</button>
    </section>
 </el-drawer>
`
})