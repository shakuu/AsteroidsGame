import {asteroid} from './models/asteroids';
import {spaceShip} from './models/space-ship';
import {kineticGraphicsEngine} from './graphics/engine';
import {graphics} from './contracts/igraphics';
import {ScoreTrackerKineticGraphicsPlugin} from './graphics/engine-plugins';
import {objectFactory} from './objects-factory/objects-factory';
import {player} from './models/player';
import {shapesFactory} from './graphics/shapes-factory'
import {asteroidsGame, asteroidsGameCommands} from './game/asteroids-game';
import {IControls, keyboardControls} from './game/controls';
import {jqueryGameUi} from './ui/jquery-ui';
import {HighScoreLocalStorage} from './ui/high-score-localstorage';
import {MyServerHighScoreClient} from './ui/high-score-client';

export function createGame() {
    var factory = new objectFactory()
    var shapeFactory = new shapesFactory();
    var stageOptions = {
        container: 'game',
        width: window.innerWidth,
        height: window.innerHeight
    };

    // var scoreClient = new HighScoreLocalStorage();
    var scoreClient = new MyServerHighScoreClient();
    var gameCommands = new asteroidsGameCommands();
    var gameUi = new jqueryGameUi(stageOptions, scoreClient);
    var engine = new kineticGraphicsEngine(stageOptions, 3, shapeFactory);
    var ship = factory.createObject(gameCommands.createShip);
    var playerOne = new player(ship as spaceShip, 'one');
    var controls = new keyboardControls();

    var game = new asteroidsGame(engine, playerOne, controls, factory, gameCommands, gameUi);

    var hiScorePlugin = new ScoreTrackerKineticGraphicsPlugin('HI-SCORE ', 8, { x: stageOptions.width - 310, y: 10 });
    var scoreGraphicsPlugin = new ScoreTrackerKineticGraphicsPlugin('SCORE ', 8, { x: 10, y: 10 });
    game.addHiScoreGraphicsPlugin(hiScorePlugin);
    game.addScoreGraphicsPlugin(scoreGraphicsPlugin);

    console.log('it works');

    return game;
}