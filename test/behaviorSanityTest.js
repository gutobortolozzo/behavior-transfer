var subject = require("../index.js");
var assert = require("assert");
var should = require('should');

describe('Sanity behavior-transfer', function() {
	
  	it('correct subject import toJson', function() {
		subject.toJson({});
  	});
	
  	it('correct subject import fromJson', function() {
		subject.fromJson({});
  	});
});