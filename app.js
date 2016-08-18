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
	var player_1 = __webpack_require__(8);
	var shapes_factory_1 = __webpack_require__(9);
	var asteroids_game_1 = __webpack_require__(10);
	var controls_1 = __webpack_require__(11);
	function createGame() {
	    var factory = new objects_factory_1.objectFactory();
	    var shapeFactory = new shapes_factory_1.shapesFactory();
	    var stageOptions = {
	        container: 'game',
	        width: 960,
	        height: 540
	    };
	    var gameCommands = new asteroids_game_1.asteroidsGameCommands();
	    var engine = new engine_1.kineticGraphicsEngine(stageOptions, 3, shapeFactory);
	    var ship = factory.createObject(gameCommands.createShip);
	    var playerOne = new player_1.player(ship, 'player one');
	    var controls = new controls_1.keyboardControls();
	    var game = new asteroids_game_1.asteroidsGame(engine, playerOne, controls, factory, gameCommands);
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
	        this.stageOptions = stageOptions;
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
	        var shapeToRemove = this.shapes[id];
	        shapeToRemove.remove();
	        this.shapes[id] = null;
	    };
	    kineticGraphicsEngine.prototype.rotateShape = function (id, degree) {
	        var currentAngleOfRotationInDegrees, shapeToRotate = this.shapes[id];
	        shapeToRotate.rotate(degree);
	        currentAngleOfRotationInDegrees = shapeToRotate.getRotation();
	        return currentAngleOfRotationInDegrees % 360;
	    };
	    kineticGraphicsEngine.prototype.detectCollision = function (shapeId, layer) {
	        var shape = this.shapes[shapeId], layerToCheck = this.layers[layer];
	        var isColliding = layerToCheck.getIntersection(shape.getPosition());
	        return isColliding;
	    };
	    kineticGraphicsEngine.prototype.moveShape = function (id, position) {
	        var shapeToMove = this.shapes[id], shapeSize = shapeToMove.getSize();
	        if (this.checkLeft(position.x, shapeSize.width)) {
	            position.x = this.stageOptions.width - (shapeSize.width / 2);
	        }
	        else if (this.checkRight(position.x, shapeSize.width)) {
	            position.x = shapeSize.width / 2;
	        }
	        else if (this.checkTop(position.y, shapeSize.height)) {
	            position.y = this.stageOptions.height - (shapeSize.height / 2);
	        }
	        else if (this.checkBot(position.y, shapeSize.height)) {
	            position.y = shapeSize.height / 2;
	        }
	        shapeToMove.setPosition({ x: position.x, y: position.y });
	    };
	    kineticGraphicsEngine.prototype.moveShot = function (id, position) {
	        var outOfBounds, shotToMove = this.shapes[id], shapeSize = shotToMove.getSize();
	        outOfBounds = this.checkLeft(position.x, shapeSize.width) ||
	            this.checkRight(position.x, shapeSize.width) ||
	            this.checkTop(position.y, shapeSize.height) ||
	            this.checkBot(position.y, shapeSize.height);
	        if (outOfBounds) {
	            this.destroyShape(id);
	        }
	        else {
	            shotToMove.setPosition({ x: position.x, y: position.y });
	        }
	        return outOfBounds;
	    };
	    kineticGraphicsEngine.prototype.checkLeft = function (x, width) {
	        if (x - width < 0) {
	            return true;
	        }
	        return false;
	    };
	    kineticGraphicsEngine.prototype.checkRight = function (x, width) {
	        if (x + width > this.stageOptions.width) {
	            return true;
	        }
	        return false;
	    };
	    kineticGraphicsEngine.prototype.checkTop = function (y, height) {
	        if (y - height < 0) {
	            return true;
	        }
	        return false;
	    };
	    kineticGraphicsEngine.prototype.checkBot = function (y, height) {
	        if (y + height > this.stageOptions.height) {
	            return true;
	        }
	        return false;
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
	var asteroids_1 = __webpack_require__(4);
	var space_ship_1 = __webpack_require__(6);
	var ship_attacks_1 = __webpack_require__(7);
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
	            case 'basicAttack':
	                newObject = new ship_attacks_1.basicAttack(this.currentId);
	                this.currentId += 1;
	                break;
	            case 'largeAsteroid':
	                newObject = new asteroids_1.largeAsteroid(this.currentId);
	                this.currentId += 1;
	                break;
	            case 'mediumAsteroid':
	                newObject = new asteroids_1.mediumAsteroid(this.currentId);
	                this.currentId += 1;
	                break;
	            case 'smallAsteroid':
	                newObject = new asteroids_1.smallAsteroid(this.currentId);
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
	var asteroid = (function (_super) {
	    __extends(asteroid, _super);
	    function asteroid(id, size, pointsReward, type) {
	        _super.call(this, id, type);
	        this.size = size;
	    }
	    Object.defineProperty(asteroid.prototype, "Reward", {
	        get: function () {
	            return this.reward;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(asteroid.prototype, "Size", {
	        get: function () {
	            return this.size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return asteroid;
	}(space_object_1.spaceObject));
	exports.asteroid = asteroid;
	var largeAsteroid = (function (_super) {
	    __extends(largeAsteroid, _super);
	    function largeAsteroid(id) {
	        _super.call(this, id, 3, 20, 'largeAsteroid');
	        this.maximumForwardSpeed = 0.1;
	        this.yawSpeed = 1;
	    }
	    return largeAsteroid;
	}(asteroid));
	exports.largeAsteroid = largeAsteroid;
	var mediumAsteroid = (function (_super) {
	    __extends(mediumAsteroid, _super);
	    function mediumAsteroid(id) {
	        _super.call(this, id, 2, 50, 'mediumAsteroid');
	        this.maximumForwardSpeed = 0.25;
	        this.yawSpeed = 1;
	    }
	    return mediumAsteroid;
	}(asteroid));
	exports.mediumAsteroid = mediumAsteroid;
	var smallAsteroid = (function (_super) {
	    __extends(smallAsteroid, _super);
	    function smallAsteroid(id) {
	        _super.call(this, id, 1, 100, 'smallAsteroid');
	        this.maximumForwardSpeed = 0.5;
	        this.yawSpeed = 1;
	    }
	    return smallAsteroid;
	}(asteroid));
	exports.smallAsteroid = smallAsteroid;


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
	    spaceObject.prototype.createForwardMotion = function (forwardMotionToAdd) {
	        forwardMotionToAdd.speed = this.maximumForwardSpeed;
	        this.forwardMotion = forwardMotionToAdd;
	    };
	    spaceObject.prototype.applyForwardMotion = function () {
	        var currentPosition = this.position;
	        currentPosition.x += this.forwardMotion.deltaX * this.forwardMotion.speed;
	        currentPosition.y += this.forwardMotion.deltaY * this.forwardMotion.speed;
	        this.position = currentPosition;
	    };
	    return spaceObject;
	}());
	exports.spaceObject = spaceObject;


/***/ },
/* 6 */
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
	        this.yawAcceleration = 0.25;
	        this.yawDeceleration = 0.05;
	        this.maximumForwardSpeed = 0.025;
	        this.forwardAcceleration = 0.05;
	        this.forwardDeceleration = 0.0005;
	        this.minimumTimeBetweenShots = 333;
	    };
	    Object.defineProperty(spaceShip.prototype, "MinimumTimeBetweenShots", {
	        get: function () {
	            return this.minimumTimeBetweenShots;
	        },
	        enumerable: true,
	        configurable: true
	    });
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
	    spaceShip.prototype.decelerateForwardMotions = function () {
	        for (var i = 0; i < this.forwardMotions.length; i += 1) {
	            this.forwardMotions[i].speed -= this.forwardDeceleration;
	            if (this.forwardMotions[i].speed <= 0) {
	                this.forwardMotions.splice(i, 1);
	            }
	        }
	    };
	    spaceShip.prototype.applyForwardMotions = function () {
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var space_object_1 = __webpack_require__(5);
	var attack = (function (_super) {
	    __extends(attack, _super);
	    // private forwardMotion: forwardMotion;
	    function attack(id, type) {
	        _super.call(this, id, 'basicAttack');
	    }
	    return attack;
	}(space_object_1.spaceObject));
	exports.attack = attack;
	var basicAttack = (function (_super) {
	    __extends(basicAttack, _super);
	    function basicAttack(id) {
	        _super.call(this, id, 'basicAttack');
	        this.maximumForwardSpeed = 0.222;
	    }
	    return basicAttack;
	}(attack));
	exports.basicAttack = basicAttack;


/***/ },
/* 8 */
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
/* 9 */
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
	                break;
	            case 'basicAttack':
	                newShape = createBasicAttackShape();
	                break;
	            case 'largeAsteroid':
	                newShape = CreateLargeAsteroidTypeOne();
	                break;
	        }
	        return newShape;
	    };
	    return shapesFactory;
	}());
	exports.shapesFactory = shapesFactory;
	function CreateLargeAsteroidTypeOne() {
	    // 160x160
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            40, 0,
	            80, 0,
	            160, 20,
	            160, 80,
	            40, 160,
	            0, 120,
	            0, 40,
	            40, 0
	        ],
	        // width: 160,
	        // height: 160,
	        stroke: 'yellowgreen',
	        fill: 'yellowgreen',
	        offset: { x: 80, y: 80 }
	    });
	    return newShape;
	}
	function createShipShape() {
	    var newShape = new Kinetic.Line({
	        x: 470,
	        y: 250,
	        points: [10, 0, 20, 40, 0, 40, 10, 0],
	        // width: 20,
	        // height: 40,
	        stroke: 'yellowgreen',
	        fill: 'yellowgreen',
	        offset: { x: 10, y: 20 }
	    });
	    return newShape;
	}
	function createBasicAttackShape() {
	    var newShape = new Kinetic.Rect({
	        x: 0,
	        y: 0,
	        width: 10,
	        height: 10,
	        fill: 'yellowgreen',
	        offset: {
	            x: 5,
	            y: 5
	        }
	    });
	    return newShape;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var asteroidsGameCommands = (function () {
	    function asteroidsGameCommands() {
	        this.createShip = 'ship';
	        this.createBasicAttack = 'basicAttack';
	        this.createLargeAsteroid = 'largeAsteroid';
	        this.createMediumAsteroid = 'mediumAsteroid';
	        this.createSmallAsteroid = 'smallAsteroid';
	    }
	    return asteroidsGameCommands;
	}());
	exports.asteroidsGameCommands = asteroidsGameCommands;
	var asteroidsGame = (function () {
	    function asteroidsGame(engine, player, controls, factory, commands) {
	        var _this = this;
	        this.asteroids = [];
	        this.shots = [];
	        this.shipLayerId = 0;
	        this.asteroidsLayerId = 1;
	        this.shotsLayerId = 2;
	        this.start = null;
	        this.shipLastShotTimestamp = 0;
	        this.shipCanShoot = false;
	        this.run = function (timestamp) {
	            _this.currentTimestamp = timestamp;
	            if (!_this.start) {
	                _this.start = timestamp;
	            }
	            if (timestamp - _this.shipLastShotTimestamp > _this.player.Ship.MinimumTimeBetweenShots) {
	                _this.shipCanShoot = true;
	            }
	            else {
	                _this.shipCanShoot = false;
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
	        this.commands = commands;
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
	        this.createNewAsteroid(this.commands.createLargeAsteroid);
	        window.requestAnimationFrame(this.run);
	    };
	    asteroidsGame.prototype.createNewAsteroid = function (type) {
	        var newAsteroid = this.factory.createObject(this.commands.createLargeAsteroid);
	        newAsteroid.position =
	            this.engine.addShapes(newAsteroid.type, newAsteroid.objectId, this.asteroidsLayerId);
	        var angle = this.getRandomInt(0, 360);
	        var delta = newAsteroid.getForwardMotionDelta(angle);
	        newAsteroid.createForwardMotion(delta);
	        this.asteroids.push(newAsteroid);
	    };
	    asteroidsGame.prototype.getRandomInt = function (min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    };
	    asteroidsGame.prototype.gameLogic = function () {
	        // Decelerate
	        this.deceleratePlayerShip();
	        // Read Controls and Accelerate
	        this.handleUserInput();
	        // Move/ Rotate
	        this.applyPlayerShipMovement();
	        this.applyAsteroidsMovement();
	        this.applyShotsMovement();
	        // CheckCollision
	        this.checkPlayerCollision();
	    };
	    asteroidsGame.prototype.checkPlayerCollision = function () {
	        var isColliding = this.engine.detectCollision(this.player.Ship.objectId, this.asteroidsLayerId);
	        if (isColliding) {
	            console.log('game-over');
	        }
	    };
	    asteroidsGame.prototype.deceleratePlayerShip = function () {
	        this.player.Ship.decelerateYawSpeed();
	        this.player.Ship.decelerateForwardMotions();
	    };
	    asteroidsGame.prototype.handleUserInput = function () {
	        if (this.controls.rotateLeft) {
	            this.player.Ship.decreaseYawSpeed();
	        }
	        if (this.controls.rotateRight) {
	            this.player.Ship.increseYawSpeed();
	        }
	        if (this.controls.moveUp) {
	            var forwardMotion = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);
	            this.player.Ship.createForwarMotion(forwardMotion);
	        }
	        if (this.controls.shoot && this.shipCanShoot) {
	            this.shipLastShotTimestamp = this.currentTimestamp;
	            this.createNewShot();
	        }
	    };
	    asteroidsGame.prototype.applyAsteroidsMovement = function () {
	        for (var i = 0; i < this.asteroids.length; i += 1) {
	            var current = this.asteroids[i];
	            current.applyForwardMotion();
	            current.currentYawAngleInDegrees = this.engine.rotateShape(current.objectId, current.yawSpeed);
	            this.engine.moveShape(current.objectId, current.position);
	        }
	    };
	    asteroidsGame.prototype.applyPlayerShipMovement = function () {
	        this.player.Ship.currentYawAngleInDegrees =
	            this.engine.rotateShape(this.player.Ship.objectId, this.player.Ship.yawSpeed);
	        this.player.Ship.applyForwardMotions();
	        this.engine.moveShape(this.player.Ship.objectId, this.player.Ship.position);
	    };
	    asteroidsGame.prototype.applyShotsMovement = function () {
	        for (var i = 0; i < this.shots.length; i += 1) {
	            this.shots[i].applyForwardMotion();
	            var isOutOfBounds = this.engine.moveShot(this.shots[i].objectId, this.shots[i].position);
	            if (isOutOfBounds) {
	                this.shots.splice(i, 1);
	                i -= 1;
	            }
	        }
	    };
	    asteroidsGame.prototype.createNewShot = function () {
	        var newShot = this.factory.createObject(this.commands.createBasicAttack);
	        var forwardMotion = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);
	        this.shots.push(newShot);
	        newShot.position = this.engine.addShapes(newShot.type, newShot.objectId, this.shotsLayerId);
	        newShot.position.x = this.player.Ship.position.x + forwardMotion.deltaX;
	        newShot.position.y = this.player.Ship.position.y + forwardMotion.deltaY;
	        this.engine.moveShape(newShot.objectId, newShot.position);
	        newShot.createForwardMotion(forwardMotion);
	    };
	    return asteroidsGame;
	}());
	exports.asteroidsGame = asteroidsGame;


/***/ },
/* 11 */
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