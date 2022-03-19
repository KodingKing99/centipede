MyGame.screens['highScoresScreen'] = (function(game, persistence){
    function initialize(){
        // back button
        document.getElementById('highScoresBackButt').addEventListener(
            'click', () => {game.showScreen('mainMenu')}
        );
    }
    function run(){
        // get persisted scores, update
        document.getElementById('topScore').innerHTML = ""; 
        document.getElementById('topScore').innerHTML += persistence.HighScores.highScores[1] + "pts"; 
        document.getElementById('secondScore').innerHTML = ""; 
        document.getElementById('secondScore').innerHTML += persistence.HighScores.highScores[2] + "pts"; 
        document.getElementById('thirdScore').innerHTML = ""; 
        document.getElementById('thirdScore').innerHTML += persistence.HighScores.highScores[3] + "pts"; 
    }
    return{
        initialize: initialize,
        run: run
    }
}(MyGame.game, MyGame.persistence));