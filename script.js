/*
    Dijital Gençlik Merkezi - Dinamik Özellikler
    Slider, Sayaç ve Animasyon Yönetimi
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;
    const slideInterval = 5000;

    const showSlide = (n) => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Otomatik geçiş
    setInterval(nextSlide, slideInterval);


    // --- 2. Header Arka Plan Değişimi ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });


    // --- 3. İstatistik Sayacı Animasyonu ---
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const startCounter = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const speed = 200; // Hız ayarı
            
            const updateCount = () => {
                const count = +stat.innerText;
                const inc = target / speed;

                if (count < target) {
                    stat.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    };


    // --- 4. Scroll Reveal & Intersection Observer ---
    const revealElements = document.querySelectorAll('.reveal');

    const observerOption = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Eğer istatistik bölümündeyse sayacı başlat
                if (entry.target.classList.contains('stat-item') && !animated) {
                    startCounter();
                    animated = true;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOption);

    revealElements.forEach(el => observer.observe(el));


    // --- 5. Mobil Menü ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuToggle.classList.toggle('open');
        });

        // Linke tıklanınca menüyü kapat
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                menuToggle.classList.remove('open');
            });
        });
    }
});
