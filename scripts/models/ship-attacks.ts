import {spaceObject, forwardMotion} from './space-object';

export class attack extends spaceObject {

    private forwardMotion: forwardMotion;

    constructor(id: number, type: string) {
        super(id, 'basicAttack');
    }

    createForwardMotion(forwardMotionToAdd: forwardMotion) {
        forwardMotionToAdd.speed = this.maximumForwardSpeed;
        this.forwardMotion = forwardMotionToAdd;
    }

    applyForwardMotion() {
        var currentPosition = this.position;

        currentPosition.x += this.forwardMotion.deltaX * this.forwardMotion.speed;
        currentPosition.y += this.forwardMotion.deltaY * this.forwardMotion.speed;

        this.position = currentPosition;
    }
}

export class basicAttack extends attack {
    constructor(id: number) {
        super(id, 'basicAttack')

        this.maximumForwardSpeed = 0.222;
    }
}
