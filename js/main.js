var fps = 1000;
var run = true;

var watch_start = false;
var count = 0;
var isAudioLoaded = false;

window.onload = function() {
    initAudioContext();
    initSound();
    console.log(audio_buffer);

    time_label = document.getElementById('time');
    time_label.style.color = 'blue';
    time_label.style.fontSize= '500%';

    sound_label = document.getElementById('sound_list');
    sound_label.innerHTML = generateSoundListText();

    (function(){
        if (watch_start) {
            count++;
            sound();
            time_label.innerHTML = countToTime(count);
        }

        if(run){setTimeout(arguments.callee, fps);}
    })();
};

function generateSoundListText() {
    var text = '';
    for (var i = 0; i < sound_time.length; i++) {
        text += countToTime(sound_time[i]) + ' ' + sound_count[i] + ' time(s)<br>';
    }
    return text;
}

function countToTime(count) {
    return zeroPadding(Math.floor(count / 60), 2) + ':' + zeroPadding((count % 60), 2);
}

function zeroPadding(num, figure) {
    return ('0' + num).slice(- figure);
}
