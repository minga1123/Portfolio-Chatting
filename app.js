const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//=====//
var userId = [];
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
server.listen(3000, () => {
    console.log("server open 3000");
}); 


io.sockets.on('connection', function(socket) {
   socket.on('userlogin', function(userName){
       console.log(userName.userName + '님이 로그인했습니다.');
       userId.push(userName.userName);
       console.log(userId + "," + userId.length + "명 접속");
   });
   socket.on('userlogout', function (userName) {
       console.log(userName.userName + '님이 로그아웃했습니다.');
   });
});