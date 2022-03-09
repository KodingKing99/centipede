// Keyboard api for registering keys
MyGame.input.Keyboard = (function () {
    let that = {
        keys: {},
        handlers: {},
        currentControls: {},
    };

    function keyPress(e) {
        that.keys[e.key] = e.timeStamp;
    }

    function keyRelease(e) {
        delete that.keys[e.key];
    }

    that.update = function (elapsedTime) {
        for (let key in that.keys) {
            if (that.keys.hasOwnProperty(key)) {
                if (that.handlers[key]) {
                    that.handlers[key](elapsedTime);
                }
            }
        }
    };

    that.register = function (key, handler, gameControl) {
        // if(that.handlers[key]){
        //     delete that.handlers[key]
        // }
        that.handlers[key] = handler;
        that.currentControls[gameControl] = key;
        if(key === ' '){
            that.currentControls[gameControl] = 'Space';
        }
    };
    that.unregister = function (key) {
        delete that.handlers[key]
        // delete that.currentControls
    }
    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    return that;
}());
// input initialize function
// takes the ship's functions as a specification
MyGame.input.initialize = function (spec) {
    // TODO: get registered keys from persisted local storage
    // console.log(spec)
    MyGame.input.Keyboard.register(
        'ArrowUp', spec.moveUp, 'MoveUp'
    );
    MyGame.input.Keyboard.register(
        'ArrowRight', spec.moveRight, 'MoveRight'
    );
    MyGame.input.Keyboard.register(
        'ArrowDown', spec.moveDown, 'MoveDown'
    );
    MyGame.input.Keyboard.register(
        'ArrowLeft', spec.moveLeft, 'MoveLeft'
    );
    MyGame.input.Keyboard.register(
        ' ', spec.shoot, 'Shoot'
    );
};