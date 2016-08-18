import {shapesFactory as interfaceFactory} from '../contracts/shapes-factory';

export class shapesFactory implements interfaceFactory {

    constructor() {

    }

    createShape(type: string) {
        var newShape: Kinetic.IShape;

        switch (type) {
            case 'ship':
                newShape = createShipShape();
        }

        return newShape;
    }
}

function createShipShape(): Kinetic.IShape {
    var newShape = new Kinetic.Line({
        x: 100,
        y: 100,
        points: [10, 0, 20, 40, 0, 40, 10, 0],
        stroke: 'yellowgreen',
        fill: 'yellowgreen',
        offset: { x: 10, y: 20 }
    });
    return newShape;
}