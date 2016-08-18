import { createGame } from './create-game';

var asteroids = createGame();

document.onkeydown = function (event) {
    event.preventDefault();
    asteroids.Controls.evaluateKeyDown(event.keyCode);
}

document.onkeyup = function (event) {
    event.preventDefault();
    asteroids.Controls.evaluateKeyUp(event.keyCode);
}

asteroids.Start();

export {asteroids};