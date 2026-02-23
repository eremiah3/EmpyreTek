    // Create animated particles
    function createParticles() {
        const bgAnimation = document.getElementById('bgAnimation');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            bgAnimation.appendChild(particle);
        }

        // Create tech spheres as part of particles
        createTechSpheres(bgAnimation);
    }

    function createTechSpheres(container) {
        const colors = ['var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-pink)'];

        for (let i = 0; i < 3; i++) {
            const sphere = document.createElement('div');
            sphere.className = 'tech-node';
            sphere.style.left = Math.random() * 100 + '%';
            sphere.style.top = Math.random() * 100 + '%';
            sphere.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
            sphere.style.animationDuration = (Math.random() * 10 + 15) + 's';
            sphere.style.animationDelay = Math.random() * 5 + 's';

            container.appendChild(sphere);
        }

        // Create floating tech nodes like particles
        for (let i = 0; i < 8; i++) {
            const node = document.createElement('div');
            node.className = 'tech-node';
            node.style.left = Math.random() * 100 + '%';
            node.style.animationDuration = (Math.random() * 10 + 10) + 's';
            node.style.animationDelay = Math.random() * 5 + 's';
            node.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(node);
        }
    }

    createParticles();

    // Mobile Navigation
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.about-card, .service-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Initialize EmailJS
    (function(){
        emailjs.init("g64K8ESSaAtIO5e44"); // Public Key
    })();

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            company: formData.get('company') || 'Not specified',
            message: formData.get('message'),
            time: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
            current_year: new Date().getFullYear(),
            to_email: 'agboolagbolahan14@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send('service_b7euula', 'template_4jniva6', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your message! We will contact you soon to start building your empire.');
                e.target.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            });
    });

    // Tech sphere parallax effect
    const techSpheres = document.querySelectorAll('.tech-sphere');
    techSpheres.forEach((sphere, index) => {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * (10 + index * 5);
            const y = (e.clientY / window.innerHeight - 0.5) * (10 + index * 5);
            sphere.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${sphere.style.animationDuration ? parseFloat(sphere.style.animationDuration) * 360 : 0}deg)`;
        });
    });
