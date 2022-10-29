const dice = {
    sides: 6,
        roll() {
            return Math.floor(this.sides * Math.random()) + 1;
        }
    }
    
    console.log('Before the roll');
    
    const roll = new Promise( (resolve,reject) => {
        const n = dice.roll();
        if(n > 1){
            setTimeout(()=>{resolve(n)},n*200);
        } else {
            setTimeout(()=>reject(n),n*200);
        }
    });
    
    roll.then(result => console.log(`I rolled a ${result}`) )
    .catch(result => console.log(`Drat! ... I rolled a ${result}`) );
    
    console.log('After the roll');

    // function outer() {
    //     const outside = 'Outside!';
    //     function inner() {
    //         const inside = 'Inside!';
    //         console.log(outside);
    //         console.log(inside);
    //     }
    //     console.log(outside);
    //     inner();
    // }
    // function outer() {
    //     const outside = 'Outside!';
    //     function inner() {
    //         const inside = 'Inside!';
    //         console.log(outside);
    //         console.log(inside);
    //     }
    //     return inner;
    // }


// const closure = outer();
// closure()

function closure() {
    const a = 1.8;
    const b = 32;
    return c => c * a + b;
}
const toFahrenheit = closure();
console.log(toFahrenheit(30));

function counter(start){
    let i = start;
    return function() {
        return i++;
    }
}
const count = counter(1);
console.log(count());
console.log(count());
console.log(count());
