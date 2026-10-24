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

  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');

  if(dEl) dEl.textContent = days;
  if(hEl) hEl.textContent = String(hours).padStart(2, '0');
  if(mEl) mEl.textContent = String(minutes).padStart(2, '0');
  if(sEl) sEl.textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Efek scroll reveal aman
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Ambil element navigasi tunggal
const globalNavLinks = document.querySelectorAll('.bottom-nav a');

// Tandai ikon menu aktif
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      globalNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('.section-anchor').forEach(section => sectionObserver.observe(section));

// Nama tamu dari URL
const guestParams = new URLSearchParams(window.location.search);
const guestName = guestParams.get('to');
if (guestName) {
  const note = document.querySelector('.hero-text .lead');
  if (note) note.textContent = `Kepada ${guestName}, kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.`;
}

/* Animasi scroll dari bawah ke atas aman */
const riseElements = document.querySelectorAll(".scroll-rise");
const riseObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
);
riseElements.forEach((element) => {
  riseObserver.observe(element);
});

// Musim / Audio Player
const musicToggle = document.getElementById('music-toggle');
const weddingSong = document.getElementById('wedding-song');
let isPlaying = false;

if (musicToggle && weddingSong) {
  musicToggle.addEventListener('click', function(e) {
    e.preventDefault();
    const icon = musicToggle.querySelector('i');
    if (!isPlaying) {
      weddingSong.play();
      isPlaying = true;
      if (icon) icon.className = "bi bi-disc spinning"; 
    } else {
      weddingSong.pause();
      isPlaying = false;
      if (icon) icon.className = "bi bi-music-note-beamed"; 
    }
  });
}

// RSVP Form
const rsvpForm = document.querySelector('.rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const namaEl = document.getElementById('nama');
    const statusEl = document.getElementById('status');
    const nama = namaEl ? namaEl.value : 'Tamu';
    const status = statusEl ? statusEl.value : '';
    alert(`Terima kasih ${nama}! Konfirmasi kehadiran Anda (${status}) telah berhasil dikirim.`);
    rsvpForm.reset();
  });
}

// Sinkronisasi Scroll Navigasi
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  globalNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      link.classList.remove('active');
      if (href.includes(current)) {
        link.classList.add('active');
      }
    }
  });
});
