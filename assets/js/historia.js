// ===== FUNÇÕES DA PÁGINA DE HISTÓRIA =====

function inicializarPaginaHistoria() {
    console.log('Inicializando página de história');
    
    // Carregar CSS específico
    const linkExistente = document.getElementById('css-historia');
    if (!linkExistente) {
        const link = document.createElement('link');
        link.id = 'css-historia';
        link.rel = 'stylesheet';
        link.href = 'css/historia.css';
        document.head.appendChild(link);
    }
    
    // Configurar timeline
    configurarTimeline();
    
    // Mostrar primeiro arco
    mostrarArco('visao-geral');
}

function configurarTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const arcos = ['visao-geral', 'sessao1', 'sessao2', 'sessao3', 'sessao4', 'revelacao'];
            mostrarArco(arcos[index]);
        });
    });
}

function mostrarArco(arco) {
    // Atualizar timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const timelineIndex = ['visao-geral', 'sessao1', 'sessao2', 'sessao3', 'sessao4', 'revelacao'].indexOf(arco);
    if (timelineIndex !== -1) {
        document.querySelectorAll('.timeline-item')[timelineIndex]?.classList.add('active');
    }
    
    // Mostrar conteúdo do arco
    document.querySelectorAll('.arco-conteudo').forEach(el => {
        el.classList.remove('active');
    });
    
    const arcoElement = document.getElementById(`arco-${arco}`);
    if (arcoElement) {
        arcoElement.classList.add('active');
    }
}

// Exportar função global
window.mostrarArco = mostrarArco;
window.inicializarPaginaHistoria = inicializarPaginaHistoria;