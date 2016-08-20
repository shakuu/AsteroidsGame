import {HighScoreClient} from './high-score-client';

export class HighScoreLocalStorage implements HighScoreClient {
    submitScore(score: number): boolean {
        var key = this.evaluateScoreRank(score);
        if (key) {
            localStorage.setItem(key, score.toString());
        }

        return true;
    }

    getScoreList(number: number) {
        return localStorage[1];
    }

    private evaluateScoreRank(score: number): any {
        if (!localStorage[1]) {
            return 1;
        }

        for (var key in localStorage) {
            if (+localStorage[key] < +score) {
                return key;
            }
        }

        return null;
    }
}