MyGame.objects.Flea = function(spec){
    'use strict';
    // let that = {};
    let lives = 4;
    // let downRate = spec.size.y / 10;
    // let refractory = 50;
    function subLife() { 
        lives--;
    };
    // let direction 
    function moveDown(elapsedTime){
        spec.center.y += (elapsedTime * spec.moveRate)
    }
    function setAsDead() {
        lives = 0;
    }
    function shouldSpawnMushroom() {
        return Math.random() < 0.05;
    }
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() {return spec.rotation; },
        get lives() { return lives},
        get isDead() { return lives === 0},
        moveDown: moveDown,
        subLife: subLife,
        setAsDead: setAsDead,
        shouldSpawnMushroom: shouldSpawnMushroom,
    };
    // api.sphere = {radius: spec.size.y / 2};
    // return api;
}