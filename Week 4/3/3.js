class Item{
    constructor(name, discount) {
        this.name = name;
        this.discount = discount;
    }

    getPrice() {
        return this.getInitialPrice() * ((100 - this.discount) / 100);
    }
}

Item.prototype.getInitialPrice = function () {
    return 1000;
};

let item = new Item("item", 10);
console.log(item.getPrice());