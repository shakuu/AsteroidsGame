import {spaceObject} from './space-object';

class asteroid extends spaceObject {
    private currentSize: number;

    constructor(id: number, size: number) {
        super(id, 'asteroid');
        this.currentSize = size;
    }

    public get Size() {
        return this.currentSize;
    }
}

export {asteroid};