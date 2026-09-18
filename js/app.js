/**
 * Greenzhi Pasta Gigi - Modern Interactive Features
 * 1. Kalkulator Cuan Pola 1-10-5
 * 2. Filter Kategori Manfaat
 * 3. Modal Form Pendaftaran Distributor ke WhatsApp
 * 4. Nav ScrollSpy & Mobile Menu
 * 5. Smooth Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBusinessCalculator();
  initBenefitTabs();
  initRegistrationModal();
  initBackToTop();
});

/* ==========================================
   1. NAVBAR & SCROLLSPY
   ========================================== */
function initNavbar() {
  const navbar = document.getElementById('mainNav');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-item-link');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
    });

    // Close mobile menu on click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Scrollspy logic
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop;
      const secId = sec.getAttribute('id');

      if (scrollY > secTop && scrollY <= secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.remove('nav-link-active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('nav-link-active');
          }
        });
      }
    });
  }
}

/* ==========================================
   2. KALKULATOR CUAN POLA 1-10-5 (SHUANG HOR)
   ========================================== */
function initBusinessCalculator() {
  const teamSlider = document.getElementById('teamSlider');
  const teamCountDisplay = document.getElementById('teamCountDisplay');
  const totalPVDisplay = document.getElementById('totalPVDisplay');
  const totalBonusDisplay = document.getElementById('totalBonusDisplay');
  const tierBadges = document.querySelectorAll('.tier-btn');
  const tierDesc = document.getElementById('tierDesc');

  if (!teamSlider) return;

  const PV_PER_PASTA = 11; // 11 PV per pasta gigi (Rp 72.000)

  function calculateBonus(members) {
    const totalPV = members * PV_PER_PASTA;
    let bonus = 0;
    let desc = '';

    if (members < 10) {
      bonus = 0;
      desc = 'Fase awal: kenali produk, gunakan secara rutin, dan pelajari cara berbagi pengalaman.';
    } else if (members < 50) {
      bonus = Math.round(members * 2400);
      desc = 'Contoh tahap awal: mulai membangun fondasi dengan mengenalkan produk kepada mitra pertama.';
    } else if (members < 500) {
      // Skala 100 orang = 1.100 PV = Rp 264.000
      bonus = Math.round(264000 * (members / 100));
      desc = 'Contoh skenario: jaringan berkembang hingga sekitar 100 orang berdasarkan aktivitas dan performa penjualan.';
    } else if (members < 5000) {
      // Skala 1.000 orang = 11.000 PV = Rp 5.280.000
      bonus = Math.round(5280000 * (members / 1000));
      desc = 'Contoh skenario: jaringan yang lebih besar dapat menghasilkan simulasi berbeda sesuai ketentuan program.';
    } else {
      // Skala 10.000 orang = 110.000 PV = Rp 6.600.000 + Royalti Rp 19.947.000 = Rp 26.097.000
      const baseBonus = 6600000 * (members / 10000);
      const royalty = 19947000 * (members / 10000);
      bonus = Math.round(baseBonus + royalty);
      desc = 'Contoh skenario skala besar. Hasil aktual bergantung pada penjualan, aktivitas jaringan, dan kebijakan perusahaan.';
    }

    // Format displays
    teamCountDisplay.textContent = Number(members).toLocaleString('id-ID');
    totalPVDisplay.textContent = Number(totalPV).toLocaleString('id-ID') + ' PV';
    totalBonusDisplay.textContent = 'Rp ' + Number(bonus).toLocaleString('id-ID');
    if (tierDesc) tierDesc.textContent = desc;
  }

  // Event listener slider
  teamSlider.addEventListener('input', (e) => {
    calculateBonus(Number(e.target.value));
  });

  // Preset buttons
  tierBadges.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = Number(btn.getAttribute('data-value'));
      teamSlider.value = val;
      calculateBonus(val);

      tierBadges.forEach(b => b.classList.remove('bg-emerald-600', 'text-white'));
      btn.classList.add('bg-emerald-600', 'text-white');
    });
  });

  // Init default (100 orang)
  calculateBonus(100);
}

/* ==========================================
   3. FILTER KATEGORI MANFAAT
   ========================================== */
