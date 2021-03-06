'use strict';

// This example takes uncompressed wav audio from the Text to Speech service and plays it through the computer's speakers
// Should work on windows/mac/linux, but linux may require some extra setup first: https://www.npmjs.com/package/speaker

var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var wav = require('wav');
var Speaker = require('speaker');
require('dotenv').load({ silent: true }); // imports environment properties from a .env file if present

var textToSpeech = new TextToSpeechV1({
  iam_apikey: 'zu1Pj8wHVbclu-qGne4TucyZSv7HYzpQ96JP7lRtyfMt',
  url: 'https://gateway-tok.watsonplatform.net/text-to-speech/api'
});

var reader = new wav.Reader();

// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function(format) {
  // the WAVE header is stripped from the output of the reader
  reader.pipe(new Speaker(format));
});

textToSpeech.synthesize({ text: 'hello from IBM Watson', accept: 'audio/wav' , voice: 'en-US_AllisonVoice'})
//.on('error', function(error) {
//  console.log(error);
//})
//.pipe(reader);
;
