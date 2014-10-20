var subject = require("../src/behavior-transfer.js");
var assert = require("assert");
var should = require('should');

describe('toJson behavior', function() {
	
	var Car = function Car(nome){                       
	
		this._name = nome;
	
		this.name = function(){
			return this.name;
		}
	
		this.toString = function(prefix){
			return prefix + this.name;
		}
	}
	
  	it('with car assumptions', function() {
		var car = new Car("Car");
		car.should.have.property("_name");
		car.should.have.property("name");
		car.should.have.property("toString");
  	});
	
  	it('convert object instance into json-string with function name', function() {
		subject.toJson(new Car("Car")).should.containEql("\"name\" : \"function (){ return this.name; }");
  	});
	
  	it('convert object instance into json-string with function toString', function() {
		subject.toJson(new Car("Car")).should.containEql("\"toString\" : \"function (prefix){ return prefix + this.name; }\"");
  	});
	
  	it('convert object instance into json-string with field _name', function() {
		subject.toJson(new Car("Car")).should.containEql("\"_name\" : \"Car\"");
  	});
	
});