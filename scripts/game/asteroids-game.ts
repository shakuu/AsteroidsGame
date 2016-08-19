import {player} from '../models/player';
import {graphics, canvasPosition, stageOptions} from '../contracts/igraphics';
import {objectFactory} from '../objects-factory/objects-factory';
import {asteroid, largeAsteroid, mediumAsteroid, smallAsteroid} from '../models/asteroids';
import {IControls, keyboardControls} from './controls'
import {spaceObject} from '../models/space-object';
import {basicAttack, attack} from '../models/ship-attacks';
import {gameUi} from '../ui/jquery-ui';

interface createNewAsteroidsOnKillOptions {
    numberOfNewAsteroids: number;
    typeOfNewAsteroidsCommand: string;
}

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
    private gameUi: gameUi;

    private player: player;
    private asteroids: asteroid[] = [];
    private shots: attack[] = [];

    private lastKilledAsteroidReward: number = 0;
    private lastKilledAsteroidSize: number = 0;

    private shipLayerId = 0;
    private asteroidsLayerId = 1;
    private shotsLayerId = 2;

    private currentTimestamp: number;
    private start: number = null;

    private shipLastShotTimestamp: number = 0;
    private shipCanShoot: boolean = false;

    private asteroidSpawnTimestamp: number = 0;
    private asteroidSpawnInterval: number = 20000;
    private asteroidSpawnIntervamMinimumValue: number = 5000;
    private asteroidSpawnIntervalDecreasingStep: number = 2500;

    private lastCollisionDetectionTimeStamp: number = 0;

    constructor(engine: graphics,
        player: player,
        controls: IControls,
        factory: objectFactory,
        commands: gameCommands,
        gameUi: gameUi) {

        this.engine = engine;
        this.player = player;
        this.factory = factory;
        this.controls = controls;
        this.commands = commands;
        this.gameUi = gameUi;
    }

    public get Controls() {
        return this.controls;
    }

    public displayMainScreen() {
        this.player.gameOver = false;
        this.gameUi.displayMainScreen(this.Start);
    }

    public onStartBtnClick() {

    }

    public Start = () => {
        this.gameUi.displayGameScreen(this.controls.evaluateKeyDown, this.controls.evaluateKeyUp);

        this.player.Ship.position = this.getInitialShipPosition();

        this.engine.addShapes(
            this.player.Ship.type,
            this.player.Ship.objectId,
            this.player.Ship.position,
            this.shipLayerId);

        this.createNewAsteroid(this.commands.createLargeAsteroid, { x: 200, y: 200 });
        this.createNewAsteroid(this.commands.createLargeAsteroid, { x: 700, y: 360 });

        window.requestAnimationFrame(this.run);

        return this.player.Score;
    }

    private getInitialShipPosition(): canvasPosition {
        var stage = this.engine.getStageOptions();
        var position: canvasPosition = {
            x: (stage.width - 20) / 2,
            y: (stage.height - 40) / 2
        };

        return position;
    }

    private getRandomAsteroidPosition(shipPosition: canvasPosition) {
        var stage = this.engine.getStageOptions();

        var newPosition = {
            x: stage.width - shipPosition.x,
            y: stage.height - shipPosition.y
        };

        return newPosition;
    }

    private createNewAsteroid(type: string, position: canvasPosition) {
        var newAsteroid = this.factory.createObject(type);

        newAsteroid.position = {
            x: position.x,
            y: position.y
        };

        this.engine.addShapes(newAsteroid.type, newAsteroid.objectId, newAsteroid.position, this.asteroidsLayerId);

        var angle = this.getRandomInt(0, 360);
        var delta = newAsteroid.getForwardMotionDelta(angle);
        newAsteroid.createForwardMotion(delta);

        this.asteroids.push(newAsteroid as asteroid);
    }

    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private run = (timestamp) => {
        this.currentTimestamp = timestamp;

        if (!this.start) {
            this.start = timestamp;
        }

        // Game logic related timers:
        if (timestamp - this.shipLastShotTimestamp > this.player.Ship.MinimumTimeBetweenShots) {
            this.shipCanShoot = true;
        } else {
            this.shipCanShoot = false;
        }

        if (timestamp - this.asteroidSpawnTimestamp > this.asteroidSpawnInterval) {
            var position = this.getRandomAsteroidPosition(this.player.Ship.position);
            this.createNewAsteroid(this.commands.createLargeAsteroid, position);

            this.asteroidSpawnTimestamp = timestamp;
            this.asteroidSpawnInterval = this.asteroidSpawnInterval > this.asteroidSpawnIntervamMinimumValue ?
                this.asteroidSpawnInterval - this.asteroidSpawnIntervalDecreasingStep : this.asteroidSpawnIntervamMinimumValue;
        }

        this.gameLogic();

        // Collision detection interval, affects performance
        if (timestamp - this.lastCollisionDetectionTimeStamp > 50) {
            this.collisionDetection();
            this.lastCollisionDetectionTimeStamp = timestamp;
        }

        // Fixed framerate.
        if (timestamp - this.start > 1000 / 60) {
            this.start = null;
            this.engine.nextFrame();
        }

        if (!this.player.gameOver) {
            window.requestAnimationFrame(this.run);
        } else {
            this.gameOver();
        }

        if (this.controls.pause) {
            this.gameOver();
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
        var isColliding: Kinetic.IShape,
            current: attack;

        for (var i = 0; i < this.shots.length; i += 1) {
            current = this.shots[i];
            isColliding = null;
            isColliding = this.engine.detectCollision(current.objectId, this.asteroidsLayerId);

            if (isColliding) {
                var collidingShapeObjectId = +isColliding.getId();
                this.removeShapeWithObjectId(collidingShapeObjectId);

                this.player.Score += this.lastKilledAsteroidReward;

                var position = isColliding.getPosition();
                var newAsteroidsOptions = this.getCreateNewAsteroidsAfterKillOptions(this.lastKilledAsteroidSize);
                for (var j = 0; j < newAsteroidsOptions.numberOfNewAsteroids; j += 1) {

                    this.createNewAsteroid(newAsteroidsOptions.typeOfNewAsteroidsCommand, position);
                }

                // Destroy Shot
                isColliding.remove();
                isColliding.destroy();

                this.engine.destroyShape(current.objectId);
                this.shots.splice(i, 1);
                i -= 1;
            }
        }
    }

    private getCreateNewAsteroidsAfterKillOptions(killedAsteroidSize: number): createNewAsteroidsOnKillOptions {
        var options: createNewAsteroidsOnKillOptions,
            numberOfNewAsteroids = 0,
            typeOfAsteroidCommand = '';

        if (this.lastKilledAsteroidSize === 3) {

            numberOfNewAsteroids = 3;
            typeOfAsteroidCommand = this.commands.createMediumAsteroid;

        } else if (this.lastKilledAsteroidSize == 2) {

            numberOfNewAsteroids = 4;
            typeOfAsteroidCommand = this.commands.createSmallAsteroid;

        } else {

            numberOfNewAsteroids = 0;
            typeOfAsteroidCommand = null;
        }

        options = {
            numberOfNewAsteroids: numberOfNewAsteroids,
            typeOfNewAsteroidsCommand: typeOfAsteroidCommand
        };

        return options;
    }

    private removeShapeWithObjectId(id: number) {
        this.asteroids.filter((asteroid) => {
            var keepAsteroid = true;

            if (asteroid.objectId === id) {
                this.lastKilledAsteroidReward = asteroid.Reward;
                this.lastKilledAsteroidSize = asteroid.Size;
                keepAsteroid = false;
            }

            return keepAsteroid;
        });
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
        var forwardMotionDelta = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);

        this.shots.push(newShot);

        newShot.position = {
            x: this.player.Ship.position.x + forwardMotionDelta.deltaX,
            y: this.player.Ship.position.y + forwardMotionDelta.deltaY
        };

        newShot.position = this.engine.addShapes(newShot.type, newShot.objectId, newShot.position, this.shotsLayerId);

        // this.engine.moveShape(newShot.objectId, newShot.position);
        newShot.createForwardMotion(forwardMotionDelta);
    }

    private gameOver() {
        this.gameUi.displayGameOverScreen();
        this.controls.resetState();
        this.asteroidSpawnInterval = 20000;
        this.player.gameOver = false;
        this.gameUi.displayMainScreen(this.Start);
        this.engine.destroy();
    }
}