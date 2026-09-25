// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    
    // Follower has a slight delay
    setTimeout(() => {
        follower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
    }, 50);
});

// Add hover effect to interactive elements for cursor
const interactiveElements = document.querySelectorAll('a, button, .media-card, .routine-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.transform += ' scale(1.5)';
        follower.style.borderColor = '#ff0055'; // accent color
        follower.style.backgroundColor = 'rgba(255,0,85,0.1)';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
        follower.style.borderColor = '#00f0ff'; // primary color
        follower.style.backgroundColor = 'transparent';
    });
});

// Typing Effect
const texts = ["Age: 18", "Studies: ASIR", "Future SysAdmin", "Motorcycle Lover"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
const typingElement = document.getElementById('typing-text');

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    typingElement.textContent = letter;
    
    if (letter.length === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
            type();
        }, 2000); // Wait 2 seconds before next word
    } else {
        setTimeout(type, 100);
    }
}
// Start typing effect on load
window.onload = type;

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.filter = 'blur(0px)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.media-card, .routine-card, .tips-container, .goals-content, .english-content, .section-title');

animatedElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.95)';
    el.style.filter = 'blur(5px)';
    el.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i % 3 * 0.1}s`;
    observer.observe(el);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Simple particle background logic
const canvasContainer = document.getElementById('particles-background');
for(let i=0; i<50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(0, 240, 255, 0.2)';
    particle.style.borderRadius = '50%';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
    
    // Add keyframes dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    canvasContainer.appendChild(particle);
}
