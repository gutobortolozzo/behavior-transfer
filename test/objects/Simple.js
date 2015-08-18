var Simple = function(){
	this.name = "aldruin"
}

Simple.prototype.hello = function(){
	return "hello";
};

Simple.prototype.world = function(){
	return 'world ' + this.name + " greets";
};

module.exports = Simple;