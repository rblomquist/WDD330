

class TheLocaleStorage {
    constructor(){
        // this.toDoList = JSON.parse(localStorage.getItem("test")) || [];
        this.toDoList = [];
    }
    // get item
    getItem(key) {
        const item = localStorage.getItem(key);
        return item;
    }
    // set item 
    setItem(task, ) {
        const time = new Date();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const year = time.getFullYear()
        
        const timestamp = `${month}-${day}-${year}`;
        const sorting = time.getTime();

        const item = {"timestamp": timestamp, "task": task, "bool": false, "sort": sorting};
        this.toDoList.push(item);

        const json = JSON.stringify(item);
        localStorage.setItem(task, json);
    }
    // filter items
    filterItems() {
        localStorage.filter( (a,b) => a - b );
    }
}

const testing = new TheLocaleStorage();

testing.setItem("poop");
// console.log(mara);
console.log(testing.toDoList)
console.log(JSON.parse(testing.getItem("poop")))
console.log(localStorage);

testing.setItem("pee");
console.log(testing.toDoList)

testing.toDoList = []
console.log(testing.toDoList)
for (i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let item = testing.getItem(key)
    testing.toDoList.push(item)
}
console.log(testing.toDoList)

// let myObj = {one: "1", two: "2"}
// let obj2 = {three: "3", four: "4"}

// console.log(testing.toDoList)
// console.log(typeof(testing.toDoList))

// testing.setItem("test", myObj);
// testing.setItem("test", obj2);
// testing.setItem("test", 'Mara')
// testing.setItem("apple", 'banana')

// testing.setItem("test", testing.toDoList);

// const mara = JSON.parse(localStorage.getItem("test"));

// console.log(mara)
// localStorage.clear()
// console.log(localStorage);

// testing.filterItems()



// Need Date object for timestamp. 

export default TheLocaleStorage;