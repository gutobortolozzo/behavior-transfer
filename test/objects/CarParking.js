function CarParking(){
	
	this._cars = [];
	
	this.addCar = function(car){
		this._cars.push(car);
	}
}

module.exports = CarParking;