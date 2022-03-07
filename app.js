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
server.listen(400, () => {
    console.log("server open 3000");
}); 


io.sockets.on('connection', function(socket) {
    //유저 로그인 정보
   socket.on('userlogin', function(userName){
       console.log(userName.userName + '님이 로그인했습니다.');
       userId.push(userName.userName);
       console.log(userId);
       io.sockets.emit('loginInfo',{userName:userName.userName, loginCount:userId.length, userArray:userId});
   });
   //유저 로그아웃 정보
   socket.on('userlogout', function (userName) {
       console.log(userName.userName + '님이 로그아웃했습니다.');
       //splice(변경할 배열 인덱스 값, 제거 개수) 로그아웃한 유저를 userID배열에서 삭제
       userId.splice(userId.indexOf(userName.userName),1);
       console.log(userId);
       io.sockets.emit('loginoutInfo',{userName:userName.userName, logoutCount:userId.length, userArray:userId});
   });
   //채팅 요청 보내는 유저
   socket.on('requestUser', function (userName) {
       console.log(userName.requestName + ' 님이 ' + userName.responseName + '에게 채팅을 요청하였습니다.');
       //채팅 요청 받는 유저에게 userName보내는 사람 정보 전송
       io.sockets.emit('responseUser', userName);
   });
});