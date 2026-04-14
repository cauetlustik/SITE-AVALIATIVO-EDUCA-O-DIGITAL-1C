// --- DATABASE SIMULADO (Array de Objetos) ---
const servicesData = [
    { title: "Arquitetura Verde", desc: "Projetos focados em eficiência energética." },
    { title: "Gestão de Resíduos", desc: "Soluções inteligentes para descarte urbano." },
    { title: "Consultoria ESG", desc: "Adequação ambiental para empresas modernas." }
];

const faqData = [
    { q: "Como funciona a consultoria?", a: "Iniciamos com um diagnóstico técnico da área." },
    { q: "Quais os prazos?", a: "Depende da complexidade, mas em média 3 meses." }
];

// --- RENDERIZAÇÃO DINÂMICA ---
function renderServices() {
    const grid = document.getElementById('services-grid');
    grid.innerHTML = servicesData.map(item => `
        <article class="card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </article>
    `).join('');
}

function renderFAQ() {
    const accordion = document.getElementById('faq-accordion');
    accordion.innerHTML = faqData.map((item, index) => `
        <div class="faq-item">
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(${index})">
                ${item.q}
            </button>
            <div class="accordion-body" style="display:none">
                <p>${item.a}</p>
            </div>
        </div>
    `).join('');
}

// --- ACESSIBILIDADE: FONTE E CONTRASTE ---
let currentFontSize = 100; // porcentagem

document.getElementById('increase-font').addEventListener('click', () => {
    currentFontSize += 10;
    document.body.style.fontSize = `${currentFontSize}%`;
});

document.getElementById('decrease-font').addEventListener('click', () => {
    currentFontSize -= 10;
    document.body.style.fontSize = `${currentFontSize}%`;
});

document.getElementById('toggle-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- SISTEMA DE ACORDEÃO ---
function toggleAccordion(index) {
    const bodies = document.querySelectorAll('.accordion-body');
    const display = bodies[index].style.display;
    bodies[index].style.display = display === 'none' ? 'block' : 'none';
}

// --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
});

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderFAQ();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
