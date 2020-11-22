class Person{
    constructor(name) {
        this.name = name;
        this.planet = "Земя";
    }

    sayHello() {
        console.log(`Здравей ${this.name} от планетата ${this.planet}`);
    }
}

let ivan = new Person("Ivan");
let pesho = new Person("Pesho");
let kiro = new Person("Kiro");

ivan.sayHello();
pesho.sayHello();
kiro.sayHello();
