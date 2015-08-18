function Car(nome){                       
	
	this._name = nome;
	
	this.name = function(){
		return this._name;
	}
		
	this.toString = function(prefix){
		return prefix + this._name;
	}
		
	this.doubleName = function(){
		return this.name() + this.name();
	}
		
	this.getName = function(){
		return 'name: ' + this.name();
	}
}

module.exports = Car;