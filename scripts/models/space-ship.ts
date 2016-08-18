import {spaceObject} from './space-object';

class spaceShip extends spaceObject {

    private yawAcceleration: number;
    private yawDeceleration: number;

    private forwardAcceleration: number;
    private forwardDeceleration: number;

    constructor(id: number) {
        super(id, 'ship');
    }

    increseYawSpeed() {
        this.yawSpeed += this.yawAcceleration;
    }

    decreaseYawSpeed() {
        this.yawSpeed -= this.yawDeceleration;
    }

}

export {spaceShip};
