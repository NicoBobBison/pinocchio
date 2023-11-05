const taskSection = document.querySelector(".checklist-section")
let taskId = 0;

taskSection.addEventListener("click", function (e) {
    if(e.target.tagName === "BUTTON") {
        if (e.target.className === "uncheckedBox"){
            e.target.classList.replace("uncheckedBox", "checkedBox")
            e.target.nextElementSibling.classList.replace("uncheckedText", "checkedText")
        } else {
            e.target.classList.replace("checkedBox", "uncheckedBox")
            e.target.nextElementSibling.classList.replace("checkedText", "uncheckedText")
        }
    }
    else if (e.target.className === "uncheckedText") {
        alert("instructions to edit task name")
    }
    else if (e.target.id === "trash-can") {
        // Call a function in main.py to delete item
        e.target.parentElement.parentElement.parentElement.remove();
    }
}, false)

function addTask() {
    alert("creating task with: " + taskId)

    // let li = document.createElement("li");
    // li.innerHTML = inputBox.value;
    // listContainer.appendChild(li);
    // inputBox.value = "";
    //
    // let span = document.createElement("span");
    // span.innerHTML = "\u00d7";
    // li.appendChild(span);

    taskId = taskId + 1;
}