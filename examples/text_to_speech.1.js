var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var Speaker = require('speaker');
var wav = require('wav');


var textToSpeech = new TextToSpeechV1({
    iam_apikey: 'zu1Pj8wHVbclu-qGne4TucyZSv7HYzpQ96JP7lRtyfMt',
    url: 'https://gateway-tok.watsonplatform.net/text-to-speech/api'
});

var synthesizeParams = {
  text: 'Hello world',
  accept: 'audio/wav',
  voice: 'en-US_AllisonVoice'
};
var reader = new wav.Reader();

// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function(format) {
  // the WAVE header is stripped from the output of the reader
  reader.pipe(new Speaker(format));
});

//console.log((textToSpeech.synthesize(synthesizeParams)));
//console.log((textToSpeech.synthesizeUsingWebSocket(synthesizeParams)));
//console.log((textToSpeech.synthesizeUsingWebSocket(synthesizeParams) instanceof Object));

var recognizeStream = textToSpeech.synthesizeUsingWebSocket(synthesizeParams);

recognizeStream.on('data',function (data) {
  console.log('---return---'+data);

  console.log('---stop audio receive---');
  //recognizeStream.pause();//暂停读取和发射data事件

  if(data.includes('automation test')) {

    //Now we can run a script and invoke a callback when complete, e.g.
    util.runScript('/Users/ericliu/Documents/StellaAuto/test_PARTS_US.js', function (err) {
        if (err) throw err;
        console.log('finished running some-script.js');
    });


  } else {
    console.log("--I dont know what to do---");
    
    console.log("---please say: automation test , so that I can start----")
  }

});


recognizeStream.on('error',function (data) {
  console.log('---return---'+data);

  console.log('---stop audio receive---');
  //recognizeStream.pause();//暂停读取和发射data事件

   

});