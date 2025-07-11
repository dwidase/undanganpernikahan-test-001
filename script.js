document.addEventListener('DOMContentLoaded', () => {
    // ====================================
    // LOGIKA HALAMAN SAMPUL & NAVIGASI    
    // ====================================
    const openInvitationButton = document.getElementById('open-invitation-button');
    const coverPage = document.getElementById('cover-page');
    // MENGGANTI ID: mainInvitationPage -> mainContentWrapper
    const mainContentWrapper = document.getElementById('main-content-wrapper');

    if (openInvitationButton && coverPage && mainContentWrapper) {
        openInvitationButton.addEventListener('click', () => {
            coverPage.classList.add('hidden'); // Sembunyikan cover
            mainContentWrapper.classList.remove('hidden'); // Tampilkan main content wrapper
            // Scroll ke bagian awal konten utama setelah cover disembunyikan
            mainContentWrapper.scrollIntoView({ behavior: 'smooth' }); 
        });
    } else {
        console.warn("Elemen Cover Page, Tombol, atau Main Content Wrapper tidak ditemukan. Fitur navigasi mungkin tidak berfungsi.");
    }


    // ====================================
    // LOGIKA PENGHITUNG WAKTU MUNDUR       
    // ====================================
    // Tanggal acara Anda adalah 30 Mei 2025. Perbarui tanggal ini!
    const countdownDate = new Date("Dec 30, 2026 10:00:00").getTime(); 

    // Pastikan elemen countdown ada sebelum mencoba memperbarui
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement && hoursElement && minutesElement && secondsElement) {
        const countdownInterval = setInterval(function() { 
            const now = new Date().getTime();
            const distance = countdownDate - now;

            // Pastikan angka tidak negatif jika sudah melewati tanggal
            const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
            const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

            // Format dengan "0" di depan jika angka < 10
            daysElement.innerHTML = days < 10 ? "0" + days : days;
            hoursElement.innerHTML = hours < 10 ? "0" + hours : hours;
            minutesElement.innerHTML = minutes < 10 ? "0" + minutes : minutes;
            secondsElement.innerHTML = seconds < 10 ? "0" + seconds : seconds;

            if (distance < 0) {
                clearInterval(countdownInterval); 
                daysElement.innerHTML = "00";
                hoursElement.innerHTML = "00";
                minutesElement.innerHTML = "00";
                secondsElement.innerHTML = "00";
                // Opsional: Anda bisa menambahkan logika atau pesan di sini 
                // ketika countdown selesai, misalnya:
                // document.querySelector('.countdown-container').innerHTML = "<p>Acara telah berlangsung!</p>";
            }
        }, 1000);
    } else {
        console.warn("Elemen Countdown Timer tidak ditemukan. Fitur countdown mungkin tidak berfungsi.");
    }


    // ====================================
    // LOGIKA ANIMASI ON-SCROLL (QUOTE)    
    // ====================================
    // MENGGANTI SELECTOR: .latarbelakang-quotes -> #quote-section
    const quoteSection = document.querySelector('#quote-section');

    if (quoteSection) {
        const quoteObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Menambahkan kelas untuk memicu animasi
                    entry.target.classList.add('animate-on-scroll');
                    // Jika Anda hanya ingin animasi berjalan sekali saat masuk viewport,
                    // aktifkan baris di bawah ini:
                    // quoteObserver.unobserve(entry.target); 
                } else {
                    // Jika elemen keluar viewport, hapus kelas untuk meresetnya
                    // Ini berguna jika Anda ingin animasi terulang setiap kali discroll masuk/keluar
                    entry.target.classList.remove('animate-on-scroll');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Animasi akan dipicu ketika 10% elemen terlihat
        });

        quoteObserver.observe(quoteSection);
    } else {
        console.warn("Elemen '#quote-section' tidak ditemukan. Animasi quote mungkin tidak berfungsi.");
    }
});
