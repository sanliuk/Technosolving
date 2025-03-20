// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Active Navigation Link Highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form Submission with Animation
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('.submit-button');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Add loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        submitButton.innerHTML = '<i class="fas fa-check"></i>';
        submitButton.style.backgroundColor = '#10B981';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
        }, 2000);
    }, 1500);
});

// Scroll to Top Button with Animation
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'flex';
        setTimeout(() => {
            scrollButton.style.opacity = '1';
        }, 10);
    } else {
        scrollButton.style.opacity = '0';
        setTimeout(() => {
            scrollButton.style.display = 'none';
        }, 300);
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .service-card, .solution-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Add scroll-top button styles
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, var(--primary-color), var(--primary-dark));
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
    }
    
    .scroll-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
    }

    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-toggle.active i {
        transform: rotate(90deg);
    }

    .nav-toggle i {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Night Mode Toggle
const nightModeToggle = document.getElementById('nightModeToggle');
const icon = nightModeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

nightModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon with animation
    icon.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        icon.style.transform = 'rotate(0)';
    }, 300);
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }

    // Event listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Auto play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Start auto play
    startAutoPlay();

    // Pause auto play on hover
    wrapper.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    wrapper.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}); 