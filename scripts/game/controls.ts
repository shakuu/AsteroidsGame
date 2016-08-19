export interface IControls {
    moveUp: boolean;
    moveDown: boolean;
    rotateLeft: boolean;
    rotateRight: boolean;
    shoot: boolean;
    pause: boolean;

    evaluateKeyDown(keyCode: number);
    evaluateKeyUp(keyCode: number);
}

export class keyboardControls implements IControls {
    moveUp: boolean = false;
    moveDown: boolean = false;
    rotateLeft: boolean = false;
    rotateRight: boolean = false;
    shoot: boolean = false;
    pause: boolean;

    evaluateKeyDown = (keyCode: number) => {
        this.setValue(keyCode, true);
    }

    evaluateKeyUp = (keyCode: number) => {
        this.setValue(keyCode, false);
    }

    private setValue = (keyCode: number, value: boolean) => {
        switch (keyCode) {
            case 37:
                this.rotateLeft = value;
                break;
            case 38:
                this.moveUp = value;
                break;
            case 39:
                this.rotateRight = value;
                break;
            case 40:
                this.moveDown = value;
                break;
            case 32:
                this.shoot = value;
                break;
            case 27:
                this.pause = value;
                break;
            default:
                break;
        }
    }
}