function initBenefitTabs() {
  const tabBtns = document.querySelectorAll('.benefit-tab-btn');
  const benefitCards = document.querySelectorAll('.benefit-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active button style
      tabBtns.forEach(b => {
        b.classList.remove('bg-emerald-700', 'text-white', 'shadow-md');
        b.classList.add('bg-emerald-50', 'text-emerald-800');
      });
      btn.classList.remove('bg-emerald-50', 'text-emerald-800');
      btn.classList.add('bg-emerald-700', 'text-white', 'shadow-md');

      // Filter cards
      benefitCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('hidden');
          card.classList.add('animate-fadeIn');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================
   4. MODAL PENDAFTARAN DISTRIBUTOR KE WHATSAPP
   ========================================== */
function initRegistrationModal() {
  const openBtns = document.querySelectorAll('.btn-open-daftar');
  const closeBtns = document.querySelectorAll('.btn-close-daftar');
  const modal = document.getElementById('daftarModal');
  const form = document.getElementById('formDistributor');

  if (!modal) return;

  // Open modal
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking overlay outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('reg_nama').value.trim();
      const tglLahir = document.getElementById('reg_tgl_lahir').value;
      const noWa = document.getElementById('reg_wa').value.trim();
      const email = document.getElementById('reg_email').value.trim();
      const ktp = document.getElementById('reg_ktp').value.trim();
      const alamat = document.getElementById('reg_alamat').value.trim();
      const rtrw = document.getElementById('reg_rtrw').value.trim();
      const desa = document.getElementById('reg_desa').value.trim();
      const kec = document.getElementById('reg_kec').value.trim();
      const kota = document.getElementById('reg_kota').value.trim();
      const prov = document.getElementById('reg_prov').value.trim();
      const pos = document.getElementById('reg_pos').value.trim();
      const namaPasangan = document.getElementById('reg_nama_pasangan').value.trim();
      const nikPasangan = document.getElementById('reg_nik_pasangan').value.trim();

      // Validasi KTP
      if (ktp.length !== 16 || isNaN(ktp)) {
        alert('Nomor KTP harus terdiri dari 16 digit angka sesuai KTP resmi!');
        return;
      }

      if (nikPasangan && !/^\d{16}$/.test(nikPasangan)) {
        alert('NIK pasangan harus terdiri dari 16 digit angka jika diisi!');
        return;
      }

      // Format WhatsApp Message
      const message = `*FORMULIR PENDAFTARAN DISTRIBUTOR RESMI GREENZHI SHUANG HOR*%0A` +
        `-----------------------------------------%0A` +
        `*Nama Lengkap:* ${encodeURIComponent(nama)}%0A` +
        `*No. KTP:* ${encodeURIComponent(ktp)}%0A` +
        `*Tanggal Lahir:* ${encodeURIComponent(tglLahir)}%0A` +
        `*No. WhatsApp:* ${encodeURIComponent(noWa)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Alamat Lengkap:* ${encodeURIComponent(alamat)}%0A` +
        `*RT/RW:* ${encodeURIComponent(rtrw)}%0A` +
        `*Kelurahan/Desa:* ${encodeURIComponent(desa)}%0A` +
        `*Kecamatan:* ${encodeURIComponent(kec)}%0A` +
        `*Kabupaten/Kota:* ${encodeURIComponent(kota)}%0A` +
        `*Provinsi:* ${encodeURIComponent(prov)}%0A` +
        `*Kode Pos:* ${encodeURIComponent(pos)}%0A` +
        `*Nama Pasangan:* ${encodeURIComponent(namaPasangan || '-')}%0A` +
        `*NIK Pasangan:* ${encodeURIComponent(nikPasangan || '-')}%0A` +
        `-----------------------------------------%0A` +
        `_Saya menyatakan data ini valid untuk proses pendaftaran kemitraan PT. Shuang Hor Indonesia._`;

      const waAdmin = '6281327697426';
      const waUrl = `https://api.whatsapp.com/send?phone=${waAdmin}&text=${message}`;

      // Open WhatsApp
      window.open(waUrl, '_blank');

      // Close modal & reset form
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      form.reset();
      alert('Terima kasih! Formulir Anda telah dialihkan ke WhatsApp Admin Greenzhi untuk diproses.');
    });
  }
}

/* ==========================================
   5. BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
