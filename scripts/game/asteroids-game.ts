import {player} from '../models/player';
import {graphics} from '../contracts/igraphics';
import {objectFactory} from '../shapes-factory/objects-factory';
import {asteroid} from '../models/asteroids';
import {IControls, keyboardControls} from './controls'
import {spaceObject} from '../models/space-object';
import {basicAttack, shipAttack} from '../models/ship-attacks';

export interface gameCommands {
    createShip: string;
    createBasicAttack: string;
}

export class asteroidsGameCommands implements gameCommands {
    createShip = 'ship';
    createBasicAttack = 'basicAttack';
}

export class asteroidsGame {
    private commands: gameCommands;

    private engine: graphics;
    private factory: objectFactory;
    private controls: IControls;

    private player: player;
    private asteroids: asteroid[] = [];
    private shots: shipAttack[] = [];

    private shipLayerId = 0;
    private asteroidsLayerId = 1;
    private shotsLayerId = 2;

    private currentTimestamp: number;
    private start: number = null;

    private shipLastShotTimestamp: number = 0;
    private shipCanShoot: boolean = false;

    constructor(engine: graphics, player: player, controls: IControls, factory: objectFactory, commands: gameCommands) {
        this.engine = engine;
        this.player = player;
        this.factory = factory;
        this.controls = controls;
        this.commands = commands;
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
        this.currentTimestamp = timestamp;

        if (!this.start) {
            this.start = timestamp;
        }

        if (timestamp - this.shipLastShotTimestamp > this.player.Ship.MinimumTimeBetweenShots) {
            this.shipCanShoot = true;
        } else {
            this.shipCanShoot = false;
        }

        this.gameLogic();
        if (timestamp - this.start > 1000 / 60) {
            this.start = null;
            this.engine.nextFrame();
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
            var forwardMotion = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);
            this.player.Ship.createForwarMotion(forwardMotion);
        }

        if (this.controls.shoot && this.shipCanShoot) {
            this.shipLastShotTimestamp = this.currentTimestamp;
            this.createNewShot();
        }
    }

    private applyPlayerShipMovement() {
        this.player.Ship.currentYawAngleInDegrees =
            this.engine.rotateShape(this.player.Ship.objectId, this.player.Ship.yawSpeed)

        this.player.Ship.applyForwarMotions();
        this.engine.moveShape(this.player.Ship.objectId, this.player.Ship.position);
    }

    private createNewShot() {
        var newShot = this.factory.createObject(this.commands.createBasicAttack) as basicAttack;
        var forwardMotion = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);

        this.shots.push(newShot);
        newShot.position = this.engine.addShapes(newShot.type, newShot.objectId, this.shotsLayerId);

        newShot.position.x = this.player.Ship.position.x + forwardMotion.deltaX;
        newShot.position.y = this.player.Ship.position.y + forwardMotion.deltaY;

        this.engine.moveShape(newShot.objectId, newShot.position);
        newShot.createForwarMotion(forwardMotion);
    }
}