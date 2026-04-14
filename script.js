document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // ===== Gestão de Dados (Cards do Carrossel) =====
    // ========================================

    const beneficiosData = [
        { title: "Redução do Estresse e Ansiedade", description: "Técnicas de respiração profunda e meditação guiada para encontrar calma no seu dia a dia." },
        { title: "Melhora da Qualidade do Sono", description: "Rotinas relaxantes e práticas de atenção plena para adormecer mais rápido e ter um sono reparador." },
        { title: "Aumento da Energia Vital", description: "Movimentos conscientes e nutrição afetiva que revitalizam seu corpo e mente." },
        { title: "Fortalecimento da Autoestima e Confiança", description: "Reconheça seu valor ao priorizar seu bem-estar e cultivar o amor próprio." },
        { title: "Clareza Mental e Foco", description: "Aprenda a silenciar o ruído mental para tomar decisões mais alinhadas com suas necessidades." },
        { title: "Resiliência Emocional", description: "Desenvolva a capacidade de lidar com desafios de forma mais equilibrada e serena." }
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    let currentSlide = 0;
    let itemsPerPage = 1;

    function updateItemsPerPage() {
        if (window.innerWidth >= 1024) {
            itemsPerPage = 3;
        } else if (window.innerWidth >= 768) {
            itemsPerPage = 2;
        } else {
            itemsPerPage = 1;
        }
    }

    function renderCarouselItems() {
        if (!carouselTrack) return;
        carouselTrack.innerHTML = '';
        beneficiosData.forEach((beneficio, index) => {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            item.setAttribute('data-index', index);
            item.innerHTML = `
                <h3>${beneficio.title}</h3>
                <p>${beneficio.description}</p>
            `;
            carouselTrack.appendChild(item);
        });
        updateCarouselDisplay(); // Chama para aplicar o estado inicial corretamente
    }

    // ========================================
    // ===== Componentes: Carrossel =====
    // ========================================

    function updateCarouselDisplay() {
        if (!carouselTrack) return;
        const items = carouselTrack.children;
        const totalItems = items.length;

        // Ajusta o slide atual se o número de itens visíveis mudar
        if (currentSlide > totalItems - itemsPerPage) {
            currentSlide = Math.max(0, totalItems - itemsPerPage);
        }

        const offset = -currentSlide * (100 / itemsPerPage);
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Atualiza a classe 'active'
        Array.from(items).forEach((item, index) => {
            item.classList.remove('active');
            if (index >= currentSlide && index < currentSlide + itemsPerPage) {
                item.classList.add('active');
            }
        });

        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        if (prevButton) prevButton.disabled = currentSlide === 0;
        if (nextButton) nextButton.disabled = currentSlide >= totalItems - itemsPerPage;
    }

    function goToSlide(slideIndex) {
        const totalItems = beneficiosData.length;
        if (slideIndex < 0) {
            currentSlide = 0;
        } else if (slideIndex > totalItems - itemsPerPage) {
            currentSlide = totalItems - itemsPerPage;
        } else {
            currentSlide = slideIndex;
        }
        updateCarouselDisplay();
    }

    document.querySelector('.carousel-prev')?.addEventListener('click', () => {
        goToSlide(currentSlide - itemsPerPage);
    });

    document.querySelector('.carousel-next')?.addEventListener('click', () => {
        goToSlide(currentSlide + itemsPerPage);
    });

    window.addEventListener('resize', () => {
        updateItemsPerPage();
        updateCarouselDisplay();
    });

    // ========================================
    // ===== Componentes: Abas (Tabs) =====
    // ========================================

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function setActiveTab(tabId) {
        tabButtons.forEach(button => {
            const isActive = button.getAttribute('aria-controls') === tabId;
            button.setAttribute('aria-selected', isActive);
            if (isActive) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        tabPanels.forEach(panel => {
            const isVisible = panel.getAttribute('id') === tabId;
            panel.hidden = !isVisible;
            if (isVisible) {
                panel.classList.add('visible');
                panel.setAttribute('aria-hidden', 'false');
            } else {
                panel.classList.remove('visible');
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

    const htmlElement = document.documentElement;
    const baseFontSize = parseFloat(getComputedStyle(htmlElement).fontSize);
    let currentScale = 1;

    function updateFontSizeScale(scaleFactor) {
        const newScale = Math.max(0.8, Math.min(1.5, currentScale * scaleFactor));
        htmlElement.style.fontSize = `${baseFontSize * newScale}px`;
        currentScale = newScale;
    }

    document.getElementById('increase-font')?.addEventListener('click', () => {
        updateFontSizeScale(1.1); // Aumenta em 10%
    });

    document.getElementById('decrease-font')?.addEventListener('click', () => {
        updateFontSizeScale(0.9); // Diminui em 10%
    });

    // ========================================
    // ===== Acessibilidade: Modo Alto Contraste =====
    // ========================================

    const bodyElement = document.body;
    const toggleContrastButton = document.getElementById('toggle-contrast');

    toggleContrastButton?.addEventListener('click', () => {
        bodyElement.classList.toggle('high-contrast');
        localStorage.setItem('theme', bodyElement.classList.contains('high-contrast') ? 'high-contrast' : 'default');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'high-contrast') {
        bodyElement.classList.add('high-contrast');
    }

    // ========================================
    // ===== Animações de Entrada (Scroll Reveal) =====
    // ========================================

    const scrollRevealOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, scrollRevealOptions);

    document.querySelectorAll('main > section').forEach(section => {
        observer.observe(section);
    });

    // ========================================
    // ===== Inicialização =====
    // ========================================

    updateItemsPerPage(); // Define o número inicial de itens por página
    renderCarouselItems(); // Renderiza os cards do carrossel

});
