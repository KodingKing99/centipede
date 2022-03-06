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
            'keypress',
            // Register key, do screen run(), remove the event listener
            function changeKey(e) {
                keyboard.register(e.key, () => { console.log(`${e.key} has been pressed`) }, control);
                run();
                window.removeEventListener('keypress', changeKey)
            }
        );
    }
    function run() {
        // console.log(keyboard)
        if (keyboard.currentControls['MoveUp']) {
            let myKey = document.getElementById('currentMoveUp');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveUp']
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveUp')}
            )
        }
        if (keyboard.currentControls['MoveRight']) {
            let myKey = document.getElementById('currentMoveRight');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveRight']
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveRight') }
            )
        }
        if (keyboard.currentControls['MoveLeft']) {
            let myKey = document.getElementById('currentMoveLeft');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveLeft']
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveLeft') }
            )
        }
        if (keyboard.currentControls['MoveDown']) {
            let myKey = document.getElementById('currentMoveDown');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['MoveDown']
            myKey.addEventListener(
                'click', () => { changeControl(myKey, 'MoveDown') }
            )
        }
        if (keyboard.currentControls['Shoot']) {
            let myKey = document.getElementById('currentShoot');
            // clear innerHTML
            myKey.innerHTML = "";
            myKey.innerHTML += keyboard.currentControls['Shoot']
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