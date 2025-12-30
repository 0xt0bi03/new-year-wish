// Create stars
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Countdown logic
const countdownEl = document.getElementById('countdown');
const messageEl = document.getElementById('message');
let count = 3;

const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
        countdownEl.textContent = count;
        countdownEl.style.animation = 'none';
        setTimeout(() => {
            countdownEl.style.animation = 'pulse 1s ease-in-out';
        }, 10);
    } else {
        clearInterval(countdownInterval);
        countdownEl.classList.add('hidden');
        messageEl.classList.remove('hidden');
        startFireworks();
    }
}, 1000);

// Fireworks
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const particles = [];

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height * 0.5;
        this.speed = 3;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.explode();
            return false;
        }
        return true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    explode() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1;
        this.alpha -= this.decay;
        return this.alpha > 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

let fireworksStarted = false;

function startFireworks() {
    fireworksStarted = true;
}

function animate() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (fireworksStarted && Math.random() < 0.1) {
        fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        if (!fireworks[i].update()) {
            fireworks.splice(i, 1);
        } else {
            fireworks[i].draw();
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) {
            particles.splice(i, 1);
        } else {
            particles[i].draw();
        }
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});