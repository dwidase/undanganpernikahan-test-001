// Mendapatkan elemen tombol dan halaman
const openInvitationButton = document.getElementById('open-invitation-button');
const coverPage = document.getElementById('cover-page');
const mainInvitationPage = document.getElementById('main-invitation-page');

// Menambahkan event listener ke tombol
openInvitationButton.addEventListener('click', () => {
    // Sembunyikan halaman sampul
    coverPage.classList.add('hidden');
    // Tampilkan halaman undangan utama
    mainInvitationPage.classList.remove('hidden');
    // Gulir ke bagian atas halaman undangan utama
    mainInvitationPage.scrollIntoView({ behavior: 'smooth' });
});

// Logika penghitung waktu mundur
const countdownDate = new Date("Dec 30, 2026 10:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Perhitungan waktu untuk hari, jam, menit, dan detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Tampilkan hasil di elemen dengan id yang sesuai
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Jika hitung mundur selesai, tulis beberapa teks
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        // Anda bisa menambahkan pesan di sini, misalnya: "Acara telah dimulai!"
    }
}, 1000);
