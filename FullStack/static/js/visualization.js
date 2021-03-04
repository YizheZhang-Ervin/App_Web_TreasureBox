Vue.component('Visualization', {
    props:{
        msg:String
    },
    // 动态props
    watch: {
        msg: function (newVal) {
            if(newVal=="visualization"){
                this.displayDrawer = true; //newVal即是msg
            }
        },
    },
    mounted(){
        if(this.msg=="visualization"){
            this.displayDrawer = true;
        }
    },
    data: function () {
        return {
            displayDrawer:false,
            mainStyle:{
                width: this.getWidth()+ 'px',
                height: this.getHeight() / 2 + 'px',
                overflowY:"scroll",
                textAlign:"center",
            },
            chartStyle:{
                margin:"0 auto",
                height: "300px",
                width: "300px"
            },
        }
    },
    methods: {
        getWidth(){
			return parseInt(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
		},
		getHeight(){
			return parseInt(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
		},
        
        // plot china/world maps
        // if use vue-cli
        // var echarts = require('echarts');
        // import '../assets/js/china.js';
        plot(mapType) {
            let myChart = echarts.init(document.getElementById("charts"));
            let option = {
                series: [
                    {
                        type: "map",
                        map: mapType,
                        zoom: 1,
                        roam: true,
                        scaleLimit: {
                            min: 1,
                            max: 10,
                        },
                    },
                ],
            };
            myChart.setOption(option);
        },
    },
    template:
`
<el-drawer title="Parameters" :visible.sync="displayDrawer" size="70%" direction="btt" :with-header="false">
<section :style="mainStyle">
    <el-divider></el-divider>
    <el-divider content-position="left">Maps</el-divider>
    <el-button @click="plot('china')">Show China Map Chart</el-button>
    <el-button @click="plot('world')">Show World Map Chart</el-button>
    <div id="charts" :style="chartStyle" class="bordered"></div>
</section>
</el-drawer>
`
})