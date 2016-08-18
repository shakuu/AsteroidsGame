import {spaceObject} from './space-object';

interface forwardMotion {
    deltaX: number;
    deltaY: number;
}

class spaceShip extends spaceObject {
    // TODO: 
    private yawAcceleration: number = 0.05;
    private yawDeceleration: number = 0.01;

    private forwardAcceleration: number;
    private forwardDeceleration: number;

    public forwardMotions: forwardMotion[];

    constructor(id: number) {
        super(id, 'ship');

        this.setStats();
    }

    private setStats() {
        this.maximumYawSpeed = 5;
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

}

export {spaceShip, forwardMotion};
