const dateTitle = document.querySelector(".tital")
let EventDetails = {};


// Adding individual dates in JS
for (let i = 0; i < 35; i++) {
    const datesDiv = document.createElement("div");
    datesDiv.innerHTML = ` <p>This</p>`;
    datesDiv.id = i
    const element = document.getElementById("date")
    element.appendChild(datesDiv);
    datesDiv.classList.add("dates_style");  
}

//Append the event's div once we have created an event

//Adding an event in JavaScript
function addEvent(id_number) {
    const eventsDiv = document.createElement("div");
    eventsDiv.innerHTML = `<img src="Images/Icons/dot.png" width="64px"/>`
    eventsDiv.classList.add("event_div_style");
    document.getElementById(id_number).appendChild(eventsDiv)
    

}


//Add click event for any child div of div = grid
function handleClick(event) {
    //Open the event details module
    openModal(event, 2)
    const clickedDiv = event.target;
    dateTitle.innerHTML = `Events for ${clickedDiv.id}`;
    // alert(`You clicked: ${clickedDiv.id}`);
    addEvent(clickedDiv.id)
}

// Get all divs with the class 'dates_style'
const dates_divs = document.querySelectorAll('.dates_style');

// Add event listener to each div
dates_divs.forEach(div => {
    div.addEventListener('click', handleClick);
});




//Section to Open and Close Our Modal
const openEvent = document.getElementById("openEvent");
const modal = document.querySelector(".events_modal");
const closeBtn = document.querySelectorAll(".close-modal-btn");
const closeBtn2 = document.querySelector(".close-modal-btn2");
const saveEvent = document.querySelector(".save_event");
const modal2 = document.getElementById("events-container");
const openEvent2 = document.getElementById("addEvent-btn");
console.log(modal)




//Event Listeners for modal section
openEvent.addEventListener("click", (e) => openModal(e, 1));
saveEvent.addEventListener("click", addEventDetails);
openEvent2.addEventListener("click", (e) => openModal(e, 1));
modal2.addEventListener("click", (e) => closeModal(e, false, 2))
modal.addEventListener("click", (e) => closeModal(e, true, 1));
closeBtn.forEach(div => {
    div.addEventListener("click", (e) => closeModal(e, false, 1));
});
closeBtn2.addEventListener("click", (e) => closeModal(e, false, 2));
closeBtn2.myParam = '2';




//section to open our modal
function openModal(evt, moduleNum) {
    if (moduleNum == 1) {
        modal.classList.remove("hide");
        //To remove later - implemented now
        closeModal("click", false, 2)

    } else if(moduleNum == 2) {
        modal2.classList.remove("hide");
        //To remove later - implemented now
        closeModal("click", false, 1)
    }
}

//section to close our modal
function closeModal(e, clickedOutside, num) {
    if (clickedOutside) {
        if (e.target.classList.contains("events_grid"))
            modal.classList.add("hide");
    } else if (num == 2) {
        modal2.classList.add("hide");
    } else modal.classList.add("hide");
}



//Handle the hover effect on the x-icon image
const xIcon = document.querySelector(".x-icon");

xIcon.onmouseover = function() {
    xIcon.src = 'Images/Icons/xdark.png';
};

xIcon.onmouseout = function() {
    xIcon.src = 'Images/Icons/xlight.png';
};


//Section to get User Event Values
function addEventDetails(e) {
    alert("Running add details")
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let description = document.getElementById("description").value;

    EventDetails["title"] = title;
    EventDetails["date"] = date;
    EventDetails["time"] = time;
    EventDetails["description"] = description

    console.log(EventDetails)
    openModal(e, 1)
}

























// check on line 66