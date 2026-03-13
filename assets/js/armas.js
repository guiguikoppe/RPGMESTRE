
const armasData = {
    natureza: 5,
    tecnologia: 4,
    forca: 4,
    bipolar: 4,
    militar: 4,
    total: 25
};

function inicializarPaginaArmas() {
    console.log('Inicializando página de armas');
    atualizarStatsArmas();
    configurarBuscasArmas();
}

function atualizarStatsArmas() {
    document.getElementById('total-armas').textContent = armasData.total;
    document.getElementById('total-natureza').textContent = armasData.natureza;
    document.getElementById('total-tecnologia').textContent = armasData.tecnologia;
    document.getElementById('total-forca').textContent = armasData.forca;
    document.getElementById('total-bipolar').textContent = armasData.bipolar;
    document.getElementById('total-militar').textContent = armasData.militar;
}

function configurarBuscasArmas() {
    const buscaInput = document.getElementById('busca-arma');
    if (buscaInput) {
        buscaInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') buscarArmas();
        });
    }
}

function filtrarArmas(categoria) {
    // Atualizar botões ativos
    document.querySelectorAll('.filtro-tag').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Mostrar/esconder categorias
    if (categoria === 'todas') {
        document.querySelectorAll('.categoria-titulo, .arma-card').forEach(el => {
            el.style.display = 'block';
        });
    } else {
        // Esconder tudo primeiro
        document.querySelectorAll('.categoria-titulo, .arma-card').forEach(el => {
            el.style.display = 'none';
        });
        
        // Mostrar apenas a categoria selecionada
        document.querySelectorAll(`.categoria-titulo[data-categoria="${categoria}"]`).forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll(`.arma-card.${categoria}`).forEach(el => {
            el.style.display = 'block';
        });
    }
}

function buscarArmas() {
    const termo = document.getElementById('busca-arma')?.value.toLowerCase() || '';
    
    if (!termo) {
        // Resetar para mostrar todas
        document.querySelectorAll('.categoria-titulo, .arma-card').forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll('.filtro-tag').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filtro-tag[onclick="filtrarArmas(\'todas\')"]').classList.add('active');
        return;
    }
    
    // Esconder tudo
    document.querySelectorAll('.categoria-titulo, .arma-card').forEach(el => {
        el.style.display = 'none';
    });
    
    // Mostrar apenas armas que correspondem à busca
    let resultadosEncontrados = false;
    
    document.querySelectorAll('.arma-card').forEach(card => {
        const nome = card.querySelector('.arma-nome')?.textContent.toLowerCase() || '';
        const tipo = card.querySelector('.arma-tipo')?.textContent.toLowerCase() || '';
        const efeito = card.querySelector('.arma-efeito p')?.textContent.toLowerCase() || '';
        const propriedades = card.querySelectorAll('.propriedade');
        let propriedadesTexto = '';
        propriedades.forEach(p => propriedadesTexto += p.textContent.toLowerCase() + ' ');
        
        if (nome.includes(termo) || tipo.includes(termo) || efeito.includes(termo) || propriedadesTexto.includes(termo)) {
            card.style.display = 'block';
            resultadosEncontrados = true;
            
            // Mostrar também o título da categoria
            const categoria = card.classList[1]; // natureza, tecnologia, etc
            document.querySelectorAll(`.categoria-titulo[data-categoria="${categoria}"]`).forEach(el => {
                el.style.display = 'block';
            });
        }
    });
    
    if (!resultadosEncontrados) {
        // Mostrar mensagem de nenhum resultado
        const lista = document.getElementById('armas-lista');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'empty-state';
        msgDiv.innerHTML = `
            <div class="emoji">🔍</div>
            <h3>Nenhuma arma encontrada</h3>
            <p>Tente outros termos de busca</p>
        `;
        lista.innerHTML = '';
        lista.appendChild(msgDiv);
        
        // Restaurar lista após 2 segundos
        setTimeout(() => {
            location.reload(); // Recarrega a página para restaurar a lista
        }, 2000);
    }
}

// Exportar funções
window.filtrarArmas = filtrarArmas;
window.buscarArmas = buscarArmas;
window.inicializarPaginaArmas = inicializarPaginaArmas;