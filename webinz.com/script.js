document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        window.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    const header = document.getElementById('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                header.style.backgroundColor = 'rgba(248, 249, 250, 0.98)';
            } else {
                header.style.boxShadow = 'none';
                header.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    const sections = document.querySelectorAll('section');
    const scrollSpy = () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; 
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    };
    window.addEventListener('scroll', scrollSpy, { passive: true });

    const animatedElements = document.querySelectorAll('.pricing-card, .about-content, .benefit-item, .section-title');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0 
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-show');
            } else {
                entry.target.classList.remove('animate-show');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('animate-hidden'); 
        sectionObserver.observe(el);
    });

    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const promoDurations = {
        starter: 10 * 60 * 60 * 1000, 
        bisnis: 6 * 60 * 60 * 1000,   
        sistem: 8 * 60 * 60 * 1000    
    };

    function initializeTimer(paketName, durationMs, elementId) {
        const storageKey = `webinz_timer_${paketName}`;
        let endTime = localStorage.getItem(storageKey);
        const currentTime = new Date().getTime();

        if (!endTime || currentTime > parseInt(endTime)) {
            endTime = currentTime + durationMs;
            localStorage.setItem(storageKey, endTime);
        }

        const timerContainer = document.getElementById(elementId);
        if (!timerContainer) return; 

        const hEl = timerContainer.querySelector('.t-hours');
        const mEl = timerContainer.querySelector('.t-minutes');
        const sEl = timerContainer.querySelector('.t-seconds');

      
        function updateDisplay() {
            const now = new Date().getTime();
            let distance = parseInt(localStorage.getItem(storageKey)) - now;
            
            if (distance <= 0) { 
                let newEndTime = new Date().getTime() + durationMs;
                localStorage.setItem(storageKey, newEndTime);
                distance = durationMs;
            }

            
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            
            hEl.textContent = hours < 10 ? '0' + hours : hours;
            mEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            sEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        
        setInterval(updateDisplay, 1000);
        updateDisplay(); 
    }

    
    initializeTimer('starter', promoDurations.starter, 'timer-starter');
    initializeTimer('bisnis', promoDurations.bisnis, 'timer-bisnis');
    initializeTimer('sistem_baru', promoDurations.sistem, 'timer-sistem');


    /*portofolio.html*/
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

