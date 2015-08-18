var subject = require(process.cwd()+'/index.js');
var Simple = require(process.cwd()+'/test/objects/Simple.js');
var assert = require("assert");
var should = require('should');

describe('Array behavior with double quotes', function() {
	
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