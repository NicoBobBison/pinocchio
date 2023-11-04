const taskSection = document.querySelector(".checklist-section")

taskSection.addEventListener("click", function (e) {
    if(e.target.tagName === "BUTTON") {
        if (e.target.className === "uncheckedBox"){
            e.target.classList.replace("uncheckedBox", "checkedBox")
            e.target.classList.replace("uncheckedText", "checkedText")
        } else {
            e.target.classList.replace("checkedBox", "uncheckedBox")
            e.target.classList.replace("checkedText", "uncheckedText")
        }
    }
    else if (e.target.tagName === "SPAN") {
        alert("also")
    }
}, false)