// Interactive Dark Modern Background Engine & Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60
        });
    }

    // Interactive Custom Mouse Cursor (Desktop)
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 992) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 400, fill: 'forwards' });
        });
    }

    // Typing Effect in Hero Section
    const words = ["Developer()", "SDE Aspirant", "MERN Stack", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextEl = document.getElementById('typing-text');

    function type() {
        if (!typingTextEl) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }
    type();

    // Animated Numbers Counter
    const statNums = document.querySelectorAll('.stat-num');
    let counted = false;

    function countUp() {
        statNums.forEach(num => {
            const target = +num.getAttribute('data-target');
            let count = 0;
            const increment = target / 40;
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    num.innerText = Math.ceil(count);
                    setTimeout(updateCount, 40);
                } else {
                    num.innerText = target;
                }
            };
            updateCount();
        });
    }

    window.addEventListener('scroll', () => {
        const statsRow = document.querySelector('.hero-stats-row');
        if (statsRow && !counted) {
            const pos = statsRow.getBoundingClientRect().top;
            if (pos < window.innerHeight - 50) {
                countUp();
                counted = true;
            }
        }
    });
    countUp();

    // ======================================================
    // Futuristic Interactive Cyber Constellation Mesh Engine
    // ======================================================
    const canvas = document.getElementById('antigravity-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let mouseX = width / 2;
        let mouseY = height / 2;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const nodeColors = ['#4dd0e1', '#ffe066', '#ff80ab', '#69f0ae', '#b388ff'];
        const numNodes = Math.min(Math.floor((width * height) / 12000), 70);
        const nodes = [];

        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.9,
                vy: (Math.random() - 0.5) * 0.9,
                radius: Math.random() * 3 + 2,
                color: nodeColors[Math.floor(Math.random() * nodeColors.length)]
            });
        }

        function animateMesh() {
            ctx.clearRect(0, 0, width, height);

            // Draw connecting lines between close nodes
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        const alpha = (1 - dist / 130) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(77, 208, 225, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Move and draw nodes with mouse interaction
            nodes.forEach(node => {
                const dx = node.x - mouseX;
                const dy = node.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    const force = (140 - dist) / 140;
                    const angle = Math.atan2(dy, dx);
                    node.vx += Math.cos(angle) * force * 0.6;
                    node.vy += Math.sin(angle) * force * 0.6;
                }

                node.vx *= 0.98;
                node.vy *= 0.98;

                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0) node.x = width;
                if (node.x > width) node.x = 0;
                if (node.y < 0) node.y = height;
                if (node.y > height) node.y = 0;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = node.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            requestAnimationFrame(animateMesh);
        }

        animateMesh();
    }
});

// Interactive Contact Form Submission Function
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');
    btn.innerHTML = 'SENDING... ⚡';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = 'SEND MESSAGE ✉';
        btn.disabled = false;
        feedback.className = 'mt-3 text-center alert alert-success comic-alert animated bounceIn';
        feedback.innerText = "✓ Message sent successfully! I'll get back to you soon.";
        feedback.classList.remove('d-none');
        document.getElementById('contact-form').reset();
    }, 1200);
}
