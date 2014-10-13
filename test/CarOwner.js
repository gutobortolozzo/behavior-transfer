function CarOwner(carNumber, id){
	
	this.carNumber = carNumber;
	this.ownerId = id;
	
	this.getCarNumber = function(){
		return this.carNumber.getNumber();
	}
}

module.exports = CarOwner;