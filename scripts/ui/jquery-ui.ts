import {stageOptions} from '../contracts/igraphics';
import {HighScoreClient} from './high-score-client';

export interface gameUi {
    displayMainScreen(startGameFunction: () => any): void;
    displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any): void;
    displayGameOverScreen(score: number, name: string): void;

    currentHighScore: string;
}

export class jqueryGameUi implements gameUi {
    private options: stageOptions;
    private scoreClient: HighScoreClient;

    private documentRoot = $(':root');
    private root: JQuery;

    private kineticStage: JQuery;
    private btnStart: JQuery;
    private btnScore: JQuery;
    private btnMenu: JQuery;

    private hiScoreBackground: JQuery;
    private hiScoreStringLenght: number = 32;

    constructor(options: stageOptions, scoreClient: HighScoreClient) {
        this.scoreClient = scoreClient;
        this.options = options;
        this.initializeElements();
    }

    get currentHighScore() {
        return this.scoreClient.currentHighScore;
    }

    private initializeElements(): void {
        this.scoreClient.updateCurrentHighScore();

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

        this.btnScore = $('<a />')
            .addClass('score-button')
            .addClass('button')
            .html('HI-SCORE')
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

        this.btnScore.on('click', this.displayTopScores);
    }

    public displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any) {
        this.btnMenu
            .off('mouseenter')
            .off('mouseleave')
            .remove();
        this.btnStart.off('click');
        this.btnScore.off('click');

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

    public displayGameOverScreen(score: number, name: string) {
        this.documentRoot.off('keydown');
        this.documentRoot.off('keyup');

        this.scoreClient.submitScore(score, name);
    }

    private displayTopScores = () => {
        this.btnMenu.hide();
        this.btnScore.removeClass('hovered');
        this.scoreClient.getScoreList(3, this.populateHighScoreList)
    }

    private populateHighScoreList = (data) => {
        this.hiScoreBackground = $('<div />')
            .addClass('inactive-background')
            .appendTo('body')
            .on('click', this.restoreStateBeforeHiScoreMenu)

        var container = $('<div />')
            .addClass('high-score-list')
            .appendTo(this.hiScoreBackground);

        var itemScore = $('<span />')
            .addClass('item-score');

        var item = $('<div />')
            .addClass('high-score-item')
            .append(itemScore);

        var newHiScoreString = '';
        for (var i in data) {
            newHiScoreString = this.generateHiScoreString(data[i].name, data[i].score.toString());
            itemScore.html(newHiScoreString);
            container.append(item.clone());
        }

        container
            .children('.high-score-item')
            .first().addClass('first')
            .next().addClass('second')
            .next().addClass('third');
    }

    private generateHiScoreString(name: string, score: string): string {
        var hiScoreString: string = name;

        var currentStringLenght = hiScoreString.length;
        for (let i = currentStringLenght; i < this.hiScoreStringLenght - 8; i += 1) {
            hiScoreString += '.';
        }

        var scoreStringLength = score.length;
        currentStringLenght = hiScoreString.length;
        for (let i = currentStringLenght; i < this.hiScoreStringLenght - scoreStringLength; i += 1) {
            hiScoreString += '0';
        }

        hiScoreString += score;
        return hiScoreString;
    }

    private restoreStateBeforeHiScoreMenu = (event) => {
        this.btnMenu.show();
        this.hiScoreBackground.off('click').remove();
    }
}