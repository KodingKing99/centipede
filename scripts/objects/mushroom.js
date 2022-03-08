MyGame.objects.Mushroom = function(spec){
    'use strict';
    // let that = {};
    let lives = 4;
    function subLife() { lives--;};
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() {return spec.rotation; },
        get lives() { return lives},
        get isDead() { return lives === 0},
        subLife: subLife
    };
}