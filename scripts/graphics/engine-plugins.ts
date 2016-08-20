import {graphics, canvasPosition, stageOptions, graphicsPlugin} from '../contracts/igraphics';

export class KineticGraphicsPlugin implements graphicsPlugin {
    private layer: Kinetic.ILayer;

    constructor() {
        this.layer = new Kinetic.Layer();
    }

    public get Layer() {
        return this.layer;
    }

    public draw() {
        this.layer.draw();
    }
}

export class ScoreTrackerKineticGraphicsPlugin extends KineticGraphicsPlugin {
    private kineticText: Kinetic.IText;
    private label: string;
    private contentLength: number;

    constructor(label: string, contentLengthInCharacters: number) {
        super();

        this.label = label;
        this.contentLength = contentLengthInCharacters;
    }

    private intializeTextShape() {
        this.kineticText = new Kinetic.Text({
            x: 0,
            y: 0,
            text: '',
            textFill: 'yellowgreen'
        });
    }
}