var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {
  io.emit('logged in', 'User has logged in')

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    io.emit('logged out', 'User Has Left Chat')
  });

  socket.on('user-typing', message => {
    io.emit('current-typing', message)
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
