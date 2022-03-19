MyGame.objects.Spider = function(spec){
    'use strict';
    let isDead = false;
    function setIsDead(){
        isDead = true;
    }
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() {return spec.rotation; },
        get lives() { return lives},
        get isDead() { return isDead},
        setIsDead: setIsDead,
    };
}