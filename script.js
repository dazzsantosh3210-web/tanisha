// --- Particles.js Floating Hearts ---
particlesJS("particles-js", {
    particles: {
        number: { value: 60 },
        color: { value: "#ff69b4" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: 4 },
        move: { enable: true, speed: 2, direction: "top", out_mode: "out" }
    },
    interactivity: { events: { onhover: { enable: true, mode: "repulse" } } },
    retina_detect: true
});

// --- GSAP Animations for Steps ---
const steps = document.querySelectorAll('.step');
const nextButtons = document.querySelectorAll('.next-btn');
const restartBtn = document.querySelector('.restart-btn');
let currentStep = 0;

function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    gsap.fromTo(steps[index], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });
}

nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        gsap.to(steps[currentStep], {
            opacity: 0, scale: 0.8, duration: 0.5, onComplete: () => {
                currentStep++;
                if (currentStep < steps.length) showStep(currentStep);
            }
        });
    });
});

restartBtn.addEventListener('click', () => {
    gsap.to(steps[currentStep], {
        opacity: 0, duration: 0.5, onComplete: () => {
            currentStep = 0;
            showStep(currentStep);
        }
    });
});

// --- Petal Animation using Canvas ---
const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');
let petals = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createPetal() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 2 - 1
    };
}

for (let i = 0; i < 40; i++) petals.push(createPetal());

function drawPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,182,193,0.8)';
    petals.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size * 0.6, p.size, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawPetals);
}
drawPetals();

// --- Soft Fade-In for Music ---
const music = document.getElementById('bg-music');
music.volume = 0;
let fade = setInterval(() => {
    if (music.volume < 1) music.volume += 0.01;
    else clearInterval(fade);
}, 200);

// --- Header Animation ---
gsap.from(".glow", { y: -20, opacity: 0, duration: 1.2, ease: "power2.out" });