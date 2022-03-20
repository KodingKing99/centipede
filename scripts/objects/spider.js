MyGame.objects.Spider = function (spec) {
    'use strict';
    let isDead = false;
    let sendSpiderRight = true;
    let moveAmmount = 500;
    function setIsDead() {
        isDead = true;
    }
    function flipSendSpiderRight() {
        sendSpiderRight = !sendSpiderRight;
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
    function setVertDirection(dir) {
        // console.log(direction)
        if (moveAmmount < 0) {
            for (let mDir in vertDirection) {
                vertDirection[mDir] = false;
            }
            vertDirection[dir] = true;
            moveAmmount = 500;
        }
    }
    function setHorizontalDirection(dir) {
        // console.log(direction)
        for (let mDir in horDirection) {
            horDirection[mDir] = false;
        }
        horDirection[dir] = true;
    }

    function moveDirection(elapsedTime) {
        moveAmmount -= elapsedTime;
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
        get isDead() { return isDead },
        get sendSpiderRight() { return sendSpiderRight; },

        setIsDead: setIsDead,
        moveDirection: moveDirection,
        setVertDirection: setVertDirection,
        setHorizontalDirection: setHorizontalDirection,
        flipSendSpiderRight: flipSendSpiderRight
    };
}