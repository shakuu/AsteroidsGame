import {spaceObject, forwardMotion} from './space-object';

export class attack extends spaceObject {

    // private forwardMotion: forwardMotion;

    constructor(id: number, type: string) {
        super(id, 'basicAttack');
    }
}

export class basicAttack extends attack {
    constructor(id: number) {
        super(id, 'basicAttack')

        this.maximumForwardSpeed = 0.222;
    }
}
