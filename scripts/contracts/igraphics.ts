export interface graphics {
    addShapes(type: string, id: number, layerId: number);
    destroyShape(id: number);
    rotateShape(id: number, degree: number): number;
    moveShape(id: number, position: canvasPosition);
    nextFrame();
}

export interface canvasPosition {
    x: number;
    y: number;
}