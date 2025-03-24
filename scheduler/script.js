document.addEventListener('DOMContentLoaded', function () {
    // Check login status and fetch user info
    fetch('check_login.php')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedIn) {
                window.location.href = 'login.html';
            } else {
                // Fetch the username
                fetch('get_user_info.php')
                    .then(response => response.json())
                    .then(userData => {
                        if (userData.username) {
                            const userName = userData.username; // Adjust based on your API response
                            document.getElementById('user-greeting').textContent = `Szia, ${userName}!`;
                        } else {
                            console.error('Error fetching user info:', userData.error);
                        }
                    })
                    .catch(error => console.error('Error fetching user info:', error));
                
                getEvents(); // Fetch events if logged in
            }
        })
        .catch(error => console.error('Error checking login status:', error));
});

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

// Function to fetch events from the database
async function getEvents() {
    try {
        const categoryFilter = document.getElementById('category-filter').value;
        let url = "get_events.php";
        if (categoryFilter) {
            url += `?category=${categoryFilter}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Map data from server to frontend structure
        eventsArr = data.map(event => ({
            day: parseInt(event.day),
            month: parseInt(event.month),
            year: parseInt(event.year),
            events: [{
                id: event.id,
                title: event.title,
                time: event.time,
                completed: Boolean(event.completed)
            }]
        }));
        console.log(eventsArr);
        initCalendar();
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

// Function to save events to the database
async function saveEvents(newEvent) {
    try {
        const response = await fetch("http://localhost/scheduler/add_event.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `day=${newEvent.day}&month=${newEvent.month}&year=${newEvent.year}&title=${newEvent.title}&time=${newEvent.time}&category=${newEvent.category}`, // Include category
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
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach((event) => {
                events += `<div class="event ${event.completed ? 'completed' : ''}" data-id="${event.id}">
                    <div class="title">
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                    <span class="delete">✖</span> <!-- Changed icon to 'X' -->
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
    // Add event listener to each event element for updating completed status and deleting event
    document.querySelectorAll('.event').forEach(eventElement => {
        eventElement.addEventListener('click', function (e) {
            const eventId = this.getAttribute('data-id');
            if (e.target.classList.contains('tick')) {
                // Handle event completion
                updateEvent(eventId, !this.classList.contains('completed'));
            } else if (e.target.closest('.delete')) {
                deleteEvent(eventId); // Call the delete function
            }
        });
    });
}

// New deleteEvent function
const deleteEvent = async (eventId) => {
    try {
        const response = await fetch(`delete_event.php?id=${eventId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            // Handle HTTP errors (e.g., 404 Not Found, 500 Internal Server Error)
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        if (data.success) {
            console.log("Event deleted:", data.message);
            getEvents(); // Refresh events after deleting
        } else {
            console.error("Error deleting event:", data.message);
        }
    } catch (error) {
        console.error("Error deleting event:", error);
    }
};

// Function to update an event's completion status
async function updateEvent(id, completed) {
    try {
        const response = await fetch("http://localhost/scheduler/update_event.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `id=${id}&completed=${completed ? 1 : 0}` // Send ID and completed status (convert boolean to 1/0)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            console.log("Event updated:", data.message);
            // Refresh the specific event element without refreshing the entire page
            const eventElement = document.querySelector(`.event[data-id="${id}"]`);
            if (eventElement) {
                eventElement.classList.toggle('completed', completed);
            }
        } else {
            console.error("Error updating event:", data.message);
        }
    } catch (error) {
        console.error("Error updating event:", error);
    }
}

//function to add event
addEventBtn.addEventListener("click", async () => {
    addEventWrapper.classList.toggle("active");

    if (!addEventWrapper.classList.contains("active")) {
        const eventTitle = addEventTitle.value;
        const eventTimeFrom = addEventFrom.value;
        const eventTimeTo = addEventTo.value;
        const eventCategory = document.getElementById('event-category').value;
        if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
            alert("Kérjük, töltse ki az összes mezőt");
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
            completed: false,
            category: eventCategory
        };

        //save event to database
        await saveEvents(newEvent);

        addEventTitle.value = "";
        addEventFrom.value = "";
        addEventTo.value = "";
        addEventWrapper.classList.remove("active");
    }
});

// Function to convert time from HH:MM format to a readable string format (24 hour)
function convertTime(time) {
    return time; // Simply return the time as it is already in HH:MM format
}

// Add event listeners to automatically insert a colon (':') when the user clicks into the "Teendő kezdete" and "Teendő vége" fields
document.getElementById('event-time-from').addEventListener('focus', function () {
    if (!this.value.includes(':')) {
        this.value = '00:00';
    }
    this.setSelectionRange(0, 2); // Select the hour part right away
});

document.getElementById('event-time-to').addEventListener('focus', function () {
    if (!this.value.includes(':')) {
        this.value = '00:00';
    }
    this.setSelectionRange(0, 2); // Select the hour part right away
});

// Add event listeners to select the hour or minute part when the user clicks on the "Teendő kezdete" or "Teendő vége" fields
document.getElementById('event-time-from').addEventListener('click', function (e) {
    const pos = e.target.selectionStart;
    if (pos < 3) {
        this.setSelectionRange(0, 2); // Select the hour part
    } else {
        this.setSelectionRange(3, 5); // Select the minute part
    }
});

document.getElementById('event-time-to').addEventListener('click', function (e) {
    const pos = e.target.selectionStart;
    if (pos < 3) {
        this.setSelectionRange(0, 2); // Select the hour part
    } else {
        this.setSelectionRange(3, 5); // Select the minute part
    }
});

// Add event listeners to ensure the fields only accept numeric input and reset to "00:00" if invalid input is entered
document.getElementById('event-time-from').addEventListener('input', function () {
    if (/[^0-9:]/.test(this.value) || this.value.length > 5) {
        this.value = '00:00';
    } else if (this.value.length === 2) {
        this.value += ':';
        this.setSelectionRange(3, 5); // Switch to minute part
    } else if (this.value.length === 5) {
        this.setSelectionRange(3, 5); // Select the minute part
    }
});

document.getElementById('event-time-to').addEventListener('input', function () {
    if (/[^0-9:]/.test(this.value) || this.value.length > 5) {
        this.value = '00:00';
    } else if (this.value.length === 2) {
        this.value += ':';
        this.setSelectionRange(3, 5); // Switch to minute part
    } else if (this.value.length === 5) {
        this.setSelectionRange(3, 5); // Select the minute part
    }
});

// Add keyboard navigation for the "Teendő kezdete" and "Teendő vége" fields
document.getElementById('event-time-from').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' && this.selectionStart < 3) {
        this.setSelectionRange(3, 5); // Move to minute part
        e.preventDefault();
    } else if (e.key === 'ArrowLeft' && this.selectionStart >= 3) {
        this.setSelectionRange(0, 2); // Move to hour part
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        document.getElementById('event-category').focus(); // Move to "Válassz kategóriát" field
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        document.getElementById('event-name').focus(); // Move to "Teendő neve" field
        e.preventDefault();
    }
});

document.getElementById('event-time-to').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' && this.selectionStart < 3) {
        this.setSelectionRange(3, 5); // Move to minute part
        e.preventDefault();
    } else if (e.key === 'ArrowLeft' && this.selectionStart >= 3) {
        this.setSelectionRange(0, 2); // Move to hour part
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        document.getElementById('event-category').focus(); // Move to "Válassz kategóriát" field
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        document.getElementById('event-time-from').focus(); // Move to "Teendő kezdete" field
        e.preventDefault();
    }
});

document.getElementById('event-name').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') {
        document.getElementById('event-time-from').focus(); // Move to "Teendő kezdete" field
        e.preventDefault();
    }
});

document.getElementById('event-category').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
        document.getElementById('event-time-to').focus(); // Move to "Teendő vége" field
        e.preventDefault();
    }
});

document.getElementById('logout-btn').addEventListener('click', function () {
    fetch('logout.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'login.html';
            } else {
                console.error('Hiba a kijelentkezés során:', data.message);
            }
        })
        .catch(error => {
            console.error('Hiba a kijelentkezés során:', error);
        });
});

document.getElementById('category-filter').addEventListener('change', () => {
    getEvents();
});

getEvents(); //get the events when the page loads