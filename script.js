// Mendapatkan elemen tombol dan halaman
const openButton = document.getElementById('open-invitation-button');
const coverPage = document.getElementById('cover-page');
const mainInvitationPage = document.getElementById('main-invitation-page');

// Menambahkan event listener ke tombol
openButton.addEventListener('click', () => {
    // Sembunyikan halaman cover
    coverPage.classList.add('hidden');
    // Tampilkan halaman isi undangan
    mainInvitationPage.classList.remove('hidden');
    // Optional: Scroll to the top of the main invitation page
    window.scrollTo(0, 0);
});

// Countdown Timer Logic
const countdownDate = new Date("December 25, 2026 00:00:00").getTime(); // Target date

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the elements
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // If the countdown is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        // You can add a message here, e.g., "Acara Telah Dimulai!"
    }
}, 1000); // Update every 1 second
