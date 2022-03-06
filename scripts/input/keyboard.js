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
        that.handlers[key] = handler;
        that.currentControls[gameControl] = key;
        if(key === ' '){
            that.currentControls[gameControl] = 'Space';
        }
    };

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    return that;
}());
// input initialize function
MyGame.input.initialize = function () {
    // TODO: get registered keys from persisted local storage
    MyGame.input.Keyboard.register(
        'ArrowUp', function () { console.log('ArrowUp has Been Clicked') }, 'MoveUp'
    );
    MyGame.input.Keyboard.register(
        'ArrowRight', function () { console.log('ArrowRight has Been Clicked') }, 'MoveRight'
    );
    MyGame.input.Keyboard.register(
        'ArrowDown', function () { console.log('ArrowDown has Been Clicked') }, 'MoveDown'
    );
    MyGame.input.Keyboard.register(
        'ArrowLeft', function () { console.log('ArrowLeft has Been Clicked') }, 'MoveLeft'
    );
    MyGame.input.Keyboard.register(
        ' ', function () { console.log('Space has Been Clicked') }, 'Shoot'
    );
};