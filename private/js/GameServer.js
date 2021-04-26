class GameServer {

    constructor () {
        this.listPlayers = [];
        this.listObstacles = [];
        this.connexion = null;

        this.clock = setInterval (() => {
            if (this.connexion != null) {
                // on move tout
                this.listPlayers.forEach((player) => {
                    player.move ();
                });

                // on send à tout le monde
                this.connexion.sendAllPositionPlayers (this.getAllPositionsPlayers ());
            }
        }, 20);
    }

    getPlayerById (id) {
        let p = null
        this.listPlayers.forEach ((player) => {
            if (player.id == id) {
                p = player;
            }
        });
        return p;
    }

    addPlayer (newPlayer) {
        this.listPlayers.forEach ((player) => {
            if (player.id == newPlayer.id) {
                return false;
            }
        })
        this.listPlayers.push (newPlayer);
       // this.connexion.sendAllPositionPlayers (this.getAllPositionsPlayers ());
        
        // on envoi à tout le monde la position de ce joueur !
        this.connexion.io.emit('updatePositionPlayer', newPlayer.getProperties ());
        // on envoi le position de tout le monde à ce joueur !
        this.connexion.sendAllPositionPLayersToPlayer (newPlayer, this.getAllPositionsPlayers ());
    }

    removePlayer (idPlayer) {
        for (let i=0; i<this.listPlayers; i++) {
            if (this.listPlayers[i].id == idPlayer) {
                this.listPlayers.splice (i, 1);
            }
        }
    }

    getAllPositionsPlayers () {
        let positions = [];
        this.listPlayers.forEach ((player) => {
            positions.push(player.getProperties ());
        });
        return positions;
    }

    setConnection (connexion) {
        this.connexion = connexion;
    }

    sendPositionsToAllPlayers () {
        this.listPlayers.forEach ((player) => {
            this.connexion.sendAllPositionPlayers (player, this.getAllPositionsPlayers ());
        });
    }

}

module.exports = {
    getNewGame : () => {
        return new GameServer ();
    }
}