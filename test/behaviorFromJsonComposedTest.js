var subject = require("../src/behavior-transfer.js");
var CarOwner  = require("../test/CarOwner.js");
var CarNumber  = require("../test/CarNumber.js");
var CarFacade  = require("../test/CarFacade.js");
var assert = require("assert");
var should = require('should');

describe('fromJson/toJson composed behavior', function() {
	
  	it('with car owner assumptions', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber);
		carNumber.should.have.property("number");
		owner.should.have.property("carNumber");
		owner.should.have.property("ownerId");
  	});
	
  	it('restore object instance with composed field CarNumber', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber);
		var carOwner = subject.fromJson(subject.toJson(owner));
		
		carOwner.getCarNumber().should.be.eql("123");
  	});
	
  	it('restore object instance with field ownerId', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var carOwner = subject.fromJson(subject.toJson(owner));
		
		carOwner.ownerId.should.be.eql(10203);
  	});		
	
  	it('restore object instance with field carNumber -> getNumber()', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var carOwner = subject.fromJson(subject.toJson(owner));
		
		carOwner.carNumber.getNumber().should.be.eql(123);
  	});		
	
  	it('restore object instance with two composed fields', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var facade = subject.fromJson(subject.toJson(new CarFacade(owner, carNumber)));

		facade._carOwner.carNumber.getNumber().should.be.eql(123);
		facade._carNumber.getNumber().should.be.eql(123);
		facade._carOwner.ownerId.should.be.eql(10203);
		facade._carOwner.ownerId.should.be.type('number');
  	});
});