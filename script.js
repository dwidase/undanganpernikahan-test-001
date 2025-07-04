// Mengambil referensi ke elemen-elemen HTML yang dibutuhkan
// Ini adalah tombol "Buka Undangan" di halaman sampul.
const openButton = document.getElementById('open-invitation-button');
// Ini adalah elemen section yang mewakili halaman sampul.
const coverPage = document.getElementById('cover-page');
// Ini adalah elemen section yang mewakili halaman undangan utama.
const mainInvitationPage = document.getElementById('main-invitation-page');

// Menambahkan event listener (pendengar acara) ke tombol "Buka Undangan".
// Fungsi ini akan dijalankan setiap kali tombol diklik.
openButton.addEventListener('click', () => {
    // Menyembunyikan halaman sampul.
    // Kode ini menambahkan kelas 'hidden' ke elemen halaman sampul.
    // Diterapkan pada: Halaman Sampul (elemen dengan id 'cover-page').
    // Fungsi: Mengubah tampilan halaman sampul dari terlihat menjadi tersembunyi.
    coverPage.classList.add('hidden');

    // Menampilkan halaman undangan utama.
    // Kode ini menghapus kelas 'hidden' dari elemen halaman undangan utama,
    // sehingga halaman tersebut akan terlihat.
    // Diterapkan pada: Halaman Undangan Utama (elemen dengan id 'main-invitation-page').
    // Fungsi: Mengubah tampilan halaman undangan utama dari tersembunyi menjadi terlihat.
    mainInvitationPage.classList.remove('hidden');

    // Menggulir halaman ke bagian paling atas.
    // Ini memastikan bahwa pengguna melihat bagian atas halaman undangan utama setelah transisi.
    // Diterapkan pada: Seluruh jendela browser.
    // Fungsi: Mengatur posisi scroll ke koordinat (0,0), yaitu pojok kiri atas halaman.
    window.scrollTo(0, 0);
});

// Mengatur tanggal target untuk hitung mundur pernikahan (30 Mei 2025).
// Tanggal ini digunakan untuk menghitung sisa waktu hingga acara.
// Diterapkan pada: Logika hitung mundur.
// Fungsi: Mendefinisikan titik waktu di masa depan untuk perhitungan hitung mundur.
const countdownDate = new Date("Dec 30, 2026 00:00:00").getTime();

// Memperbarui hitung mundur setiap 1 detik.
// setInterval akan menjalankan fungsi yang diberikan secara berulang setiap interval waktu tertentu (1000 ms = 1 detik).
// Diterapkan pada: Bagian hitung mundur di halaman isi.
// Fungsi: Memastikan tampilan hitung mundur selalu diperbarui secara real-time.
const x = setInterval(function() {
    // Mendapatkan tanggal dan waktu saat ini.
    const now = new Date().getTime();
    // Menghitung selisih waktu antara tanggal target dan waktu saat ini.
    const distance = countdownDate - now;

    // Menghitung hari, jam, menit, dan detik dari selisih waktu.
    // Math.floor digunakan untuk membulatkan ke bawah ke bilangan bulat terdekat.
    // Diterapkan pada: Perhitungan waktu hitung mundur.
    // Fungsi: Mengubah milidetik menjadi unit waktu yang lebih mudah dibaca (hari, jam, menit, detik).
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Menampilkan hasil perhitungan ke elemen-elemen HTML yang sesuai.
    // Operator ternary (kondisi ? nilai_jika_true : nilai_jika_false) digunakan untuk menambahkan "0" di depan
    // jika angka kurang dari 10 (misalnya, 5 menjadi "05").
    // Diterapkan pada: Elemen span dengan id "days", "hours", "minutes", "seconds" di bagian hitung mundur.
    // Fungsi: Memperbarui tampilan angka hitung mundur di UI.
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Jika waktu hitung mundur sudah habis (distance < 0), hentikan timer dan tampilkan "00" untuk semua unit.
    // clearInterval(x) menghentikan eksekusi berulang dari setInterval.
    // Diterapkan pada: Logika penghentian hitung mundur.
    // Fungsi: Menghentikan pembaruan hitung mundur setelah tanggal target terlewati dan mengatur ulang tampilan.
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000); // Interval pembaruan: 1000 milidetik (1 detik)
