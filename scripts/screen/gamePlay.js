MyGame.screens['gamePlayScreen'] = (function (game, graphics, renderer, input) {
    let cancelNextRequest = true;
    let lastTimeStamp = performance.now();
    let mushSpec = {
        spriteSheet: 'assets/spritesheet.png'
    }
    // console.log(renderer)
    let mushieRenderer = renderer.MushroomRenderer(mushSpec, graphics);
    // console.log(graphics)
    function initialize() {
        // do nothing for now
        
        document.getElementById('canvasBack').addEventListener(
            'click', () => {
                game.showScreen('mainMenu');
                cancelNextRequest = true;
            }
        );
        // input.Keyboard.register()
    }
    function run() {
        // do nothing for now, will call game loop stuff at some point
        // game loop code
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        gameLoop(lastTimeStamp);
    }
    function update(elapsedTime) {
        // do nothing
    }
    function render(elapsedTime) {
        // do nothing
        // let rect = {

        // }
        graphics.clear();
        // graphics.drawRectangle(rect, "rgb(256, 256, 256)", "rgb(100, 0, 0)");
        // mushieRenderer.render()
        // graphics.clear();
    }
    function processInput(elapsedTime) {
        // do nothing
    }
    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update();
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    return {
        initialize: initialize,
        run: run
    }
}(MyGame.game, MyGame.graphics, MyGame.render, MyGame.input));