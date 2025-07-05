console.log("sup bitch?!");

// DESKTOP OS WINDOW FUNCTIONALITY
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
            containment: "#desktop",
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
// END DESKTOP OS WINDOW FUNCTIONS

// RIGHT CLICK TO CLOSE
$(document).ready(function() {
	
// --- Close All Windows ---
	$('body').on('click', '#close-all-windows', function() {
		// Find all elements with the class 'window' and remove them
		$('#desktop .window').remove();
  
		// Find all navbar buttons (excluding the hamburger) and remove them
		// This targets any button that has a 'data-window-id' attribute
		$('.navbar-button[data-window-id]').remove();
	});
    
    // --- Reusable Helper Functions ---
    function closeWindowById(windowId) {
        $('#' + windowId).remove();
        $(`.navbar-button[data-window-id="${windowId}"]`).remove();
    }

    function closeAllWindows() {
        $('#desktop .window').remove();
        $('.navbar-button[data-window-id]').remove();
    }

    // --- Unified Right-Click Context Menu Logic ---
    $('body').on('contextmenu', '#desktop, .window-header, .navbar-button', function(e) {
        const menu = $('#context-menu');
        
        // Always show the "Close All" option
        $('#context-menu-close-all').show();

        // Check if a specific window/button was clicked
        if ($(this).is('.window-header, .navbar-button')) {
            e.preventDefault();
            
            // Determine the target window's ID
            let windowId = $(this).hasClass('window-header') 
                ? $(this).closest('.window').attr('id') 
                : $(this).data('window-id');
            
            menu.data('targetWindowId', windowId);
            $('#context-menu-close').show(); // Show the "Close" option
            
            positionMenu(e, menu);
        } 
        // Logic for right-clicking the desktop itself
        else if ($(e.target).is('#desktop')) {
            e.preventDefault();
            $('#context-menu-close').hide(); // Hide the single "Close" option
            positionMenu(e, menu);
        }
    });

    // Smart positioning function to keep the menu on-screen
    function positionMenu(e, menu) {
        const menuHeight = menu.outerHeight();
        const menuWidth = menu.outerWidth();
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();

        let top = e.pageY;
        let left = e.pageX;

        if (e.pageY + menuHeight > windowHeight) {
            top = e.pageY - menuHeight;
        }
        if (e.pageX + menuWidth > windowWidth) {
            left = e.pageX - menuWidth;
        }

        menu.css({ top: top + 'px', left: left + 'px' }).show();
    }

    // --- Context Menu Click Handlers ---

    $('#context-menu-close').on('click', function() {
        const windowId = $('#context-menu').data('targetWindowId');
        if (windowId) {
            closeWindowById(windowId);
        }
        $('#context-menu').hide();
    });

    $('#context-menu-close-all').on('click', function() {
        closeAllWindows();
        $('#context-menu').hide();
    });

    // Hide the menu if the user clicks anywhere else
    $(document).on('click', function() {
        $('#context-menu').hide();
    });
});

// END RIGHT CLICK TO CLOSE