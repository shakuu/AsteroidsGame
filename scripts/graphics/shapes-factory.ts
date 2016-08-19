import {shapesFactory as interfaceFactory} from '../contracts/shapes-factory';

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
                newShape = CreateLargeAsteroidTypeOne();
                break;
        }

        return newShape;
    }
}

function CreateLargeAsteroidTypeOne() {
    // 160x160
    var newShape = new Kinetic.Line({
        x: 200,
        y: 200,
        points: [
            40, 0,
            80, 0,
            160, 20,
            160, 80,
            40, 160,
            0, 120,
            0, 40,
            40, 0
        ],
        closed: true,
        // width: 160,
        // height: 160,
        stroke: 'yellowgreen',
        fill: 'transparent',
        offset: { x: 80, y: 80 }
    });

    return newShape;
}

function createShipShape(): Kinetic.IShape {
    var newShape = new Kinetic.Line({
        x: 470,
        y: 250,
        points: [10, 0, 20, 40, 0, 40, 10, 0],
        // width: 20,
        // height: 40,
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