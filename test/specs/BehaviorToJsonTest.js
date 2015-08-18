var subject = require(process.cwd()+'/index.js');
var Car = require(process.cwd()+"/test/objects/Car.js");
var assert = require("assert");
var should = require('should');

describe('toJson behavior', function() {	
	
  	it('with car assumptions', function() {
		var car = new Car("Car");
		car.should.have.property("_name");
		car.should.have.property("name");
		car.should.have.property("toString");
  	});
	
  	it('convert object instance into json-string with function name', function() {
		subject.toJson(new Car("Car")).should.containEql('"name" : "function (){ return this._name; }"');
  	});
	
  	it('convert object instance into json-string with function toString', function() {
		subject.toJson(new Car("Car")).should.containEql('"toString" : "function (prefix){ return prefix + this._name; }"');
  	});
	
  	it('convert object instance into json-string with field _name', function() {
		subject.toJson(new Car("Car")).should.containEql("\"_name\" : \"Car\"");
  	});
	
});