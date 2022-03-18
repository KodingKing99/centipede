MyGame.objects.shipLife = function(spec){
    'use strict';
    // let timeLimit = 450;
    // let isDead = false;
    // // if explosion was there for a certain time, remove it
    // function update(elapsedTime){
    //     timeLimit -= elapsedTime;
    //     if(timeLimit <= 0){
    //         isDead = true;
    //     }
    // }
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() {return spec.rotation; },
        // get isDead() { return isDead; },
        // update: update,
        // get lives() { return lives},
        // get isDead() { return lives === 0},
        // getRenderIndex: getRenderIndex,
        // subLife: subLife
    };
    // api.sphere = {radius: spec.size.y / 2};
    // return api;
}