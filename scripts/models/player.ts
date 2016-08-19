import {spaceShip} from './space-ship'

export class player {
    private ship: spaceShip;
    private name: string;
    private score: number = 0;

    public gameOver: boolean = false;

    constructor(ship: spaceShip, name: string) {
        this.ship = ship;
        this.name = name;
    }

    public get Ship() {
        return this.ship;
    }

    public get Name() {
        return this.name;
    }

    public get Score() {
        return this.score;
    }

    public set Score(score: number) {
        this.score = score;
    }
}