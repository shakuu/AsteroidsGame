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
        }

        return newShape;
    }
}

function CreateLargeAsteroidTypeOne() {
    var newShape = new Kinetic.Line({
        x: 0,
        y: 0,
        points: [10, 0, 20, 40, 0, 40, 10, 0],
        stroke: 'yellowgreen',
        fill: 'yellowgreen',
        offset: { x: 10, y: 20 }
    });

    return newShape;
}

function createShipShape(): Kinetic.IShape {
    var newShape = new Kinetic.Line({
        x: 470,
        y: 250,
        points: [10, 0, 20, 40, 0, 40, 10, 0],
        stroke: 'yellowgreen',
        fill: 'yellowgreen',
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