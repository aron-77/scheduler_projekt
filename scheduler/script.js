const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];

let eventsArr = [];

//function to fetch the events from the database
async function getEvents() {
  try {
    const response = await fetch("http://localhost/scheduler/get_events.php");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Map the data from the server to the structure expected by the frontend
    eventsArr = data.map(event => ({
        day: parseInt(event.day), // Ensure these are numbers
        month: parseInt(event.month),
        year: parseInt(event.year),
        events: [{
            id: event.id,
            title: event.title,
            time: event.time,
            completed: Boolean(event.completed) // Ensure this is a boolean
        }]
    }));
    console.log(eventsArr);
    initCalendar();
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

//function to save the events to the database
async function saveEvents(newEvent) {
  try {
    const response = await fetch("http://localhost/scheduler/add_event.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `day=${newEvent.day}&month=${newEvent.month}&year=${newEvent.year}&title=${newEvent.title}&time=${newEvent.time}`,
    });
    const data = await response.json();
    if (data.success) {
        console.log("Event saved:", data.message);
        getEvents(); // Refresh events after saving
    } else {
        console.error("Error saving event:", data.message);
    }
  } catch (error) {
    console.error("Error saving event:", error);
  }
}

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  let day = firstDay.getDay();
  if (day === 0) {
    day = 6;
  } else {
    day--;
  }

  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;
  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let event = eventsArr.some(eventObj => eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year);
    
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
        getActiveDay(i);
        days += `<div class="day today active ${event ? 'event' : ''}">${i}</div>`;
    } else {
        days += `<div class="day ${event ? 'event' : ''}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListner();
  updateEvents(activeDay);
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      activeDay = Number(e.target.innerHTML);
      getActiveDay(activeDay);
      updateEvents(activeDay);
      days.forEach((day) => {
        day.classList.remove("active");
      });
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  activeDay = today.getDate();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Érvénytelen Dátum");
}

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const formattedDateTime = day.toLocaleString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  eventDate.innerHTML = formattedDateTime;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event ${event.completed ? 'completed' : ''}" data-id="${event.id}">
            <div class="title">
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
            ${event.completed ? '' : '<span class="tick">✔</span>'}
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>Nincsenek teendők :)</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  // Add event listener to each event element for updating completed status
  document.querySelectorAll('.event').forEach(eventElement => {
    eventElement.addEventListener('click', function() {
        const eventId = this.getAttribute('data-id');
        const currentCompleted = this.classList.contains('completed');
        updateEvent(eventId, !currentCompleted); // Toggle completed status
    });
  });
}

//function to update an event
async function updateEvent(id, completed) {
    try {
        const response = await fetch('http://localhost/scheduler/update_event.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${id}&completed=${completed}`,
        });
        const data = await response.json();
        if (data.success) {
            console.log('Event updated:', data.message);
            getEvents(); // Refresh events after update
        } else {
            console.error('Error updating event:', data.message);
        }
    } catch (error) {
        console.error('Error updating event:', error);
    }
}

//function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", async () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }

  const newEvent = {
    day: activeDay,
    month: month + 1,
    year: year,
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
    completed: false
  };

  //save event to database
  await saveEvents(newEvent);

  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  addEventWrapper.classList.remove("active");
});

// Function to convert time from HH:MM format to a readable string format
function convertTime(time) {
    let [hour, minute] = time.split(":");
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // Convert "0" hour to "12"
    return `${hour}:${minute} ${period}`;
}

getEvents(); //get the events when the page loads