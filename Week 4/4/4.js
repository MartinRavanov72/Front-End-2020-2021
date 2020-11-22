var Person = (function () {
    function Person(salary) {
        this.getSalary = function () {
            return salary;
        };
    };
    
    return Person;
}());

var person = new Person(1000);
console.log(person.getSalary());
console.log(person.salary);