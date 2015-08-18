function CarNumber(number){                       
	
	this.number = number;
	
	this.getNumber = function(){
		return 	this.number;
	}
}

module.exports = CarNumber;