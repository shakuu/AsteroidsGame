import {player} from '../models/player';
import {graphics} from '../contracts/igraphics';
import {objectFactory} from '../shapes-factory/objects-factory';
import {asteroid, largeAsteroid, mediumAsteroid, smallAsteroid} from '../models/asteroids';
import {IControls, keyboardControls} from './controls'
import {spaceObject} from '../models/space-object';
import {basicAttack, attack} from '../models/ship-attacks';

export interface gameCommands {
    createShip: string;
    createBasicAttack: string;
    createLargeAsteroid: string;
    createMediumAsteroid: string;
    createSmallAsteroid: string;
}

export class asteroidsGameCommands implements gameCommands {
    createShip = 'ship';
    createBasicAttack = 'basicAttack';
    createLargeAsteroid = 'largeAsteroid';
    createMediumAsteroid = 'mediumAsteroid';
    createSmallAsteroid = 'smallAsteroid';
}

export class asteroidsGame {
    private commands: gameCommands;

    private engine: graphics;
    private factory: objectFactory;
    private controls: IControls;

    private player: player;
    private asteroids: asteroid[] = [];
    private shots: attack[] = [];

    private shipLayerId = 0;
    private asteroidsLayerId = 1;
    private shotsLayerId = 2;

    private currentTimestamp: number;
    private start: number = null;

    private shipLastShotTimestamp: number = 0;
    private shipCanShoot: boolean = false;

    private lastCollisionDetectionTimeStamp: number = 0;

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

        this.createNewAsteroid(this.commands.createLargeAsteroid);

        window.requestAnimationFrame(this.run);
    }

    private createNewAsteroid(type: string) {
        var newAsteroid = this.factory.createObject(this.commands.createLargeAsteroid);
        newAsteroid.position =
            this.engine.addShapes(newAsteroid.type, newAsteroid.objectId, this.asteroidsLayerId);

        var angle = this.getRandomInt(0, 360);
        var delta = newAsteroid.getForwardMotionDelta(angle);
        newAsteroid.createForwardMotion(delta);

        this.asteroids.push(newAsteroid as asteroid);
    }

    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

        if (timestamp - this.lastCollisionDetectionTimeStamp > 50) {
            this.collisionDetection();
            this.lastCollisionDetectionTimeStamp = timestamp;
        }

        if (timestamp - this.start > 1000 / 60) {
            this.start = null;
            this.engine.nextFrame();
        }

        if (this.player.gameOver) {
            // console.log('gameover');
        }

        if (!this.controls.pause) {
            window.requestAnimationFrame(this.run);
        }
    }

    private collisionDetection() {
        this.checkPlayerCollision();
        this.checkAsteroidCollision();
    }

    private gameLogic() {
        // Decelerate
        this.deceleratePlayerShip();

        // Read Controls and Accelerate
        this.handleUserInput();

        // Move/ Rotate
        this.applyPlayerShipMovement();
        this.applyAsteroidsMovement();
        this.applyShotsMovement();
    }

    private checkPlayerCollision() {
        var isColliding = this.engine.detectCollision(this.player.Ship.objectId, this.asteroidsLayerId);
        if (isColliding) {
            this.player.gameOver = true;
        }
    }

    private checkAsteroidCollision() {
        var isColliding = false,
            current: attack;

        for (var i = 0; i < this.shots.length; i += 1) {
            current = this.shots[i];
            isColliding = false;
            isColliding = this.engine.detectCollision(current.objectId, this.asteroidsLayerId);

            if (isColliding) {
                console.log(isColliding);

                this.engine.destroyShape(current.objectId);
                this.shots.splice(i, 1);
                i -= 1;
            }
        }
    }

    private deceleratePlayerShip() {
        this.player.Ship.decelerateYawSpeed();
        this.player.Ship.decelerateForwardMotions();
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

    private applyAsteroidsMovement() {
        for (var i = 0; i < this.asteroids.length; i += 1) {
            var current = this.asteroids[i];

            current.applyForwardMotion();
            current.currentYawAngleInDegrees = this.engine.rotateShape(current.objectId, current.yawSpeed);
            this.engine.moveShape(current.objectId, current.position);
        }
    }

    private applyPlayerShipMovement() {
        this.player.Ship.currentYawAngleInDegrees =
            this.engine.rotateShape(this.player.Ship.objectId, this.player.Ship.yawSpeed)

        this.player.Ship.applyForwardMotions();
        this.engine.moveShape(this.player.Ship.objectId, this.player.Ship.position);
    }

    private applyShotsMovement() {
        for (var i = 0; i < this.shots.length; i += 1) {
            this.shots[i].applyForwardMotion();
            var isOutOfBounds = this.engine.moveShot(this.shots[i].objectId, this.shots[i].position);

            if (isOutOfBounds) {
                this.shots.splice(i, 1);
                i -= 1;
            }
        }
    }

    private createNewShot() {
        var newShot = this.factory.createObject(this.commands.createBasicAttack) as basicAttack;
        var forwardMotion = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);

        this.shots.push(newShot);
        newShot.position = this.engine.addShapes(newShot.type, newShot.objectId, this.shotsLayerId);

        newShot.position.x = this.player.Ship.position.x + forwardMotion.deltaX;
        newShot.position.y = this.player.Ship.position.y + forwardMotion.deltaY;

        this.engine.moveShape(newShot.objectId, newShot.position);
        newShot.createForwardMotion(forwardMotion);
    }
}