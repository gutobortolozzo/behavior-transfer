var REGEX_DATE = new RegExp('[a-zA-Z][a-z][a-z]\\s[a-zA-Z][a-z][a-z]\\s\\d\\d\\s\\d\\d\\d\\d\\s\\d\\d:\\d\\d:\\d\\d*');
var ASSUMPTIONS = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
},
TOSTRING = Object.prototype.toString;
REPLACE_LAST_COMMA = /,([^,]*)$/;
function type(o) {
    return ASSUMPTIONS[typeof o] || ASSUMPTIONS[TOSTRING.call(o)] || (o ? 'object' : 'null');
};

var toJsonImpl = function(object){
	var behaviorOutput = '{';

	for(var element in object){
		if(type(object[element]) == 'function'){
			var name = element;
			var context = object[element].toString().replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ");
			behaviorOutput += "\"" + name + "\" : \"" +context+ "\" , ";
			continue;
		}
		if(type(object[element]) == 'number' || type(object[element]) == 'boolean'){
			var variableName = element;
			var variableValue = object[element];
			behaviorOutput += "\"" + variableName + "\" : " +variableValue+" , ";
			continue;
		}
		if(type(object[element]) == 'string'){
			var variableName = element;
			var variableValue = object[element];
			behaviorOutput += "\"" + variableName + "\" : \"" +variableValue+"\" , ";
			continue;
		}
		if(type(object[element]) == 'object'){
			var variableName = element;
			var variableValue = toJsonImpl(object[element]);
			behaviorOutput += "\"" + variableName + "\" : " + variableValue + " , ";
			continue;
		}
		if(type(object[element]) == 'date'){
			var variableValue = object[element].toString();
			behaviorOutput += "\"" + element + "\" : \"" +variableValue+"\" , ";
			continue;
		}
		if(type(object[element]) == 'array'){
			var value = "["
			
			object[element].forEach(function(object){
				value += toJsonImpl(object)+' , '
			});
			value = value.replace(REPLACE_LAST_COMMA,'$1') + ']';
			behaviorOutput += "\"" + element + "\" : " +value+" , ";
			continue;
		}
		behaviorOutput += "\"" + element + "\" : \"" +object[element]+"\" , ";
	}
		
	return behaviorOutput.replace(REPLACE_LAST_COMMA,'$1').concat('}');
};

var fromJsonImpl = function(jsonObject){
	var typeObject = typeof jsonObject;
	var object = typeObject !== 'object' ? JSON.parse(jsonObject) : jsonObject;
	var newObject = new Object();
	for(element in object){
		var value = object[element];
		if(type(object[element]) == 'object'){
			newObject[element] = fromJsonImpl(value);
			continue;
		}
		if(type(object[element]) == 'string' && REGEX_DATE.test(value)){
			newObject[element] = new Date(value);
			continue;
		}
		if(type(object[element]) == 'string' && value.indexOf('function') == 0){	
			var functionSignature = value.substring(value.indexOf("(")+1, value.indexOf(")"));
			var functionBody = value.substring(value.indexOf("{")+1, value.indexOf("}"));
			var metaFunction = new Function(functionSignature, functionBody);
			newObject[element] = metaFunction;
			continue;
		}
		if(type(object[element]) == 'array'){
			var copy = element;
			var newElements = [];
			object[element].forEach(function(arrayElement){
				newElements.push(fromJsonImpl(arrayElement));
			});
			newObject[copy] = newElements;
			continue;
		}
		if(type(object[element]) !== 'object' && !(type(object[element]) === 'string' && value.indexOf('function') == 0)){
			newObject[element] = value;
		}
	}      
	return newObject;                               
} 

module.exports = {      
	toJson : toJsonImpl,
	fromJson : fromJsonImpl                                             
}