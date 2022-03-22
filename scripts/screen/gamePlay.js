MyGame.screens['gamePlayScreen'] = (function (game, graphics, renderer, input, objects) {
    let cancelNextRequest = true;
    // MyGame.screens['gamePlayScreen'].cancelNextRequest= cancelNextRequest;
    let lastTimeStamp = performance.now();
    let newGame = false;
    let gameOver = false;
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
    let objectsArrayCopy;
    function showGameOver(){
        MyGame.screens['gameOverScreen'].run();
        document.getElementById('gameOverScreen').classList.add('active');
    }
    // function reInitializeLevel() {
    //     objects.objectsArray = objectsArrayCopy;
    //     game.initializeShip();
    // }
    function checkReInitalizeFlag(){
        if(objects.reInitializeFlag){
            game.subShipLife();
            if(game.shipLives === 0){
                // show game over screen
                cancelNextRequest = true;
                gameOver = true;
                showGameOver();
                // game.showScreen('gameOverScreen');

            }
            game.initalizeGame();
            objects.reInitializeFlag = false;
        }
    }
    function checkOutOfSegmentsFlag(){
        if(objects.outOfSegments){
            renderer.renderers.addLevel();
            game.initalizeGame();
        }
    }
    // let myText = objects.Text();

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
    function run() {
        // do nothing for now, will call game loop stuff at some point
        // game loop code
        lastTimeStamp = performance.now();
        // re-initialize when you start a new game
        // objects.objectsArray = [];
        if (newGame) {
            game.initalizeGame(true);
        }
        if (gameOver) {
            game.reInitalizeGame();
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
        checkReInitalizeFlag();
        checkOutOfSegmentsFlag();
        // updateStaticRenderers();
    }

    function render(elapsedTime) {
        graphics.clear();
        renderer.renderers.renderObjects();
        renderer.renderers.renderText(objects.scoreText)
    }
    function processInput(elapsedTime) {
        // do nothing
    }
    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        ///////
        // Fps locking so the centipede isn't crazy
        //////
        // if(elapsedTime < 200){
        //     setTimeout(200);
        // }
        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    return {
        initialize: initialize,
        run: run
    }
}(MyGame.game, MyGame.graphics, MyGame.render, MyGame.input, MyGame.objects));