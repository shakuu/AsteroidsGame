import {factory} from './contract';
import {spaceObject} from '../models/space-object';
import {largeAsteroid, mediumAsteroid, smallAsteroid} from '../models/asteroids';
import {spaceShip} from '../models/space-ship';
import {basicAttack} from '../models/ship-attacks';

export class objectFactory implements factory {

    private currentId: number;

    constructor() {
        this.currentId = 0;
    }

    createObject(type: string) {
        var newObject: spaceObject;

        switch (type) {
            case 'ship':
                newObject = new spaceShip(this.currentId);
                this.currentId += 1;
                break;
            case 'basicAttack':
                newObject = new basicAttack(this.currentId);
                this.currentId += 1;
                break;
            case 'largeAsteroid':
                newObject = new largeAsteroid(this.currentId);
                this.currentId += 1;
                break;
            case 'mediumAsteroid':
                newObject = new mediumAsteroid(this.currentId);
                this.currentId += 1;
                break;
            case 'smallAsteroid':
                newObject = new smallAsteroid(this.currentId);
                this.currentId += 1;
                break;
            default:
                break;
        }

        return newObject;
    }
}