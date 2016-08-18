class spaceObject {
    minimumSpeed: number;

    yawSpeed: number;
    maximumYawSpeed: number;

    forwardSpeed: number;
    maximumForwardSpeed: number;

    objectId: number;
    type: string;

    constructor(id: number, type: string) {
        this.objectId = id;
        this.type = type;
    }
}

export {spaceObject};