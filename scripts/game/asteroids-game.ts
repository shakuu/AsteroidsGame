import {player} from '../models/player';
import {graphics} from '../contracts/igraphics';
import {objectFactory} from '../shapes-factory/objects-factory';
import {asteroid} from '../models/asteroids';
import {IControls, keyboardControls} from './controls'
import {spaceObject} from '../models/space-object';

export class asteroidsGame {
    private engine: graphics;
    private factory: objectFactory;
    private controls: IControls;

    private player: player;
    private asteroids: asteroid[];
    private shots;

    private shipLayerId = 0;
    private asteroidsLayerId = 1;

    private start: number = null;

    constructor(engine: graphics, player: player, controls: IControls, factory: objectFactory) {
        this.engine = engine;
        this.player = player;
        this.factory = factory;
        this.controls = controls;
    }

    public get Controls() {
        return this.controls;
    }

    public Start() {
        this.player.Ship.position =
            this.engine.addShapes(this.player.Ship.type, this.player.Ship.objectId, this.shipLayerId);
        window.requestAnimationFrame(this.run);
    }

    public run = (timestamp) => {

        if (!this.start) {
            this.start = timestamp;
        }

        this.gameLogic();
        if (timestamp - this.start > 1000 / 60) {
            this.start = null;
            this.engine.nextFrame();
            // DELETE ThIS
            // console.log(this.Controls);
        }

        if (!this.controls.pause) {
            window.requestAnimationFrame(this.run);
        }
    }

    private gameLogic() {
        // Decelerate
        this.deceleratePlayerShip();

        // Read Controls and Accelerate
        this.handleUserInput();

        // Move/ Rotate
        this.applyPlayerShipMovement();
    }

    private deceleratePlayerShip() {
        this.player.Ship.decelerateYawSpeed();
        this.player.Ship.decelerateForwarMotions();
    }

    private handleUserInput() {
        if (this.controls.rotateLeft) {
            this.player.Ship.decreaseYawSpeed();
        }

        if (this.controls.rotateRight) {
            this.player.Ship.increseYawSpeed();
        }

        if (this.controls.moveUp) {
            var delta = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);
            this.player.Ship.createForwarMotion(delta);
        }
    }

    private applyPlayerShipMovement() {
        this.player.Ship.currentYawAngleInDegrees =
            this.engine.rotateShape(this.player.Ship.objectId, this.player.Ship.yawSpeed)

        this.player.Ship.applyForwarMotions();
        this.engine.moveShape(this.player.Ship.objectId, this.player.Ship.position);
    }
}