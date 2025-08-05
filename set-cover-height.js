// Flag eksekusi agar tidak double-trigger saat restore halaman
let didSetCover = false;

/**
 * Fungsi utama untuk mengatur tinggi cover
 * Mengisi custom property --cover-height dengan nilai window.innerHeight
 */
function setCoverHeight() {
  const cover = document.querySelector('#cover-page');
  if (cover) {
    const height = window.innerHeight;
    cover.style.setProperty('--cover-height', `${height}px`);
  }
}

// 🔹 Trigger saat halaman pertama kali dimuat
window.addEventListener('load', setCoverHeight);

// 🔹 Trigger saat viewport berubah
window.addEventListener('resize', setCoverHeight);

// 🔹 Trigger satu kali setelah interaksi awal (menstabilkan layout mobile)
window.addEventListener('touchstart', setCoverHeight, { once: true });
window.addEventListener('scroll', setCoverHeight, { once: true });

// 🔹 Trigger saat halaman direstore dari cache (misal pakai Back Button)
window.addEventListener('pageshow', () => {
  if (!didSetCover) {
    didSetCover = true;
    setTimeout(() => {
      setCoverHeight();
    }, 50); // memberi waktu bagi browser untuk menyelesaikan layout
  }
});

// 🔹 Reset flag saat halaman ditutup atau sebelum unload
window.addEventListener('beforeunload', () => {
  didSetCover = false;
});

// 🔹 Fallback tambahan: reset saat tab disembunyikan
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    didSetCover = false;
  }
});





