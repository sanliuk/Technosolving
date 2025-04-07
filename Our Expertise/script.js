// Expertise data
const expertiseData = {
    instruments: {
        title: "Instruments",
        description: "High-precision instruments and measurement solutions for industrial applications",
        images: [


            "../Img/INSTRUMENTS a OUR PARTNERS/thermowell.JPG",
            "../Img/INSTRUMENTS a OUR PARTNERS/pressure.JPG",
            "../Img/INSTRUMENTS a OUR PARTNERS/CPS11E-pH-sensor-Memosens-straight.jpg",
            "../Img/INSTRUMENTS a OUR PARTNERS/differential pressure.JPG",
            "../Img/INSTRUMENTS a OUR PARTNERS/instrument5.jpg"
        ],
        details: [
            "Electronic pressure transmitter",
            "Electronic differential pressure transmitter",
            "Electronic level transmitter",
            "Electronic temperature transmitter",
            "Vibration transmitter",
            "Sodium analyser",
            "Multiparameter transmitter",
            "PH, Conductivity, O2 H sensor",
            "Bimetal thermometer",
            "Pressure gauge",
            "Differential pressure gauge",
            "Glass level gauge"
        ]
    },
    mechanical: {
        title: "Mechanical Components",
        description: "High-quality mechanical components and systems for industrial applications",
        images: [
            "../Img/MECHANICAL COMPONENTS/DAMPER.jpg",
            "../Img/MECHANICAL COMPONENTS/air_treatment.jpg",
            "../Img/MECHANICAL COMPONENTS/Mech3.png"
        ],
        details: [
            "Fans",
            "Dampers",
            "Air Filters",
            "Bearings",
            "Roller guides",
            "Forged components in special steel"
        ]
    },
    metalworking: {
        title: "Metalworking",
        description: "Professional metalworking solutions and equipment",
        images: [
            "../Img/METALWORKING/Metal1.png",
            "../Img/METALWORKING/metal2.jpg",
            "../Img/METALWORKING/metal3.jpg"
        ],
        details: [
            "Laser machines",
            "Waterjet machines",
            "Spare parts",
            "Consumables",
            "Lubricants"
        ]
    },
    thermal: {
        title: "Thermal & Acoustic",
        description: "Advanced thermal and acoustic solutions for industrial applications",
        images: [
            "../Img/THERMAL&ACOUSTIC/SILENCERS.jpg",
            "../Img/THERMAL&ACOUSTIC/texile joint.jpg",
            "../Img/THERMAL&ACOUSTIC/Therm3.jpg",
            "../Img/THERMAL&ACOUSTIC/Therm4.jpg",
            "../Img/THERMAL&ACOUSTIC/Therm5.jpg"
        ],
        details: [
            "Silica Fabric",
            "Glass Fabric",
            "Special rock wool",
            "Needlemat",
            "Ceramic fiber",
            "Jackets",
            "Pillows",
            "Silencers",
            "Texile joint"
        ]
    }
};

// Carousel functionality
let currentSlide = 0;
let currentExpertise = 'instruments';
let autoPlayInterval;

function updateExpertise(expertise) {
    currentExpertise = expertise;
    currentSlide = 0;
    
    // Update title and description
    document.getElementById('expertise-title').textContent = expertiseData[expertise].title;
    document.getElementById('expertise-description').textContent = expertiseData[expertise].description;
    
    // Update carousel images
    const carousel = document.getElementById('expertise-carousel');
    carousel.innerHTML = '';
    
    expertiseData[expertise].images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${image}" alt="${expertiseData[expertise].title} ${index + 1}">`;
        carousel.appendChild(slide);
    });
    
    // Update dots
    updateDots();
    
    // Reset carousel position
    carousel.style.transform = `translateX(0)`;
    
    // Update active link
    document.querySelectorAll('.expertise-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.expertise === expertise) {
            link.classList.add('active');
        }
    });

    // Update expertise details
    const expertiseList = document.getElementById('expertise-list');
    expertiseList.innerHTML = `
        <div class="expertise-item">
            <h3>${expertiseData[expertise].title} Products</h3>
            <ul>
                ${expertiseData[expertise].details.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

function updateDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    dotsContainer.innerHTML = '';
    
    expertiseData[currentExpertise].images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === currentSlide ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    currentSlide = index;
    const carousel = document.getElementById('expertise-carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % expertiseData[currentExpertise].images.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + expertiseData[currentExpertise].images.length) % expertiseData[currentExpertise].images.length;
    goToSlide(currentSlide);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize expertise
    updateExpertise('instruments');
    
    // Carousel buttons
    document.querySelector('.carousel-button.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-button.prev').addEventListener('click', prevSlide);
    
    // Expertise links
    document.querySelectorAll('.expertise-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const expertise = e.target.dataset.expertise;
            updateExpertise(expertise);
        });
    });
    
    // Mobile navigation
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Night mode toggle
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
}); 