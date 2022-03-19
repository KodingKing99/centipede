MyGame.screens['gamePlayScreen'] = (function (game, graphics, renderer, input, objects) {
    let cancelNextRequest = true;
    // MyGame.screens['gamePlayScreen'].cancelNextRequest= cancelNextRequest;
    let lastTimeStamp = performance.now();
    let newGame = false;
    ////////////////////////////////////////////////////
    // static renderer -- Takes a spec with the following specifications
    // spriteSheet: {
    //                  url: string to find where the image is
    //                  dimensions: {levelWidth: int, levelHeight: int} # of levels across and wide,
    //                  spritesPerLevel: {x: int, y: int}, # of sprites across and high
    //              }
    // spriteCount: int, # of sprites of the desired sprite
    // offsetSpriteCount: int, # of sprites before the desired sprite
    // level: what leve you're on
    // updateBool: condition on which to update
    // halfSize: bool, tells if you should divide by two for a sprite
    ////////////////////////////////////////////////////
    function initalizeGame() {
        objects.initialize(objects.board.width, objects.board.height, objects.board.numCells);
        game.initializeShip();
    }
    function initialize() {
        // do nothing for now

        document.getElementById('canvasBack').addEventListener(
            'click', () => {
                game.showScreen('mainMenu');
                cancelNextRequest = true;
            }
        );

        // MyGame.screens['gamePlayScreen'].cancelNextRequest = cancelNextRequest;
        // escape should stop updating
        window.addEventListener(
            'keydown', function stopFrame(e) {
                if (e.key === 'Escape') {
                    cancelNextRequest = true;
                    // console.log('stop')
                }
            }
        );
        // input.Keyboard.register()
    }
    // function updateStaticRenderers() {
    //     for (let i = 0; i < objects.objectsArray.length; i++) {
    //         let obj = objects.objectsArray[i];
    //         // if (obj.type === 'mushroom') {
    //         //     // console.log(obj.object.lives);
    //         //     mushieRenderer.update(obj.object.getRenderIndex());
    //         //     // console.log(obj.object.getRenderIndex());
    //         // }
    //         // else if (obj.type === 'ship') {
    //         //     shipRenderer.render(obj.object)
    //         // }
    //         // else if (obj.type === 'beam') {
    //         //     beamRenderer.render(obj.object);
    //         // }
    //     }
    // }

    function run() {
        // do nothing for now, will call game loop stuff at some point
        // game loop code
        lastTimeStamp = performance.now();
        // re-initialize when you start a new game
        // objects.objectsArray = [];
        if (newGame) {
            initalizeGame();
        }
        /// will initialize when a new game is pressed now
        newGame = true;
        cancelNextRequest = false;
        gameLoop(lastTimeStamp);
    }
    function update(elapsedTime) {
        // do nothing
        input.Keyboard.update(elapsedTime);
        objects.update(elapsedTime);
        renderer.renderers.updateRenderers(elapsedTime);
        // updateStaticRenderers();
    }

    function render(elapsedTime) {
        graphics.clear();
        renderer.renderers.renderObjects();
    }
    function processInput(elapsedTime) {
        // do nothing
    }
    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();
        if(objects.reInitializeFlag){
            game.subShipLife();
            if(game.shipLives === 0){
                // show game over screen
                cancelNextRequest = true;
            }
            initalizeGame();
            objects.reInitializeFlag = false;
        }
        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    return {
        initialize: initialize,
        run: run
    }
}(MyGame.game, MyGame.graphics, MyGame.render, MyGame.input, MyGame.objects));