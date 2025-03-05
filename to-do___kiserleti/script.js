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
let activeDay;
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

const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  let day = firstDay.getDay();
  
  // Adjust Sunday (0) to be treated as the last day of the week (6)
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

  // Add previous month's days
  for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Add current month's days
  for (let i = 1; i <= lastDate; i++) {
      let event = eventsArr.some(eventObj => eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year);
      
      if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
          activeDay = i;
          getActiveDay(i);
          updateEvents(i);
          days += `<div class="day today active ${event ? 'event' : ''}">${i}</div>`;
      } else {
          days += `<div class="day ${event ? 'event' : ''}">${i}</div>`;
      }
  }

  // Add next month's days
  for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
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

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
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
        //add active to clicked day afte month is changed
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
  console.log("here");
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

  // Formátum: "2024. január 15. 15:32"
  const formattedDateTime = day.toLocaleString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric'
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
  saveEvents();
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

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

//allow only time in eventtime from and to
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
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  // Check correct time format 24 hour
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

  // Check if event is already added
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
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
    completed: false
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  // Select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }

  fetch('scheduler/add_event.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `day=${activeDay}&month=${month + 1}&year=${year}&title=${eventTitle}&time=${timeFrom} - ${timeTo}`,
  })
  .then(response => response.json()) // Expecting JSON response
  .then(data => {
    if (data.success) {
      console.log('Event added:', data.message);
      getEvents();
    } else {
      console.error('Error adding event:', data.message);
      alert('Hiba történt az esemény hozzáadásakor: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Network error:', error);
    alert('Hálózati hiba történt.');
  });
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Biztos készen vagy a feladattal?")) {
      const eventID = e.target.getAttribute("data-id");
      fetch('scheduler/delete_event.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${eventID}`,
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Event deleted:', data.message);
          getEvents();
        } else {
          console.error('Error deleting event:', data.message);
          alert('Hiba történt az esemény törlésekor: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Network error:', error);
        alert('Hálózati hiba történt.');
      });
    }
  }
});

//function to mark event as completed when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    const eventID = e.target.getAttribute("data-id");
    const completed = e.target.classList.contains("completed") ? 1 : 0;

    fetch('scheduler/update_event.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${eventID}&completed=${completed}`,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Event updated:', data.message);
        getEvents();
      } else {
        console.error('Error updating event:', data.message);
        alert('Hiba történt az esemény frissítésekor: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Network error:', error);
      alert('Hálózati hiba történt.');
    });
  }
});

//function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
  fetch('scheduler/get_events.php')
    .then(response => response.json())
    .then(data => {
      eventsArr.length = 0; // Clear the array
      data.forEach(event => {
        let existingDay = eventsArr.find(item => item.day === event.day && item.month === event.month && item.year === event.year);
        if (existingDay) {
          existingDay.events.push({
            id: event.id,
            title: event.title,
            time: event.time,
            completed: event.completed == 1,
          });
        } else {
          eventsArr.push({
            day: event.day,
            month: event.month,
            year: event.year,
            events: [{
              id: event.id,
              title: event.title,
              time: event.time,
              completed: event.completed == 1,
            }]
          });
        }
      });
      updateEvents(activeDay);
    })
    .catch(error => {
      console.error('Network error:', error);
      alert('Hálózati hiba történt az események lekérésekor.');
    });
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "DU" : "DE";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

getEvents(); // Hívjuk meg a getEvents függvényt az oldal betöltésekor




















