import {graphics, canvasPosition, stageOptions, graphicsPlugin} from '../contracts/igraphics';

export class KineticGraphicsPlugin implements graphicsPlugin {
    protected layer: Kinetic.ILayer;

    constructor() {
        this.layer = new Kinetic.Layer();
    }

    public get Layer() {
        return this.layer;
    }

    updateText(content: string) {

    }

    public draw() {
        this.layer.draw();
    }
}

export class ScoreTrackerKineticGraphicsPlugin extends KineticGraphicsPlugin {
    private kineticText: Kinetic.IText;
    private label: string;
    private contentLength: number;

    constructor(label: string, contentLengthInCharacters: number, position: canvasPosition) {
        super();

        this.label = label;
        this.contentLength = contentLengthInCharacters;
        this.intializeTextShape(position);
    }

    public updateText(content: string) {
        var len = this.contentLength - content.length;
        for (let i = 0; i < len; i += 1) {
            content = '0' + content;
        }

        this.kineticText.setText(this.label + content);
    }

    private intializeTextShape(position: canvasPosition) {
        var filler: string = '';
        for (let i = 0; i < this.contentLength; i += 1) {
            filler += '0';
        }

        this.kineticText = new Kinetic.Text({
            x: position.x,
            y: position.y,
            height: 100,
            width: 300,
            text: this.label + filler,
            fill: 'yellowgreen',
            fontSize: 24
        });

        this.layer.add(this.kineticText);
    }
}