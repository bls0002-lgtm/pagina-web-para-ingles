// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        setTimeout(() => {
            follower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
        }, 50);
    });

    const interactiveElements = document.querySelectorAll('a, button, .media-card, .routine-card, .skill-box, .nav-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform += ' scale(1.5)';
            follower.style.borderColor = 'var(--accent-color)';
            follower.style.backgroundColor = 'rgba(255,0,85,0.1)';
            // Play hover sound at low volume
            hoverSound.volume = 0.1;
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => {}); 
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
            follower.style.borderColor = 'var(--primary-color)';
            follower.style.backgroundColor = 'transparent';
        });
        el.addEventListener('click', () => {
            clickSound.volume = 0.3;
            clickSound.currentTime = 0;
            clickSound.play().catch(e => {});
        });
    });
}

// Engine Sound Button
const motoBtn = document.getElementById('play-moto-btn');
const motoSound = document.getElementById('motoSound');
if(motoBtn) {
    motoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        motoSound.volume = 0.5;
        motoSound.currentTime = 0;
        motoSound.play();
        motoBtn.innerHTML = '<i class="fa-solid fa-motorcycle"></i> Vroom...';
        setTimeout(() => {
            motoBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Engine Sound';
        }, 2000);
    });
}

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if(document.body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// Typing Effect
const texts = ["Age: 18", "Studies: ASIR", "Future Cloud Engineer", "Motorcycle Rider"];
let count = 0, index = 0;
const typingElement = document.getElementById('typing-text');
function type() {
    if (count === texts.length) count = 0;
    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);
    typingElement.textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(() => { index = 0; count++; type(); }, 2000);
    } else {
        setTimeout(type, 100);
    }
}
window.onload = type;

// Intersection Observer for Scroll Animations & Skill Bars
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.filter = 'blur(0px)';
            
            // If it's a progress bar, animate its width
            if (entry.target.classList.contains('progress')) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.media-card, .routine-card, .tips-container, .goals-content, .english-content, .section-title, .progress');

animatedElements.forEach((el, i) => {
    if(!el.classList.contains('progress')){
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        el.style.filter = 'blur(5px)';
        el.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i % 3 * 0.1}s`;
    }
    observer.observe(el);
});

// Navbar background
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Particles
const canvasContainer = document.getElementById('particles-background');
for(let i=0; i<40; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = Math.random() * 3 + 'px';
    p.style.height = p.style.width;
    p.style.background = 'rgba(0, 240, 255, 0.3)';
    p.style.borderRadius = '50%';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
    
    if(i===0){
        const style = document.createElement('style');
        style.innerHTML = `@keyframes float { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-100vh); opacity: 0; } }`;
        document.head.appendChild(style);
    }
    canvasContainer.appendChild(p);
}

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
                preloader.style.display = 'none';
            }, 1000);
        }, 2500);
    }
});
