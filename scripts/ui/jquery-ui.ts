import {stageOptions} from '../contracts/igraphics';
import {HighScoreClient} from './high-score-client';

export interface gameUi {
    displayMainScreen(startGameFunction: () => any): void;
    displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any): void;
    displayGameOverScreen(score: number): void;

    currentHighScore: string;
}

export class jqueryGameUi implements gameUi {
    private options: stageOptions;
    private scoreClient: HighScoreClient;

    private documentRoot = $(':root');
    private root: JQuery;

    private kineticStage: JQuery;
    private btnStart: JQuery;
    private btnMenu: JQuery;

    constructor(options: stageOptions, scoreClient: HighScoreClient) {
        this.scoreClient = scoreClient;
        this.options = options;
        this.initializeElements();
    }

    get currentHighScore() {
        return this.scoreClient.currentHighScore;
    }

    private initializeElements(): void {
        this.root = $('#' + this.options.container);
        this.kineticStage = this.root.children('.kineticjs-content');

        this.btnMenu = $('<div />')
            .addClass('start-menu')
            .css({
                'left': ((this.options.width - 160) / 2) + 'px',
                'top': ((this.options.height - 160) / 2) + 'px'
            });

        this.btnStart = $('<a />')
            .addClass('start-button')
            .addClass('button')
            .html('START')
            .appendTo(this.btnMenu);
    }

    public displayMainScreen(startGameFunction: () => any) {
        this.kineticStage.hide();

        this.btnMenu
            .appendTo(this.root)
            .on('mouseenter', '.button', function (event) {
                $(event.target).addClass('hovered');
            }).on('mouseleave', '.button', function (event) {
                $(event.target).removeClass('hovered');
            });

        this.btnStart.on('click', function () {
            $(this).removeClass('hovered');
            startGameFunction();
        });
    }

    public displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any) {
        this.btnMenu
            .off('mouseenter')
            .off('mouseleave')
            .remove();
        this.btnStart.off('click');

        this.kineticStage.show();

        this.documentRoot.on('keydown', function (event) {
            event.preventDefault();
            keyDownHandler(event.keyCode);
        });
        this.documentRoot.on('keyup', function (event) {
            event.preventDefault();
            keyUpHandler(event.keyCode);
        });
    }

    public displayGameOverScreen(score: number) {
        this.documentRoot.off('keydown');
        this.documentRoot.off('keyup');

        this.scoreClient.submitScore(score);
        this.scoreClient.getScoreList(5);
    }
}