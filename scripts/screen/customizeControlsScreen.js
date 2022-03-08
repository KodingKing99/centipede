MyGame.screens['customizeControlsScreen'] = (function (game, keyboard) {
    function initialize() {
        // do something
        document.getElementById('customizeControlsBackButt').addEventListener(
            'click', () => { game.showScreen('mainMenu'); }
        );
        // if(key)
        // document.getElementById('currentMoveUp').innerHTML += keyboard.currentControls['MoveUp']
    }
    function changeControl(domElement, control) {
        domElement.innerHTML = "";
        domElement.innerHTML += "Press Key to Change Control";
        window.addEventListener(
            'keydown',
            // Register key, do screen run(), remove the event listener
            function changeKey(e) {
                // console.log(e.key)
                keyboard.register(e.key, () => { console.log(`${e.key} has been pressed`) }, control);
                window.removeEventListener('keydown', changeKey)
                render();
            }
        );
    }
    function render() {
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
    }
    function run() {
        // console.log(keyboard)
        console.log(keyboard.currentControls)
        render();
        if (keyboard.currentControls['MoveUp']) {
            let myKey = document.getElementById('currentMoveUp');
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveUp') }
            )
        }
        if (keyboard.currentControls['MoveRight']) {
            let myKey = document.getElementById('currentMoveRight');
            // clear innerHTML
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveRight') }
            )
        }
        if (keyboard.currentControls['MoveLeft']) {
            let myKey = document.getElementById('currentMoveLeft');
            // clear innerHTML
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveLeft') }
            )
        }
        if (keyboard.currentControls['MoveDown']) {
            let myKey = document.getElementById('currentMoveDown');
            // clear innerHTML
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveDown') }
            )
        }
        if (keyboard.currentControls['Shoot']) {
            let myKey = document.getElementById('currentShoot');
            // clear innerHTML
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'Shoot') }
            )
        }
    }

    return {
        initialize: initialize,
        run: run
    };
}(MyGame.game, MyGame.input.Keyboard))