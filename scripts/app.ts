import { createGame } from './create-game';

$(function () {
    var nameInput = $('<input />')
        .addClass('name-input');

    var nameLableText = $('<span />')
        .addClass('label-text-span')
        .html('ID yourself, pilot!');


    var nameLabel = $('<label />')
        .addClass('name-label')
        .append(nameLableText)
        .append(nameInput);

    var btnGo = $('<a />')
        .addClass('btn-go')
        .addClass('inactive')
        .html('Ready and able!');

    var nameInputContainer = $('<div />')
        .addClass('name-input-container')
        .append(nameLabel)
        .append(btnGo)
        .appendTo('#game');

    nameInput.on('input', activateBtnGo);

    btnGo.on('click', function () {
        var playerName = getPlayerName();
        var asteroids = createGame(playerName);
        nameInputContainer.remove();
        asteroids.displayMainScreen();
    });

    function activateBtnGo() {
        var input = $(this);

        if (input.val().length > 0) {
            btnGo.removeClass('inactive')
        } else {
            btnGo.addClass('inactive');
        }
    }

    function getPlayerName() {
        var inputText: string = nameInput.val();

        if (inputText.length < 3) {
            for (let i = inputText.length; i < 3; i += 1) {
                inputText += ' ';
            }
        }

        if (inputText.length > 3) {
            inputText = inputText.substr(0, 3);
        }

        return inputText;
    }
});


