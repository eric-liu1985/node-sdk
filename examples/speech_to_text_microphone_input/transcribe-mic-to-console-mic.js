'use strict';
require('dotenv').config({ silent: true }); // optional, handy for local development
var SpeechToText = require('watson-developer-cloud/speech-to-text/v1');
var mic = require('mic'); // the `mic` package also works - it's more flexible but requires a bit more setup
var wav = require('wav');

var speechToText = new SpeechToText({
  iam_apikey: 'BQempMSmncsRJBInEq_uOjs-i2q-q0HH7TQc2WiLv-9n',
  url: 'https://gateway-tok.watsonplatform.net/speech-to-text/api'
});

var micInstance = mic({
  rate: '48000',
  channels: '1',
  debug: false,
});
var micInputStream = micInstance.getAudioStream();

var wavStream = new wav.Writer({
  sampleRate: 44100,
  channels: 2,
});

var recognizeStream = speechToText.recognizeUsingWebSocket({
  content_type: 'audio/wav',
  interim_results: true,
});

micInputStream.pipe(wavStream);

wavStream.pipe(recognizeStream);

recognizeStream.pipe(process.stdout);

console.log('Recording, press any key to exit');
process.stdin.setRawMode(true);
// process.stdin.resume();

process.stdin.once('data', function() {
  console.log('Cleaning up and exiting...');
  process.stdin.setRawMode(false);
  micInstance.stop();
  recognizeStream.on('end', function() {
    process.exit();
  });
});

micInstance.start();
