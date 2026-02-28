// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    // Observe elements that should fade in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Directly reveal first section hero text immediately without waiting for scroll
    setTimeout(() => {
        const heroElem = document.querySelector('#hero .fade-in');
        if (heroElem) {
            heroElem.classList.add('visible');
        }
    }, 150);

    // Initialize decorative particle background
    createParticles();

    // Start countdown timer
    startCountdown();
});

// Particles Generation (Soft Gold Dust)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 40; // Number of floating particles

    for (let i = 0; i < particleCount; i++) {
        let span = document.createElement('span');
        span.classList.add('particle');
        
        // Randomize size, position, delay, and speed
        let size = Math.random() * 6 + 2; // 2px to 8px
        let posX = Math.random() * 100; // 0vw to 100vw
        let delay = Math.random() * 15; // 0s to 15s
        let duration = Math.random() * 15 + 15; // 15s to 30s

        span.style.width = `${size}px`;
        span.style.height = `${size}px`;
        span.style.left = `${posX}vw`;
        span.style.animationDelay = `${delay}s`;
        span.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(span);
    }
}

// Countdown Timer Logic
function startCountdown() {
    // Define the wedding target date
    const weddingDate = new Date("April 30, 2026 10:30:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const countdownElement = document.getElementById("countdown");
        if (!countdownElement) return;

        // If the date has passed
        if (distance < 0) {
            countdownElement.innerHTML = "<h3 style='font-family: var(--font-heading); font-size: 2.5rem; color: var(--gold);'>Just Married!</h3>";
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM with padded values
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    };

    updateTimer(); // Initial call
    setInterval(updateTimer, 1000); // Update every second
}