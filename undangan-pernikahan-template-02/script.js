// Atur tanggal acara di sini. Format: tahun, bulan (Januari = 0), tanggal, jam, menit.
const weddingDate = new Date(2026, 11, 20, 8, 0, 0);

function updateCountdown() {
  const now = new Date();
  const distance = weddingDate.getTime() - now.getTime();
  const message = document.getElementById('countdownMessage');

  if (distance <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '0';
    });
    if (message) message.textContent = 'Hari bahagia kami telah tiba. Terima kasih atas doa Anda.';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Efek scroll reveal: elemen baru muncul saat masuk ke area layar.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Tandai ikon menu yang paling dekat dengan bagian aktif.
const navLinks = [...document.querySelectorAll('.bottom-nav a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('.section-anchor').forEach(section => sectionObserver.observe(section));

// Nama tamu dari URL, misalnya isi.html?to=Ibu%20Sari
const guestParams = new URLSearchParams(window.location.search);
const guestName = guestParams.get('to');
if (guestName) {
  const note = document.querySelector('.hero-text .lead');
  if (note) note.textContent = `Kepada ${guestName}, kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.`;
}

/* Animasi scroll dari bawah ke atas */
const riseElements = document.querySelectorAll(".scroll-rise");

const riseObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        // Reset agar animasi bisa muncul lagi saat di-scroll ulang
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px"
  }
);

riseElements.forEach((element) => {
  riseObserver.observe(element);
});

// ==========================================
// 1. FUNGSI PLAY / PAUSE MUSIK
// ==========================================
const musicToggle = document.getElementById('music-toggle');
const weddingSong = document.getElementById('wedding-song');
let isPlaying = false;

musicToggle.addEventListener('click', function(e) {
  e.preventDefault(); // Mencegah link pindah halaman
  
  const icon = musicToggle.querySelector('i');
  
  if (!isPlaying) {
    weddingSong.play();
    isPlaying = true;
    icon.className = "bi bi-disc spinning"; // Mengubah ikon jadi CD/Piringan Hitam
  } else {
    weddingSong.pause();
    isPlaying = false;
    icon.className = "bi bi-music-note-beamed"; // Kembali ke ikon not balok saat pause
  }
});


// ==========================================
// 2. FUNGSI PENGIRIMAN FORM RSVP
// ==========================================
const rsvpForm = document.querySelector('.rsvp-form');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah halaman refresh otomatis
    
    // Mengambil data dari form
    const nama = document.getElementById('nama').value;
    const status = document.getElementById('status').value;
    const jumlah = document.getElementById('jumlah').value;
    const ucapan = document.getElementById('ucapan').value;
    
    // Tampilkan notifikasi sukses sederhana (Bisa diganti SweetAlert/WhatsApp Integration nanti)
    alert(`Terima kasih ${nama}! Konfirmasi kehadiran Anda (${status}) telah berhasil dikirim.`);
    
    // Reset form setelah dikirim
    rsvpForm.reset();
  });
}


// ==========================================
// 3. FUNGSI AKTIFKAN MENU NAVIGASI SAAT DI-SCROLL
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Deteksi jika posisi scroll sudah masuk ke area section tertentu
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});
