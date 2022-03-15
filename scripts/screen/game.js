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

        // objects.gameBoard.initialize();
        // width, height, numcells
        // pass in the ship to intialize controls, TODO - get a better way to access this
        objects.initialize(1000, 1000, 30);
        let ship = {};
        for(let i = 0; i < objects.objectsArray.length; i++){
            if(objects.objectsArray[i].type === 'ship'){
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
        input.initialize(spec);
        console.log(MyGame)
        window.addEventListener(
            'keydown', function goBack(e) {
                if (e.key === 'Escape') {
                    showScreen('mainMenu');
                    // cancelNextRequest = true;
                }

            }
        );
    }

    return {
        initialize: initialize,
        showScreen: showScreen
    };
}(MyGame.screens, MyGame.input, MyGame.objects));
