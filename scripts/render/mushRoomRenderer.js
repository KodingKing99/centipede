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
    let subImageWidth = 0;
    let subMushroomHeight = 0;
    let subMushroomWidth = 0;
    let offset = 4;
    let image = new Image();
    let isReady = false;  // Can't render until the texture is loaded
    //
    // Load he texture to use for the particle system loading and ready for rendering
    image.onload = function() {
        isReady = true;
        let levelWidth = Math.floor(image.width / 4);
        console.log(`levelWidth is : ${levelWidth}`)
        console.log(`image width is : ${image.width}`)
        subImageWidth = Math.round(levelWidth / 10); // width of a sprite
        subMushroomWidth = Math.floor(subImageWidth / 2)// width of a mushroom
        subMushroomHeight = 9 // height of each image
        console.log(`image is ready. it's width is: ${subMushroomWidth}, height is: ${subMushroomHeight} sprite width is: ${subImageWidth}`)
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
            let offset = Math.floor(subImageWidth * 4) // there are 4 images before the mushroom that is twice it's width
            let sx = (subMushroomWidth * subImageIndex) + offset
            let sy = subMushroomHeight * 8 // there are 8 images above the mushroom
            console.log(`sx is: ${sx} sy is: ${sy}, offset is ${offset}, subMushroom width is ${subMushroomWidth}`)
            // Math.
            // console.log(model.get)
            console.log(model.size())
            graphics.drawSubTexture(image, sx, sy, subMushroomWidth, subMushroomHeight - 1, model.center(), model.rotation(), model.size());
        }
    }

    let api = {
        update: update,
        render: render
    };

    return api;
};
