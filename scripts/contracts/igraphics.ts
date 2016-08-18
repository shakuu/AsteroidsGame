export interface graphics {
    addShapes(type: string, id: number, layerId: number);
    destroyShape(id: number);
    rotateShape(id: number, degree: number);
    moveShape(id: number, speed: number, x: number, y: number);
    nextFrame();
}