MyGame.screens['gamePlayScreen'] = (function(game){
    function initialize() {
        // do nothing for now
        document.getElementById('canvasBack').addEventListener(
            'click', () => {game.showScreen('mainMenu');}
        )
    }
    function run(){
        // do nothing for now, will call game loop stuff at some point
    }
    return {
        initialize : initialize,
        run : run
    }
}(MyGame.game));