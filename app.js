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
	exports.asteroids = asteroids;
	document.onkeydown = function (event) {
	    event.preventDefault();
	    asteroids.Controls.evaluateKeyDown(event.keyCode);
	};
	document.onkeyup = function (event) {
	    event.preventDefault();
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
	        var newShape = this.shapesFactory.createShape(type), position;
	        this.layers[layerId].add(newShape);
	        this.shapes[id] = newShape;
	        position = newShape.getPosition();
	        return position;
	    };
	    kineticGraphicsEngine.prototype.destroyShape = function (id) {
	    };
	    kineticGraphicsEngine.prototype.rotateShape = function (id, degree) {
	        var currentAngleOfRotationInDegrees, shapeToRotate = this.shapes[id];
	        shapeToRotate.rotate(degree);
	        currentAngleOfRotationInDegrees = shapeToRotate.getRotation();
	        return currentAngleOfRotationInDegrees % 360;
	    };
	    kineticGraphicsEngine.prototype.moveShape = function (id, position) {
	        this.shapes[id].setPosition({ x: position.x, y: position.y });
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
	        this.forwardMotions = [];
	        this.setStats();
	    }
	    spaceShip.prototype.setStats = function () {
	        this.maximumYawSpeed = 5;
	        this.yawAcceleration = 0.1;
	        this.yawDeceleration = 0.025;
	        this.maximumForwardSpeed = 0.033;
	        this.forwardAcceleration = 0.05;
	        this.forwardDeceleration = 0.0003;
	    };
	    spaceShip.prototype.increseYawSpeed = function () {
	        this.yawSpeed += this.yawAcceleration;
	        if (this.yawSpeed > this.maximumYawSpeed) {
	            this.yawSpeed = this.maximumYawSpeed;
	        }
	    };
	    spaceShip.prototype.decreaseYawSpeed = function () {
	        this.yawSpeed -= this.yawAcceleration;
	        if (this.yawSpeed < -this.maximumYawSpeed) {
	            this.yawSpeed = -this.maximumYawSpeed;
	        }
	    };
	    spaceShip.prototype.decelerateYawSpeed = function () {
	        if (this.yawSpeed < 0) {
	            this.yawSpeed += this.yawDeceleration;
	            if (this.yawSpeed > 0) {
	                this.yawSpeed = 0;
	            }
	        }
	        else if (this.yawSpeed > 0) {
	            this.yawSpeed -= this.yawDeceleration;
	            if (this.yawSpeed < 0) {
	                this.yawSpeed = 0;
	            }
	        }
	    };
	    spaceShip.prototype.createForwarMotion = function (forwardMotionToAdd) {
	        forwardMotionToAdd.speed = this.maximumForwardSpeed;
	        this.forwardMotions.filter(function (existingForwardMotion) {
	            var result = existingForwardMotion.deltaX === forwardMotionToAdd.deltaX &&
	                existingForwardMotion.deltaY === forwardMotionToAdd.deltaY;
	            return !result;
	        });
	        this.forwardMotions.push(forwardMotionToAdd);
	    };
	    spaceShip.prototype.decelerateForwarMotions = function () {
	        for (var i = 0; i < this.forwardMotions.length; i += 1) {
	            this.forwardMotions[i].speed -= this.forwardDeceleration;
	            if (this.forwardMotions[i].speed <= 0) {
	                this.forwardMotions.splice(i, 1);
	            }
	        }
	    };
	    spaceShip.prototype.applyForwarMotions = function () {
	        var currentMotion, currentPosition = this.position;
	        for (var i = 0; i < this.forwardMotions.length; i += 1) {
	            currentMotion = this.forwardMotions[i];
	            currentPosition.x += currentMotion.deltaX * currentMotion.speed;
	            currentPosition.y += currentMotion.deltaY * currentMotion.speed;
	        }
	        this.position = currentPosition;
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
	        this.minimumSpeed = 0;
	        this.yawSpeed = 0;
	        this.forwardSpeed = 0;
	        this.objectId = id;
	        this.type = type;
	    }
	    // x = cx + r * cos(a)
	    // y = cy + r * sin(a)
	    spaceObject.prototype.getForwardMotionDelta = function (rotationInDegrees) {
	        var deltaX, deltaY, rotationInRadians = (rotationInDegrees - 90) * Math.PI / 180;
	        deltaX = 10 * Math.cos(rotationInRadians);
	        deltaY = 10 * Math.sin(rotationInRadians);
	        return { deltaX: deltaX, deltaY: deltaY, speed: 0 };
	    };
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
	                newShape = createShipShape();
	        }
	        return newShape;
	    };
	    return shapesFactory;
	}());
	exports.shapesFactory = shapesFactory;
	function createShipShape() {
	    var newShape = new Kinetic.Line({
	        x: 100,
	        y: 100,
	        points: [10, 0, 20, 40, 0, 40, 10, 0],
	        stroke: 'yellowgreen',
	        fill: 'yellowgreen',
	        offset: { x: 10, y: 20 }
	    });
	    return newShape;
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var asteroidsGame = (function () {
	    function asteroidsGame(engine, player, controls, factory) {
	        var _this = this;
	        this.shipLayerId = 0;
	        this.asteroidsLayerId = 1;
	        this.start = null;
	        this.run = function (timestamp) {
	            if (!_this.start) {
	                _this.start = timestamp;
	            }
	            _this.gameLogic();
	            if (timestamp - _this.start > 1000 / 60) {
	                _this.start = null;
	                _this.engine.nextFrame();
	            }
	            if (!_this.controls.pause) {
	                window.requestAnimationFrame(_this.run);
	            }
	        };
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
	        this.player.Ship.position =
	            this.engine.addShapes(this.player.Ship.type, this.player.Ship.objectId, this.shipLayerId);
	        window.requestAnimationFrame(this.run);
	    };
	    asteroidsGame.prototype.gameLogic = function () {
	        // Decelerate
	        this.deceleratePlayerShip();
	        // Read Controls and Accelerate
	        if (this.controls.rotateLeft) {
	            this.player.Ship.decreaseYawSpeed();
	        }
	        if (this.controls.rotateRight) {
	            this.player.Ship.increseYawSpeed();
	        }
	        if (this.controls.moveUp) {
	            var delta = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);
	            this.player.Ship.createForwarMotion(delta);
	        }
	        // Apply Rotation
	        this.player.Ship.currentYawAngleInDegrees =
	            this.engine.rotateShape(this.player.Ship.objectId, this.player.Ship.yawSpeed);
	        // Apply Forward movement
	        this.player.Ship.applyForwarMotions();
	        this.engine.moveShape(this.player.Ship.objectId, this.player.Ship.position);
	    };
	    asteroidsGame.prototype.deceleratePlayerShip = function () {
	        this.player.Ship.decelerateYawSpeed();
	        this.player.Ship.decelerateForwarMotions();
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