// ------------------------------------------------------------------
// 
// This is the game object.  Everything about the game is located in 
// this object.
//
// ------------------------------------------------------------------

MyGame.game = (function (screens, input, objects) {
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
        console.log(MyGame)
        //
        // Tell the screen to start actively running
        screens[id].run();
        //
        // Then, set the new screen to be active
        document.getElementById(id).classList.add('active');
    }
    function initializeShip(firstInit) {
        let ship = {};
        for (let i = 0; i < objects.objectsArray.length; i++) {
            if (objects.objectsArray[i].type === 'ship') {
                ship = objects.objectsArray[i];
            }
        }
        let spec = {
            moveLeft: ship.object.moveLeft,
            moveRight: ship.object.moveRight,
            moveUp: ship.object.moveUp,
            moveDown: ship.object.moveDown,
            shoot: ship.object.shoot,
            setIsPressedFalse: ship.object.setIsPressedFalse,
            setDirectionFalse: ship.object.setDirectionFalse,
        }
        if (firstInit) {
            input.initialize(spec);
        }
        else {

            input.reInitialize(spec);
        }
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

        // width, height, numcells
        // pass in the ship to intialize controls, TODO - get a better way to access this
        let width = document.getElementById('canvas').width;

        let height = document.getElementById('canvas').height;
        objects.initialize(width, height, 30);
        initializeShip(true);
        console.log(MyGame)
        window.addEventListener(
            'keydown', function goBack(e) {
                if (e.key === 'Escape') {
                    showScreen('mainMenu');
                    // screens['gamePlayScreen'].cancelNextRequest = true;
                }

            }
        );
    }

    return {
        initialize: initialize,
        showScreen: showScreen,
        initializeShip: initializeShip
    };
}(MyGame.screens, MyGame.input, MyGame.objects));
