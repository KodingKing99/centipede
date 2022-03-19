MyGame.screens['gameOverScreen'] = (function (game, objects, persistence) {
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
        document.getElementById('gameScore').innerHTML = "Score: ";
        document.getElementById('gameScore').innerHTML += objects.scoreText.text;
        persistence.HighScores.add(parseInt(objects.scoreText.text))
    }
    return {
        initialize: initialize,
        run: run
    }
}(MyGame.game, MyGame.objects, MyGame.persistence));