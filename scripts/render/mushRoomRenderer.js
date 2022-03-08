// --------------------------------------------------------------
//
// Renders an animated model based on a spritesheet.
//
// --------------------------------------------------------------
MyGame.render.MushroomRenderer = function(spec, graphics) {
    'use strict';
    ////////////////////////////////////////////////////
    // Takes a spec with the following specifications
    // spriteSheet: string, url to png
    // spriteCount: int, # of sprites 
    ////////////////////////////////////////////////////
    console.log("Hello")
    console.log(spec)
    let animationTime = 0;
    let subImageIndex = 0;
    let subMushroomHeight = 0;
    let subMushroomWidth = 0;
    let offset = 4;
    let image = new Image();
    let isReady = false;  // Can't render until the texture is loaded
    //
    // Load he texture to use for the particle system loading and ready for rendering
    image.onload = function() {
        isReady = true;
        let levelWidth = image.width / 4;
        console.log(`levelWidth is : ${levelWidth}`)
        subMushroomWidth = Math.floor((levelWidth / 10) / 2) // width of a mushroom
        subMushroomHeight = Math.floor((image.height / 4) / 13); // height of each image
        console.log(`image is ready. it's width is: ${subMushroomWidth}, height is: ${subMushroomHeight}`)
    }
    image.src = spec.spriteSheet;

    //------------------------------------------------------------------
    //
    // Update the state of the animation
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        // animationTime += elapsedTime;
        // //
        // // Check to see if we should update the animation frame
        // if (animationTime >= spec.spriteTime[subImageIndex]) {
        //     //
        //     // When switching sprites, keep the leftover time because
        //     // it needs to be accounted for the next sprite animation frame.
        //     animationTime -= spec.spriteTime[subImageIndex];
        //     subImageIndex += 1;
        //     //
        //     // Wrap around from the last back to the first sprite as needed
        //     subImageIndex = subImageIndex % spec.spriteCount;
        // }
    }

    //------------------------------------------------------------------
    //
    // Render the specific sub-texture animation frame
    //
    //------------------------------------------------------------------
    function render(model) {
        if (isReady) {
            let offset = (subMushroomWidth * 8) // there are 4 images before the mushroom that is twice it's width
            let sx = subMushroomWidth * subImageIndex + offset
            let sy = subMushroomHeight * 8 // there are 8 images above the mushroom
            console.log(`sx is: ${sx} sy is: ${sy}`)
            // graphics.drawSubTexture(image, subImageIndex, subTextureWidth, model.center, model.rotation, model.size);
        }
    }

    let api = {
        update: update,
        render: render
    };

    return api;
};
