console.log("hello, world!");

//COPYRIGHT
const copyrightYearSpan = document.getElementById('copyright-year');
const currentYear = new Date().getFullYear();
copyrightYearSpan.textContent = currentYear;
// END COPYRIGHT

//NAVBAR Hide links after click
// Find the checkbox element by its ID
const menuToggle = document.getElementById('navbar-toggle');

// Find all the navigation links within your menu
const navLinks = document.querySelectorAll('.nav-links a');

// Loop through each of the navigation links
navLinks.forEach(link => {
    // Add a 'click' event listener to each one
    link.addEventListener('click', () => {
        // When a link is clicked, set the checkbox to 'unchecked'
        // This will trigger your CSS to hide the menu again! ✨
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});
// END NAVBAR

// DATE
  document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('date');
    if (dateElement) {
      const today = new Date();
      const options = { month: 'short', day: 'numeric' };
      dateElement.textContent = today.toLocaleDateString(undefined, options);
    }
  });
// END DATE

// CLOCK
setInterval(showTime, 1000);
function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
 // let sec = time.getSeconds();
  am_pm = "AM";

  if (hour >= 12) {
    if (hour > 12) hour -= 12;
    am_pm = "PM";
  } else if (hour == 0) {
    hour = 12;
    am_pm = "AM";
  }

 // hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
 // sec = sec < 10 ? "0" + sec : sec;

// Get the time zone abbreviation (e.g., PDT, EST)
  const timeZone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(time)
      .find(part => part.type === 'timeZoneName')?.value || '';

  // Append the time zone to your current time string
  let currentTime = `${hour}:${min} ${am_pm} ${timeZone}`;

  document.getElementById("clock").innerHTML = currentTime;
}

showTime();
// END CLOCK 

// CALENDAR 
document.addEventListener('DOMContentLoaded', () => {
  const dateDisplay = document.getElementById('date-time');
  const calendarContainer = document.getElementById('calendar-container');

  // Function to generate and display the calendar
  function generateCalendar(year, month) {
    // Clear previous calendar
    calendarContainer.innerHTML = '';

    const today = new Date();
    const currentMonth = new Date(year, month);

    // --- Create Header ---
    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.textContent = `${currentMonth.toLocaleString('default', { month: 'long' })} ${year}`;
    calendarContainer.appendChild(header);

    // --- Create Day Names (Sun-Sat) ---
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      const dayNameCell = document.createElement('div');
      dayNameCell.className = 'day-name';
      dayNameCell.textContent = day;
      calendarContainer.appendChild(dayNameCell);
    });

    // --- Create Date Cells ---
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon...
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for the days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarContainer.appendChild(document.createElement('div'));
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'day-cell';
      dayCell.textContent = day;

      // Highlight the current day
      if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
        dayCell.classList.add('current-day');
      }
      calendarContainer.appendChild(dayCell);
    }
  }

  // Event listener for the date display click
  dateDisplay.addEventListener('click', () => {
    // Toggle the 'hidden' class
    calendarContainer.classList.toggle('calendar-hidden');

    // If the calendar is now visible, generate its content
    if (!calendarContainer.classList.contains('calendar-hidden')) {
      const today = new Date();
      generateCalendar(today.getFullYear(), today.getMonth());
    }
  });
});
// END CALENDAR

//BACK TO TOP BUTTON
// Get the button:
let mybutton = document.getElementById("back-to-top-bttn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (mybutton && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
    mybutton.style.display = "block";
  } else if (mybutton) {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// END BACK TO TOP BUTTON
// END UNIVERSAL PAGE FX
