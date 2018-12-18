var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var Speaker = require('speaker');
var wav = require('wav');
var Readable = require('stream').Readable;

var textToSpeech = new TextToSpeechV1({
    iam_apikey: 'zu1Pj8wHVbclu-qGne4TucyZSv7HYzpQ96JP7lRtyfMt',
    url: 'https://gateway-tok.watsonplatform.net/text-to-speech/api'
});

var synthesizeParams = {
  text: 'Hello stella team, you are the best!',
  accept: 'audio/wav',
  voice: 'en-US_AllisonVoice'
};
var reader = new wav.Reader();

// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function(format) {
  // the WAVE header is stripped from the output of the reader
  reader.pipe(new Speaker(format));
});

textToSpeech
  .synthesize(synthesizeParams, function(err, audio) {
    if (err) {
      console.log(err);
      return;
    }
    textToSpeech.repairWavHeader(audio);
    //fs.writeFileSync('audio.wav', audio);
    //fs.createReadStream('audio.wav').pipe(reader);

    var s = new Readable;
    s.push(audio);
    s.push(null);
    s.pipe(reader);

    //audio.pipe(reader);
    console.log(typeof(audio));
    console.log('audio.wav written with a corrected wav header');
});