const taskSection = document.querySelector(".task-section")

taskSection.addEventListener("click", function (e) {
    if(e.target.tagName === "BUTTON") {
        if (e.target.className === "uncheckedBox"){
            e.target.classList.replace("uncheckedBox", "checkedBox")
        } else {
            e.target.classList.replace("checkedBox", "uncheckedBox")
        }
    }
    else if (e.target.tagName === "SPAN") {
        alert("also")
    }
}, false)