export interface HighScoreClient {
    submitScore(score: number, name: string): boolean;
    getScoreList(amount: number, callback: (data) => any);
    updateCurrentHighScore(): void;

    currentHighScore: string;
}

export class MyServerHighScoreClient implements HighScoreClient {
    private url = window.location.href;
    private highScore: number;

    get currentHighScore() {
        if (this.highScore) {
            return this.highScore.toString();
        } else {
            return '0';
        }
    }

    submitScore(score: number, name: string): boolean {
        var submitScoreUrl = this.url + 'score/' + score.toString() + '/name/' + name;
        $.get(submitScoreUrl, function () { });

        this.updateCurrentHighScore();

        return false;
    }

    getScoreList(amount: number, callback: (data) => any) {
        var url = this.url + 'get/top/' + amount;
        $.get(url, callback);

        return '';
    }

    updateCurrentHighScore(): void {
        var updateCurrentHighScoreUrl = this.url + 'get/hiscore';
        $.get(updateCurrentHighScoreUrl, this.assignHighScore)
    }

    assignHighScore = (score) => {
        this.highScore = +score;
    }
}