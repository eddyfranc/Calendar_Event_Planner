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
    eventsDiv.innerHTML = "<p>I have been clicked</p>"
    eventsDiv.classList.add("event_div_style");
    document.getElementById(id_number).appendChild(eventsDiv)
    

}


//Add click event for any child div of div = grid
function handleClick(event) {
    const clickedDiv = event.target;
    alert(`You clicked: ${clickedDiv.id}`);
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


//Event Listeners for modal section
openEvent.addEventListener("click", openModal);
modal.addEventListener("click", (e) => closeModal(e, true));
closeBtn.forEach(div => {
    div.addEventListener("click", closeModal);
});

//section to open our modal
function openModal() {
    modal.classList.remove("hide");
}

//section to close our modal
function closeModal(e, clickedOutside) {
    if (clickedOutside) {
        if (e.target.classList.contains("events_grid"))
            modal.classList.add("hide");
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