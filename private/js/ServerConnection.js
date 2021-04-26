const PlayerServer = require("./PlayerServer");

class ServerConnection {

    listPlayers = {};
    currentGame;

    constructor (io) {
        this.io = io;
        this.io.on("connection", (socket) => {
            socket.id = "";

            this.addEcouteurSocket (socket, "addUser", (data) => {
                this.addUser (socket, data);
            });

            this.addEcouteurSocket (socket, "sendName", (data) => {
                this.receiveNameFromPlayer (socket, data);
            });

            this.addEcouteurSocket (socket, "sendMessage", (data) => {
                this.receiveMessageFromPlayer (socket, data);
            });

            this.addEcouteurSocket (socket, "disconnect", (data) => {
                this.disconnect (socket, data);
            });

            this.addEcouteurSocket (socket, "sendKeys", (data) => {
                this.receiveKeysFromPlayer (socket, data);
            })
        });
    }

    setGame (game) { this.currentGame = game; }

    addEcouteurSocket (socket, ecouteur, fx) {
        socket.on (ecouteur, (data) => {
            console.log("PING RECU SUR L'ECOUTEUR <" + ecouteur + ">" + " PAR " + socket.id);
            fx (data);
        });
    }

    addUser (socket, data) {
        socket.id = data;
        this.listPlayers[data] = {id: data}
        console.log(socket.id);
    }

    receiveNameFromPlayer (socket, data) {
        this.listPlayers[socket.id].name = data;

        socket.emit('updatechat', 'SERVER', 'you have connected');
		socket.broadcast.emit('updatechat', 'SERVER', data + ' just joined the game');
		this.io.emit('updateusers', this.getAllNamesID ());

        // on peut désormais ajouter le joueur à la partie !
        this.currentGame.addPlayer (PlayerServer.PlayerServer (socket, socket.id, data));
    }

    receiveMessageFromPlayer (socket, data) {
        this.io.sockets.emit('updatechat', this.listPlayers[socket.id].name, data);
    }

    receiveKeysFromPlayer (socket, data) {
        this.currentGame.getPlayerById (socket.id).pressKeys (data);
       // this.listPlayers[socket.id].pressKeys(data);
    }

    sendAllPositionPlayers (listPositionAllPlayers) {
        this.io.sockets.emit('updateAllPositionsPlayers', listPositionAllPlayers);
    }

    sendAllPositionPLayersToPlayer (player, listPositionAllPlayers) {
        player.getSocket().emit('updateAllPositionsPlayers', listPositionAllPlayers);
    }

    disconnect (socket, data) {
        socket.broadcast.emit('updatechat', 'SERVER', this.listPlayers[socket.id].name + ' has left the game');
        socket.broadcast.emit('disconnectPlayer', this.listPlayers[socket.id]);
        this.io.emit('updateusers', this.getAllNamesID ());
        
        delete this.listPlayers[socket.id];
        this.currentGame.removePlayer (socket.id);
    }

    getAllNamesID () {
        let res = [];
        Object.keys(this.listPlayers).forEach ((key) => {
            if (this.listPlayers[key].name != null) {
                res.push({name: this.listPlayers[key].name, id: this.listPlayers[key].id});
            }
        });
        return res;
    }
}

module.exports = {
    ServerConnection : (io) => {
        return new ServerConnection (io);
    }
}