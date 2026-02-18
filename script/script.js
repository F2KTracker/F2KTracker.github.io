document.addEventListener('DOMContentLoaded', () => {

    // --- Loading Spinner ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(() => loader.remove(), 500);
            }
        }, 600);
    });

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top');
    const onScroll = () => {
        const y = window.scrollY;
        if (y > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Show/hide scroll-to-top button
        if (scrollTopBtn) {
            if (y > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Scroll-to-Top Button ---
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Mobile Hamburger ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navbar-links');
    const overlay = document.getElementById('nav-overlay');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        overlay.classList.toggle('active');
    };
    const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
    };

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Command Card Toggle ---
    const commandsGrid = document.getElementById('commands-grid');
    if (commandsGrid) {
        commandsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.cmd-card');
            if (!card) return;
            const isExpanded = card.classList.contains('expanded');
            commandsGrid.querySelectorAll('.cmd-card.expanded').forEach(c => {
                c.classList.remove('expanded');
            });
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const yOffset = -80;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // --- Typing Effect ---
    const typingEl = document.getElementById('typing-text');
    if (typingEl) {
        const words = ['free games', 'epic deals', 'giveaways', 'beta keys'];
        let wordIndex = 0;
        let charIndex = words[0].length;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 50;
        const pauseEnd = 2000;
        const pauseStart = 500;

        function typeLoop() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                charIndex--;
                typingEl.textContent = currentWord.substring(0, charIndex);

                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(typeLoop, pauseStart);
                    return;
                }
                setTimeout(typeLoop, deleteSpeed);
            } else {
                charIndex++;
                typingEl.textContent = currentWord.substring(0, charIndex);

                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, pauseEnd);
                    return;
                }
                setTimeout(typeLoop, typeSpeed);
            }
        }

        // Start after initial pause
        setTimeout(() => {
            isDeleting = true;
            typeLoop();
        }, 2500);
    }

    // --- Particle Background ---
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;
        const maxDist = 120;

        function resizeCanvas() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(88, 101, 242, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(88, 101, 242, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(animate);
        }
        animate();
    }

});
