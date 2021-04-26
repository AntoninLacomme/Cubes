export default class Player {
    
    constructor (id, name, scene, current=false, posx=0, posy=0, posz=0, color="green") {
        this.id = id;
        this.name = name;
        this.scene = scene;
        this.color = color;
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
        this.angleBody = 0;
        this.angleCanon = 0;

        this.playerCube = this.createPlayer (current);
    }

    setPosition (jsonPosition) {
        if (this.id == jsonPosition.id) {
            //this.move (jsonPosition)
            this.playerCube.position.x = jsonPosition.posx;
            this.playerCube.position.y = jsonPosition.posy;
            this.playerCube.position.z = jsonPosition.posz;
        }
    }

    move (json) {
        if (json != undefined) {
            this.playerCube.move ({
                x: json.posx,
                y: json.posy,
                z: json.posz
            });
        }   
    }
    
    createPlayer (current) {
        let player = new BABYLON.MeshBuilder.CreateBox("heroCube" + this.id, {height:20, depth:20, width:20}, this.scene);
        player.frontVector = new BABYLON.Vector3(0, 0, 0);
        player.move = (newPositions) => {
            let currentPositions = {
                x: player.position.x,
                y: player.position.y,
                z: player.position.z
            }
            let vector = {
                vx: (newPositions.x - currentPositions.x) / 500,
                vy: (newPositions.y - currentPositions.y) / 500,
                vz: (newPositions.z - currentPositions.z) / 500
            }
            player.moveWithCollisions(player.frontVector.multiplyByFloats(vector.vx, vector.vy, vector.vz));
        }

        if (current) {
            let followCamera = this.createFollowCamera(this.scene, player);
            this.scene.activeCamera = followCamera;
        }
        return player;
    }

    createFollowCamera(scene, target) {
        let camera = new BABYLON.FollowCamera("tankFollowCamera", target.position, scene, target);
    
        camera.radius = 180; // how far from the object to follow
        camera.heightOffset = 20; // how high above the object to place the camera
        camera.rotationOffset = 0; // the viewing angle
        camera.cameraAcceleration = .1; // how fast to move
        camera.maxCameraSpeed = 5; // speed limit
    
        return camera;
    }

    destroyPlayer () {
        this.playerCube.dispose ();
    }
}