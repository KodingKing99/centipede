MyGame.screens['gamePlayScreen'] = (function (game, graphics, renderer, input, objects) {
    let cancelNextRequest = true;
    let lastTimeStamp = performance.now();
        ////////////////////////////////////////////////////
    // Takes a spec with the following specifications
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
    let mushSpec = {
        spriteSheet: {
            url: 'assets/spritesheet2.png',
            dimensions: {levelWidth: 2, levelHeight: 7},
            spritesPerLevel: {x: 7, y: 11},
        },
        spriteCount: 4,
        offsetSpriteCount: {x: 4, y: 0},
        level: 1,
        updateBool: () => {return false},
        halfSize: true,
    }
    let shipSpec = mushSpec;
    // console.log(renderer)
    let mushieRenderer = renderer.staticAnimatedRenderer(mushSpec, graphics);
    // let ShipRenderer = renderer.ShipRenderer(shipSpec, graphics);
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
        cancelNextRequest = true;
        gameLoop(lastTimeStamp);
    }
    function update(elapsedTime) {
        // do nothing
        input.Keyboard.update(elapsedTime);
    }
    function renderObjects() {
        // console.log(objects.objectsArray)
        for (let i = 0; i < objects.objectsArray.length; i++) {
            let obj = objects.objectsArray[i];
            if (obj.type === 'mushroom') {
                mushieRenderer.render(obj.object);
            }
            // else if (obj.type === 'ship') {
            //     ShipRenderer.render(obj.object)
            // }
        }
    }
    function render(elapsedTime) {
        // do nothing
        // let rect = {

        // }
        graphics.clear();
        renderObjects();
        // for(let i = 0; i < objects.objectsArray.length; i++){
        //     let obj = objectsArray[i];
        //     if(obj.type === 'mushroom'){
        //         mushieRenderer.render(obj.object)
        //     }
        // }
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