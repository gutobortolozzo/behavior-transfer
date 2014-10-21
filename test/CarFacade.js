function CarFacade(carOwner, carNumber, startDate){
	
	this._startDate = startDate;
	this._carOwner = carOwner;
	this._carNumber = carNumber;
	
	this.toString = function(){
		return 'year: '+this._startDate.getFullYear()+
			   ' number: '+this._carNumber.getNumber()+
			   ' id: '+this._carOwner.ownerId;
	}
}

module.exports = CarFacade;