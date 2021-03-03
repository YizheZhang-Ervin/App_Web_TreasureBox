var app = new Vue({
    el: '#app',
    data() {
        return {
            params: "",
            getRst: "",
            transferData2: "",
            mouseX: 0,
            mouseY: 0,
            currentEle:"",
            displayComponent:""
        }
    },
    mounted() {
        // title时钟
        setInterval(() => {
            this.checkVisibility();
        }, 1000);
        // 获取地理位置
        this.getGeolocation();
        // 防止f12
        // this.attack_kp();
        // 鼠标移动
        document.onmousemove = this.mouseMove;
    },
    methods: {
        // 显示内容
        changePage(key){
            this.displayComponent = key;
        },
        // title时钟，当页面在前台可见时
        checkVisibility: function () {
            let vs = document.visibilityState;
            let date = new Date(Date.now());
            if (vs == "visible") {
                document.title =
                    "Features - " +
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds();
            }
        },
        // title时钟，当页面挂在后台时播放
        checkVisibility2() {
			let timer;
			if (document.visibilityState != "visible") {
				timer = setInterval(() => {
					let date = new Date(Date.now());
					document.title =
						"YeStock " +
						date.getHours() +
						":" +
						date.getMinutes() +
						":" +
						date.getSeconds();
					if (document.visibilityState == "visible") {
						clearInterval(timer);
						document.title = "YeStock";
					}
				}, 1000);
			}
		},
        // 获取鼠标位置
        mouseMove(ev) {
            ev = ev || window.event;
            var mousePos = this.mouseCoords(ev);
            //获取当前的x,y坐标
            this.mouseX = mousePos.x;
            this.mouseY = mousePos.y;
            // 获取当前位置的元素
            let ele = document.elementFromPoint(this.mouseX, this.mouseY);
            this.currentEle = ele;
        },
        mouseCoords(ev) {
            //鼠标移动的位置
            if (ev.pageX || ev.pageY) {
                return { x: ev.pageX, y: ev.pageY };
            }
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop,
            };
        },
        // geolocation
        getGeolocation() {
            navigator.geolocation.getCurrentPosition(this.sendNotification);
        },
        sendNotification(position) {
            // get geolocation
            let latitude =
                position.coords.latitude > 0
                    ? position.coords.latitude + " N"
                    : position.coords.latitude + " S";
            let longitude =
                position.coords.longitude > 0
                    ? position.coords.longitude + " E"
                    : position.coords.longitude + " W";
            // Notification
            var n = new Notification("Your Location", {
                body: `${latitude},${longitude}`,
                tag: "backup",
                requireInteraction: false,
                data: {
                    loc: `${latitude},${longitude}`,
                },
            });
            n.onclick = function () {
                n.close();
            };
        },
        // 防止鼠标右键
        attack_cm() {
            alert("prevent right click")
        },
        // 防止f12
        attack_kp() {
            document.addEventListener("keydown", (e) => {
                if (e.key == "F12") {
                    window.event.returnValue = false;
                    alert("prevent F12")
                }
            })
        }
    }
});