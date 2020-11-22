var person = {
	_salary: 1000,
	getSecretSalaryInfo: function (){
		return this._salary;
	}
};

var stoleSalaryInfo = person.getSecretSalaryInfo.bind(person);

console.log(person.getSecretSalaryInfo());
console.log(stoleSalaryInfo());