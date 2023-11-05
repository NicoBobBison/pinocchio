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
        var dueTime = (dates[i].innerHTML.split(" "))[1]
        console.log(dueTime)
        
        var [hours, minute] = dueTime.split(":").map(Number);

        console.log(hours)
        console.log(minute)

        var date = [
            (now.getMonth() + 1),
            now.getDate(),
            now.getFullYear()].join('/');

        var date1 = new Date(dueDate);
        date1.setHours(hours);
        date1.setMinutes(minute);
        console.log(date1)
        var date2 = new Date(date);
        date2.setHours(now.getHours());
        date2.setMinutes(now.getMinutes());
        date2.setSeconds(now.getSeconds());
        console.log(date2)

        //var diffTime = Math.abs(date2 - date1);

        var time1 = (date1.getHours() * 60 * 60) + (date1.getMinutes() * 60) + (date1.getSeconds());
        var time2 = (date2.getHours() * 60 * 60) + (date2.getMinutes() * 60) + (date2.getSeconds());
        console.log(time1)
        console.log(time2)
        var diffTime = Math.abs(time2 - time1);
        
        var diffHours = Math.floor(diffTime / (60 * 60));
        console.log(diffHours)
        var diffMinutes = Math.floor((diffTime / (60)) % 60);
        console.log(diffMinutes)
        var diffSeconds = Math.floor((diffTime) % 60);
        console.log(diffSeconds)

        // set the content of the element with the ID time to the formatted string
        // dates[i].nextElementSibling.nextElementSibling.innerHTML = [date].join(' / ');
        dates[i].nextElementSibling.nextElementSibling.innerHTML = diffHours + ":" + String(diffMinutes).padStart(2, '0') + ":" + String(diffSeconds).padStart(2, '0');
    }
    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
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