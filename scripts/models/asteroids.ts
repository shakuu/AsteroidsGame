import {spaceObject} from './space-object';

export class asteroid extends spaceObject {
    private size: number;
    private reward: number;

    constructor(id: number, size: number, pointsReward: number, type: string) {
        super(id, type);
        this.size = size;
    }

    public get Size() {
        return this.size;
    }
}

export class largeAsteroid extends asteroid {
    constructor(id: number) {
        super(id, 3, 20, 'largeAsteroid');
    }
}

export class mediumAsteroid extends asteroid{
    constructor(id: number) {
        super(id, 2, 50, 'mediumAsteroid');
    }
}

export class smallAsteroid extends asteroid{
    constructor(id: number) {
        super(id, 1, 100, 'smallAsteroid');
    }
}