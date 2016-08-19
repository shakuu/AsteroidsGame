import { createGame } from './create-game';

$(function () {
    var asteroids,
        score;

    $('<a />')
        .addClass('start-button')
        .appendTo('#game')
        .html('START')
        .on('click', function () {
            if (!asteroids) {
                score = 0;
                score = startGame();
            }
        });

    function startGame() {
        var root = $(':root');

        asteroids = createGame();

        root.on('keyup', handleKeyUp);
        root.on('keydown', handleKeyDown);

        function handleKeyDown(event) {
            event.preventDefault();
            asteroids.Controls.evaluateKeyDown(event.keyCode);
        }

        function handleKeyUp(event) {
            event.preventDefault();
            asteroids.Controls.evaluateKeyUp(event.keyCode);
        }

        var result = asteroids.Start();
        console.log(result);
        return result;
    }
});


