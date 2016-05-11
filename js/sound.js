// var sound_time = [60, 360, 420, 435];
// var sound_count = [1, 1, 2, 3]
var sound_time = [2];
var sound_count = [2];

var SupportedAudioContext;
try {
    SupportedAudioContext = window.AudioContext || window.webkitAudioContext;
} catch(e) {
    throw new Error('Web Audio API is not supported.');
}
var context = new SupportedAudioContext();

var audio_buffer;
function initAudioContext() {
    var request = new XMLHttpRequest();
    request.open('GET', 'tablebell.mp3', true);
    request.responseType = 'arraybuffer';
    request.send();
    request.onload = function () {
        context.decodeAudioData(request.response, function (buf) {
            audio_buffer = buf;
        });
    };
    console.log('finished');
}

function initSound() {
    sound_time = [60, 360, 420, 435];
    sound_count = [1, 1, 2, 3];
    sound_time = [2];
    sound_count = [2];
    sound_label = document.getElementById('sound_list');
    sound_label.innerHTML = generateSoundListText();
}

function ring() {
    var source = context.createBufferSource();
    source.buffer = audio_buffer;
    source.connect(context.destination);
    source.start(0);
}
