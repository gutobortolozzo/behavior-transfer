var subject = require("../src/behavior-transfer.js");
var CarOwner  = require("../test/CarOwner.js");
var CarNumber  = require("../test/CarNumber.js");
var CarFacade  = require("../test/CarFacade.js");
var assert = require("assert");
var should = require('should');

describe('Date behavior', function() {
	
  	it('with car facade assumptions', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber);
		var facade = new CarFacade(owner, carNumber);
		facade.should.have.property('_startDate');
		facade.should.have.property('_carOwner');
		facade.should.have.property('_carNumber');
  	});
		
  	it('restore object instance with Month/Day/Year Date values', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var date = new Date('Sat Oct 13 2014 22:19:46 GMT-0300 (BRT)');
		var facade = subject.fromJson(subject.toJson(new CarFacade(owner, carNumber, date)));

		facade._startDate.getDate().should.be.eql(13);
		facade._startDate.getMonth().should.be.eql(9);
		facade._startDate.getFullYear().should.be.eql(2014);
  	});	
	
  	it('restore object instance with Hours/Minutes/Seconds Date values', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var date = new Date('Sat Oct 13 2014 22:19:46 GMT-0300 (BRT)');
		var facade = subject.fromJson(subject.toJson(new CarFacade(owner, carNumber, date)));

		facade._startDate.getHours().should.be.eql(22);
		facade._startDate.getMinutes().should.be.eql(19);
		facade._startDate.getSeconds().should.be.eql(46);
  	});	
	
  	it('restore object instance with Date field', function() {
		var carNumber = new CarNumber(123);
		var owner = new CarOwner(carNumber, 10203);
		var date = new Date('Sat Oct 11 2014 22:19:46 GMT-0300 (BRT)');
		var facade = subject.fromJson(subject.toJson(new CarFacade(owner, carNumber, date)));
		
		facade._startDate.toString().should.be.eql('Sat Oct 11 2014 22:19:46 GMT-0300 (BRT)');
		facade._startDate.constructor.name.should.be.eql('Date');
  	});
});