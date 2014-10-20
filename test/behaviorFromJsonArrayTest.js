var subject = require("../src/behavior-transfer.js");
var Car  = require("../test/Car.js");
var CarParking  = require("../test/CarParking.js");
var assert = require("assert");
var should = require('should');

describe('Array behavior', function() {
	
  	it('with car parking facade assumptions', function() {
		var march = new Car('March');
		var parking = new CarParking();
		parking.addCar(march);
		parking.should.have.property('_cars');
  	});
		
  	it('with car parking containing one car', function() {
		var march = new Car('March');
		var parking = new CarParking();
		parking.addCar(march);
		var parked = subject.fromJson(subject.toJson(parking));
		parked._cars.length.should.be.eql(1);
  	});
	
  	it('with car parking containing one car with getName()', function() {
		var march = new Car('March');
		var parking = new CarParking();
		parking.addCar(march); 
		var parked = subject.fromJson(subject.toJson(parking));
		parked._cars.length.should.be.eql(1);
		parked._cars[0].getName().should.be.eql('name: March');
  	});
		
  	it('with car parking containing two cars', function() {
		var march = new Car('March');
		var versa = new Car('Versa');
		var parking = new CarParking();
		parking.addCar(march);
		parking.addCar(versa);
		var parked = subject.fromJson(subject.toJson(parking));
		parked._cars.length.should.be.eql(2);
  	});
});