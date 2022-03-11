// Keyboard api for registering keys
MyGame.input.Keyboard = (function () {
    let that = {
        keys: {},
        handlers: {},
        currentControls: {},
    };

    function keyPress(e) {
        e.preventDefault();
        that.keys[e.key] = e.timeStamp;
    }

    function keyRelease(e) {
        delete that.keys[e.key];
    }

    that.update = function (elapsedTime) {
        for (let key in that.keys) {
            if (that.keys.hasOwnProperty(key)) {
                // if()
                if (that.handlers[key]) {
                    that.handlers[key](elapsedTime);
                }
            }
        }
    };

    that.register = function (key, handler, gameControl) {
        that.handlers[key] = handler;
        that.currentControls[gameControl] = key;
        if(key === ' '){
            that.currentControls[gameControl] = 'Space';
        }
    };
    that.unregister = function (key) {
        delete that.handlers[key]
    }
    that.registerKeyUp = function(handler, key){
        window.addEventListener('keyup', (e) => {
            if(e.key === key || (e.key === ' ' && key === 'Space')){
                // if the key is what you want, perform it's action
                handler();
            }
        })
    }
    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    return that;
}());
// MyGame.input.
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
    // for the ship only shooting once. Not the best notation but at least it's in the keyboard 
    // window.addEventListener('keyup', (e) => {
    //     if()
    // });
    MyGame.input.Keyboard.registerKeyUp(spec.setIsPressedFalse, MyGame.input.Keyboard.currentControls['Shoot']);
};