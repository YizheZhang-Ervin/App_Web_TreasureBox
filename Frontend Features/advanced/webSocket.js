// 创建及监听
// 后台可用pywebsocket

function WebSocketTest() {
    if ("WebSocket" in window) {
        alert("您的浏览器支持 WebSocket!");

        // 打开一个 web socket
        var ws = new WebSocket("ws://localhost:9998/echo");

        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send("发送数据");
            alert("数据发送中...");
        };

        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            alert("数据已接收...");
        };

        ws.onclose = function () {
            // 关闭 websocket
            alert("连接已关闭...");
        };
        ws.onerror = function (e) {
            //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
            console.log(error);
        }
    }

    else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }