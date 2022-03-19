MyGame.screens['gameOverScreen'] = (function (game) {
    function initialize() {
        // do something
        document.getElementById('playAgain').addEventListener(
            'click',
            function reStart() {
                // game.initalizeGame();
                document.getElementById('gameOverScreen').classList.remove('active');
                game.showScreen('gamePlayScreen');
            });
        document.getElementById('gameOverMainMenuButt').addEventListener(
            'click',
            function showMainMenu() {
                document.getElementById('gameOverScreen').classList.remove('active');
                game.showScreen('mainMenu')
            }
        )
    }
    function run() {
        // do something
    }
    return {
        initialize: initialize,
        run: run
    }
}(MyGame.game));