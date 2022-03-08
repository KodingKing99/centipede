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
    let spriteSheet = {
            url: 'assets/spritesheet2.png',
            dimensions: { levelWidth: 2, levelHeight: 7 },
            spritesPerLevel: { x: 7, y: 11 },
    }
    let level = 1;
    let mushAnimeSpec = {
        spriteSheet: spriteSheet, 
        spriteCount: 4,
        offsetSpriteCount: { x: 4, y: 0 },
        level: level,
        updateBool: () => { return false },
        halfSize: true,
        extraOffset: { x: 0, y: 0.5 }
    };
    let shipAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 1,
        offsetSpriteCount: { x: 0, y: 10 },
        level: level,
        updateBool: () => { return false },
        halfSize: true,
        extraOffset: { x: 0, y: 0 }
    };
    // console.log(renderer)
    let mushieRenderer = renderer.staticAnimatedRenderer(mushAnimeSpec, graphics);
    let shipRenderer = renderer.staticAnimatedRenderer(shipAnimeSpec, graphics);
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
        cancelNextRequest = false;
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
            else if (obj.type === 'ship') {
                shipRenderer.render(obj.object)
            }
        }
    }
    function render(elapsedTime) {
        graphics.clear();
        renderObjects();
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