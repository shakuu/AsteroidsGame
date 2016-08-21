import { createGame } from './create-game';

$(function () {
    var logoContainer = initializeLogo();

    var nameInput = $('<input />')
        .attr('maxlength', '3')
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
        var asteroids = createGame(playerName, logoContainer);
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

    function initializeLogo(): JQuery {
        var links = [
            { name: 'GitHub Repo', url: 'https://github.com/shakuu/AsteroidsGame' },
            { name: 'TypeScript', url: 'http://www.typescriptlang.org/' },
            { name: 'Kinetic.js', url: 'http://kineticjs.com/' },
            { name: 'Express.js', url: 'http://expressjs.com/' },
            { name: 'jQuery', url: 'http://jquery.com/' }
        ];

        var linkTemplate = $('<li />')
            .addClass('link-item');

        var linkTemplateAnchor = $('<a />')
            .appendTo(linkTemplate);

        var linksList = $('<ul />')
            .addClass('links-list');

        for (let i = 0; i < links.length; i += 1) {
            linkTemplateAnchor
                .html(links[i].name)
                .attr('href', links[i].url);

            linksList.append(linkTemplate.clone());
        }

        var heading = $('<h1 />')
            .addClass('logo-heading')
            .html('asteroids');

        var logoContainer = $('<div />')
            .addClass('logo-container')
            .append(heading)
            .append(linksList)
            .appendTo('#game');

        return logoContainer;
    }
});


