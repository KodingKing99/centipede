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
    let hasShot = false;
    // let hasPresse
    let refractory = 0;
    let isPressed = false;
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
    function shoot(elapsedTime) {
        if(!isPressed){
            hasShot = true;
            isPressed = true;
        }

    }
    function setHasShotFalse() {
        hasShot = false;
    }
    // function canShoot(elapsedTime){
    //     // refractory -= elapsedTime;
    //     // if(refractory < 0){
    //     //     refractory = 10;
    //     //     return true;
    //     // }
        
    //     return true;
    // }
    function setIsPressedFalse(){
        isPressed = false;
    }
    // window.addEventListener('keyup', () => {isPressed = false;});
    // functio
    let api = {
        get center() {return spec.center;},
        get size() {return spec.size;},
        get rotation() {return spec.rotation},
        get lives() {return lives;},
        get hasShot() {return hasShot},
        setHasShotFalse: setHasShotFalse,
        subLife: subLife,
        isDead: isDead,
        shoot: shoot,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveDown: moveDown,
        moveUp: moveUp,
        setIsPressedFalse: setIsPressedFalse,
        // canShoot: canShoot,

    }
    return api;
}