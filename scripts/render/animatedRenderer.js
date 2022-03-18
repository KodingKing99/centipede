// --------------------------------------------------------------
//
// Renders an animated object
//
// --------------------------------------------------------------
MyGame.render.AnimatedRenderer = function (spec, graphics) {
    'use strict';
    ////////////////////////////////////////////////////
    // Takes a spec with the following specifications
    // spriteSheet: {
    //                  url: string to find where the image is
    //                  dimensions: {levelWidth: int, levelHeight: int} # of levels across and wide,
    //                  spritesPerLevel: {x: int, y: int}, # of sprites across and high
    //              }
    // spriteCount: int, # of sprites of the desired sprite
    // offsetSpriteCount: {x: int, y: int}, # of sprites before the desired sprite above and across
    // level: what leve you're on
    // updateBool: condition on which to update
    // halfSize: bool, tells if you should divide by two for a sprite
    // extraOffset: {x: int, y: int} extra pixel offsets for minor calculation errors
    ////////////////////////////////////////////////////
    // console.log(spec)
    let animationTime = 0;
    let subImageIndex = 0;
    let subImageWidth = 0;
    let subImageHeight = 0;
    let offsetSpriteCount = spec.offsetSpriteCount;
    let image = new Image();
    let isReady = false;  // Can't render until the texture is loaded
    let flip = false;
    //
    // Load he texture to use for the particle system loading and ready for rendering
    image.onload = function () {
        isReady = true;
        let levelWidth = Math.floor(image.width / spec.spriteSheet.dimensions.levelWidth);
        console.log(`levelWidth is : ${levelWidth}`)
        console.log(`image width is : ${image.width}`)
        subImageWidth = Math.round(levelWidth / spec.spriteSheet.spritesPerLevel.x); // width of a sprite
        let levelHeight = Math.floor(image.height / spec.spriteSheet.dimensions.levelHeight)
        subImageHeight = Math.round(levelHeight / spec.spriteSheet.spritesPerLevel.y)
        console.log(`image is ready. it's width is: ${subImageWidth}, height is: ${subImageHeight}`)
    }
    image.src = spec.spriteSheet.url;

    //------------------------------------------------------------------
    //
    // Update the state of the animation
    // since this is the static renderer, the update logic will be based on a function
    // of the model's.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        animationTime += elapsedTime;
        //
        // Check to see if we should update the animation frame
        if (animationTime >= spec.spriteTime[subImageIndex]) {
            //
            // When switching sprites, keep the leftover time because
            // it needs to be accounted for the next sprite animation frame.
            animationTime -= spec.spriteTime[subImageIndex];
            if(spec.hasFlip){
                ///////
                // if the animation needs to flip, increment the offsetSpriteCount y
                // else, set it back to the original, increment subImageIndex
                ///////
                if(flip){
                    offsetSpriteCount.y += 1;
                }
                else{
                    offsetSpriteCount.y = spec.offsetSpriteCount.y;
                    subImageIndex += 1;
                }
            }
            else{ // Just increment subImageIndex
                subImageIndex += 1;
            }
            // console.log(subImageIndex);
            //
            // Wrap around from the last back to the first sprite as needed
            subImageIndex = subImageIndex % spec.spriteCount;
        }
    }

    //------------------------------------------------------------------
    //
    // Render the specific sub-texture animation frame
    //
    //------------------------------------------------------------------
    function render(model) {
        if (isReady) {
            // if (model.getRenderIndex) {
            //     subImageIndex = model.getRenderIndex();
            //     // console.log(subImageIndex)
            // }
            let sxOffset = Math.floor(subImageWidth * offsetSpriteCount.x) // how many pixels to go before your sprite
            let subSpriteWidth = subImageWidth;
            if (spec.halfSize) {
                subSpriteWidth = subImageWidth / 2 // divide the sprite by 2 if it's half size
                // subImageIndex = subImageIndex / 2
            }
            let sx = (subSpriteWidth * subImageIndex) + sxOffset // where to start clippin


            let sy = subImageHeight * offsetSpriteCount.y// # of pixels before your image
            if (spec.log) {
                console.log(`sx is: ${sx} sy is: ${sy}, offset is ${sxOffset}, sprite width is ${subSpriteWidth}, spriteHeight is ${subImageHeight}`)
                spec.log = false;
            }
            graphics.drawSubTexture(image, sx, sy, subSpriteWidth - spec.extraOffset.x, subImageHeight - spec.extraOffset.y, model.center, model.rotation, model.size);
        }
    }

    let api = {
        update: update,
        render: render
    };

    return api;
};
