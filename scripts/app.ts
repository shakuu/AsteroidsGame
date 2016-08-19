import { createGame } from './create-game';

$(function () {
    var asteroids = createGame();
    asteroids.displayMainScreen();
});


