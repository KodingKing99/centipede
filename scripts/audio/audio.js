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
            console.log()
            sound.addEventListener('canplay', function() {
                console.log(`${source} is ready to play`);
            });
            // sound.addEventListener('play', function() {
            //     // let elementButton = document.getElementById(idButton);
            //     // elementButton.innerHTML = label + ' - Pause!'
            //     // console.log(`${source} started playing`);
            // });
            // sound.addEventListener('pause', function() {
            //     console.log(`${source} paused`);
            // });
            // sound.addEventListener('canplaythrough', function() {
            //     console.log(`${source} can play through`);
            // });
            // sound.addEventListener('progress', function() {
            //     console.log(`${source} progress in loading`);
            // });
            // sound.addEventListener('timeupdate', function() {
            //     console.log(`${source} time update: ${this.currentTime}`);
            // });
            sound.src = source;
            return sound;
        }
    
        function loadAudio() {
            // Reference: https://freesound.org/people/bubaproducer/sounds/151022/
            sounds['ship_laser'] = loadSound('assets/ship_laser.wav', 'Ship-Laser');
            // Reference: https://freesound.org//data/previews/109/109662_945474-lq.mp3
            // MyGame.sounds['audio/sound-2'] = loadSound('audio/sound-2.mp3', 'Sound 2', 'id-play2');
            // // Reference: https://www.bensound.com/royalty-free-music/track/extreme-action
            // MyGame.sounds['audio/bensound-extremeaction'] = loadSound('audio/bensound-extremeaction.mp3', 'Music', 'id-play3');
        }
        loadAudio();
    }
    function playSound(whichSound) {
        console.log('playing sound')
        sounds[whichSound].play();
    }
    return {
        initialize: initialize,
        playSound: playSound
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
