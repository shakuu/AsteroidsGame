import { createGame } from './create-game';

var asteroids = createGame();

document.onkeydown = function (event) {
    asteroids.Controls.evaluateKeyDown(event.keyCode);
}

document.onkeyup = function (event) {
    asteroids.Controls.evaluateKeyUp(event.keyCode);
}

asteroids.Start();