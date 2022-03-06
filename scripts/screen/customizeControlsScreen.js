MyGame.screens['customizeControlsScreen'] = (function(game){
    function initialize(){
        // do something
        document.getElementById('customizeControlsBackButt').addEventListener(
            'click', () => {game.showScreen('mainMenu');}
        );
    }
    function run(){
        // do something else   
    }
    return{
        initialize: initialize,
        run: run
    };
}(MyGame.game))