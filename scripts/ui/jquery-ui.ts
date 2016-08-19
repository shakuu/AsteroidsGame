export interface gameUi {
    displayMainScreen(startGameFunction: () => any): void;
    displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any): void;
    displayGameOverScreen(): void;
}

export class jqueryGameUi implements gameUi {
    private root: JQuery;
    private kineticStage: JQuery;
    private documentRoot = $(':root');

    constructor(rootSelector: string) {
        this.root = $(rootSelector);
        this.kineticStage = this.root.children('.kineticjs-content');
    }

    public displayMainScreen(startGameFunction: () => any) {
        $('<a />')
            .addClass('start-button')
            .html('START')
            .appendTo(this.root)
            .on('click', startGameFunction);
    }

    public displayGameScreen(keyDownHandler: (any) => any, keyUpHandler: (any) => any) {
        
        
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
    }
}