document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Parallax & Smooth Reveal on scroll
    const backgroundGrid = document.querySelector('.background-grid');
    const hiddenElements = document.querySelectorAll('.feature-card, .glass-panel, .glass, .spec-item, .hero-content, .split-section, .screenshot-item, .logo-container');

    // Initial Setup for Reveal
    hiddenElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        hiddenElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.85) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Unified Scroll Handler (Throttled)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Parallax (Only on Desktop for Performance)
                if (backgroundGrid && window.innerWidth > 768) {
                    const scrollY = window.scrollY;
                    backgroundGrid.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrollY * 0.5}px) translateZ(-200px)`;
                }
                // Reveal
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    revealOnScroll(); // Triger once on load

    // 3D Tilt Effect for cards (Exaggerated for cinematic feel)
    const cards = document.querySelectorAll('.glass, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Subtle tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            // Add sheen effect position
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic Stats Counter (Simulated)
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const updateCount = () => {
            const increment = target / 100;
            if (count < target) {
                count += increment;
                stat.innerText = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 16, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--glass-border)';
            }
        });
    }
});
