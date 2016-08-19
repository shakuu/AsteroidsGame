export interface gameUi {
    displayMainScreen(startGameFunction: () => any): void;
    displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any): void;
    displayGameOverScreen(): void;
}

export class jqueryGameUi implements gameUi {
    private documentRoot = $(':root');
    private root: JQuery;

    private kineticStage: JQuery;
    private btnStart: JQuery;

    constructor(rootSelector: string) {
        this.root = $(rootSelector);
        this.initializeElements();
    }

    private initializeElements(): void {
        this.kineticStage = this.root.children('.kineticjs-content');

        this.btnStart = $('<a />')
            .addClass('start-button')
            .html('START');
    }

    public displayMainScreen(startGameFunction: () => any) {
        this.kineticStage.hide();

        this.btnStart
            .appendTo(this.root)
            .on('click', startGameFunction);
    }

    public displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any) {
        this.btnStart.off('click').remove();

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

    public displayGameOverScreen() {
        this.documentRoot.off('keydown');
        this.documentRoot.off('keyup');
    }
}