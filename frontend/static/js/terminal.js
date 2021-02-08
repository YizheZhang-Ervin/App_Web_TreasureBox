Vue.component('Terminal', {
    props: {
        msg: String
    },
    // 动态props
    watch: {
        msg: function (newVal) {
            if (newVal == "terminal") {
                this.displayDrawer = true; //newVal即是msg
            }
        },
    },
    mounted() {
        if (this.msg == "terminal") {
            this.displayDrawer = true;
        }
    },
    data: function () {
        return {
            displayDrawer: false,
            mainStyle: {
                width: this.getWidth() + 'px',
                height: this.getHeight() * 0.8 + 'px',
                overflowY: "scroll",
                textAlign: "center",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContents: "center"
            },
            descStyle: {
                color: "gold",
                textAlign: "left",
                textIndent: "15px"
            },
            cmdStyle: {
                width: "50vw",
                height: "100%"
            },
            cmdType: "html",
            cmdDesc: "Super HTML v1.0",
            commands: ">>"
        }
    },
    methods: {
        getWidth() {
            return parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
        },
        getHeight() {
            return parseInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
        },
        changeCMD(val) {
            if (val == "html") {
                this.cmdDesc = "Super HTML v1.0";
                this.commands = ">>";
            } else if (val == "js") {
                this.cmdDesc = "Super JavaScript v1.0";
                this.commands = ">>";
            } else if (val == "py") {
                this.cmdDesc = "Super Python v1.0";
                this.commands = ">>";
            } else if (val == "sql") {
                this.cmdDesc = "Super SQL v1.0";
                this.commands = ">>";
            }
        },
        changeCommands() {
            let sentence = this.commands.substr(2);
            let rstArea = document.getElementById("iframe001");
            if (sentence.length != 0) {
                if (this.cmdType == "html") {
                    rstArea.srcdoc = sentence;
                } else if (this.cmdType == "js") {
                    rstArea.srcdoc = eval(sentence);
                } else if (this.cmdType == "py") {
                    this.get1(sentence, rstArea);
                } else if (this.cmdType == "sql") {
                    this.get2(sentence, rstArea);
                }
            }
        },
        // get data from backend
        get1: function (params, rstArea) {
            // 问号传参
            axios.get(`http://127.0.0.1:5000/api/?pkg=${params}`).then(
                (response) => {
                    if (response.data.error == "error") {
                        console.log("bakend error");
                    } else {
                        rstArea.srcdoc = response.data.result;
                    }
                },
                (err) => {
                    console.log("frontend error", err);
                }
            );

        },
        get2: function (params, rstArea) {
            // 路由传参
            axios.get(`http://127.0.0.1:5000/api/${params}`).then(
                (response) => {
                    if (response.data.error == "error") {
                        console.log("bakend error");
                    } else {
                        rstArea.srcdoc = response.data.result;
                    }
                },
                (err) => {
                    console.log("frontend error", err);
                }
            );
        },
        post: function () {
            axios.post(`http://127.0.0.1:5000/api/`, { key: JSON.stringify(this.params) })
                .then((response) => {
                    if (response.data.error == "error") {
                        console.log("bakend error");
                    } else {
                        this.getRst = response.data.result;
                    }
                },
                    function (err) {
                        console.log(err.data);
                    }
                );
        },
    },
    template:
        `
<el-drawer title="Parameters" :visible.sync="displayDrawer" size="80%" direction="btt" :with-header="false">
<section :style="mainStyle">
    <iframe id="iframe001" ></iframe>
    <div :style="cmdStyle">
        <br/>
        <el-radio-group v-model="cmdType" text-color="gold" @change="changeCMD" >
            <el-radio label="html">HTML</el-radio>
            <el-radio label="js">JavaScript</el-radio>
            <el-radio label="py">Python</el-radio>
            <el-radio label="sql">SQL</el-radio>
        </el-radio-group>
        <p v-text="cmdDesc" :style="descStyle"></p>
        <el-input type="textarea" v-model="commands" @change="changeCommands"></el-input>
    </div>
</section>
</el-drawer>
`
})