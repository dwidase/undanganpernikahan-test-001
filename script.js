document.addEventListener('DOMContentLoaded', () => {
    // ====================================
    // LOGIKA HALAMAN SAMPUL & NAVIGASI   
    // ====================================
    const openInvitationButton = document.getElementById('open-invitation-button');
    const coverPage = document.getElementById('cover-page');
    const mainInvitationPage = document.getElementById('main-invitation-page');

    if (openInvitationButton && coverPage && mainInvitationPage) {
        openInvitationButton.addEventListener('click', () => {
            coverPage.classList.add('hidden');
            mainInvitationPage.classList.remove('hidden');
            mainInvitationPage.scrollIntoView({ behavior: 'smooth' });
        });
    } else {
        console.warn("Elemen Cover Page atau Tombol tidak ditemukan. Fitur navigasi mungkin tidak berfungsi.");
    }


    // ====================================
    // LOGIKA PENGHITUNG WAKTU MUNDUR     
    // ====================================
    const countdownDate = new Date("Dec 30, 2026 10:00:00").getTime();

    // Pastikan elemen countdown ada sebelum mencoba memperbarui
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement && hoursElement && minutesElement && secondsElement) {
        const countdownInterval = setInterval(function() { // Mengubah nama variabel x menjadi countdownInterval
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysElement.innerHTML = days < 10 ? "0" + days : days;
            hoursElement.innerHTML = hours < 10 ? "0" + hours : hours;
            minutesElement.innerHTML = minutes < 10 ? "0" + minutes : minutes;
            secondsElement.innerHTML = seconds < 10 ? "0" + seconds : seconds;

            if (distance < 0) {
                clearInterval(countdownInterval); // Menggunakan nama variabel baru
                daysElement.innerHTML = "00";
                hoursElement.innerHTML = "00";
                minutesElement.innerHTML = "00";
                secondsElement.innerHTML = "00";
            }
        }, 1000);
    } else {
        console.warn("Elemen Countdown Timer tidak ditemukan. Fitur countdown mungkin tidak berfungsi.");
    }


// ====================================
    // LOGIKA ANIMASI ON-SCROLL (QUOTE)   
    // ====================================
    const quoteSection = document.querySelector('.latarbelakang-quotes');

    if (quoteSection) {
        const quoteObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Jika elemen masuk viewport
                    entry.target.classList.add('animate-on-scroll');
                    // !!! HAPUS BARIS INI JIKA ANDA INGIN ANIMASI BERULANG TIAP KALI MASUK VIEWPORT !!!
                    // quoteObserver.unobserve(entry.target); 
                } else {
                    // Jika elemen keluar viewport, hapus kelas untuk meresetnya
                    entry.target.classList.remove('animate-on-scroll');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        quoteObserver.observe(quoteSection);
    } else {
        console.warn("Elemen '.latarbelakang-quotes' tidak ditemukan. Animasi quote mungkin tidak berfungsi.");
    }
});
