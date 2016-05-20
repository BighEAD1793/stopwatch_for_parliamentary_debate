"use strict";
const Bell = function(){
  this.init();
};

Bell.prototype = {
  init: function(){
    var self = this;
    self.isLoaded = false;
    self.interval = 0.3;
    self.audioContext = self.getAudioContext();
    self.getBuffer().then(function(buf){
      self.audioBuffer = buf;
    });
  },

  getAudioContext: function(){
    var SupportedAudioContext;
    try {
      SupportedAudioContext = window.AudioContext || window.webkitAudioContext;
    } catch(e) {
      throw new Error('Web Audio API is not supported.');
    }
    return new SupportedAudioContext();
  },

  getBuffer: function(){
    var self = this;
    var request = new XMLHttpRequest();
    request.open('GET', "/media/TableBellLarge.mp3", true);
    request.responseType = 'arraybuffer';
    request.send();
    var df = new $.Deferred();
    request.onload = function () {
      self.audioContext.decodeAudioData(request.response, function (buf) {
        df.resolve(buf);
      });
    };
    return df.promise();
  },

  ring: function(time, isSilent){
    var self = this;
    isSilent = isSilent === undefined ? false : true;
    var source = self.audioContext.createBufferSource();
    source.buffer = self.audioBuffer;
    if(isSilent){
      var gainNode = self.audioContext.createGain();
      gainNode.gain.value = isSilent ? 0 : 1;
      gainNode.connect(self.audioContext.destination);
      source.connect(gainNode);
    }else{
      source.connect(self.audioContext.destination);
    }
    source.start(self.audioContext.currentTime + time);
  },

  ringMultiple: function(num){
    var self = this;
    for(var i = 0; i < num; i++){
      self.ring(self.interval * i);
    }
  }
};

const Timer = function(){
  this.init();
};

Timer.prototype = {
  init: function(){
    var self = this;
    self.$startBtn = $("#start_button");
    self.$resetBtn = $("#reset_button");
    self.$bellBtn = $("#bell_button");
    self.$replyBtn = $("#reply_button");
    self.$timeDisp = $("#time");

    self.bell = new Bell();
    self.isStarted = false;
    self.framerate = 200;
    self.timePassed = 0;
    self.startTime = 0;
    self.ringPeriod = [
    {time: 10000, num: 2, done: false},
    {time: 20000, num: 1, done: false},
    {time: 42000, num: 2, done: false},
    {time: 43000, num: 3, done: false},
    ];

    self.bindEvent();
  },

  bindEvent: function(){
    var self = this;
    self.$startBtn.on("tap", function(){
      if(self.isStarted){
        self.timerStop();
      }else{
        self.timerStart();
      }
    });

    self.$resetBtn.on("tap", function(){
      self.resetTimer();
    });

    self.$bellBtn.on("tap", function(){
      self.bell.ringMultiple(1);
    });
  },

  timerStart: function(){
    var self = this;
    if(!self.bell.isLoaded){
      self.bell.ring(0, true);
      self.bell.isLoaded = true;
    }

    self.isStarted = true;
    self.startTime = new Date().getTime() - self.timePassed;
    var loop = function(){
      var nowTime = new Date().getTime();
      self.timePassed = nowTime - self.startTime;
      for(var i in self.ringPeriod){
        var r = self.ringPeriod[i];
        if(!r.done && r.time <= self.timePassed){
          self.bell.ringMultiple(r.num);
          r.done = true;
        }
      }
      self.refreshTimer();
      if(self.isStarted) setTimeout(loop, self.framerate);
    };
    loop();
  },

  timerStop: function(){
    var self = this;
    self.isStarted = false;
  },

  refreshTimer: function(){
    var self = this;
    var secPassed = Math.floor(self.timePassed / 1000);
    var str = ("0" + Math.floor(secPassed / 60)).slice(-2);
    str += ":";
    str += ("0" + secPassed % 60).slice(-2);
    str += "." + ("00" + self.timePassed % 1000).slice(-3);
    self.$timeDisp.text(str);
  },

  resetTimer: function(){
    var self = this;
    if (self.isStarted) return;
    self.timePassed = 0;
    self.refreshTimer();
  }
};

var t;
$(function(){
  t = new Timer();
});
