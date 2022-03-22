//------------------------------------------------------------------
//
// This function performs the one-time game initialization.
//
//------------------------------------------------------------------
MyGame.audio = (function(){
    'use strict'
    let sounds = {};
    function initialize() {
        console.log('initializing...')
        function loadSound(source, label, idButton) {
            let sound = new Audio();
            sound.src = source;
            return sound;
        }
    
        function loadAudio() {
            // Reference: https://freesound.org/people/bubaproducer/sounds/151022/
            sounds['ship_laser'] = loadSound('assets/ship_laser.wav', 'Ship-Laser');
            // Reference: https://freesound.org/people/SoundCollectah/sounds/109741/
            sounds['explosion'] = loadSound('assets/explosion.wav', 'Explosion');
            // Reference: https://freesound.org/people/CrimsonImaging/sounds/493743/
            sounds['oof'] = loadSound('assets/oof.wav', 'Oof');
            // Reference: https://freesound.org/people/thehorriblejoke/sounds/351499/
            sounds['bonus'] = loadSound('assets/bonus.mp3', 'Bonus');
            // Reference: https://freesound.org/people/bmusic92/sounds/232927/
            sounds['level_start'] = loadSound('assets/mac_start_up.wav', 'level_start');
            // Reference: https://freesound.org/people/mrickey13/sounds/515620/
            sounds['splat'] = loadSound('assets/tick.wav');
            // Reference: https://freesound.org/people/mrickey13/sounds/515620/
            sounds['splat2'] = loadSound('assets/splat2.wav');
            // Reference: https://ia601303.us.archive.org/18/items/LavenderTownOriginalJapaneseVersionFromPokemonRedAndGreen/Lavender_Town_%28Original_Japanese_Version_from_Pokemon_Red_and_Green%29.mp3
            sounds['background_music'] = loadSound('assets/lavender_town.mp3', 'background');
        }
        loadAudio();
    }
    function playSound(whichSound) {
        // console.log('playing sound')

        if(sounds[whichSound].currentTime > 0){
            sounds[whichSound].currentTime = 0;
        }
        else{
            sounds[whichSound].play();
        }
    }
    let started = false;
    function playBackground(){
        if(!started){
            if(sounds['background_music'].canPlay){
                sounds['background_music'].play();
                started = true;
            }
        }
    }
    // audio.playSound('backgroundMusic');
    return {
        initialize: initialize,
        playSound: playSound,
        playBackground: playBackground
    }
}());
// MyGame.audio.initialize() = function(){
//     'use strict';

//     function loadSound(source, label, idButton) {
//         let sound = new Audio();
//         sound.addEventListener('canplay', function() {
//             console.log(`${source} is ready to play`);
//         });
//         // sound.addEventListener('play', function() {
//         //     // let elementButton = document.getElementById(idButton);
//         //     // elementButton.innerHTML = label + ' - Pause!'
//         //     // console.log(`${source} started playing`);
//         // });
//         // sound.addEventListener('pause', function() {
//         //     console.log(`${source} paused`);
//         // });
//         // sound.addEventListener('canplaythrough', function() {
//         //     console.log(`${source} can play through`);
//         // });
//         // sound.addEventListener('progress', function() {
//         //     console.log(`${source} progress in loading`);
//         // });
//         // sound.addEventListener('timeupdate', function() {
//         //     console.log(`${source} time update: ${this.currentTime}`);
//         // });
//         // sound.src = source;
//         return sound;
//     }

//     function loadAudio() {
//         MyGame.sounds = {}
//         // Reference: https://freesound.org/people/bubaproducer/sounds/151022/
//         MyGame.sounds['audio/ship_laser'] = loadSound('assets/ship_laser.wav', 'Ship-Laser');
//         // Reference: https://freesound.org//data/previews/109/109662_945474-lq.mp3
//         // MyGame.sounds['audio/sound-2'] = loadSound('audio/sound-2.mp3', 'Sound 2', 'id-play2');
//         // // Reference: https://www.bensound.com/royalty-free-music/track/extreme-action
//         // MyGame.sounds['audio/bensound-extremeaction'] = loadSound('audio/bensound-extremeaction.mp3', 'Music', 'id-play3');
//     }

// //     console.log('initializing...');

// //     loadAudio();
// }

// //------------------------------------------------------------------
// //
// // Pauses the specified audio
// //
// //------------------------------------------------------------------
// function pauseSound(whichSound, label, idButton, idStatus) {
//     MyGame.sounds[whichSound].pause();

//     let elementStatus = document.getElementById(idStatus);
//     elementStatus.innerHTML = 'paused';

//     let elementButton = document.getElementById(idButton);
//     elementButton.innerHTML = `${label} - Continue!`;
//     elementButton.onclick = function() { playSound(whichSound, label, idButton, idStatus); };
// }

// //------------------------------------------------------------------
// //
// // Plays the specified audio
// //
// //------------------------------------------------------------------
// function playSound(whichSound, label, idButton, idStatus) {
//     // let elementStatus = document.getElementById(idStatus);
//     // let elementButton = document.getElementById(idButton);

//     // elementStatus.innerHTML = 'playing';
//     // MyGame.sounds[whichSound].addEventListener('ended', function() {
//     //     elementStatus.innerHTML = 'ended';
//     //     elementButton.innerHTML = `${label} - Play!`;
//     //     elementButton.onclick = function() { playSound(whichSound, label, idButton, idStatus); };
//     // });

//     // elementButton.onclick = function() { pauseSound(whichSound, label, idButton, idStatus); };
//     MyGame.sounds[whichSound].play();
// }

// //------------------------------------------------------------------
// //
// // Allow the music volume to be changed
// //
// //------------------------------------------------------------------
// function changeVolume(value) {
//     MyGame.sounds['audio/bensound-extremeaction'].volume = value / 100;
// }
