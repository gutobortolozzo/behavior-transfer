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
	
  	it('correct subject dehydrate and hydrate', function() {
		var Person = function(name){ 
			this._name = name;
			this.greeting = function(){ 
				return 'Greetings my name is '+this._name; 
			} 
		};
		var john = new Person('John');
		var json = subject.toJson(john);
		var materialized = subject.fromJson(json);
		materialized.greeting().should.be.eql('Greetings my name is John');
  	});
});