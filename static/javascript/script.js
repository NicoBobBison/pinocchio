const taskSection = document.querySelector(".checklist-section")
const modalOverlay = document.querySelector(".modal-overlay")
const modalContainer = document.querySelector(".modal-container")
let dates = document.getElementsByClassName("date-text")

// check for click on input
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
    else if (e.target.id === "trash-can") {
        // Call a function in main.py to delete item
        e.target.parentElement.parentElement.parentElement.remove();
    }
}, false)

updateClock(); // initial call
function updateClock() {
    for (var i = 0; i < dates.length; i++) {
        var now = new Date() // current date

        var dueDate = (dates[i].innerHTML.split(" "))[0]

        var date = [
            (now.getMonth() + 1),
            now.getDate(),
            now.getFullYear()].join('/');

        var date1 = new Date(dueDate);
        var date2 = new Date(date);
        var diffTime = Math.abs(date2 - date1);
        var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        var diffMinutes = (diffTime / (1000 * 60)) % 24;


        // set the content of the element with the ID time to the formatted string
        // dates[i].nextElementSibling.nextElementSibling.innerHTML = [date].join(' / ');
        dates[i].nextElementSibling.nextElementSibling.innerHTML = diffHours + ":" + diffMinutes;
    }
    // call this function again in 1000ms
    setTimeout(updateClock, 60000);
}


function toggleModal() {
    if (modalOverlay.style.display === "flex") {
        modalOverlay.style.display = "none";
        modalContainer.style.display = "none";
    } else {
        console.log("toggle")
        modalOverlay.style.display = "flex";
        modalContainer.style.display = "inline-flex";
    }
}