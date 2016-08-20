export interface HighScoreClient {
    submitScore(score: number, name: string): boolean;
    getScoreList(number: number);

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
        $.get(submitScoreUrl, function() { });

        var updateCurrentHighScoreUrl = this.url + 'get/hiscore';
        $.get(updateCurrentHighScoreUrl, this.assignHighScore)

        return false;
    }

    getScoreList(number: number) {
        var url = this.url + 'get/hiscore';

        $.get(url, this.assignHighScore)

        return '';
    }

    assignHighScore = (score) => {
        this.highScore = +score;
    }
}