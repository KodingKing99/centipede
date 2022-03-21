MyGame.objects.Scorpion = function(spec){
    'use strict';
    // let that = {};
    let lives = 4;
    // let downRate = spec.size.y / 10;
    // let refractory = 50;
    function subLife() { 
        lives--;
    };
    // let direction 
    function moveRight(elapsedTime){
        spec.center.x += (elapsedTime * spec.moveRate)
    }
    function setAsDead() {
        lives = 0;
    }
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() {return spec.rotation; },
        get lives() { return lives},
        get isDead() { return lives <= 0},
        moveRight: moveRight,
        subLife: subLife,
        setAsDead: setAsDead,
    };
}