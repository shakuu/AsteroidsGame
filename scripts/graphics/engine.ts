import {graphics, canvasPosition, stageOptions} from '../contracts/igraphics';
import {shapesFactory} from '../contracts/shapes-factory';


export class kineticGraphicsEngine implements graphics {
    private stage: Kinetic.IStage;
    private layers: Kinetic.ILayer[] = [];
    private shapes: Kinetic.IShape[] = [];

    private shapesFactory: shapesFactory;

    private stageOptions: stageOptions;

    constructor(stageOptions: stageOptions, numberOfLayers: number, shapesFactory: shapesFactory) {
        this.shapesFactory = shapesFactory;
        this.stage = this.createStage(stageOptions.container, stageOptions.width, stageOptions.height);
        this.layers = this.createLayers(numberOfLayers);
        this.stageOptions = stageOptions
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
        var layers = []
        for (var i = 0; i < amount; i += 1) {
            var layer = new Kinetic.Layer();
            layers.push(layer);
            this.stage.add(layer);
        }

        return layers;
    }

    public getStageOptions() {
        return this.stageOptions;
    }

    public addShapes(type: string, id: number, position: canvasPosition, layerId: number) {
        var newShape: Kinetic.IShape = this.shapesFactory.createShape(type),
            position: canvasPosition;

        newShape.setPosition(position);
        this.layers[layerId].add(newShape);
        this.shapes[id] = newShape;
        newShape.setId(id + '');

        position = newShape.getPosition();
        return position;
    }

    public destroyShape(id: number) {
        var shapeToRemove = this.shapes[id];
        shapeToRemove.remove();
        this.shapes[id] = null;
    }

    public rotateShape(id: number, degree: number) {
        var currentAngleOfRotationInDegrees: number,
            shapeToRotate = this.shapes[id];

        shapeToRotate.rotate(degree);
        currentAngleOfRotationInDegrees = shapeToRotate.getRotation();

        return currentAngleOfRotationInDegrees % 360;
    }

    public detectCollision(shapeId: number, layer: number) {
        var shape = this.shapes[shapeId],
            layerToCheck = this.layers[layer] as Kinetic.ILayer;

        var isColliding = layerToCheck.getIntersection(shape.getPosition());
        return isColliding;
    }

    public moveShape(id: number, position: canvasPosition) {
        var shapeToMove = this.shapes[id],
            shapeSize = shapeToMove.getSize();

        if (this.checkLeft(position.x, shapeSize.height)) {

            position.x = this.stageOptions.width + shapeSize.height;

        } else if (this.checkRight(position.x, shapeSize.height)) {

            position.x = -shapeSize.height;

        } else if (this.checkTop(position.y, shapeSize.height)) {

            position.y = this.stageOptions.height + shapeSize.height;

        } else if (this.checkBot(position.y, shapeSize.height)) {

            position.y = -shapeSize.height;
        }

        shapeToMove.setPosition({ x: position.x, y: position.y });
    }

    public moveShot(id: number, position: canvasPosition) {
        var outOfBounds: boolean,
            shotToMove = this.shapes[id],
            shapeSize = shotToMove.getSize();

        outOfBounds = this.checkLeft(position.x, shapeSize.width) ||
            this.checkRight(position.x, shapeSize.width) ||
            this.checkTop(position.y, shapeSize.height) ||
            this.checkBot(position.y, shapeSize.height);

        if (outOfBounds) {
            this.destroyShape(id);
        } else {
            shotToMove.setPosition({ x: position.x, y: position.y });
        }

        return outOfBounds;
    }

    private checkLeft(x: number, height: number) {
        if (x + height < 0) {
            return true;
        }

        return false;
    }

    private checkRight(x: number, height: number) {
        if (x - height > this.stageOptions.width) {
            return true;
        }

        return false;
    }

    private checkTop(y: number, height: number) {
        if (y + height < 0) {
            return true;
        }

        return false;
    }

    private checkBot(y: number, height: number) {
        if (y - height > this.stageOptions.height) {
            return true;
        }

        return false;
    }

    public nextFrame() {
        for (var i = 0; i < this.layers.length; i += 1) {
            this.layers[i].draw();
        }
    }
}