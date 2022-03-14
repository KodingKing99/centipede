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
MyGame.objects.Ship = function (spec) {
    let lives = 3;
    let hasShot = false;
    // let hasPresse
    let refractory = 0;
    let isPressed = false;
    // says what direction the ship is moving, for object detection
    let direction = {
        up: false,
        left: false,
        down: false,
        right: false
    }
    let shouldMove = {
        up: true,
        left: true,
        down: true,
        right: true 
    }
    function subLife() {
        lives--;
    }
    function isDead() {
        return lives === 0;
    }
    function moveLeft(elapsedTime) {
        if (shouldMove.left) {
            spec.center.x -= (spec.moveRate * elapsedTime);
            direction.left = true;
        }

    }

    function moveRight(elapsedTime) {
        if (shouldMove.right) {
            spec.center.x += (spec.moveRate * elapsedTime);
            direction.right = true;
        }

    }

    function moveUp(elapsedTime) {
        if (shouldMove.up) {
            spec.center.y -= (spec.moveRate * elapsedTime);
            direction.up = true;
        }

    }

    function moveDown(elapsedTime) {
        if (shouldMove.down) {
            spec.center.y += (spec.moveRate * elapsedTime);
            direction.down = true;
        }
    }
    // returns what the ships center would be if the ship moved
    function predMoves(elapsedTime){
        let center = spec.center;
        let moveRate = spec.moveRate;
        let moves = {
            moveUp : {x: center.x, y: (center.y - moveRate)},
            moveDown : {x: center.x, y: (center.y + moveRate)},
            moveLeft : {x: spec.center.x - (spec.moveRate), y: spec.center.y},
            moveRight : {x: spec.center.x + (spec.moveRate), y: spec.center.y},
        }
        return moves;
    }
    function setDirectionFalse(dir) {
        direction[dir] = false;
    }
    function setShouldMove(dir, bool) {
        shouldMove[dir] = bool;
    }
    function setAllDirShouldMove(){
        for(let mKey in shouldMove){
            shouldMove[mKey] = true;
        }
        // console.log(sh)
    }
    function shoot(elapsedTime) {
        if (!isPressed) {
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
    function setIsPressedFalse() {
        isPressed = false;
    }
    // window.addEventListener('keyup', () => {isPressed = false;});
    // functio
    let api = {
        get center() { return spec.center; },
        get size() { return spec.size; },
        get rotation() { return spec.rotation },
        get lives() { return lives; },
        get hasShot() { return hasShot },
        get direction() { return direction },
        setHasShotFalse: setHasShotFalse,
        subLife: subLife,
        isDead: isDead,
        shoot: shoot,
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveDown: moveDown,
        moveUp: moveUp,
        setIsPressedFalse: setIsPressedFalse,
        setDirectionFalse: setDirectionFalse,
        setShouldMove: setShouldMove,
        setAllDirShouldMove: setAllDirShouldMove,
        predMoves: predMoves,
        // canShoot: canShoot,

    }
    return api;
}