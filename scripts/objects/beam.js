MyGame.objects.Beam = function(spec){
    let hasCollided = false;
    function moveUp(elapsedTime){
        spec.center.y -= elapsedTime * spec.moveRate;
    }
    function setHasCollided(){
        hasCollided = true;
    }
    return {
        get center(){ return spec.center; },
        get size() { return spec.size; },
        get rotation() { return spec.rotation; },
        get hasCollided() { return hasCollided; },
        moveUp: moveUp,
        setHasCollided: setHasCollided,
    }
};