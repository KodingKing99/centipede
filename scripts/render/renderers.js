MyGame.render.renderers = (function (objects, graphics, renderer) {
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
    let explosionAnimeSpec = {
        spriteSheet: spriteSheet,
        spriteCount: 4,
        offsetSpriteCount: { x: 0, y: 9 },
        level: level,
        // halfSize: /,
        extraOffset: { x: 0, y: 0 },
        // hasFlip: true,
        spriteTime: [100, 100, 100, 100]
    }
    let mushieRenderer = renderer.staticAnimatedRenderer(mushAnimeSpec, graphics);
    let shipRenderer = renderer.staticAnimatedRenderer(shipAnimeSpec, graphics);
    let beamRenderer = renderer.staticAnimatedRenderer(beamAnimeSpec, graphics);
    let centipedeSegmentRenderer = renderer.AnimatedRenderer(centipedeSegmentAnimeSpec, graphics);
    let centipedeHeadRenderer = renderer.AnimatedRenderer(centipedeHeadAnimeSpec, graphics);
    let explosionRenderer = renderer.AnimatedRenderer(explosionAnimeSpec, graphics);
    let centipedeHeadRendererCopy = centipedeHeadRenderer;
    let centipedeHeadDownAnimeSpec = centipedeHeadAnimeSpec;
    centipedeHeadDownAnimeSpec.offsetSpriteCount = { x: 2, y: 0 }
    let centipedeDownHeadRenderer = renderer.AnimatedRenderer(centipedeHeadDownAnimeSpec, graphics);
    function getCentipedeHeadIndex() {
        for (let i = 0; i < objects.objectsArray.length; i++) {
            let obj = objects.objectsArray[i];
            if (obj.type === 'centipedeSegment') {
                if (obj.object.isHead) {
                    return i;
                }
            }
        }
        return -1;
    }
    function updateRenderers(elapsedTime) {
        let headIndex = getCentipedeHeadIndex();
        if (headIndex != -1) {
            if (objects.objectsArray[headIndex].object.direction.down) {
                centipedeHeadRenderer = centipedeDownHeadRenderer;
            }
            else {
                centipedeHeadRenderer = centipedeHeadRendererCopy;
            }
        }
        centipedeHeadRenderer.update(elapsedTime);
        centipedeSegmentRenderer.update(elapsedTime);
        explosionRenderer.update(elapsedTime);

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
                    centipedeHeadRenderer.render(obj.object);
                }
                else {
                    centipedeSegmentRenderer.render(obj.object);
                }
            }
            else if (obj.type === 'explosion'){
                explosionRenderer.render(obj.object);
            }
        }
    }
    return {
        updateRenderers: updateRenderers,
        renderObjects: renderObjects
    }
}(MyGame.objects, MyGame.graphics, MyGame.render))