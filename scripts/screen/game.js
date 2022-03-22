// ------------------------------------------------------------------
// 
// This is the game object.  Everything about the game is located in 
// this object.
//
// ------------------------------------------------------------------

MyGame.game = (function (screens, input, objects, renderer, audio) {
    'use strict';

    //------------------------------------------------------------------
    //
    // This function is used to change to a new active screen.
    //
    //------------------------------------------------------------------
    function showScreen(id) {
        //
        // Remove the active state from all screens.  There should only be one...
        let active = document.getElementsByClassName('active');
        for (let screen = 0; screen < active.length; screen++) {
            active[screen].classList.remove('active');
        }
        // console.log(MyGame)
        //
        // Tell the screen to start actively running
        console.log(screens[id]);
        screens[id].run();
        //
        // Then, set the new screen to be active
        document.getElementById(id).classList.add('active');
    }
    let shipLives = 0;
    function initializeShip(firstInit, resetLives) {
        let ship = {};
        for (let i = 0; i < objects.objectsArray.length; i++) {
            if (objects.objectsArray[i].type === 'ship') {
                ship = objects.objectsArray[i];
            }
        }
        // let shoot = function(){
        //     ship.object.shoot();
        //     audio.playSound('ship_laser');
        // }
        let spec = {
            moveLeft: ship.object.moveLeft,
            moveRight: ship.object.moveRight,
            moveUp: ship.object.moveUp,
            moveDown: ship.object.moveDown,
            shoot: ship.object.shoot,
            setIsPressedFalse: ship.object.setIsPressedFalse,
            setDirectionFalse: ship.object.setDirectionFalse,
        }
        let shipLifeSpec = {
            size: ship.object.size,
        };

        if (firstInit) {
            // new game, set the ship lives to be the ship's total lives
            shipLives = ship.object.lives;
            input.initialize(spec);
            objects.initializeShipLives(shipLifeSpec, shipLives)
        }
        else {
            // not a new game, ship lives is whatever it was before, may need to change
            if (resetLives) {
                input.reInitialize(spec);
                shipLives = 3;
                // 
                objects.initializeShipLives(shipLifeSpec, shipLives);
            }
            else {
                input.reInitialize(spec);
                objects.initializeShipLives(shipLifeSpec, shipLives);
            }
        }
    }
    function initalizeGame(newGame) {
        objects.initialize(objects.board.width, objects.board.height, objects.board.numCells);
        if(newGame){
            objects.resetScore();
            renderer.renderers.resetLevel();
            initializeShip(false, true)
        }
        else{
            initializeShip();
        }
        // objectsArrayCopy = objects.objectsArray;
        renderer.renderers.initializeRenderers();
    }
    function reInitalizeGame() {
        objects.initialize(objects.board.width, objects.board.height, objects.board.numCells);
        objects.resetScore();
        renderer.renderers.resetLevel();
        initializeShip(false, true);
        renderer.renderers.initializeRenderers();
    }
    //------------------------------------------------------------------
    //
    // This function performs the one-time game initialization.
    //
    //------------------------------------------------------------------
    function initialize() {
        let screen = null;
        //
        // Go through each of the screens and tell them to initialize
        for (screen in screens) {
            if (screens.hasOwnProperty(screen)) {
                screens[screen].initialize();
            }
        }

        //
        // Make the main-menu screen the active one
        showScreen('mainMenu');
        audio.initialize();
        // width, height, numcells
        // pass in the ship to intialize controls, TODO - get a better way to access this
        let width = document.getElementById('canvas').width;

        let height = document.getElementById('canvas').height;
        objects.initialize(width, height, 30);
        initializeShip(true);
        // console.log(MyGame)

        window.addEventListener(
            'keydown', function goBack(e) {
                if (e.key === 'Escape') {
                    showScreen('mainMenu');
                    // screens['gamePlayScreen'].cancelNextRequest = true;
                }

            }
        );
        // for logging
        // input.Keyboard.register('p', () => {console.log(objects.objectsArray)}, 'log');
        // audio.playSound('background_music')
    }

    return {
        initialize: initialize,
        showScreen: showScreen,
        initializeShip: initializeShip,
        initalizeGame: initalizeGame,
        reInitalizeGame: reInitalizeGame,
        get shipLives() { return shipLives; },
        subShipLife() { shipLives-- },
    };
}(MyGame.screens, MyGame.input, MyGame.objects, MyGame.render, MyGame.audio));
