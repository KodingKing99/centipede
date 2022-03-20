MyGame.render.renderers = (function (objects, graphics, renderer) {
    /////////// 
    // Initialize the sprite specs
    ///////////
    let spriteSheet = {
        url: 'assets/spritesheet2.png',
        dimensions: { levelWidth: 2, levelHeight: 7 },
        spritesPerLevel: { x: 7, y: 11 },
    }
    let level = 0;
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
        offsetSpriteCount: { x: 0, y: 2 },
        level: level,
        halfSize: true,
        extraOffset: { x: 0, y: 0.05 },
        hasFlip: true,
        spriteTime: [100, 100, 100, 100]
    }
    let centipedeHeadAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 4,
        offsetSpriteCount: { x: 0, y: 0 },
        level: level,
        halfSize: true,
        extraOffset: { x: 0, y: 0.05 },
        hasFlip: true,
        spriteTime: [100, 100, 100, 100]
    }
    let centipedeHeadDownAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 4,
        offsetSpriteCount: { x: 2, y: 0 },
        level: level,
        halfSize: true,
        extraOffset: { x: 0, y: 0.05 },
        hasFlip: true,
        spriteTime: [100, 100, 100, 100]
    }
    let explosionAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 4,
        offsetSpriteCount: { x: 0, y: 9 },
        level: level,
        // halfSize: /,
        extraOffset: { x: 0, y: 0 },
        hasFlip: true,
        spriteTime: [100, 100, 100, 100]
    }
    let spiderAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 4,
        offsetSpriteCount: { x: 0, y: 4 },
        level: level,
        // halfSize: /,
        extraOffset: { x: 0, y: 0.1 },
        hasFlip: true,
        spriteTime: [100, 100, 100, 100]
    }
    let fleaAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 2,
        offsetSpriteCount: { x: 4, y: 4 },
        level: level,
        // halfSize: true,
        extraOffset: { x: 0, y: 0 },
        hasFlip: true,
        spriteTime: [200, 200, 200, 200]
    }
    ///////////
    // Initialize the Renderers
    ///////////
    let mushieRenderer = renderer.staticAnimatedRenderer(mushAnimeSpec, graphics);
    let shipRenderer = renderer.staticAnimatedRenderer(shipAnimeSpec, graphics);
    let beamRenderer = renderer.staticAnimatedRenderer(beamAnimeSpec, graphics);
    let centipedeSegmentRenderer = renderer.AnimatedRenderer(centipedeSegmentAnimeSpec, graphics);
    let centipedeHeadRenderer = renderer.AnimatedRenderer(centipedeHeadAnimeSpec, graphics);
    let explosionRenderer = renderer.AnimatedRenderer(explosionAnimeSpec, graphics);
    // let centipedeHeadRendererCopy = centipedeHeadRenderer;
    // let centipedeHeadDownAnimeSpec = centipedeHeadAnimeSpec;
    // centipedeHeadDownAnimeSpec.offsetSpriteCount = { x: 2, y: 0 }
    let centipedeDownHeadRenderer = renderer.AnimatedRenderer(centipedeHeadDownAnimeSpec, graphics);
    let spiderRenderer = renderer.AnimatedRenderer(spiderAnimeSpec, graphics);
    let fleaRenderer = renderer.AnimatedRenderer(fleaAnimeSpec, graphics)

    function initializeRenderers() {
        mushAnimeSpec.level = level;
        shipAnimeSpec.level = level;
        beamAnimeSpec.level = level;
        centipedeSegmentAnimeSpec.level = level;
        centipedeHeadAnimeSpec.level = level;
        explosionAnimeSpec.level = level;
        spiderAnimeSpec.level = level;
        centipedeHeadDownAnimeSpec.level = level;
        fleaAnimeSpec.level = level;
        mushieRenderer = renderer.staticAnimatedRenderer(mushAnimeSpec, graphics);
        shipRenderer = renderer.staticAnimatedRenderer(shipAnimeSpec, graphics);
        beamRenderer = renderer.staticAnimatedRenderer(beamAnimeSpec, graphics);
        centipedeSegmentRenderer = renderer.AnimatedRenderer(centipedeSegmentAnimeSpec, graphics);
        centipedeHeadRenderer = renderer.AnimatedRenderer(centipedeHeadAnimeSpec, graphics);
        explosionRenderer = renderer.AnimatedRenderer(explosionAnimeSpec, graphics);
        // centipedeHeadRendererCopy = centipedeHeadRenderer;
        centipedeDownHeadRenderer = renderer.AnimatedRenderer(centipedeHeadDownAnimeSpec, graphics);
        spiderRenderer = renderer.AnimatedRenderer(spiderAnimeSpec, graphics);
        fleaRenderer = renderer.AnimatedRenderer(fleaAnimeSpec, graphics)
    }

    // function getCentipedeHeadIndex() {
    //     let centHeads = [];
    //     for (let i = 0; i < objects.objectsArray.length; i++) {
    //         let obj = objects.objectsArray[i];
    //         if (obj.type === 'centipedeSegment') {
    //             if (obj.object.isHead) {
    //                 centHeads.push(i);
    //             }
    //         }
    //     }
    //     return centHeads;
    // }
    function updateRenderers(elapsedTime) {
        // let headsArray = getCentipedeHeadIndex();
        // if (headsArray.length > 0) {
        //     for (let i = 0; i < headsArray.length; i++) {
        //         let headIndex = headsArray[i];
        //         if (objects.objectsArray[headIndex].object.direction.down) {
        //             centipedeHeadRenderer = centipedeDownHeadRenderer;
        //         }
        //         else {
        //             centipedeHeadRenderer = centipedeHeadRendererCopy;
        //         }
        //     }

        // }
        centipedeHeadRenderer.update(elapsedTime);
        centipedeDownHeadRenderer.update(elapsedTime);
        centipedeSegmentRenderer.update(elapsedTime);
        explosionRenderer.update(elapsedTime);
        spiderRenderer.update(elapsedTime);
        fleaRenderer.update(elapsedTime);

    }
    function renderObjects() {
        // console.log(objects.objectsArray)
        for (let i = 0; i < objects.objectsArray.length; i++) {
            let obj = objects.objectsArray[i];
            if (obj.type === 'mushroom') {
                mushieRenderer.render(obj.object);
            }
            else if (obj.type === 'ship' || obj.type === 'shipLife') {
                shipRenderer.render(obj.object)
            }
            else if (obj.type === 'beam') {
                beamRenderer.render(obj.object);
            }
            else if (obj.type === 'centipedeSegment') {
                if (obj.object.isHead) {
                    if(obj.object.direction.down){
                        centipedeDownHeadRenderer.render(obj.object)
                    }
                    else{
                        centipedeHeadRenderer.render(obj.object);
                    }
                }
                else {
                    centipedeSegmentRenderer.render(obj.object);
                }
            }
            else if (obj.type === 'explosion') {
                explosionRenderer.render(obj.object);
            }
            else if (obj.type === 'spider') {
                spiderRenderer.render(obj.object);
            }
            else if (obj.type === 'flea') {
                fleaRenderer.render(obj.object)
            }
        }
    }
    function renderText(textToRender) {
        renderer.TextRenderer.render(textToRender);
    }
    function addLevel() {
        level++;
    }
    function resetLevel() {
        level = 0;
    }
    return {
        updateRenderers: updateRenderers,
        renderObjects: renderObjects,
        initializeRenderers: initializeRenderers,
        renderText: renderText,
        addLevel: addLevel,
        resetLevel: resetLevel
    }
}(MyGame.objects, MyGame.graphics, MyGame.render))