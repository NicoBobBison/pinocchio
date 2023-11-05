const taskSection = document.querySelector(".checklist-section")
const modalOverlay = document.querySelector(".modal-overlay")
const modalContainer = document.querySelector(".modal-container")

taskSection.addEventListener("click", function (e) {
    if(e.target.tagName === "BUTTON") {
        if (e.target.className === "uncheckedBox"){
            e.target.classList.replace("uncheckedBox", "checkedBox")
            e.target.nextElementSibling.classList.replace("uncheckedText", "checkedText")
            
            let check = document.createElement("img");
            check.src = "/static/css/images/check.png";
            check.id = "check";
            e.target.prepend(check);
        } else {
            e.target.classList.replace("checkedBox", "uncheckedBox")
            e.target.nextElementSibling.classList.replace("checkedText", "uncheckedText")
            e.target.firstElementChild.remove();
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

function openModal() {
    if (modalOverlay.style.display === "flex") {
        modalOverlay.style.display = "none";
        modalContainer.style.display = "none";
    } else {
        modalOverlay.style.display = "flex";
        modalContainer.style.display = "inline-flex";
    }
}