export interface graphics {
    addShapes(type: string, id: number,position: canvasPosition, layerId: number);
    destroyShape(id: number);
    rotateShape(id: number, degree: number): number;
    moveShape(id: number, position: canvasPosition);
    moveShot(id: number, position: canvasPosition): boolean;
    detectCollision(shapeId: number, layer: number): Kinetic.IShape;
    getStageOptions(): stageOptions;
    nextFrame(): void;
    destroy();

    addPlugin(plugin: graphicsPlugin): void;
}

export interface graphicsPlugin{
    draw();
}

export interface canvasPosition {
    x: number;
    y: number;
}

export interface stageOptions {
    container: string;
    width: number;
    height: number;
}
