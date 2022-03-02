const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const static = require('serve-static');
const path = require('path');

var userID = [];

app.use(static(path.join(__dirname, 'css')));
app.use(static(path.join(__dirname, 'img')));
app.use(static(path.join(__dirname, 'js')));

app.get('/', function (req, res) {
    res.redirect('/title');
});

app.get('/title', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log(`server open 3000`);
    // 추가 
});

io.sockets.on('connection', function(socket) {

    socket.on('userLogin', function(userName){
        
        console.log(userName.userName);
        userID.push(userName.userName);
        console.log(userID);
        console.log(userID.length);
    })

});