$(function() {
    $("#start_button").bind("tap", function() {

        // load audio before time bell
        if (!audio_loaded) {
            ringSilently();
            audio_loaded = true;
        }

        if (watch_start) {
            this.innerHTML = 'Start';
            watch_start = false;

            time_label = document.getElementById('time');
            time_label.style.color = "blue"; 
        } else {
            this.innerHTML = 'Stop';
            watch_start = true;

            time_label = document.getElementById('time');
            time_label.style.color = "white"; 
        }
    });

    $("#reset_button").on('tap', function() {
        if (!watch_start) {
            count = 0;
            time_label = document.getElementById('time');
            time_label.innerHTML = countToTime(0);
            initSound();
        }
    });

    $("#bell_button").on('tap', function() {
        ring();
    });

    $("#reply_button").on('tap', function() {
        switchRepConst();
    });
});
