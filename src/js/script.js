console.log("hello, world!");
console.log("sup bitch?");

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

  let currentTime = hour + ":" + min + " " + am_pm;
  // + ":" + sec

  document.getElementById("clock").innerHTML = currentTime;
}

showTime();
// END CLOCK 

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

// DESKTOP OS
$(document).ready(function() {
    let zIndexCounter = 1000;

    function setActiveWindow($window) {
        $('.window.active').removeClass('active');
        $('.navbar-button.active').removeClass('active');
        $window.addClass('active').css('z-index', ++zIndexCounter);
        const windowId = $window.attr('id');
        $(`.navbar-button[data-window-id="${windowId}"]`).addClass('active');
    }

    // UNIFIED LAUNCHER: This now handles clicks from icons AND the navbar menu.
    $('body').on('click', '.app-launcher', function(e) {
        e.preventDefault();
        const app_id = $(this).data('id');
        const title = $(this).data('title');
        const url = $(this).data('url');
        const windowId = 'window-' + app_id;

        // CHECK IF WINDOW ALREADY EXISTS
        let $existingWindow = $('#' + windowId);
        if ($existingWindow.length) {
            setActiveWindow($existingWindow); // If it exists, just bring it to the front
        } else {
            createWindow(windowId, title, url); // Otherwise, create it
        }
    });

    function createWindow(windowId, title, url) {
        const windowHtml = `
            <div class="window" id="${windowId}">
                <div class="window-header">
                    <span class="window-title">${title}</span>
                    <div class="window-controls">
                        <button class="window-close">×</button>
                    </div>
                </div>
                <div class="window-content"><p>Loading...</p></div>
            </div>`;
        const $newWindow = $(windowHtml).appendTo('#desktop');

        const navbarButtonHtml = `<button class="navbar-button" data-window-id="${windowId}">${title}</button>`;
        $(navbarButtonHtml).insertAfter('#navbar .hamburger');

        $newWindow.find('.window-content').load(url + ' #page-content', function(response, status, xhr) {
            if (status == "error") {
                $(this).html("Sorry, an error occurred: " + xhr.status + " " + xhr.statusText);
            }
        });

        $newWindow.draggable({
            handle: ".window-header",
            containment: "body",
            start: function() { setActiveWindow($(this)); }
        }).resizable({
            minHeight: 150,
            minWidth: 250,
            handles: "n, e, s, w, ne, se, sw, nw",
            start: function() { setActiveWindow($(this)); }
        });

        $newWindow.on('mousedown', function() { setActiveWindow($(this)); });
        setActiveWindow($newWindow);
    }

    // Handle closing the window (this remains the same)
    $('body').on('click', '.window-close', function() {
        const $window = $(this).closest('.window');
        const windowId = $window.attr('id');
        $(`.navbar-button[data-window-id="${windowId}"]`).remove();
        $window.remove();
    });

    // Handle bringing window to front via navbar button (this also remains the same)
    $('body').on('click', '.navbar-button', function() {
        const windowId = $(this).data('window-id');
        const $targetWindow = $('#' + windowId);
        if ($targetWindow.length) {
            setActiveWindow($targetWindow);
        }
    });
});
