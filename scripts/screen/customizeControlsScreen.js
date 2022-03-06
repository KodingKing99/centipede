MyGame.screens['customizeControlsScreen'] = (function (game, keyboard) {
    function initialize() {
        // do something
        document.getElementById('customizeControlsBackButt').addEventListener(
            'click', () => { game.showScreen('mainMenu'); }
        );
        // if(key)
        // document.getElementById('currentMoveUp').innerHTML += keyboard.currentControls['MoveUp']
    }
    function run() {
        console.log(keyboard)
        if (keyboard.currentControls['MoveUp']) {
            let myKey = document.getElementById('currentMoveUp');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveUp']
        }
        if (keyboard.currentControls['MoveRight']) {
            let myKey = document.getElementById('currentMoveRight');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveRight']
        }
        if (keyboard.currentControls['MoveLeft']) {
            let myKey = document.getElementById('currentMoveLeft');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveLeft']
        }
        if (keyboard.currentControls['MoveDown']) {
            let myKey = document.getElementById('currentMoveDown');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveDown']
        }
        if (keyboard.currentControls['Shoot']) {
            let myKey = document.getElementById('currentShoot');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['Shoot']
        }
        // do something else   
    }

    return {
        initialize: initialize,
        run: run
    };
}(MyGame.game, MyGame.input.Keyboard))