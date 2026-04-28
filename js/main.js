document.addEventListener("DOMContentLoaded", function() {
    // Smoother Reveal
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Magnetic Buttons Logic (Gen-Z modern interaction)
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            // Move the button itself slightly
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

    // Smooth Scrolling
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

    // Mobile Menu Logic
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

    // Scroll Spy & Header State
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        // Header State
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Scroll Spy
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

    // Contact Form Handler
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                const message = document.createElement('div');
                message.className = 'form-success mt-8 reveal visible';
                message.textContent = 'Project inquiry received. We will contact you within 24 hours.';
                contactForm.appendChild(message);
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();

                setTimeout(() => message.remove(), 5000);
            }, 1500);
        });
    }
    // Portfolio Infinite Loop & Drag Logic
    const scrollContainer = document.querySelector('.portfolio-scroll-container');
    if (scrollContainer) {
        const originalItems = [...scrollContainer.querySelectorAll('.portfolio-item')];
        
        // Clone items for infinite loop (maintain correct sequence)
        const clonesBefore = originalItems.map(item => item.cloneNode(true));
        const clonesAfter = originalItems.map(item => item.cloneNode(true));

        // Append to end
        clonesAfter.forEach(clone => scrollContainer.appendChild(clone));
        // Prepend to start (reverse loop to maintain order with insertBefore)
        clonesBefore.reverse().forEach(clone => {
            scrollContainer.insertBefore(clone, scrollContainer.firstChild);
        });

        // Calculate metrics
        const getMetrics = () => {
            const firstItem = scrollContainer.querySelector('.portfolio-item');
            const style = window.getComputedStyle(scrollContainer);
            const gap = parseFloat(style.gap) || 0;
            return firstItem.offsetWidth + gap;
        };

        // Initial Position (centered on original items)
        let itemWidth = getMetrics();
        // Use requestAnimationFrame for a clean jump before next paint
        requestAnimationFrame(() => {
            scrollContainer.scrollLeft = itemWidth * originalItems.length;
        });

        // Resize handling
        window.addEventListener('resize', () => {
            itemWidth = getMetrics();
        });

        // Infinite Scroll Boundary Logic
        scrollContainer.addEventListener('scroll', () => {
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const currentScroll = scrollContainer.scrollLeft;
            const threshold = 10; // Precision buffer

            if (currentScroll <= threshold) {
                // Jump to the second set
                scrollContainer.scrollLeft = itemWidth * originalItems.length;
            } else if (currentScroll >= maxScroll - threshold) {
                // Jump back to the second set
                scrollContainer.scrollLeft = maxScroll - (itemWidth * originalItems.length);
            }
        });

        // Drag to Scroll Logic
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.classList.add('active');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            scrollContainer.style.scrollSnapType = 'none'; // Disable snap during drag
        });
        
        const stopDragging = () => {
            if (!isDown) return;
            isDown = false;
            scrollContainer.classList.remove('active');
            scrollContainer.style.scrollSnapType = 'x mandatory'; // Re-enable snap
        };

        scrollContainer.addEventListener('mouseleave', stopDragging);
        scrollContainer.addEventListener('mouseup', stopDragging);
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1.5; 
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Portfolio Video Embedding (Using Event Delegation for Clones)
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
            // Hide UI
            if (thumbnail) thumbnail.classList.add('opacity-0');
            playBtn.classList.add('opacity-0', 'pointer-events-none');

            // Show video
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
    // WhatsApp Smart-Hide Logic
    const whatsappBtn = document.getElementById('whatsapp-float');
    if (whatsappBtn) {
        let scrollTimeout;
        
        // Initial show after 2 seconds
        setTimeout(() => {
            whatsappBtn.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            whatsappBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-0');
        }, 2000);

        window.addEventListener('scroll', () => {
            // Instantly hide on scroll
            whatsappBtn.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
            whatsappBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-0');

            // Clear existing timeout
            clearTimeout(scrollTimeout);

            // Re-show after 800ms of no scrolling
            scrollTimeout = setTimeout(() => {
                whatsappBtn.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
                whatsappBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-0');
            }, 800);
        });
    }
});
