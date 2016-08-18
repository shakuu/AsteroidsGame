import {spaceObject, forwardMotion} from './space-object';

export interface shipAttack {
    createForwarMotion(forwardMotionToAdd: forwardMotion);
    applyForwarMotion();
}

export class attack extends spaceObject implements shipAttack {

    private forwardMotion: forwardMotion;

    constructor(id: number, type: string) {
        super(id, 'basicAttack');
    }

    createForwarMotion(forwardMotionToAdd: forwardMotion) {
        forwardMotionToAdd.speed = this.maximumForwardSpeed;
        this.forwardMotion = forwardMotionToAdd;
    }

    applyForwarMotion() {
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
