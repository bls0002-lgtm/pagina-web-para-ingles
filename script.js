// Sound Elements
const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');
const motoSound = document.getElementById('motoSound');

// Interaction Sounds
const interactiveElements = document.querySelectorAll('a, button, .media-card, .routine-card, .skill-box');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if(hoverSound) {
            hoverSound.volume = 0.1;
            hoverSound.currentTime = 0;
            hoverSound.play().catch(()=>{});
        }
    });
    el.addEventListener('click', () => {
        if(clickSound) {
            clickSound.volume = 0.3;
            clickSound.currentTime = 0;
            clickSound.play().catch(()=>{});
        }
    });
});

// Moto Engine Sound Button
const motoBtn = document.getElementById('play-moto-btn');
if(motoBtn && motoSound) {
    motoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        motoSound.volume = 0.6;
        motoSound.currentTime = 0;
        motoSound.play();
        const originalText = motoBtn.innerHTML;
        motoBtn.innerHTML = '<i class="fa-solid fa-fire"></i> REVIVING...';
        setTimeout(() => {
            motoBtn.innerHTML = originalText;
        }, 2500);
    });
}

// Typing Effect
const texts = ["NETWORK ADMIN", "CLOUD ENGINEER", "MOTORCYCLE RIDER", "ASIR STUDENT"];
let count = 0, index = 0;
const typingElement = document.getElementById('typing-text');
function type() {
    if(!typingElement) return;
    if (count === texts.length) count = 0;
    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);
    typingElement.textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(() => { index = 0; count++; type(); }, 2000);
    } else {
        setTimeout(type, 80);
    }
}
window.onload = type;

// Scroll Animations & Skill Bars
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.classList.contains('progress')) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.media-card, .routine-card, .goals-content, .english-content, .progress');
animatedElements.forEach((el, i) => {
    if(!el.classList.contains('progress')){
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${i % 3 * 0.1}s`;
    }
    observer.observe(el);
});

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 2000); // 2 seconds engine boot
    }
});
