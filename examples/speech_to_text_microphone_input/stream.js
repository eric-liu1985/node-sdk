var stream = require('stream');
var util = require('util')
 
function ReadStream(){
	stream.Readable.call(this)
}
 
util.inherits(ReadStream, stream.Readable)
 
ReadStream.prototype._read = function() {
	this.push('我爱\n')
	this.push(null)
}
 
function　WritStream(){
	stream.Writable.call(this)
}
 
util.inherits(WritStream, stream.Writable)
 
WritStream.prototype._write = function(chunk, encode, cb){
    console.log("write-----");
	console.log(chunk.toString())
	cb()
}
 
function TransformStream(){
	stream.Transform.call(this)
}
 
util.inherits(TransformStream, stream.Transform)
 
TransformStream.prototype._transform = function(chunk, encode, cb){
	//this.push(chunk)
	cb()
}
 
TransformStream.prototype._flush = function(cb){
	this.push('中国')
	cb()
}

var ut = require('./Util.js')

//ut.sleep(10000);
var rs = new ReadStream()
var ws = new WritStream()
var ts = new TransformStream()

setTimeout(function() {
    rs.pipe(ts).pipe(ws)
  }, 5000);

 

