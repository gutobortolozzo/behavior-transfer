var subject = require(process.cwd()+'/index.js');
var CarOwner  = require(process.cwd()+"/test/objects/CarOwner.js");
var CarNumber  = require(process.cwd()+"/test/objects/CarNumber.js");
var CarFacade  = require(process.cwd()+"/test/objects/CarFacade.js");
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
	
  	it('restore object instance with constructor of carNumber', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var carOwner = subject.fromJson(subject.toJson(owner));
		
		carOwner.carNumber.constructor.name.should.be.eql("Object");
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
	
  	it('restore object instance with two composed fields values', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var date = new Date('Sat Oct 13 2014 22:19:46 GMT-0300 (BRT)');
		var facade = subject.fromJson(subject.toJson(new CarFacade(owner, carNumber, date)));

		facade.toString().should.be.eql('year: 2014 number: 123 id: 10203');
  	});
});