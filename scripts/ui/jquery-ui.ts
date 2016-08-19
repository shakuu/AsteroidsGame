export interface gameUi {
    displayMainScreen(): void;
    displayGameScreen(): void;
    displayGameOverScreen(): void;
}

export class jqueryGameUi implements gameUi {
    private root: JQuery;

    constructor(rootSelector: string) {
        this.root = $(rootSelector);
    }

    public displayMainScreen() {
        
    }

    public displayGameScreen() {

    }

    public displayGameOverScreen() {

    }
}