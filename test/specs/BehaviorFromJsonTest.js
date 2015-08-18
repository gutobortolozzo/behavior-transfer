var subject = require(process.cwd()+'/index.js');
var Car = require(process.cwd()+"/test/objects/Car.js");
var assert = require("assert");
var should = require('should');

describe('fromJson behavior', function() {
	
  	it('with car assumptions', function() {
		var car = new Car("Car");
		car.should.have.property("_name");
		car.should.have.property("name");
		car.should.have.property("toString");
		car.should.have.property("doubleName");
		car.should.have.property("getName");
  	});
	
  	it('restore object instance with field _name', function() {
		var car = subject.fromJson(subject.toJson(new Car("Car")));
		car._name.should.be.eql("Car");
  	});
	
  	it('restore object instance with function name()', function() {
		var car = subject.fromJson(subject.toJson(new Car("Car")));
		car.name().should.be.eql("Car");
  	});
		
  	it('restore object instance with function toString(prefix)', function() {
		var car = subject.fromJson(subject.toJson(new Car("Car")));
		car.toString("__").should.be.eql("__Car");
  	});
	
  	it('restore object instance with function doubleName()', function() {
		var car = subject.fromJson(subject.toJson(new Car("Car")));
		car.doubleName().should.be.eql("CarCar");
  	});
	
  	it('restore object instance with function getName()', function() {
		var car = subject.fromJson(subject.toJson(new Car("Car")));
		car.getName().should.be.eql("name: Car");
  	});
});