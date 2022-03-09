MyGame.objects.Beam = function(spec){
    function moveUp(elapsedTime){
        spec.center.y -= elapsedTime * spec.moveRate;
    }
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() { return spec.rotation; },
        moveUp: moveUp
    }
};