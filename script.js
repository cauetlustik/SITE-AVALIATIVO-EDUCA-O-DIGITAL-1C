document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // ===== Gestão de Dados (Cards do Carrossel) =====
    // ========================================

    const beneficiosData = [
        { title: "Redução do Estresse", description: "Práticas como meditação e respiração profunda ajudam a acalmar a mente e reduzir os níveis de cortisol." },
        { title: "Melhora do Sono", description: "Estabelecer rotinas relaxantes antes de dormir promove um sono mais reparador e profundo." },
        { title: "Aumento da Energia", description: "Exercícios físicos e uma boa alimentação fornecem o combustível necessário para o corpo e a mente." },
        { title: "Fortalecimento da Autoestima", description: "Ao cuidar de si, você reconhece seu próprio valor, aumentando a confiança e o amor próprio." },
        { title: "Clareza Mental", description: "Momentos de pausa e reflexão permitem organizar pensamentos e tomar decisões mais assertivas." }
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    let currentSlide = 0;

    function renderCarouselItems() {
        if (!carouselTrack) return;
        carouselTrack.innerHTML = ''; // Limpa o conteúdo existente
        beneficiosData.forEach((beneficio, index) => {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            item.setAttribute('aria-label', `Benefício ${index + 1} de ${beneficiosData.length}`);
            item.innerHTML = `
                <h3>${beneficio.title}</h3>
                <p>${beneficio.description}</p>
            `;
            carouselTrack.appendChild(item);
        });
        updateCarousel(); // Atualiza a exibição inicial
    }

    // ========================================
    // ===== Componentes: Carrossel =====
    // ========================================

    const carousel = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    function updateCarousel() {
        if (!carouselTrack) return;
        const items = carouselTrack.children;
        const totalItems = items.length;
        const visibleItems = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);

        // Calcula o offset com base nos itens visíveis e no slide atual
        let offset = -currentSlide * (100 / visibleItems);
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Ajusta a largura dos itens para o layout (pode ser redundante se o CSS já define min-width)
        Array.from(items).forEach(item => {
            item.style.width = `calc(${100 / visibleItems}% - 1rem)`; // Ajusta para o gap
        });

        // Habilita/desabilita botões
        if (prevButton) prevButton.disabled = currentSlide === 0;
        if (nextButton) nextButton.disabled = currentSlide >= totalItems - visibleItems;
    }

    function goToSlide(slideIndex) {
        if (!carouselTrack) return;
        const items = carouselTrack.children;
        const totalItems = items.length;
        const visibleItems = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);

        if (slideIndex < 0) {
            currentSlide = 0;
        } else if (slideIndex > totalItems - visibleItems) {
            currentSlide = totalItems - visibleItems;
        } else {
            currentSlide = slideIndex;
        }
        updateCarousel();
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const visibleItems = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
            goToSlide(currentSlide - visibleItems);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const visibleItems = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
            goToSlide(currentSlide + visibleItems);
        });
    }

    // Atualiza o carrossel em redimensionamento da janela
    window.addEventListener('resize', () => {
        // Reset currentSlide para o primeiro item visível após redimensionar
        const visibleItems = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
        if (currentSlide > beneficiosData.length - visibleItems) {
            currentSlide = Math.max(0, beneficiosData.length - visibleItems);
        }
        updateCarousel();
    });


    // ========================================
    // ===== Componentes: Abas (Tabs) =====
    // ========================================

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function setActiveTab(tabId) {
        // Atualiza a seleção visual dos botões
        tabButtons.forEach(button => {
            const isActive = button.getAttribute('aria-controls') === tabId;
            button.setAttribute('aria-selected', isActive);
            if (isActive) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Mostra o painel correspondente e esconde os outros
        tabPanels.forEach(panel => {
            const isVisible = panel.getAttribute('id') === tabId;
            panel.hidden = !isVisible;
            if (isVisible) {
                panel.setAttribute('aria-hidden', 'false');
            } else {
                panel.setAttribute('aria-hidden', 'true');
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('aria-controls');
            setActiveTab(tabId);
        });
    });

    // Define a primeira aba como ativa por padrão
    setActiveTab('tab-panel-mindfulness');


    // ========================================
    // ===== Acessibilidade: Controle de Fonte =====
    // ========================================

    const htmlElement = document.documentElement; // Pega o elemento <html>
    let currentFontSize = parseFloat(getComputedStyle(htmlElement).fontSize); // Captura o font-size base inicial (em px)

    function updateBodyFontSize(baseFontSizePx) {
        // Calcula o novo tamanho da fonte base para o body
        htmlElement.style.fontSize = `${baseFontSizePx}px`;
    }

    document.getElementById('increase-font')?.addEventListener('click', () => {
        currentFontSize += 2; // Aumenta em 2px
        updateBodyFontSize(currentFontSize);
    });

    document.getElementById('decrease-font')?.addEventListener('click', () => {
        currentFontSize -= 2; // Diminui em 2px
        if (currentFontSize < 14) currentFontSize = 14; // Limite mínimo
        updateBodyFontSize(currentFontSize);
    });

    // ========================================
    // ===== Acessibilidade: Modo Alto Contraste =====
    // ========================================

    const bodyElement = document.body;
    const toggleContrastButton = document.getElementById('toggle-contrast');

    toggleContrastButton?.addEventListener('click', () => {
        bodyElement.classList.toggle('high-contrast');
        // Persiste a preferência no localStorage
        if (bodyElement.classList.contains('high-contrast')) {
            localStorage.setItem('theme', 'high-contrast');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // Verifica se o tema de alto contraste está salvo no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'high-contrast') {
        bodyElement.classList.add('high-contrast');
    }

    // ========================================
    // ===== Animações de Entrada (Scroll Reveal) =====
    // ========================================

    const scrollRevealOptions = {
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-scroll-reveal', 'true');
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, scrollRevealOptions);

    // Observa todas as seções, exceto o hero (que já é visível)
    document.querySelectorAll('main > section:not(#hero)').forEach(section => {
        observer.observe(section);
    });

    // ========================================
    // ===== Inicialização =====
    // ========================================

    renderCarouselItems(); // Renderiza os cards do carrossel
    updateCarousel();      // Garante que o carrossel esteja no estado correto ao carregar

});
