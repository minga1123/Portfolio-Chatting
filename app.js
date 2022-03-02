const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//=====정적파일 설정=====//
const static = require('serve-static');
const path = require('path');
app.use(static(path.join(__dirname, 'img')));
app.use(static(path.join(__dirname, 'css')));
app.use(static(path.join(__dirname, 'js')));

//=====server open=====//
app.get('/', function (req, res) {
    res.redirect('/login');
}); 
app.get('/login', function (req, res) {
    res.sendfile(__dirname + '/index.html');
}); 
server.listen(5000, () => {
    console.log("server open 3000");
}); 

//io.sockets 나를 포함한 모든 소켓의 객체, 소켓이 connection되면 호출되는 On(발신)이벤트
io.sockets.on('connection', function (socket) {
    console.log('서버 접속 되었음');
    socket.on('userJoin', function(userName){
        console.log();
    });
});