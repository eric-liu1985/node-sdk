'use strict';

const fs = require('fs');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var Speaker = require('speaker');
var wav = require('wav');
var Readable = require('stream').Readable;


const textToSpeech = new TextToSpeechV1({
  iam_apikey: 'zu1Pj8wHVbclu-qGne4TucyZSv7HYzpQ96JP7lRtyfMt',
  url: 'https://gateway-tok.watsonplatform.net/text-to-speech/api'
});

// specify the text to synthesize
const params = {
  text: 'Hello, world.',
  accept: 'audio/ogg;codecs=opus',
  //accept: 'audio/wav',
  //voice: 'en-US_AllisonVoice'
};

var reader = new wav.Reader();

// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function(format) {
  // the WAVE header is stripped from the output of the reader
  reader.pipe(new Speaker(format));
});

// synthesizeUsingWebSocket returns a Readable Stream that can be piped or listened to
const synthesizeStream = textToSpeech.synthesizeUsingWebSocket(params);

// the output of the stream can be piped to any writable stream, like an audio file
//synthesizeStream.pipe(fs.createWriteStream('./speech.ogg'));
synthesizeStream.pipe(reader);

// if the stream is not being piped anywhere and is only being listened to, the stream needs
//   to be explicitly set to flowing mode:

// synthesizeStream.resume();

// the 'message' event is emitted when data is processed and returned from the service
// the 'message' parameter is the entire response frame of information returned from the
//   service. it is mainly useful for debugging
// the 'data' parameter is the data payload contained within the message. it is typically
//   binary audio data, but if the text includes SSML marks or the request includes the
//   'timings' parameter, 'data' could be a string containing marks or timing information
synthesizeStream.on('message', (message, data) => {
  console.log(data);
});

// the 'error' event is emitted if there is an error during the connection
// 'err' is the Error object describing the error
synthesizeStream.on('error', err => {
  console.log(err);
});

// the 'close' event is emitted once, when the connection is terminated by the service
// the 'code' parameter is the status code. 1000 is the code for a normal termination
// the 'reason' parameter provides a string description of how the connection closed
synthesizeStream.on('close', (code, reason) => {
  console.log(code);
});
