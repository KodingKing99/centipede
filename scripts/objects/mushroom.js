MyGame.objects.Mushroom = function(spec){
    'use strict';
    let that = {};
    let lives = 4;
    // that.imageReady = false;
    // that.image = Image();
    // that.image.onload = function(){
    //     that.imageReady = true;
    // }
    // that.image.src = spec.imageSrc;
    that.getLives = function(){
        return lives;
    }
    that.subLife = function(){
        lives--;
    }
    that.isDead = function(){
        return lives === 0
    }
    // let rotation = 0;
    // that.updateRotation = function(howMuch){
    //     rotation += howMuch
    // }
    that.center = function(){
        return spec.center;
    }
    that.size = function(){
        return spec.size;
    }
    that.rotation = function(){
        return spec.rotation
    }
    return that;
}