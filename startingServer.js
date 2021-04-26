const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = 8001;

const GAMESERVER = require ("./private/js/GameServer.js").getNewGame ();
const SERVERCONNECTION = require ("./private/js/ServerConnection.js").ServerConnection (io);

GAMESERVER.setConnection (SERVERCONNECTION);
SERVERCONNECTION.setGame (GAMESERVER);

http.listen(PORT, () => {
	console.log("Web server écoute sur http://localhost:" + PORT);
})

app.use(express.static(__dirname + '/public'));    


// routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});