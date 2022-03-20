const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const static = require('serve-static');
const path = require('path');

app.get('/', function (req, res) {
    res.send("Hello");
});

server.listen(3000, () => {
    console.log(`server open 3000`);
    // 추가 
});

io.on("connection", (socket) => {
  // client로부터의 메시지가 수신되면
  socket.on("test", function(data){
      console.log('왔음');
  });

});