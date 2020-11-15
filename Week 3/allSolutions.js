//#1.1
let arr1 = [10, 5, 13, 18, 51];
for(let num of arr1){
    console.log(num);
}


//#1.2
function multiplyElementsByTwo(arr1) {
    return arr1.map(x => x * 2);
}
let arr2 = multiplyElementsByTwo(arr1);


//#1.3
function getEvenElements(arr1) {
    return arr1.filter(x => x % 2 === 0);
}
let arr3 = getEvenElements(arr1);


//#1.4
function hasElementLessThanTen(arr1) {
    return arr1.filter(x => x < 10).length > 0;
}
let result4 = hasElementLessThanTen(arr1);


//#1.5
function getElementsDivisibleByThree(arr1) {
    return arr1.filter(x => x % 3 === 0);
}
let arr5 = getElementsDivisibleByThree(arr1);


//#1.6
function getSum(arr1) {
    return arr1.reduce((acc, curr) => acc + curr);
}
let result6 = getSum(arr1);


//#1.7
function getLastTwoElements(arr1) {
    return arr1.slice(arr1.length - 2, arr1.length);
}
let arr7 = getLastTwoElements(arr1);


//#2.1
let dates1 = [new Date()];


//#2.2
dates1.push(new Date('December 8, 2018 21:00:00'));


//#2.3
let info3 = dates1.map(x => [new Date(x.getFullYear(), x.getMonth() + 1, 0).getDate(), x.getDay()]);


//#2.4
info3.map(x => {
    switch (x[1]) {
        case 0:
            x[1] = "неделя";
            break;
        case 1:
            x[1] = "понеделник";
            break;
        case 2:
            x[1] = "вторник";
            break;
        case 3:
            x[1] = "сряда";
            break;
        case 4:
            x[1] = "четвъртък";
            break;
        case 5:
            x[1] = "петък";
            break;
        case 6:
            x[1] = "събота";
            break;
    }
});

let fullInfo4 = [];
for(let index in dates1){
    fullInfo4.push(`Дата: ${("0" + dates1[index].getDate()).slice(-2)}.${("0" + (dates1[index].getMonth()+1)).slice(-2)}.${dates1[index].getFullYear()}, час: ${("0" + dates1[index].getHours()).slice(-2)}:${("0" + dates1[index].getMinutes()).slice(-2)}:${("0" + dates1[index].getSeconds()).slice(-2)}, ${info3[index][1]}, ${info3[index][0]} дни`);
}
