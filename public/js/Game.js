import Player from "./Player.js";
import InputState from "./InputState.js";

export default class Game {

    constructor () {
        this.connection = new Object ();
        this.inputs = new InputState (1);
        this.listPlayers = [];
    }

    setId (id) {
        this.id_myself = id;
    }

    addPlayers (listPlayers) {
        let add = true, present = false;
        listPlayers.forEach ((player) => {
            add = true, present = false;
            if (!this.inputs.isFocus() && player.id == this.id_myself) {
                this.inputs.setTarget (player);
            }

            this.listPlayers.forEach ((p) => {
                if (p.id == player.id) {
                    add = false;
                    present = true;
                }
            });
            if (add) { this.listPlayers.push (new Player (player.id, player.name, this.scene, this.id_myself == player.id)); }
            //if (!present) { this.removePlayer(player); }
        });
    }

    removePlayer (player) {        
        let index = -1;
        for (let i=0; i<this.listPlayers.length; i++) {
            if (player.id == this.listPlayers[i].id) {
                index = i;
            }
        }

        if (index >= 0) {
            this.listPlayers[index].destroyPlayer ();
            this.listPlayers.splice(index, 1);
        }
    }

    setPositionPlayer (positionPlayer) {
        this.listPlayers.forEach ((player) => {
            if (player.id == positionPlayer.id) {
                player.setPosition (positionPlayer);
                return;
            }
        });
    }

    updateAllPlayers (listPositionsPlayers) {
        listPositionsPlayers.forEach((position) => {
            this.setPositionPlayer (position);
        })
    }
/*
    setContext (ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.start ();
    }
*/
    setEngine (canvas) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);
        this.scene = this.creationScene ();
        this.inputs.setContainer (canvas);
        
        this.start ();
    }

    creationScene () {
        let scene = new BABYLON.Scene(this.engine);
        let ground = this.createGround(scene);
        let freeCamera = this.createFreeCamera(scene);

        this.createLights(scene);

        return scene;
    }

    createLights(scene) {
        return new BABYLON.DirectionalLight("dir0", new BABYLON.Vector3(-1, -1, 0), scene);
    }

    createGround(scene) {
        const groundOptions = { width:20000, height:20000, subdivisions:20, minHeight:0, maxHeight:0, onReady: onGroundCreated};
        //scene is optional and defaults to the current scene
        const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", './images/hmap2.jpg', groundOptions, scene); 
    
        function onGroundCreated() {
            const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
            groundMaterial.diffuseTexture = new BABYLON.Texture("./images/grass.jpg");
            ground.material = groundMaterial;
            // to be taken into account by collision detection
            ground.checkCollisions = true;
            //groundMaterial.wireframe=true;
        }
        return ground;
    }

    createFreeCamera(scene) {
        let camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 50, 0), scene);
        camera.attachControl(this.canvas);
        // prevent camera to cross ground
        camera.checkCollisions = true; 
        // avoid flying with the camera
        camera.applyGravity = true;
        return camera;
    }

    setConnection (connection) {
        this.connection = connection;
        this.inputs.setConnection (connection);
    }

    moveAll () {
        this.listPlayers.forEach ((player) => {
            player.move ();
        });
    }

    mainLoop(time) {
        this.moveAll ();

        requestAnimationFrame(this.mainLoop.bind(this));
    }

    start(fpsContainer) {
        this.engine.runRenderLoop(() => {
            //let deltaTime = this.engine.getDeltaTime();
            this.scene.render();
        });

        requestAnimationFrame(this.mainLoop.bind(this));
    }
}