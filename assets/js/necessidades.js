// ===== FUNÇÕES ESPECÍFICAS DE MISSÕES =====

function inicializarPaginaNecessidades() {
    console.log('Inicializando página de missões');
    renderizarNecessidades();
    configurarFiltrosNecessidades();
}

function configurarFiltrosNecessidades() {
    const statusTabs = document.querySelectorAll('.status-tabs .tab-btn');
    statusTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            statusTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const status = this.textContent.includes('Todas') ? 'todas' :
                          this.textContent.includes('Pendentes') ? 'pendente' :
                          this.textContent.includes('Andamento') ? 'andamento' : 'concluida';
            filtrarNecessidades(status);
        });
    });
}

function calcularPendentes() {
    return state.necessidades.filter(n => n.status === 'pendente' || !n.status).length;
}

function calcularConcluidas() {
    return state.necessidades.filter(n => n.status === 'concluida').length;
}

function renderizarNecessidades() {
    const lista = document.getElementById('necessidades-lista');
    if (!lista) return;

    if (state.necessidades.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">📋</div>
                <h3>Nenhuma missão ou item!</h3>
                <p>Adicione missões para seus jogadores</p>
            </div>
        `;
        return;
    }

    const pendentes = state.necessidades.filter(n => n.status === 'pendente' || !n.status);
    const andamento = state.necessidades.filter(n => n.status === 'andamento');
    const concluidas = state.necessidades.filter(n => n.status === 'concluida');

    let html = '';

    if (pendentes.length > 0) {
        html += '<h4 class="categoria-titulo">⏳ PENDENTES</h4>';
        html += pendentes.map(n => criarItemNecessidade(n)).join('');
    }

    if (andamento.length > 0) {
        html += '<h4 class="categoria-titulo">⚙️ EM ANDAMENTO</h4>';
        html += andamento.map(n => criarItemNecessidade(n)).join('');
    }

    if (concluidas.length > 0) {
        html += '<h4 class="categoria-titulo">✅ CONCLUÍDAS</h4>';
        html += concluidas.map(n => criarItemNecessidade(n, true)).join('');
    }

    lista.innerHTML = html;
    atualizarStatsNecessidades();
}

function criarItemNecessidade(n, concluida = false) {
    return `
        <li class="necessidade-item ${concluida ? 'concluida' : ''}">
            <div class="necessidade-conteudo">
                <strong>${n.item}</strong>
                <span class="necessidade-categoria">${n.categoria || 'Missão'}</span>
                ${n.descricao ? `<p>${n.descricao}</p>` : ''}
                ${n.local ? `<p><small>📍 ${n.local}</small></p>` : ''}
                ${n.recompensa ? `<p><small>🎁 ${n.recompensa}</small></p>` : ''}
            </div>
            <div class="necessidade-acoes">
                ${!concluida ? `
                    <button onclick="mudarStatusNecessidade(${n.id}, 'andamento')" title="Iniciar">⚙️</button>
                    <button onclick="mudarStatusNecessidade(${n.id}, 'concluida')" title="Concluir">✅</button>
                ` : ''}
                <button onclick="removerNecessidade(${n.id})" title="Remover">🗑️</button>
            </div>
        </li>
    `;
}

function atualizarStatsNecessidades() {
    const totalMissoes = document.getElementById('total-missoes');
    const pendentes = document.getElementById('pendentes');
    const concluidas = document.getElementById('concluidas');
    
    if (totalMissoes) totalMissoes.textContent = state.necessidades.length;
    if (pendentes) pendentes.textContent = calcularPendentes();
    if (concluidas) concluidas.textContent = calcularConcluidas();
}

function filtrarNecessidades(status) {
    let filtrados = state.necessidades;
    
    if (status !== 'todas') {
        filtrados = state.necessidades.filter(n => n.status === status);
    }
    
    const lista = document.getElementById('necessidades-lista');
    if (!lista) return;
    
    if (filtrados.length === 0) {
        lista.innerHTML = '<div class="empty-state">Nenhuma missão encontrada</div>';
    } else {
        lista.innerHTML = filtrados.map(n => criarItemNecessidade(n, n.status === 'concluida')).join('');
    }
}

// Sobrescrever funções globais
window.renderizarNecessidades = renderizarNecessidades;
window.filtrarNecessidades = filtrarNecessidades;