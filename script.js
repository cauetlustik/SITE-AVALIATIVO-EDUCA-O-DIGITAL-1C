document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // ===== Gestão de Dados (Cards do Carrossel) =====
    // ========================================

    const beneficiosData = [
        { title: "Hipertrofia Muscular Otimizada", description: "Entenda os mecanismos científicos para construir massa muscular de forma eficaz e sustentável." },
        { title: "Aumento de Força Máxima", description: "Descubra métodos de treino comprovados para superar platôs e alcançar novos patamares de força." },
        { title: "Melhora da Composição Corporal", description: "Reduza o percentual de gordura e aumente a massa magra para um físico mais definido e saudável." },
        { title: "Prevenção de Lesões", description: "Aprenda a importância do aquecimento, alongamento dinâmico e técnica correta para treinar com segurança." },
        { title: "Aumento da Longevidade Ativa", description: "Manter-se ativo com musculação melhora a saúde óssea e metabólica, contribuindo para uma vida mais longa e plena." },
        { title: "Bem-Estar Mental e Confiança", description: "Superar desafios no treino reflete diretamente na autoestima e na capacidade de lidar com o estresse diário." }
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    let currentSlide = 0;
    let itemsPerPage = 1; // Inicializa com 1 para mobile

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
            item.setAttribute('data-index', index); // Adiciona índice para referência
            item.innerHTML = `
                <h3>${beneficio.title}</h3>
                <p>${beneficio.description}</p>
            `;
            carouselTrack.appendChild(item);
        });
        updateCarousel();
    }

    // ========================================
    // ===== Componentes: Carrossel =====
    // ========================================

    function updateCarouselDisplay() {
        if (!carouselTrack) return;
        const items = carouselTrack.children;
        const totalItems = items.length;

        // Reinicia o slide se o número de itens visíveis mudar drasticamente
        if (currentSlide > totalItems - itemsPerPage) {
            currentSlide = Math.max(0, totalItems - itemsPerPage);
        }

        // Calcula o offset baseado nos itens visíveis e no slide atual
        // O cálculo `(100 / itemsPerPage)` define a largura de cada slide visível
        // O `currentSlide * (100 / itemsPerPage)` move o track para a esquerda
        let offset = -currentSlide * (100 / itemsPerPage);
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Atualiza a classe 'active' para o item central (ou o primeiro se não houver um central claro)
        Array.from(items).forEach((item, index) => {
            item.classList.remove('active');
            // Verifica se o item está dentro do conjunto visível atual
            if (index >= currentSlide && index < currentSlide + itemsPerPage) {
                item.classList.add('active');
            }
        });

        // Habilita/desabilita botões
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

    // Event listeners para botões do carrossel
    document.querySelector('.carousel-prev')?.addEventListener('click', () => {
        goToSlide(currentSlide - itemsPerPage);
    });

    document.querySelector('.carousel-next')?.addEventListener('click', () => {
        goToSlide(currentSlide + itemsPerPage);
    });

    // Atualiza o carrossel em redimensionamento da janela
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
            // Adiciona uma classe para controle de animação
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
    setActiveTab('tab-panel-musculacao');

    // ========================================
    // ===== Acessibilidade: Controle de Fonte =====
    // ========================================

    const htmlElement = document.documentElement;
    // Captura o font-size base inicial do navegador (geralmente 16px)
    const baseFontSize = parseFloat(getComputedStyle(htmlElement).fontSize);
    let currentScale = 1; // Fator de escala inicial

    // Atualiza o tamanho da fonte usando escala
    function updateFontSizeScale(scaleFactor) {
        const newScale = Math.max(0.8, Math.min(1.5, currentScale * scaleFactor)); // Limita entre 80% e 150%
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
    const
