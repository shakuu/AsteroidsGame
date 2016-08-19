import {spaceObject, forwardMotion} from './space-object';

export class asteroid extends spaceObject {
    private size: number;
    private reward: number;

    constructor(id: number, size: number, pointsReward: number, type: string) {
        super(id, type);
        this.size = size;
        this.reward = pointsReward;
    }

    public get Reward() {
        return this.reward;
    }

    public get Size() {
        return this.size;
    }
}

export class largeAsteroid extends asteroid {
    constructor(id: number) {
        super(id, 3, 20, 'largeAsteroid');

        this.maximumForwardSpeed = 0.1;
        this.yawSpeed = 1;
    }
}

export class mediumAsteroid extends asteroid {
    constructor(id: number) {
        super(id, 2, 50, 'mediumAsteroid');

        this.maximumForwardSpeed = 0.2;
        this.yawSpeed = 1.25;
    }
}

export class smallAsteroid extends asteroid {
    constructor(id: number) {
        super(id, 1, 100, 'smallAsteroid');

        this.maximumForwardSpeed = 0.33;
        this.yawSpeed = 1.5;
    }
}