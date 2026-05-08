document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -10% 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            btn.children[0].style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseout', function(e) {
            btn.children[0].style.transform = `translate(0px, 0px)`;
            btn.children[0].style.transition = 'transform 0.3s ease';
        });
        
        btn.addEventListener('mouseenter', function(e) {
            btn.children[0].style.transition = 'none';
        });
    });

    const allHashLinks = document.querySelectorAll('a[href^="#"]');
    allHashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileIcon = document.getElementById('menu-text');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, nav a');
    
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            mobileIcon.textContent = 'Close';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileIcon.textContent = 'Menu';
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-link-active', 'text-white');
            link.classList.add('text-white/60');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('nav-link-active', 'text-white');
                link.classList.remove('text-white/60');
            }
        });
    });

    const contactForm = document.getElementById('sparrow-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            const formData = {
                name: document.getElementById('contact-name').value,
                brand: document.getElementById('contact-brand').value,
                email: document.getElementById('contact-email').value,
                service: document.getElementById('contact-service').value,
                message: document.getElementById('contact-message').value
            };

            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzUk87Ld3Ov9ZaEBLFCOZ3ZPH792wsAAd7baHC1V_fTexzS9kQyM_J0k0uCSAvsywZ4A/exec';

            if (SCRIPT_URL && SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
                submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Sending...';
                submitBtn.disabled = true;

                try {
                    await fetch(SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const message = document.createElement('div');
                    message.className = 'form-success mt-8 reveal visible p-5 rounded-2xl font-black text-center shadow-[0_10px_30px_rgba(250,204,21,0.2)] uppercase tracking-wide';
                    message.style.backgroundColor = '#FACC15';
                    message.style.color = '#111111';
                    message.style.border = 'none';
                    message.textContent = 'Project inquiry received. We will contact you within 24 hours.';
                    contactForm.appendChild(message);
                    
                    contactForm.reset();
                    setTimeout(() => message.remove(), 5000);

                } catch (error) {
                    console.error('Submission error:', error);
                    const message = document.createElement('div');
                    message.className = 'form-error mt-8 reveal visible bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20 font-bold text-center';
                    message.textContent = 'Something went wrong. Please try again or email us directly.';
                    contactForm.appendChild(message);
                    setTimeout(() => message.remove(), 5000);
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
                return;
            }

            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const message = document.createElement('div');
                message.className = 'form-success mt-8 reveal visible p-5 rounded-2xl font-black text-center shadow-[0_10px_30px_rgba(250,204,21,0.2)] uppercase tracking-wide';
                message.style.backgroundColor = '#FACC15';
                message.style.color = '#111111';
                message.style.border = 'none';
                message.textContent = 'Project inquiry received.';
                contactForm.appendChild(message);
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();

                setTimeout(() => message.remove(), 5000);
            }, 1500);
        });
    }

    const scrollContainer = document.querySelector('.portfolio-scroll-container');
    if (scrollContainer) {
        const originalItems = [...scrollContainer.querySelectorAll('.portfolio-item')];
        
        const clonesBefore = originalItems.map(item => item.cloneNode(true));
        const clonesAfter = originalItems.map(item => item.cloneNode(true));

        clonesAfter.forEach(clone => scrollContainer.appendChild(clone));
        clonesBefore.reverse().forEach(clone => {
            scrollContainer.insertBefore(clone, scrollContainer.firstChild);
        });

        const getMetrics = () => {
            const firstItem = scrollContainer.querySelector('.portfolio-item');
            const style = window.getComputedStyle(scrollContainer);
            const gap = parseFloat(style.gap) || 0;
            return firstItem.offsetWidth + gap;
        };

        let itemWidth = getMetrics();
        const totalOriginalWidth = itemWidth * originalItems.length;

        // Initialize scroll position
        requestAnimationFrame(() => {
            scrollContainer.scrollLeft = totalOriginalWidth;
        });

        window.addEventListener('resize', () => {
            itemWidth = getMetrics();
        });

        // Optimized scroll listener using requestAnimationFrame for smoothness
        let isTicking = false;
        scrollContainer.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = scrollContainer.scrollLeft;
                    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                    const threshold = 20;

                    if (currentScroll <= threshold) {
                        scrollContainer.scrollLeft = currentScroll + totalOriginalWidth;
                    } else if (currentScroll >= maxScroll - threshold) {
                        scrollContainer.scrollLeft = currentScroll - totalOriginalWidth;
                    }
                    isTicking = false;
                });
                isTicking = true;
            }
        }, { passive: true });

        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.classList.add('active');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        
        const stopDragging = () => {
            if (!isDown) return;
            isDown = false;
            scrollContainer.classList.remove('active');
        };

        scrollContainer.addEventListener('mouseleave', stopDragging);
        scrollContainer.addEventListener('mouseup', stopDragging);
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }

    document.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-overlay');
        if (!playBtn) return;

        const item = playBtn.closest('.portfolio-item');
        if (!item) return;

        const videoContainer = item.querySelector('.video-container');
        const reelId = item.getAttribute('data-reel-id');
        const platform = item.getAttribute('data-video-platform') || 'instagram';
        const thumbnail = item.querySelector('.thumbnail-img');

        if (videoContainer && reelId) {
            if (thumbnail) thumbnail.classList.add('opacity-0');
            playBtn.classList.add('opacity-0', 'pointer-events-none');

            videoContainer.classList.remove('hidden');
            videoContainer.innerHTML = ''; 

            let embedHtml = '';
            if (platform === 'youtube') {
                videoContainer.className = 'video-container absolute inset-0 z-40 bg-black flex items-center justify-center youtube-short';
                embedHtml = `
                    <iframe 
                        src="https://www.youtube.com/embed/${reelId}?autoplay=1&rel=0&modestbranding=1&controls=0" 
                        class="w-full h-full border-none"
                        style="object-fit: contain;"
                        allow="autoplay; encrypted-media; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            } else {
                videoContainer.className = 'video-container absolute inset-0 z-40 bg-black flex items-center justify-center instagram-reel';
                const embedUrl = platform === 'instagram-post' 
                    ? `https://www.instagram.com/p/${reelId}/embed/` 
                    : `https://www.instagram.com/reel/${reelId}/embed/`;
                
                embedHtml = `
                    <iframe src="${embedUrl}" class="w-full h-full border-none overflow-hidden" style="object-fit: contain;" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                `;
            }
            videoContainer.innerHTML = embedHtml;
        }
    });

    const whatsappBtn = document.getElementById('whatsapp-float');
    if (whatsappBtn) {
        let scrollTimeout;
        
        setTimeout(() => {
            whatsappBtn.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            whatsappBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-0');
        }, 2000);

        window.addEventListener('scroll', () => {
            whatsappBtn.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
            whatsappBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-0');

            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                whatsappBtn.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
                whatsappBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-0');
            }, 800);
        });
    }

    const group1 = document.getElementById('hero-text-group-1');
    const group2 = document.getElementById('hero-text-group-2');
    
    if (group1 && group2) {
        let isGroup1Active = true;
        
        setInterval(() => {
            if (isGroup1Active) {
                group1.className = 'hero-text-group exit-up';
                group2.className = 'hero-text-group active';
                setTimeout(() => {
                    group1.className = 'hero-text-group enter-down';
                }, 1200);
            } else {
                group2.className = 'hero-text-group exit-up';
                group1.className = 'hero-text-group active';
                setTimeout(() => {
                    group2.className = 'hero-text-group enter-down';
                }, 1200);
            }
            isGroup1Active = !isGroup1Active;
        }, 4000);
    }
});
