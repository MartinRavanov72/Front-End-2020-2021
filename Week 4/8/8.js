function PaymentMethod() {
    return {
        getAmountString: function () {
            return "Your amount in the account is: ";
        }
    }
}

function CashMethod(amount) {
    let self = PaymentMethod();

    self.addToAmount = function(a) {
        amount += a;
    };

    self.reduceFromAmount = function(a) {
        amount -= a;
    };

    self.getAmount = function(a) {
        return self.getAmountString() + amount;
    };

    return self;
}


function CreditMethod (amount) {
    let self = PaymentMethod();

    self.addToAmount = function (a) {
        a *= 9 / 10;
        amount += a;
    };

    self.reduceFromAmount = function(a) {
        amount -= a;
    };

    self.getAmount = function(a) {
        return self.getAmountString() + amount;
    };

    return self;
}

let cashMethod = CashMethod(100);
console.log(cashMethod.getAmount());

cashMethod.addToAmount(10);
console.log(cashMethod.getAmount());

cashMethod.reduceFromAmount(50);
console.log(cashMethod.getAmount());

console.log(cashMethod.amount);


let creditMethod = CreditMethod(100);
console.log(creditMethod.getAmount());

creditMethod.addToAmount(100);
console.log(creditMethod.getAmount());

creditMethod.reduceFromAmount(50);
console.log(creditMethod.getAmount());

console.log(cashMethod.amount);
