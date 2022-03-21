MyGame.objects.Spider = function (spec) {
    'use strict';
    let isDead = false;
    let lives = 4;
    let sendSpiderRight = true;
    let vertMoveAmmount = 500;
    let horMoveAmmount = 500;
    // function setIsDead() {
    //     isDead = true;
    // }
    function subLife() {
        lives--;
    }
    function turnSpiderRight() {
        sendSpiderRight = true;
    }
    function turnSpiderLeft() {
        sendSpiderRight = false;
    }
    let vertDirection = {
        up: false,
        down: false,
    }
    let horDirection = {
        left: false,
        right: false,
        none: false,
    }
    /////////
    // this will immediately make the spider change direction
    /////////
    function setVertDirectionOverride(dir) {
        for (let mDir in vertDirection) {
            vertDirection[mDir] = false;
        }
        vertDirection[dir] = true;
    }
    /////////
    // This moves the spider a smooth ammount
    /////////
    function setVertDirection(dir) {
        // console.log(direction)
        if (vertMoveAmmount < 0) {
            for (let mDir in vertDirection) {
                vertDirection[mDir] = false;
            }
            vertDirection[dir] = true;
            vertMoveAmmount = 500;
        }
    }
    function setHorizontalDirection(dir) {
        // console.log(direction)
        if (horMoveAmmount < 0) {
            for (let mDir in horDirection) {
                horDirection[mDir] = false;
            }
            horDirection[dir] = true;
            horMoveAmmount = 500;
        }

    }

    function moveDirection(elapsedTime) {
        vertMoveAmmount -= elapsedTime;
        horMoveAmmount -= elapsedTime;
        if (vertDirection.up) {
            spec.center.y -= (elapsedTime * spec.moveRate);
        }
        if (vertDirection.down) {
            spec.center.y += (elapsedTime * spec.moveRate);
        }

        if (horDirection.left) {
            spec.center.x -= (elapsedTime * spec.moveRate);
        }
        if (horDirection.right) {
            spec.center.x += (elapsedTime * spec.moveRate);
        }
    }
    return {
        get center() { return spec.center; },
        get size() { return spec.size; },
        get rotation() { return spec.rotation; },
        get isDead() { return lives <= 0; },
        get sendSpiderRight() { return sendSpiderRight; },

        // setIsDead: setIsDead,
        moveDirection: moveDirection,
        subLife: subLife,
        setVertDirection: setVertDirection,
        setHorizontalDirection: setHorizontalDirection,
        turnSpiderLeft: turnSpiderLeft,
        turnSpiderRight: turnSpiderRight,
        // flipSendSpiderRight: flipSendSpiderRight,
        setVertDirectionOverride: setVertDirectionOverride
    };
}