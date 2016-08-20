export interface HighScoreClient {
    submitScore(score: number): boolean;
    getScoreList(number: number);

    currentHighScore: string;
}

export class MyServerHighScoreClient implements HighScoreClient {
    private url = window.location.href;
    private highScore;

    get currentHighScore() {
        if (this.highScore) {
            return this.highScore.toString();
        } else {
            return '0';
        }
    }

    submitScore(score: number): boolean {
        var url = this.url + 'score/' + score.toString();

        $.get(url, function() {
            console.log('success');
        });

        return false;
    }

    getScoreList(number: number) {
        var url = this.url + 'get/hiscore';

        $.get(url, this.assignHighScore)

        return '';
    }

    assignHighScore = (score) => {
        this.highScore = score;
    }
}