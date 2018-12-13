'use strict';
var fs = require('fs');
require('dotenv').config({ silent: true }); // optional, handy for local development
var SpeechToText = require('watson-developer-cloud/speech-to-text/v1');
var mic = require('mic');
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

var wavStream = new wav.FileWriter('./audio.wav', {
  sampleRate: 48000,
  channels: 1,
});

var recognizeStream = speechToText.recognizeUsingWebSocket({
  content_type: 'audio/wav',
});

micInputStream.pipe(wavStream);

wavStream.pipe(recognizeStream);

recognizeStream.pipe(fs.createWriteStream('./transcription.txt'));


micInputStream.on('error', function(err) {
  cosole.log("Error in Input Stream: " + err);
});


// note:
// If you just kill the process with control-c, the .wav file will have an incorrect header, and any in-flight
// transcription will be lost.
// This allows for a graceful termination of the recording, and the process will automatically exit after everything is
// complete.
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
