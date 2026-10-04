

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const heroSlides = document.querySelectorAll('.hero-slide-bg');
  let currentSlide = 0;
  const slideIntervalTime = 5000;

  function nextHeroSlide() {
    if (heroSlides.length <= 1) return;
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }

  if (heroSlides.length > 0) {
    setInterval(nextHeroSlide, slideIntervalTime);
  }

  const floatingNavbar = document.querySelector('.navbar-floating');
  window.addEventListener('scroll', function () {
    if (!floatingNavbar) return;
    if (window.scrollY > 40) {
      floatingNavbar.classList.add('scrolled');
    } else {
      floatingNavbar.classList.remove('scrolled');
    }
  });


  const offcanvasElement = document.getElementById('offcanvasNav');
  const offcanvasLinks = document.querySelectorAll('.offcanvas-nav-link');
  if (offcanvasElement && typeof bootstrap !== 'undefined') {
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    offcanvasLinks.forEach(link => {
      link.addEventListener('click', () => {
        bsOffcanvas.hide();
      });
    });
  }


  const bookingForm = document.getElementById('whatsappBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim() || 'عميل كريم';
      const phone = document.getElementById('clientPhone')?.value.trim() || 'غير محدد';
      const district = document.getElementById('clientDistrict')?.value.trim() || 'الرياض';
      const service = document.getElementById('clientService')?.value || 'استشارة عامة';
      const notes = document.getElementById('clientNotes')?.value.trim() || 'يرجى التواصل لتحديد موعد المعاينة';

      const message =
`السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وحجز موعد معاينة مجانية من *مقاولات عامة*:
━━━━━━━━━━━━━━━━━━
👤 *الاسم:* ${name}
📱 *رقم الجوال:* ${phone}
📍 *الحي:* ${district}
🛠️ *نوع الخدمة:* ${service}
📝 *ملاحظات إضافية:* ${notes}
━━━━━━━━━━━━━━━━━━
الموقع: الرياض - 0543595461`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/966543595461?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    });
  }


  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightboxModal && lightboxImg && typeof bootstrap !== 'undefined') {
    const bsModal = new bootstrap.Modal(lightboxModal);

    galleryItems.forEach(item => {
      item.addEventListener('click', function () {
        if (item.classList.contains('gallery-item--empty')) return;
        const img = item.querySelector('img');
        const title = item.querySelector('h5')?.innerText || 'أعمال مقاولات عامة بالرياض';
        const subtitle = item.querySelector('p')?.innerText || '';

        if (img && img.style.display !== 'none') {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || title;
          if (lightboxCaption) {
            lightboxCaption.innerHTML = `<strong>${title}</strong>${subtitle ? ' - ' + subtitle : ''}`;
          }
          bsModal.show();
        }
      });
    });
  }


  const counterElements = document.querySelectorAll('.stat-number[data-target]');
  let countersTriggered = false;

  function runCounters() {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 30));

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.innerText = target + suffix;
          clearInterval(timer);
        } else {
          counter.innerText = count + suffix;
        }
      }, 40);
    });
  }

  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-strip-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }


  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});