var init_sound_time = [60, 360, 420, 435];
var init_sound_count = [1, 1, 2, 3];
// var init_sound_time = [2];
// var init_sound_count = [2];
var sound_time;
var sound_count;

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
}

function initSound() {
    sound_time = init_sound_time.slice();
    sound_count = init_sound_count.slice();
    sound_label = document.getElementById('sound_list');
    sound_label.innerHTML = generateSoundListText();
}

function ringSilently() {
    var source = context.createBufferSource();
    var gainNode = context.createGain();
    gainNode.gain.value = 0.0;
    gainNode.connect(context.destination);
    source.buffer = audio_buffer;
    source.connect(gainNode);
    source.start(0);
}

function ring() {
    var source = context.createBufferSource();
    source.buffer = audio_buffer;
    source.connect(context.destination);
    source.start(0);
}

function sound() {
    if (count >= sound_time[0]) {
        sound_time.shift();
        c = sound_count[0];
        sound_count.shift();
        ringLoop(c, 0);

        sound_label = document.getElementById('sound_list');
        sound_label.innerHTML = generateSoundListText();
    }
}

function ringLoop(count, i) {
    if (i < count) {
        ring();
        setTimeout(function() {ringLoop(count, ++i)}, 300);
    }
}

function switchRepConst() {
}
