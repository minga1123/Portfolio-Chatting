const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const static = require('serve-static');
const path = require('path');

app.get('/', function (req, res) {
    
});

server.listen(3000, () => {
    console.log(`server open 3000`);
    // 추가 
});