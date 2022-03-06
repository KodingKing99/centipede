MyGame.screens['mainMenu'] = (function(game) {
    'use strict';
    
    function initialize() {
        // do nothing for now
        // Setup each of menu events for the screens
        document.getElementById('new-game').addEventListener(
            'click',
            function() {game.showScreen('gamePlayScreen'); });
        document.getElementById('customize-controls').addEventListener(
            'click', function(){game.showScreen('customizeControlsScreen')}
        )
        document.getElementById('high-scores').addEventListener(
            'click', () => {game.showScreen('highScoresScreen')}
        )
        document.getElementById('credits').addEventListener(
            'click', () => {game.showScreen('creditsScreen')}
        )
        // document.getElementById('id-high-scores').addEventListener(
        //     'click',
        //     function() { game.showScreen('high-scores'); });
        
        // document.getElementById('id-help').addEventListener(
        //     'click',
        //     function() { game.showScreen('help'); });
        
        // document.getElementById('id-about').addEventListener(
        //     'click',
        //     function() { game.showScreen('about'); });
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
