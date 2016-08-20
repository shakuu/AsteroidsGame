export interface HighScoreClient {
    submitScore(score: number): boolean;
    getScoreList(number: number): {};
}

export class MyServerHighScoreClient implements HighScoreClient {
    private url = window.location.href;

    submitScore(score: number): boolean {

        return false;
    }
    getScoreList(number: number): {} {

        return {};
    }
}