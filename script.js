document.addEventListener('DOMContentLoaded', function() {
    // Lock scroll selama cover aktif
    document.body.classList.add('cover-active');

    const openInvitationButton = document.getElementById('open-invitation-button');
    const coverPage = document.getElementById('cover-page');
    const mainContentWrapper = document.getElementById('main-content-wrapper');

    if (openInvitationButton && coverPage && mainContentWrapper) {
        openInvitationButton.addEventListener('click', () => {
            // Tampilkan isi dan aktifkan scroll
            coverPage.classList.add('hidden');
            mainContentWrapper.classList.remove('hidden');
            document.body.classList.remove('cover-active');

            // Opsional: scroll ke atas
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn("Pastikan semua ID dan class sudah sesuai.");
    }
});


//=====================================
// PEMANGGIL DAFTAR_NAMA_TAMU.JSON
//=====================================

// Ganti URL ini dengan URL mentah (raw) dari file JSON kamu di GitHub
const jsonURL = 'https://raw.githubusercontent.com/dwidase/undanganpernikahan-test-001/refs/heads/main/rsvp/daftar_nama_tamu.json';

// Ambil parameter slug dari URL, misalnya ?guest=budi-santoso
const params = new URLSearchParams(window.location.search);
const slug = params.get('guest');

// Fungsi normalisasi slug agar tahan terhadap karakter non-alfabet
function generateSlug(nama) {
  return nama
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // hapus karakter non-alfabet
    .replace(/\s+/g, '-');    // ganti spasi dengan tanda hubung
}

fetch(jsonURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Gagal mengambil data tamu');
    }
    return response.json();
  })
  .then(data => {
    if (!slug) {
      console.warn('Slug tidak ditemukan di URL');
      return;
    }

    // Cari tamu berdasarkan slug yang sudah dinormalisasi
    const tamu = data.find(item => generateSlug(item.nama) === slug);

    if (tamu) {
      const namaTamuEl = document.querySelector('.guest-name-line');
      if (namaTamuEl) {
        namaTamuEl.textContent = tamu.nama;
      } else {
        console.warn('Elemen .guest-name-line tidak ditemukan di HTML');
      }
    } else {
  console.warn(`Tamu dengan slug "${slug}" tidak ditemukan`);

  const namaTamuEl = document.querySelector('.guest-name-line');
  if (namaTamuEl) {
    namaTamuEl.textContent = "Tamu Undangan"; // fallback default
  }

  // Optional: redirect atau alert
  // alert("Data tamu tidak ditemukan. Silakan cek tautan undangan Anda.");
  // window.location.href = "index.html";
}

  });

	
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
	
	//=====================================
	// LOGIKA POPUP FOTO GALERI
	//=====================================

  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const galleryImages = document.querySelectorAll('.gallery-image');
  let currentIndex = 0;

  function showImage(index) {
    const img = galleryImages[index];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.remove('hidden');
    currentIndex = index;
  }

  galleryImages.forEach((img, i) => {
    img.addEventListener('click', () => showImage(i));
  });

  document.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
  });

  document.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  });

  document.querySelector('.lightbox-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  });

  // Swipe support
  let startX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  lightbox.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let diffX = endX - startX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        document.querySelector('.lightbox-prev').click();
      } else {
        document.querySelector('.lightbox-next').click();
      }
    }

	
    // ====================================
    // LOGIKA POPUP HADIAH & FITUR SALIN    
    // ====================================
    const openGiftModalButton = document.getElementById('open-gift-modal-button');
    const giftModal = document.getElementById('gift-modal');
    const closeButton = giftModal ? giftModal.querySelector('.close-button') : null;
    const copyButtons = document.querySelectorAll('.copy-button');

    if (openGiftModalButton && giftModal && closeButton) {
        // Buka popup saat tombol diklik
        openGiftModalButton.addEventListener('click', () => {
            giftModal.classList.remove('hidden');
            // Menambahkan kelas untuk memicu animasi modal jika diperlukan (misalnya: fade-in)
            // giftModal.classList.add('fade-in'); 
        });

        // Tutup popup saat tombol silang diklik
        closeButton.addEventListener('click', () => {
            giftModal.classList.add('hidden');
        });

        // Tutup popup saat mengklik di luar area modal content
        giftModal.addEventListener('click', (event) => {
            if (event.target === giftModal) {
                giftModal.classList.add('hidden');
            }
        });
    } else {
        console.warn("Elemen untuk fitur popup Hadiah tidak ditemukan.");
    }

    // Logika untuk tombol salin
    if (copyButtons.length > 0) {
        copyButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const targetId = event.target.dataset.target;
                const textToCopyElement = document.getElementById(targetId);
                
                if (textToCopyElement) {
                    const textToCopy = textToCopyElement.innerText.trim();
                    
                    // Gunakan Clipboard API modern
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(textToCopy)
                            .then(() => {
                                // Feedback visual
                                const originalText = button.innerText;
                                button.innerText = 'Tersalin!';
                                setTimeout(() => {
                                    button.innerText = originalText;
                                }, 1500);
                            })
                            .catch(err => {
                                console.error('Gagal menyalin teks:', err);
                                alert('Gagal menyalin teks. Silakan salin manual: ' + textToCopy);
                            });
                    } else {
                        // Fallback untuk browser lama
                        const textArea = document.createElement('textarea');
                        textArea.value = textToCopy;
                        textArea.style.position = 'fixed'; // Agar tidak mengganggu layout
                        textArea.style.left = '-9999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        try {
                            document.execCommand('copy');
                            const originalText = button.innerText;
                            button.innerText = 'Tersalin!';
                            setTimeout(() => {
                                button.innerText = originalText;
                            }, 1500);
                        } catch (err) {
                            console.error('Gagal menyalin teks (fallback):', err);
                            alert('Gagal menyalin teks. Browser Anda tidak mendukung penyalinan otomatis. Silakan salin manual: ' + textToCopy);
                        }
                        document.body.removeChild(textArea);
                    }
                } else {
                    console.warn(`Elemen dengan ID '${targetId}' tidak ditemukan untuk disalin.`);
                }
            });
        });
    } else {
        console.warn("Tidak ada tombol salin ditemukan.");
    }
});






