// ===============================
// CONFIG INICIAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    initServices();
    initReveal();
    initAccessibility();
    initYear();
});

// ===============================
// SERVIÇOS DINÂMICOS
// ===============================
const services = [
    {
        title: "Energia Solar",
        desc: "Instalação de sistemas fotovoltaicos modernos.",
        icon: "☀️"
    },
    {
        title: "Reuso de Água",
        desc: "Captação e reaproveitamento inteligente.",
        icon: "💧"
    },
    {
        title: "Hortas Urbanas",
        desc: "Produção sustentável em áreas urbanas.",
        icon: "🌱"
    }
];

function initServices() {
    const grid = document.getElementById("services-grid");
    if (!grid) return;

    grid.innerHTML = services.map(service => `
        <article class="card">
            <h3>${service.icon} ${service.title}</h3>
            <p>${service.desc}</p>
        </article>
    `).join("");
}

// ===============================
// REVEAL (INTERSECTION OBSERVER)
// ===============================
function initReveal() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));
}

// ===============================
// ACESSIBILIDADE (FONTE + CONTRASTE)
// ===============================
function initAccessibility() {
    const increaseBtn = document.getElementById("increase-font");
    const decreaseBtn = document.getElementById("decrease-font");
    const contrastBtn = document.getElementById("toggle-contrast");

    let fontSize = parseFloat(localStorage.getItem("fontSize")) || 16;

    applyFontSize(fontSize);

    increaseBtn?.addEventListener("click", () => {
        fontSize = Math.min(22, fontSize + 1);
        applyFontSize(fontSize);
    });

    decreaseBtn?.addEventListener("click", () => {
        fontSize = Math.max(14, fontSize - 1);
        applyFontSize(fontSize);
    });

    function applyFontSize(size) {
        document.documentElement.style.fontSize = size + "px";
        localStorage.setItem("fontSize", size);
    }

    // CONTRASTE
    if (localStorage.getItem("contrast") === "on") {
        document.body.classList.add("high-contrast");
    }

    contrastBtn?.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");

        localStorage.setItem(
            "contrast",
            document.body.classList.contains("high-contrast") ? "on" : "off"
        );
    });
}

// ===============================
// ANO AUTOMÁTICO
// ===============================
function initYear() {
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

// ===============================
// SCROLL SUAVE (BOTÕES/ÂNCORAS)
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        target?.scrollIntoView({
            behavior: "smooth"
        });
    });
});
