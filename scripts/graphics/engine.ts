import {graphics} from '../contracts/igraphics';
import {shapesFactory} from '../contracts/shapes-factory';

interface stageOptions {
    container: string;
    width: number;
    height: number;
}

export class kineticGraphicsEngine implements graphics {
    private stage: Kinetic.IStage;
    private layers: Kinetic.ILayer[] = [];
    private shapes: Kinetic.IShape[] = [];

    private shapesFactory: shapesFactory;

    constructor(stageOptions: stageOptions, numberOfLayers: number, shapesFactory: shapesFactory) {
        this.shapesFactory = shapesFactory;
        this.stage = this.createStage(stageOptions.container, stageOptions.width, stageOptions.height);
        this.layers = this.createLayers(numberOfLayers);
    }

    private createStage(containerId: string, width: number, height: number) {
        var stage: Kinetic.IStage;
        stage = new Kinetic.Stage({
            container: containerId,
            width: width,
            height: height
        });

        return stage;
    }

    private createLayers(amount: number) {
        var layers: Kinetic.ILayer[] = [];
        for (var i = 0; i < amount; i += 1) {
            var layer = new Kinetic.Layer();
            layers.push(layer);
            this.stage.add(layer);
        }

        return layers;
    }

    public addShapes(type: string, id: number, layerId: number) {
        var newShape: Kinetic.IShape = this.shapesFactory.createShape(type);
        this.layers[layerId].add(newShape);
        this.shapes[id] = newShape;
    }

    public destroyShape(id: number) {

    }

    public rotateShape(id: number, degree: number) {
        this.shapes[id].rotate(degree);
    }

    public moveShape(id: number, speed: number, x: number, y: number) {

    }

    public nextFrame() {
        for (var i = 0; i < this.layers.length; i += 1) {
            this.layers[i].draw();
        }
    }
}