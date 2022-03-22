// Keyboard api for registering keys
MyGame.input.Keyboard = (function () {
    let that = {
        keys: {},
        handlers: {},
        currentControls: {},
        persistedControls: {},
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
        that.persistedControls[gameControl] = key;
        if (key === ' ') {
            that.currentControls[gameControl] = 'Space';
        }
        console.log(that.persistedControls)
        localStorage['MyGame.keyboard.controls'] = JSON.stringify(that.persistedControls);
    };
    that.unregister = function (key) {
        delete that.handlers[key]
    }
    that.registerKeyUp = function (handler, key) {
        window.addEventListener('keyup', (e) => {
            if (e.key === key || (e.key === ' ' && key === 'Space')) {
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
    let previousControls = localStorage['MyGame.keyboard.controls'];
    if(previousControls != null){
        previousControls = JSON.parse(previousControls);
        MyGame.input.Keyboard.register(
            previousControls['MoveUp'], spec.moveUp, 'MoveUp'
        );
        MyGame.input.Keyboard.register(
            previousControls['MoveRight'], spec.moveRight, 'MoveRight'
        );
        MyGame.input.Keyboard.register(
            previousControls['MoveDown'], spec.moveDown, 'MoveDown'
        );
        MyGame.input.Keyboard.register(
            previousControls['MoveLeft'], spec.moveLeft, 'MoveLeft'
        );
        MyGame.input.Keyboard.register(
            previousControls['Shoot'], spec.shoot, 'Shoot'
        ); 
    }
    else{
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
    }

};
MyGame.input.reInitialize = function (spec) {
    let previousControls = localStorage['MyGame.keyboard.controls'];
    // console.log(previousControls);

    if(previousControls != null){
        previousControls = JSON.parse(previousControls);
        MyGame.input.Keyboard.register(
            previousControls['MoveUp'], spec.moveUp, 'MoveUp'
        );
        MyGame.input.Keyboard.register(
            previousControls['MoveRight'], spec.moveRight, 'MoveRight'
        );
        MyGame.input.Keyboard.register(
            previousControls['MoveDown'], spec.moveDown, 'MoveDown'
        );
        MyGame.input.Keyboard.register(
            previousControls['MoveLeft'], spec.moveLeft, 'MoveLeft'
        );
        MyGame.input.Keyboard.register(
            previousControls['Shoot'], spec.shoot, 'Shoot'
        ); 
    }
    // MyGame.input.Keyboard.register(
    //     MyGame.input.Keyboard.currentControls['MoveUp'], spec.moveUp, 'MoveUp'
    // );
    // MyGame.input.Keyboard.register(
    //     MyGame.input.Keyboard.currentControls['MoveRight'], spec.moveRight, 'MoveRight'
    //     // 'ArrowRight', spec.moveRight, 'MoveRight'
    // );
    // MyGame.input.Keyboard.register(
    //     MyGame.input.Keyboard.currentControls['MoveDown'], spec.moveDown, 'MoveDown'
    //     // 'ArrowDown', spec.moveDown, 'MoveDown'
    // );
    // MyGame.input.Keyboard.register(
    //     MyGame.input.Keyboard.currentControls['MoveLeft'], spec.moveLeft, 'MoveLeft'
    //     // 'ArrowLeft', spec.moveLeft, 'MoveLeft'
    // );
    // if (MyGame.input.Keyboard.currentControls['Shoot'] === 'Space') {
    //     MyGame.input.Keyboard.register(
    //         ' ', spec.shoot, 'Shoot'
    //     );
    // }
    // else {
    //     MyGame.input.Keyboard.register(

    //         MyGame.input.Keyboard.currentControls['Shoot'], spec.shoot, 'Shoot'
    //         // ' ', spec.shoot, 'Shoot'
    //     );
    // }

}