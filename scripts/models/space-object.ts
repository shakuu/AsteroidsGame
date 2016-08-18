class spaceObject {
    minimumSpeed: number = 0;

    yawSpeed: number = 0;
    maximumYawSpeed: number;

    forwardSpeed: number = 0;
    maximumForwardSpeed: number;

    objectId: number;
    type: string;

    constructor(id: number, type: string) {
        this.objectId = id;
        this.type = type;
    }
}

export {spaceObject};