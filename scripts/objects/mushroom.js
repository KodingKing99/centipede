MyGame.objects.Mushroom = function(spec){
    'use strict';
    // let that = {};
    let lives = 16;
    let downRate = spec.size.y / 10;
    // let refractory = 50;
    function subLife() { 
        lives--;
    };
    function getRenderIndex() {
        if(lives > 12 ){
            return 0;
        }
        else if(lives > 8 && lives <= 12 ){
            return 1;
        }
        else if(lives > 4 && lives <= 8){
            return 2;
        }
        else if(lives <= 4){
            return 3;
        }
    }
    function moveMushieLeft() {
        spec.center.x -= downRate;
    }
    function moveMushieRight() {
        spec.center.x += downRate;
    }
    function cleanMushroom() {
        lives = 0;
    }
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() {return spec.rotation; },
        get lives() { return lives},
        get isDead() { return lives === 0},
        getRenderIndex: getRenderIndex,
        subLife: subLife,
        moveMushieLeft: moveMushieLeft,
        moveMushieRight: moveMushieRight,
        cleanMushroom: cleanMushroom,
    };
    // api.sphere = {radius: spec.size.y / 2};
    // return api;
}