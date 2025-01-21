document.addEventListener("DOMContentLoaded", () => {
    // Configuração do canvas e animação de partículas
    const heroSection = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    heroSection.style.position = 'relative';
    heroSection.insertBefore(canvas, heroSection.firstChild);

    const ctx = canvas.getContext("2d");
    const connectionDistance = 150;
    let particles = [];
    let animationFrameId;
    
    const resizeCanvas = () => {
        const rect = heroSection.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    };

    const createParticles = () => {
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
        particles = Array.from({ length: numberOfParticles }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
        }));
    };

    const drawConnections = () => {
        particles.forEach((p1, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - distance / connectionDistance;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(63, 110, 181, ${opacity * 0.2})`;
                    ctx.lineWidth = 2;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(120, 167, 238, 0.32)";
            ctx.fill();
        });

        drawConnections();
        animationFrameId = requestAnimationFrame(animateParticles);
    };

    const cleanup = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };

    const init = () => {
        cleanup();
        resizeCanvas();
        createParticles();
        animateParticles();
    };

    window.addEventListener("resize", init);
    init();

   // Código do carrossel
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel-slide");
const prevButton = document.querySelector(".carousel-btn.prev");
const nextButton = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");
let currentSlide = 0;
let modalClosing = false;

if (!carousel || !slides.length) {
    console.error("Elementos do carrossel não encontrados");
    return;
}

// Cria os indicadores (dots)
slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
    if (index === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", () => {
        goToSlide(index);
    });
});

const dots = dotsContainer.querySelectorAll(".dot");

const updateActiveDot = () => {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
};

const goToSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    const translateX = -currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    updateActiveDot();
};

const nextSlide = () => goToSlide(currentSlide + 1);
const prevSlide = () => goToSlide(currentSlide - 1);

if (nextButton) {
    nextButton.addEventListener("click", nextSlide);
}
if (prevButton) {
    prevButton.addEventListener("click", prevSlide);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextSlide();
    }
    if (e.key === "ArrowLeft") {
        prevSlide();
    }
});

// Modal para visualização expandida
const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close" aria-label="Fechar modal">&times;</span>
        <img class="modal-image" src="" alt="Visualização expandida">
    </div>
`;
document.body.appendChild(modal);

const modalImage = modal.querySelector(".modal-image");
const modalClose = modal.querySelector(".modal-close");
let isModalOpen = false;

const openModal = (img) => {
    if (!isModalOpen && !modalClosing) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
        isModalOpen = true;
    }
};

const closeModal = () => {
    if (isModalOpen && !modalClosing) {
        modalClosing = true;
        modal.classList.remove("open");
        document.body.style.overflow = "";
        setTimeout(() => {
            isModalOpen = false;
            modalClosing = false;
            modalImage.src = "";
        }, 300);
    }
};

slides.forEach(slide => {
    const img = slide.querySelector("img");
    if (img) {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => openModal(img));
    }
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isModalOpen) {
        closeModal();
    }
});

// Inicia o carrossel no slide inicial
goToSlide(0);
});