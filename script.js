document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';

            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '2rem';
                navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                navMenu.style.borderTop = '1px solid #eee';
            }
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 968 && navMenu) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });

    // Reveal on Scroll Animation (Simple)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.feature-card, .section-chat .split-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // CSS class to add via JS for the animation
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- Modal Logic ---
    const modal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalIcon = document.getElementById('modal-icon-element');
    const closeBtn = document.querySelector('.modal-close');
    const confirmBtn = document.getElementById('modal-confirm');

    const showModal = (title, text, iconName = 'info') => {
        modalTitle.textContent = title;
        modalText.textContent = text;
        modalIcon.setAttribute('data-lucide', iconName);
        lucide.createIcons(); // Re-render icon
        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Android Download Logic ---
    const androidButtons = document.querySelectorAll('a[href="Unnion.apk"]');
    androidButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal(
                '¡Descarga Iniciada!',
                'Gracias por unirte a Unnion. Tu descarga comenzará en breve. ¡Prepárate para marcar la diferencia!',
                'download'
            );
        });
    });

    // --- iOS Download Logic ---
    const iosButtons = document.querySelectorAll('.ios-download');
    iosButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(
                'Próximamente en iOS',
                'Estamos trabajando para tener la mejor versión en iOS. Mientras tanto, ¡puedes comenzar a disfrutarla en tu Android!',
                'apple'
            );
        });
    });

    // --- Back to Top Logic ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
