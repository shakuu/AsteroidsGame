import {spaceObject, forwardMotion} from './space-object';

class spaceShip extends spaceObject {
    private yawAcceleration: number;
    private yawDeceleration: number;

    private forwardAcceleration: number;
    private forwardDeceleration: number;

    private minimumTimeBetweenShots: number;

    public forwardMotions: forwardMotion[] = [];

    constructor(id: number) {
        super(id, 'ship');

        this.setStats();
    }

    private setStats() {
        this.maximumYawSpeed = 5;
        this.yawAcceleration = 0.25;
        this.yawDeceleration = 0.10;

        this.maximumForwardSpeed = 0.025;
        this.forwardAcceleration = 0.05;
        this.forwardDeceleration = 0.0005;

        this.minimumTimeBetweenShots = 333;
    }

    public get MinimumTimeBetweenShots() {
        return this.minimumTimeBetweenShots;
    }

    increseYawSpeed() {
        this.yawSpeed += this.yawAcceleration;
        if (this.yawSpeed > this.maximumYawSpeed) {
            this.yawSpeed = this.maximumYawSpeed;
        }
    }

    decreaseYawSpeed() {
        this.yawSpeed -= this.yawAcceleration;
        if (this.yawSpeed < -this.maximumYawSpeed) {
            this.yawSpeed = -this.maximumYawSpeed;
        }
    }

    decelerateYawSpeed() {
        if (this.yawSpeed < 0) {
            this.yawSpeed += this.yawDeceleration;
            if (this.yawSpeed > 0) {
                this.yawSpeed = 0;
            }
        } else if (this.yawSpeed > 0) {
            this.yawSpeed -= this.yawDeceleration;
            if (this.yawSpeed < 0) {
                this.yawSpeed = 0;
            }
        }
    }

    createForwarMotion(forwardMotionToAdd: forwardMotion) {
        forwardMotionToAdd.speed = this.maximumForwardSpeed;
        this.forwardMotions.filter((existingForwardMotion) => {
            var result = existingForwardMotion.deltaX === forwardMotionToAdd.deltaX &&
                existingForwardMotion.deltaY === forwardMotionToAdd.deltaY;
            return !result;
        });

        this.forwardMotions.push(forwardMotionToAdd);
    }

    decelerateForwardMotions() {
        for (var i = 0; i < this.forwardMotions.length; i += 1) {

            this.forwardMotions[i].speed -= this.forwardDeceleration;
            if (this.forwardMotions[i].speed <= 0) {
                this.forwardMotions.splice(i, 1);
            }
        }
    }

    applyForwardMotions() {
        var currentMotion: forwardMotion,
            currentPosition = this.position;

        for (var i = 0; i < this.forwardMotions.length; i += 1) {
            currentMotion = this.forwardMotions[i];
            currentPosition.x += currentMotion.deltaX * currentMotion.speed;
            currentPosition.y += currentMotion.deltaY * currentMotion.speed;
        }

        this.position = currentPosition;
    }

    clearAllMovement(): void{
        this.forwardMotions = [];
        this.yawSpeed = 0;
    }
}

export {spaceShip};
