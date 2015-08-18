var type = require(process.cwd()+'/src/typeUtils.js');
var assert = require("assert");
var should = require('should');

describe('typeUtils', function() {
	
  	it('convert object into error mapped', function() {
		type(new Error()).should.be.eql('error');
  	});
	
  	it('convert object into number mapped', function() {
		type(123).should.be.eql('number');
  	});
	
  	it('convert object into undefined mapped', function() {
		type().should.be.eql('undefined');
  	});
	
  	it('convert object into boolean mapped', function() {
		type(true).should.be.eql('boolean');
  	});
	
  	it('convert object into string mapped', function() {
		type('123').should.be.eql('string');
  	});
	
  	it('convert object into function mapped', function() {
		type(function(){}).should.be.eql('function');
  	});
	
  	it('convert object into function mapped', function() {
		type(function(){}).should.be.eql('function');
  	});
	
  	it('convert object into regexp mapped', function() {
		type(/s/g).should.be.eql('regexp');
  	});
	
  	it('convert object into date mapped', function() {
		type(new Date()).should.be.eql('date');
  	});
	
  	it('convert object into array mapped', function() {
		type([]).should.be.eql('array');
  	});
});