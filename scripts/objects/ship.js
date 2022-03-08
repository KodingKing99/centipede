///////////////////////
// Ship game object
// takes a spec with following attributes
// {
//      center: {x: int, y: int},
//      size: {x: int, y: int}
//      rotation: int,
//      moveRate: float
// }
///////////////////////
MyGame.objects.Ship = function(spec){
    let lives = 3;
    function subLife(){
        lives--;
    }
    function isDead(){
        return lives === 0;
    }
    function moveLeft(elapsedTime) {
        spec.center.x -= (spec.moveRate * elapsedTime);
    }

    function moveRight(elapsedTime) {
        spec.center.x += (spec.moveRate * elapsedTime);
    }

    function moveUp(elapsedTime) {
        spec.center.y -= (spec.moveRate * elapsedTime);
    }

    function moveDown(elapsedTime) {
        spec.center.y += (spec.moveRate * elapsedTime);
    }
    // functio
    let api = {
        get center() {return spec.center;},
        get size() {return spec.size;},
        get rotation() {return spec.rotation},
        get lives() {return lives;},
        subLife: subLife,
        isDead: isDead,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveDown: moveDown,
        moveUp: moveUp,

    }
    return api;
}