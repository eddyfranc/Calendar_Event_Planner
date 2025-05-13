let eventId = -2;
let EventDetails = {};
const noEvent = document.getElementById("no-event");


// Adding individual dates in JS
for (let i = 0; i < 35; i++) {
    const datesDiv = document.createElement("div");
    datesDiv.innerHTML = ` <p>${i + 1}</p>`;
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
    const elem = document.getElementById(id_number - 1);
    if (!elem.classList.contains("event_image")) {
        elem.appendChild(eventsDiv);
        elem.classList.add("event_image");
    }
    
    

}


//Add click event for any child div of div = grid
function handleClick(evId) {
    const clickedDiv = Number(evId) + 1;
    eventId = clickedDiv;
   
    //Check if there are already events present
    const value = retrieveEvent();
    //Type is Boolean
    if (!value) {
        if (noEvent.classList.contains("hide")) {
            noEvent.classList.remove('hide');
        }
        openModal('click', 2);
    } else {
        noEvent.classList.add('hide');
        openModal('click', 2);
    }  
    //Check if we have added an event
    
    dateTitle.innerHTML = `Events for ${clickedDiv}`;
    
}

// Get all divs with the class 'dates_style'
const dates_divs = document.querySelectorAll('.dates_style');

// Add event listener to each div
dates_divs.forEach(div => {
    div.addEventListener('click', function (event) {
    // Always logs the class name of the blue div
    handleClick(div.id )}, true)});



//Section to Open and Close Our Modal
const openEvent = document.getElementById("openEvent");
const modal = document.querySelector(".events_modal");
const closeBtn = document.querySelectorAll(".close-modal-btn");
const closeBtn2 = document.querySelector(".close-modal-btn2");
const saveEvent = document.querySelector(".save_event");
const modal2 = document.getElementById("events-container");
const openEvent2 = document.getElementById("addEvent-btn");
const eventList = document.querySelector(".event-list");
const dateTitle = document.querySelector(".tital");




//Event Listeners for modal section
openEvent.addEventListener("click", (e) => openModal(e, 1));
saveEvent.addEventListener("click", (e) => {
    e.preventDefault();
    addEventDetails(e); return; });
openEvent2.addEventListener("click", (e) => { openModal(e, 1);});
modal2.addEventListener("click", (e) => closeModal(e, false, 2));
modal.addEventListener("click", (e) => {closeModal(e, true, 2)});
closeBtn.forEach(div => {
    div.addEventListener("click", (e) => closeModal(e, false, 1));
});
closeBtn2.addEventListener("click", (e) => closeModal(e, false, 2));




//section to open our modal
function openModal(evt, moduleNum) {
    if (moduleNum == 1) {
        modal.classList.remove("hide");
        //To remove later - implemented now
        closeModal("click", false, 2);

    } else if(moduleNum == 2) {
        modal2.classList.remove("hide");
        //To remove later - implemented now
        closeModal("click", false, 1); 
    }
}

//section to close our modal
function closeModal(e, clickedOutside, num) {
    
    if (clickedOutside) {
        if (e.target.classList.contains("events_grid"))
            modal.classList.add("hide");
    } else if (num == 2) {
        modal2.classList.add("hide");
        //check if list items have been addded
        let listItem = document.querySelectorAll(".list-item")
        listItem.forEach(node => {
            node.classList.add("hide");
        });
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
    let title = document.getElementById("title").value;
    let date = document.getElementById("idDate").value;
    let time = document.getElementById("time").value;
    let description = document.getElementById("description").value;
    elemID = e.target;
    
    EventDetails["id"] = eventId;
    EventDetails["title"] = title;
    EventDetails["date"] = date;
    EventDetails["time"] = time;
    EventDetails["description"] = description;

    if (eventId < 0) {
        getIdFromDate();
    }
    
    saveOurEvent(EventDetails);
    addEvent(eventId);
    handleClick(--eventId);
    
}



function saveOurEvent(eventObj) {
    // Save an object to localStorage
    // Get existing data from localStorage
    let storedData = localStorage.getItem("myObjects")
    // Parse existing data or initialize an empty array
    let objectsArray = storedData ? JSON.parse(storedData) : [];
    // Append new object
    objectsArray.push(eventObj);
    // Save updated array back to localStorage
    localStorage.setItem("myObjects", JSON.stringify(objectsArray));
    retrieveEvent();

}

function retrieveEvent() {
    // Retrieve the object from localStorage
    const storedUser = JSON.parse(localStorage.getItem('myObjects'));
    if (storedUser?.length !== 0) {
        const eventArr = getArrMatchingId(storedUser);
        if (eventArr.length !== 0) {
            addListEvent(eventArr);
            eventArr.length = 0;
            return true;
        } else {
            return false;
        }  
    } else  {
        return false;
    }
}

function addListEvent(eventInfo) {
    const parent_ul = document.getElementById("event-list");
    const childNodes = parent_ul.childNodes

    while (childNodes.length >= 3) {
        parent_ul.removeChild(parent_ul.childNodes[2]);
  }
    eventInfo.forEach(obj => {
        const listItem = createEventListing(obj);
        parent_ul.appendChild(listItem);
    });
}

function getArrMatchingId(userEventObj) {
    let eventsIdArr = [];
    userEventObj?.forEach(obj => {
        if (obj.id === eventId) {
            eventsIdArr.push(obj)
        }
    })
    return eventsIdArr;
}

function createEventListing(eventObject) {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.innerHTML = `
      <div class="actions">
        <a href="#" class="edit">Edit</a>
        <a href="#" class="delete">Delete</a>
      </div>
      <h4>${eventObject.title}</h4>
      <div class="time">Time: ${eventObject.time}</div>
      <div class="content">${eventObject.description}</div>
    `;
    return listItem;
}

function onWindowLoad() {
    const storedUser = JSON.parse(localStorage.getItem('myObjects'));
    const ids = new Set();
    storedUser?.forEach(obj => {
        ids.add(obj.id);
    });
    ids.forEach((value) => {
        addEvent(value);
    });
}

function getIdFromDate() {
    let date = document.getElementById("idDate").value;
    const myArray = date.split("-");
    eventId = myArray[2];

}























// check on line 66