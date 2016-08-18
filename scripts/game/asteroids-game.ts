import {player} from '../models/player';
import {graphics} from '../contracts/igraphics';
import {objectFactory} from '../shapes-factory/objects-factory';
import {asteroid} from '../models/asteroids';
import {IControls, keyboardControls} from './controls'
import {spaceObject} from '../models/space-object';

export class asteroidsGame {
    public engine: graphics;
    private player: player;
    private factory: objectFactory;
    public controls: IControls;

    private shipLayerId = 0;

    constructor(engine: graphics, player: player, controls: IControls, factory: objectFactory) {
        this.engine = engine;
        this.player = player;
        this.factory = factory;
        this.controls = controls;
    }

    public get Controls() {
        return this.controls;
    }

    public Start() {
        this.engine.addShapes(this.player.Ship.type, this.player.Ship.objectId, this.shipLayerId);
        console.log(this.controls);
        debugger;
        window.requestAnimationFrame(this.run);
    }

    public run = () => {
        this.engine.nextFrame();
        console.log(this.Controls);
        window.requestAnimationFrame(this.run);
    }

    private gameLogic() {
    }
}