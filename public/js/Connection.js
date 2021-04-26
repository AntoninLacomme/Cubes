export default class Connection {
    
    constructor (chat, game) {
        this._id = this.generateId ();
        game.setId(this._id);
        this.socket = io.connect ();

        this.socket.on ("connect", () => {
            this.socket.emit ("addUser", this._id);
        });

        this.socket.on ("disconnectPlayer", (player) => {
            game.removePlayer (player);
        })

        this.socket.on("updateusers", (listOfUsers) => {
            chat.setListUsers(listOfUsers);
            game.addPlayers (listOfUsers);
        });

        this.socket.on ("updatechat", (emetteur, message) => {
            chat.addMessage (emetteur, message);
        });

        this.socket.on ("updatePositionPlayer", (positionPlayer) => {
            game.setPositionPlayer (positionPlayer);
        });

        this.socket.on ("updateAllPositionsPlayers", (listPositionsPlayers) => {
            game.updateAllPlayers (listPositionsPlayers);
        });
    }

    shareName (name) {
        this.socket.emit ("sendName", name);
    }

    shareMessage (message) {
        this.socket.emit ("sendMessage", message);
    }

    sendKeys (keys) {
        this.socket.emit ("sendKeys", keys)
    }

    generateId () {
        return Date.now().toString(16) + "-" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(16);
    }
}