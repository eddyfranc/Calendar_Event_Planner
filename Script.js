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

