export interface graphics {
    addShapes(type: string, id: number, layerId: number);
    destroyShape(id: number);
    rotateShape(id: number, degree: number): number;
    moveShape(id: number, position: canvasPosition);
    moveShot(id: number, position: canvasPosition): boolean;
    detectCollision(shapeId: number, layer: number): boolean;
    nextFrame();
}

export interface canvasPosition {
    x: number;
    y: number;
}