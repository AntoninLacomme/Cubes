
export default class InputState {
    constructor (speed) {
        this.target = null;
        this.speed = speed;

        this.inputStates = {};
        this.inputStates.left = false;
        this.inputStates.right = false;
        this.inputStates.up = false;
        this.inputStates.down = false;
        this.inputStates.space = false;
    }

    isFocus () {
        return this.target != null;
    }

    setTarget (target) {
        this.target = target;
    }

    setConnection (connection) {
        this.connection = connection;
    }

    setContainer (container) {
        container.addEventListener('keydown', (event) => {
            if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
                this.inputStates.left = true;
            } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
                this.inputStates.up = true;
            } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
                this.inputStates.right = true;
            } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
                this.inputStates.down = true;
            }  else if (event.key === " ") {
                this.inputStates.space = true;
            }

            if (this.inputStates.left || this.inputStates.right || this.inputStates.up || this.inputStates.down) {
                this.connection.sendKeys (this.inputStates);
            }
        }, false);

        container.addEventListener('keyup', (event) => {
            let keyup = false;
            if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
                this.inputStates.left = false;
                keyup = true;
            } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
                this.inputStates.up = false;
                keyup = true;
            } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
                this.inputStates.right = false;
                keyup = true;
            } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
                this.inputStates.down = false;
                keyup = true;
            }  else if (event.key === " ") {
                this.inputStates.space = false;
                keyup = true;
            }

            if (keyup) {
                this.connection.sendKeys (this.inputStates);
            }
        }, false);
    }

    getKeys () {
        return this.inputStates;
    }
} 