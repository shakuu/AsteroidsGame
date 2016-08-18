import { canvasPosition} from '../contracts/igraphics';


interface forwardMotion {
    deltaX: number;
    deltaY: number;
    speed: number;
}

class spaceObject {
    minimumSpeed: number = 0;

    yawSpeed: number = 0;
    maximumYawSpeed: number;
    currentYawAngleInDegrees: number;

    forwardSpeed: number = 0;
    maximumForwardSpeed: number;

    objectId: number;
    type: string;

    position: canvasPosition;

    constructor(id: number, type: string) {
        this.objectId = id;
        this.type = type;
    }

    // x = cx + r * cos(a)
    // y = cy + r * sin(a)
    getForwardMotionDelta(rotationInDegrees: number): forwardMotion {
        var deltaX: number,
            deltaY: number,
            rotationInRadians = (rotationInDegrees - 90) * Math.PI / 180;

        deltaX = 10 * Math.cos(rotationInRadians);
        deltaY = 10 * Math.sin(rotationInRadians);
        return { deltaX: deltaX, deltaY: deltaY, speed: 0 };
    }
}

export {spaceObject, forwardMotion};