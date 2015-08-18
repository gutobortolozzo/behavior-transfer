var subject = require(process.cwd()+'/index.js');
var assert = require("assert");
var should = require('should');

describe('Array behavior with double quotes', function() {
	
	var Simple = function(){
		this.name = "aldruin"
	}
	
	Simple.prototype.hello = function(){
		return "hello";
	};
	
	Simple.prototype.world = function(){
		return 'world ' + this.name + " greets";
	};
	
  	it('simple object with double quoted string', function() {
		var simple = new Simple();
		var json = subject.toJson(simple);
		var object = subject.fromJson(json);
		object.hello().should.be.eql("hello");
  	});
	
  	it('simple object with mixed double and single quoted string', function() {
		var simple = new Simple();
		var json = subject.toJson(simple);
		var object = subject.fromJson(json);
		object.world().should.be.eql("world aldruin greets");
  	});
});