MyGame.screens['highScoresScreen'] = (function(game){
    function initialize(){
        // back button
        document.getElementById('highScoresBackButt').addEventListener(
            'click', () => {game.showScreen('mainMenu')}
        );
    }
    function run(){
        // do something
    }
    return{
        initialize: initialize,
        run: run
    }
}(MyGame.game));