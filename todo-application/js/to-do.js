import TheLocaleStorage from "./localStorage";

const storage = new TheLocaleStorage();

const plus = document.querySelector("#plus");

plus.addEventListener("click", addTask)

function addTask() {
    const newTask = document.querySelector("#newTask").value;
    storage.setItem(newTask);
    
    // adds new ask  to list
    const taskList = document.querySelector("#taskList")

    const div = document.createElement("div");
    div.classList.add("flex");
    div.classList.add("blackBorder");

    div.innerHTML = 
            `<input type="checkbox" class="checkbox">
            <p>${newTask}</p>
            <button class="remove">X</button>`;
    
    taskList.append(div);

    // completes task when checkbox is checked
    const checkBox = div.querySelector(".checkbox");
    addCompleteTask(checkBox, div);
    
    // removes task when X is pressed
    const removeButton = div.querySelector(".remove");
    removeTask(removeButton, div);

};

function addCompleteTask(target, div) {
    target.addEventListener("change", 
    
    function completeTask(e) {
        if (e.currentTarget.checked) {
            alert("checked!");
            div.classList.add("completed")
        }
        else {
            alert("unchecked")
            div.classList.remove("completed")
        }
    })
};

function removeTask(button, div) {
    button.addEventListener("click", 
    
    function removeTask(e){
        alert("Working");
        div.remove()
    })
};
