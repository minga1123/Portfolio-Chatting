const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//====같은 서버 접속 user 배열
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
server.listen(8000, () => {
    console.log("server open 3000");
}); 


io.sockets.on('connection', function(socket) {
   socket.on('userlogin', function(userName){
       console.log(userName.userName + '님이 로그인했습니다.');
       userId.push(userName.userName);
       console.log(userId);
       socket.emit('loginInfo',{userName:userName.userName, loginCount:userId.length, userArray:userId});
       
   });
   socket.on('userlogout', function (userName) {
       console.log(userName.userName + '님이 로그아웃했습니다.');
       //splice(변경할 배열 인덱스 값, 제거 개수) 로그아웃한 유저를 userID배열에서 삭제
       userId.splice(userId.indexOf(userName.userName),1);
       console.log(userId);
       socket.emit('loginoutInfo',{userName:userName.userName, logoutCount:userId.length, userArray:userId});
   });
});