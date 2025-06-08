// DOM Elements
const preloader = document.querySelector('.preloader');
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const backToTop = document.querySelector('.back-to-top');
const typedElement = document.querySelector('.typed-text');
const sections = document.querySelectorAll('section[id]');
const animatedElements = document.querySelectorAll('.about-text, .about-image, .timeline-item, .experience-card, .project-card, .skills-group, .skill-icon, .certification-card, .contact-info, .contact-form');

// Typed.js Text Effect
let typed;
if (typedElement) {
    typed = new Typed('.typed-text', {
        strings: ['Data Analyst', 'Developer', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
}

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('show');
    });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('show');
    });
});

// Active link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Dark Mode Toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        // Change icon based on mode
        if (document.body.classList.contains('light-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Save preference to localStorage
        const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('preferredMode', mode);
    });

    // Check for saved user preference
    const savedMode = localStorage.getItem('preferredMode');
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach(element => {
    observer.observe(element);
});

// Initialize skill progress bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const value = bar.getAttribute('data-value');
                bar.style.width = `${value}%`;
            });
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.skills-group').forEach(group => {
    skillObserver.observe(group);
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Name is required');
        } else {
            removeError(name);
        }

        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email');
        } else {
            removeError(email);
        }

        if (message.value.trim() === '') {
            isValid = false;
            showError(message, 'Message is required');
        } else {
            removeError(message);
        }

        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        `;
            }, 1500);
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');

    if (!formGroup.querySelector('.error-message')) {
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }

    errorElement.innerText = message;
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
        formGroup.removeChild(errorElement);
    }

    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }

                // Reset and trigger animation
                card.classList.remove('show');
                setTimeout(() => {
                    if (card.style.display === 'block') {
                        card.classList.add('show');
                    }
                }, 100);
            });
        });
    });
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Resume Download Button Animation
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('mouseenter', () => {
        resumeBtn.innerHTML = 'Download CV <i class="fas fa-download"></i>';
    });

    resumeBtn.addEventListener('mouseleave', () => {
        resumeBtn.innerHTML = 'Download CV';
    });
}