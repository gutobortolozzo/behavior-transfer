function CarFacade(carOwner, carNumber, startDate){
	
	this._startDate = startDate;
	this._carOwner = carOwner;
	this._carNumber = carNumber;
}

module.exports = CarFacade;