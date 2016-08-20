import {shapesFactory as interfaceFactory} from '../contracts/shapes-factory';
import {createLargeAsteroidTypeOne, createLargeAsteroidTypeTwo} from './asteroids-library/large-asteroids';
import {createMediumAsteroidTypeOne, createMediumAsteroidTypeTwo, createMediumAsteroidTypeThree} from './asteroids-library/medium-asteroids';
import {createSmallAsteroidTypeOne} from './asteroids-library/small-asteroids';

export class shapesFactory implements interfaceFactory {

    constructor() {

    }

    createShape(type: string) {
        var newShape: Kinetic.IShape;

        switch (type) {
            case 'ship':
                newShape = createShipShape();
                break;
            case 'basicAttack':
                newShape = createBasicAttackShape();
                break;
            case 'largeAsteroid':
                newShape = createLargeAsteroid();
                break;
            case 'mediumAsteroid':
                newShape = createMediumAsteroid();
                break;
            case 'smallAsteroid':
                newShape = createSmallAsteroid();
                break;
        }

        return newShape;
    }
}

function createLargeAsteroid(): Kinetic.IShape {
    var newShape: Kinetic.IShape,
        typeNr = getRandomInt(1, 2);

    switch (typeNr) {
        case 1:
            newShape = createLargeAsteroidTypeOne();
            break;
        case 2:
            newShape = createLargeAsteroidTypeTwo();
            break;
        default:
            newShape = createLargeAsteroidTypeOne();
            break;
    }

    return newShape;
}

function createMediumAsteroid(): Kinetic.IShape {
    var newShape: Kinetic.IShape,
        typeNr = getRandomInt(1, 3);

    switch (typeNr) {
        case 1:
            newShape = createMediumAsteroidTypeOne();
            break;
        case 2:
            newShape = createMediumAsteroidTypeTwo();
            break;
        case 3:
            newShape = createMediumAsteroidTypeThree();
            break;
        default:
            newShape = createMediumAsteroidTypeOne();
            break;
    }

    return newShape;
}

function createSmallAsteroid(): Kinetic.IShape {
    var newShape: Kinetic.IShape,
        typeNr = getRandomInt(1, 1);

    switch (typeNr) {
        case 1:
            newShape = createSmallAsteroidTypeOne();
            break;
        default:
            newShape = createSmallAsteroidTypeOne();
            break;
    }

    return newShape;
}

function createShipShape(): Kinetic.IShape {
    var newShape = new Kinetic.Line({
        x: 470,
        y: 250,
        points: [10, 0, 20, 40, 0, 40, 10, 0],
        width: 20,
        height: 40,
        stroke: 'yellowgreen',
        closed: true,
        fill: 'transparent',
        offset: { x: 10, y: 20 }
    });

    return newShape;
}

function createBasicAttackShape() {
    var newShape = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        fill: 'yellowgreen',
        offset: {
            x: 5,
            y: 5
        }
    });

    return newShape;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}