function randint (min, max) {
    return (Math.random() * (max - min)) | 0 + min;
}

class PlayerServer {

    constructor (socket, id, name) {
        this.socket = socket;
        this.id = id;
        this.name = name;

        this.posx = randint (50, 300);
        this.posy = randint (20, 50);
        this.posz = randint (50, 300);
        this.angle = Math.random () * Math.PI * 2;

        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.va = 0;
    }

    getProperties () {
        return {
            id: this.id,
            posx: this.posx,
            posy: this.posy,
            posz: this.posz,
            angle: this.angle
        }
    }

    getSocket () {
        return this.socket;
    }

    pressKeys (keys) {
        this.speed = 500;

        this.vx = 0;
        this.vy = 0;
        this.vz = 0;

        if (keys.up) {
            this.vz = -this.speed;
        } 
        if (keys.down) {
            this.vz = +this.speed;
        }
        if (keys.left) {
            this.vx = this.speed;
        }
        if (keys.right) {
            this.vx = -this.speed;
        }
    }

    move () {
        this.posx += this.vx;
        this.posy += this.vy;
        this.posz += this.vz;
    }
} 

module.exports = {
    PlayerServer : (id, name) => {
        return new PlayerServer (id, name);
    }
}