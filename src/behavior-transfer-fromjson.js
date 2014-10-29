var type = require('./typeUtils.js');
var REGEX_DATE = new RegExp('[a-zA-Z][a-z][a-z]\\s[a-zA-Z][a-z][a-z]\\s\\d\\d\\s\\d\\d\\d\\d\\s\\d\\d:\\d\\d:\\d\\d*');

var fromJsonImpl = function(jsonObject){
	var typeObject = typeof jsonObject;
	var object = typeObject !== 'object' ? JSON.parse(jsonObject) : jsonObject;
	var newObject = new Object();
	for(element in object){
		var value = object[element];
		if(type(value) == 'object'){
			newObject[element] = fromJsonImpl(value);
			continue;
		}
		if(type(value) == 'string' && REGEX_DATE.test(value)){
			newObject[element] = new Date(value);
			continue;
		}
		if(type(value) == 'array'){
			var copy = element;
			var newElements = [];
			object[element].forEach(function(arrayElement){
				newElements.push(fromJsonImpl(arrayElement));
			});
			newObject[copy] = newElements;
			continue;
		}
		if(type(value) == 'string' && value.indexOf('function') == 0){	
			var functionSignature = value.substring(value.indexOf("(")+1, value.indexOf(")"));
			var functionBody = value.substring(value.indexOf("{")+1, value.indexOf("}"));
			var metaFunction = new Function(functionSignature, functionBody);
			newObject[element] = metaFunction;
			continue;
		}
		newObject[element] = value;
	}      
	return newObject;                               
}

module.exports = fromJsonImpl;