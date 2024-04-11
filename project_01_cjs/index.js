
const Square = require('./square').Square;
const PI = require('./square').PI;

const mySquare = new Square(8);
console.log(`PI=${PI}`);
console.log(`Area: ${mySquare.area()}`);

function test() {
    return new Promise((resolve, reject) => {
        if(Boolean((new Date()).getSeconds()%2)){
            resolve('SUCCESS');
        } else {
            reject('ERROR');
        }
    });
}

// v0
/*test().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
}).finally(()=>{
    console.log('func test called');
});*/


// v1
/*
async function run(){
    try {
        const res = await test();
        console.log(res);
    } catch (e) {
        console.log(e);
    }
    console.log('func test called');
}
run().finally();*/

// v2
(async function () {
    try {
        const res = await test();
        console.log(res);
    } catch (e) {
        console.log(e);
    }
    console.log('func test called');
})();