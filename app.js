/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var create_game_1 = __webpack_require__(1);
	var asteroids = create_game_1.createGame();
	document.onkeydown = function (event) {
	    asteroids.Controls.evaluateKeyDown(event.keyCode);
	};
	document.onkeyup = function (event) {
	    asteroids.Controls.evaluateKeyUp(event.keyCode);
	};
	asteroids.Start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var engine_1 = __webpack_require__(2);
	var objects_factory_1 = __webpack_require__(3);
	var player_1 = __webpack_require__(6);
	var shapes_factory_1 = __webpack_require__(7);
	var asteroids_game_1 = __webpack_require__(8);
	var controls_1 = __webpack_require__(9);
	function createGame() {
	    var factory = new objects_factory_1.objectFactory();
	    var shapeFactory = new shapes_factory_1.shapesFactory();
	    var stageOptions = {
	        container: 'game',
	        width: 960,
	        height: 540
	    };
	    var engine = new engine_1.kineticGraphicsEngine(stageOptions, 3, shapeFactory);
	    var ship = factory.createObject('ship');
	    var playerOne = new player_1.player(ship, 'player one');
	    var controls = new controls_1.keyboardControls();
	    var game = new asteroids_game_1.asteroidsGame(engine, playerOne, controls, factory);
	    console.log('it works');
	    return game;
	}
	exports.createGame = createGame;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var kineticGraphicsEngine = (function () {
	    function kineticGraphicsEngine(stageOptions, numberOfLayers, shapesFactory) {
	        this.layers = [];
	        this.shapes = [];
	        this.shapesFactory = shapesFactory;
	        this.stage = this.createStage(stageOptions.container, stageOptions.width, stageOptions.height);
	        this.layers = this.createLayers(numberOfLayers);
	    }
	    kineticGraphicsEngine.prototype.createStage = function (containerId, width, height) {
	        var stage;
	        stage = new Kinetic.Stage({
	            container: containerId,
	            width: width,
	            height: height
	        });
	        return stage;
	    };
	    kineticGraphicsEngine.prototype.createLayers = function (amount) {
	        var layers = [];
	        for (var i = 0; i < amount; i += 1) {
	            var layer = new Kinetic.Layer();
	            layers.push(layer);
	            this.stage.add(layer);
	        }
	        return layers;
	    };
	    kineticGraphicsEngine.prototype.addShapes = function (type, id, layerId) {
	        var newShape = this.shapesFactory.createShape(type);
	        this.layers[layerId].add(newShape);
	        this.shapes[id] = newShape;
	    };
	    kineticGraphicsEngine.prototype.destroyShape = function (id) {
	    };
	    kineticGraphicsEngine.prototype.rotateShape = function (id, degree) {
	    };
	    kineticGraphicsEngine.prototype.moveShape = function (id, speed, x, y) {
	    };
	    kineticGraphicsEngine.prototype.nextFrame = function () {
	        for (var i = 0; i < this.layers.length; i += 1) {
	            this.layers[i].draw();
	        }
	    };
	    return kineticGraphicsEngine;
	}());
	exports.kineticGraphicsEngine = kineticGraphicsEngine;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var space_ship_1 = __webpack_require__(4);
	var objectFactory = (function () {
	    function objectFactory() {
	        this.currentId = 0;
	    }
	    objectFactory.prototype.createObject = function (type) {
	        var newObject;
	        switch (type) {
	            case 'ship':
	                newObject = new space_ship_1.spaceShip(this.currentId);
	                this.currentId += 1;
	                break;
	            default:
	                break;
	        }
	        return newObject;
	    };
	    return objectFactory;
	}());
	exports.objectFactory = objectFactory;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var space_object_1 = __webpack_require__(5);
	var spaceShip = (function (_super) {
	    __extends(spaceShip, _super);
	    function spaceShip(id) {
	        _super.call(this, id, 'ship');
	    }
	    spaceShip.prototype.increseYawSpeed = function () {
	        this.yawSpeed += this.yawAcceleration;
	    };
	    spaceShip.prototype.decreaseYawSpeed = function () {
	        this.yawSpeed -= this.yawDeceleration;
	    };
	    return spaceShip;
	}(space_object_1.spaceObject));
	exports.spaceShip = spaceShip;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var spaceObject = (function () {
	    function spaceObject(id, type) {
	        this.objectId = id;
	        this.type = type;
	    }
	    return spaceObject;
	}());
	exports.spaceObject = spaceObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var player = (function () {
	    function player(ship, name) {
	        this.score = 0;
	        this.ship = ship;
	        this.name = name;
	    }
	    Object.defineProperty(player.prototype, "Ship", {
	        get: function () {
	            return this.ship;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(player.prototype, "Name", {
	        get: function () {
	            return this.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(player.prototype, "Score", {
	        get: function () {
	            return this.score;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return player;
	}());
	exports.player = player;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var shapesFactory = (function () {
	    function shapesFactory() {
	    }
	    shapesFactory.prototype.createShape = function (type) {
	        var newShape;
	        switch (type) {
	            case 'ship':
	                newShape = new Kinetic.Rect({
	                    x: 100,
	                    y: 100,
	                    width: 40,
	                    height: 40,
	                    stroke: 'black',
	                    fill: 'black'
	                });
	        }
	        return newShape;
	    };
	    return shapesFactory;
	}());
	exports.shapesFactory = shapesFactory;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var asteroidsGame = (function () {
	    function asteroidsGame(engine, player, controls, factory) {
	        this.shipLayerId = 0;
	        this.engine = engine;
	        this.player = player;
	        this.factory = factory;
	        this.controls = controls;
	    }
	    Object.defineProperty(asteroidsGame.prototype, "Controls", {
	        get: function () {
	            return this.controls;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    asteroidsGame.prototype.Start = function () {
	        this.engine.addShapes(this.player.Ship.type, this.player.Ship.objectId, this.shipLayerId);
	        console.log(this.controls);
	        this.engine.nextFrame();
	    };
	    return asteroidsGame;
	}());
	exports.asteroidsGame = asteroidsGame;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var keyboardControls = (function () {
	    function keyboardControls() {
	        this.moveUp = false;
	        this.moveDown = false;
	        this.rotateLeft = false;
	        this.rotateRight = false;
	        this.shoot = false;
	    }
	    keyboardControls.prototype.evaluateKeyDown = function (keyCode) {
	        this.setValue(keyCode, true);
	    };
	    keyboardControls.prototype.evaluateKeyUp = function (keyCode) {
	        this.setValue(keyCode, false);
	    };
	    keyboardControls.prototype.setValue = function (keyCode, value) {
	        switch (keyCode) {
	            case 37:
	                this.rotateLeft = value;
	                break;
	            case 38:
	                this.moveUp = value;
	                break;
	            case 39:
	                this.rotateRight = value;
	                break;
	            case 40:
	                this.moveDown = value;
	                break;
	            case 32:
	                this.shoot = value;
	                break;
	            case 27:
	                this.pause = value;
	                break;
	            default:
	                break;
	        }
	    };
	    return keyboardControls;
	}());
	exports.keyboardControls = keyboardControls;


/***/ }
/******/ ]);