Behavior transfer
=========

A small library providing utility methods to serialize javascript objects with their behavior.

## Installation

  npm install behavior-transfer --save

## Usage

```javascript
    var subject = require('behavior-transfer');
    var Person = function(name){ 
    	this._name = name;
    	this.greeting = function(){ 
    		return 'Greetings my name is '+this._name; 
    	} 
    };
    var john = new Person('John');
    var json = subject.toJson(john);
    var materialized = subject.fromJson(json);
    materialized.greeting();
	> 'Greetings my name is John'
```
## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
* 1.0.1 Minor bug fixes
* 1.0.2 Performance improvement
* 1.0.3 Minor performance improvement

