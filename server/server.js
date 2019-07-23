console.log("Server is active");

var express = require('express');
var request = require('request');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

var io = require('socket.io')(server);

var availablePlayer = null;
var matches = {};

var clients =[];

io.sockets.on('connection',
  function (socket) {
    console.log("We have a new client: " + socket.id);
    console.log("Available Player: " + availablePlayer);
    
    newPlayer(socket.id);
    socket.on('storeClientInfo', function (data) {
      
      // var clientInfo = new Object();
      // // clientInfo.customId = data.customId;
      // clientInfo.clientId = socket.id;
      // clients.push(clientInfo);
      
  });
  
  socket.on('message',
      function(data) {
        io.sockets.connected[matches[socket.id]]
        .emit('turn', true);
      }
    );  

    socket.on('disconnect', function() {
      console.log("Client has disconnected: " + socket.id);
      if(availablePlayer == socket.id){
        availablePlayer = null;
        }else{
          deleteMatch(socket.id);
        }
      for( var i=0, len=clients.length; i<len; ++i ){
        var c = clients[i];

        if(c.clientId == socket.id){
            clients.splice(i,1);
            break;
        }
    }
    });
});

function matchPlayers(player1, player2) {
	matches[player1] = player2;
	matches[player2] = player1;

    io.sockets.connected[player1]
        .emit('new', true);
    io.sockets.connected[player2]
        .emit('new', false);

        
}

function deleteMatch(player) {
	matches[matches[player]] = null;
	var tmp = matches[player];
	matches[player] = null;
    io.sockets.connected[tmp]
        .emit('wait_opponent', true);
	newPlayer(tmp);
}

function newPlayer(player){
	if(availablePlayer == null){
		availablePlayer = player;
	}else{
		matchPlayers(player, availablePlayer);
		availablePlayer = null;
	}
}