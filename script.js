// Get references to the open button and page sections
const openButton = document.getElementById('open-invitation-button');
const coverPage = document.getElementById('cover-page');
const mainInvitationPage = document.getElementById('main-invitation-page');

// Add event listener to the open button
openButton.addEventListener('click', () => {
    // Hide the cover page
    coverPage.classList.add('hidden');
    // Show the main invitation page
    mainInvitationPage.classList.remove('hidden');
    // Scroll to the top of the main invitation page
    window.scrollTo(0, 0);
});

// Set the target date for the countdown (May 30, 2025)
const countdownDate = new Date("May 30, 2025 00:00:00").getTime();

// Update the countdown every 1 second
const x = setInterval(function() {
    // Get the current date and time
    const now = new Date().getTime();
    // Calculate the distance between now and the countdown date
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the results in the respective elements, adding leading zeros if needed
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // If the countdown is over, stop the timer and display "00"
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000); // Update every 1000 milliseconds (1 second)
