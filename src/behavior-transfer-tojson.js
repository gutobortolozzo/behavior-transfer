var type = require('./typeUtils.js');

var mappers = new Object();
mappers['function'] = function(element, value){
	var name = element;
	var context = value.toString().replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ");
	return "\"" + name + "\" : \"" +context+ "\" , ";
};
mappers['number'] = function(element, value){
	return "\"" + element + "\" : "+value+" , ";
};
mappers['boolean'] = function(element, value){
	return "\"" + element + "\" : "+value+" , ";
};
mappers['string'] = function(element, value){
	return "\"" + element + "\" : \"" +value+"\" , ";
};
mappers['object'] = function(element, value){
	return "\"" + element + "\" : "+toJsonImpl(value)+ " , ";
};
mappers['date'] = function(element, value){
	return "\"" + element + "\" : \""+value.toString()+"\" , ";
};
mappers['array'] = function(element, value){
	var result = "["
	
	value.forEach(function(object){
		result += toJsonImpl(object)+' , '
	});
	result = result.replace(REPLACE_LAST_COMMA,'$1') + ']';
	return "\"" + element + "\" : " +result+" , ";
};
mappers['undefined'] = function(element, value){
	return "\"" + element + "\" : \""+value+"\" , ";
};

var toJsonImpl = function(object){
	var behaviorOutput = '{';

	for(var element in object){
		behaviorOutput += mappers[type(object[element])](element, object[element]);
	}
		
	return behaviorOutput.replace(REPLACE_LAST_COMMA,'$1').concat('}');
};

module.exports = toJsonImpl;