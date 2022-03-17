MyGame.screens['gamePlayScreen'] = (function (game, graphics, renderer, input, objects) {
    let cancelNextRequest = true;
    // MyGame.screens['gamePlayScreen'].cancelNextRequest= cancelNextRequest;
    let lastTimeStamp = performance.now();
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
    let beamAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 1,
        offsetSpriteCount: { x: 0.5, y: 10 },
        level: level,
        updateBool: () => { return false },
        halfSize: true,
        extraOffset: { x: 0, y: 0 },
        log: true
    }
    let centipedeSegmentAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 4,
        offsetSpriteCount: {x: 0, y: 2},
        level: level,
        halfSize: true,
        extraOffset: {x: 0, y: 0.2},
        hasFlip : true,
        spriteTime: [100, 100, 100, 100]
    }
    let centipedeHeadAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 4,
        offsetSpriteCount: {x: 0, y: 0},
        level: level,
        halfSize: true,
        extraOffset: {x: 0, y: 0.2},
        hasFlip : true,
        spriteTime: [100, 100, 100, 100]
    }
    let mushieRenderer = renderer.staticAnimatedRenderer(mushAnimeSpec, graphics);
    let shipRenderer = renderer.staticAnimatedRenderer(shipAnimeSpec, graphics);
    let beamRenderer = renderer.staticAnimatedRenderer(beamAnimeSpec, graphics);
    let centipedeSegmentRenderer = renderer.AnimatedRenderer(centipedeSegmentAnimeSpec, graphics);
    let centipedeHeadRenderer = renderer.AnimatedRenderer(centipedeHeadAnimeSpec, graphics);
    let centipedeHeadRendererCopy = centipedeHeadRenderer;
    let centipedeHeadDownAnimeSpec = centipedeHeadAnimeSpec;
    centipedeHeadDownAnimeSpec.offsetSpriteCount = {x: 2, y: 0}
    let centipedeDownHeadRenderer = renderer.AnimatedRenderer(centipedeHeadDownAnimeSpec, graphics);
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
            'keydown', function stopFrame(e){
                if(e.key === 'Escape'){
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
    function getCentipedeHeadIndex(){
        for(let i = 0; i < objects.objectsArray.length; i++){
            let obj = objects.objectsArray[i];
            if(obj.type === 'centipedeSegment'){
                if(obj.object.isHead){
                    return i;
                }
            }
        }
        return -1;
    }
    function updateRenderers(elapsedTime) {
        let headIndex = getCentipedeHeadIndex();
        if(headIndex != -1){
            if(objects.objectsArray[headIndex].object.direction.down){
                centipedeHeadRenderer = centipedeDownHeadRenderer;                
            }
            else{
                centipedeHeadRenderer = centipedeHeadRendererCopy;
            }
        }
        centipedeHeadRenderer.update(elapsedTime);
        centipedeSegmentRenderer.update(elapsedTime);

    }
    function run() {
        // do nothing for now, will call game loop stuff at some point
        // game loop code
        lastTimeStamp = performance.now();
        // re-initialize when you start a new game
        // objects.objectsArray = [];
        // objects.initialize(objects.board.width, objects.board.height, objects.board.numCells);
        cancelNextRequest = false;
        gameLoop(lastTimeStamp);
    }
    function update(elapsedTime) {
        // do nothing
        input.Keyboard.update(elapsedTime);
        objects.update(elapsedTime);
        updateRenderers(elapsedTime);
        // updateStaticRenderers();
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
            else if (obj.type === 'beam') {
                beamRenderer.render(obj.object);
            }
            else if(obj.type === 'centipedeSegment'){
                if(obj.object.isHead){
                    centipedeHeadRenderer.render(obj.object);
                }
                else{
                    centipedeSegmentRenderer.render(obj.object);
                }
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