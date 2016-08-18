import {shapesFactory as interfaceFactory} from '../contracts/shapes-factory';

export class shapesFactory implements interfaceFactory {

    constructor() {

    }

    createShape(type: string) {
        var newShape: Kinetic.IShape;

        switch (type) {
            case 'ship':
                newShape = new Kinetic.RegularPolygon({
                    x: 100,
                    y: 100,
                    width: 40,
                    height: 40,
                    sides: 3,
                    radius: 70,
                    stroke: 'black',
                    fill: 'black'
                })
        }

        return newShape;
    }
}