// ===== FUNÇÕES ESPECÍFICAS DE VILÕES =====

function inicializarPaginaViloes() {
    console.log('Inicializando página de vilões');
    renderizarViloes();
    atualizarStatsViloes();
    configurarFiltrosViloes();
}

function configurarFiltrosViloes() {
    const buscaInput = document.getElementById('busca-vilao');
    if (buscaInput) {
        buscaInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') filtrarViloes();
        });
    }
}

function calcularTotalND() {
    return state.viloes.reduce((acc, v) => {
        const nd = parseInt(v.desafio?.toString().replace(/[^0-9]/g, '')) || 0;
        return acc + nd;
    }, 0);
}

function calcularAmeacaPrincipal() {
    if (state.viloes.length === 0) return '-';
    let maiorND = 0;
    let principal = state.viloes[0]?.nome || '-';
    state.viloes.forEach(v => {
        const nd = parseInt(v.desafio?.toString().replace(/[^0-9]/g, '')) || 0;
        if (nd > maiorND) {
            maiorND = nd;
            principal = v.nome;
        }
    });
    return principal;
}

function atualizarStatsViloes() {
    const totalViloes = document.getElementById('total-viloes');
    const totalND = document.getElementById('total-nd');
    const ameacaPrincipal = document.getElementById('ameaca-principal');
    
    if (totalViloes) totalViloes.textContent = state.viloes.length;
    if (totalND) totalND.textContent = calcularTotalND();
    if (ameacaPrincipal) ameacaPrincipal.textContent = calcularAmeacaPrincipal();
}

function filtrarViloes() {
    const busca = document.getElementById('busca-vilao')?.value.toLowerCase() || '';
    const nivel = document.getElementById('filtro-nivel')?.value || '';
    const tipo = document.getElementById('filtro-tipo')?.value || '';
    
    const filtrados = state.viloes.filter(v => {
        if (busca && !v.nome.toLowerCase().includes(busca) && 
            !v.historia?.toLowerCase().includes(busca)) return false;
        
        if (nivel) {
            const nd = parseInt(v.desafio?.toString().replace(/[^0-9]/g, '')) || 0;
            if (nivel === '10' && nd < 10) return false;
            if (nivel !== '10' && nd !== parseInt(nivel)) return false;
        }
        
        if (tipo) {
            const nomeLower = v.nome.toLowerCase();
            if (tipo === 'gargamel' && !nomeLower.includes('gargamel')) return false;
            if (tipo === 'azrael' && !nomeLower.includes('azrael')) return false;
            if (tipo === 'hogatha' && !nomeLower.includes('hogatha')) return false;
        }
        return true;
    });
    
    renderizarViloesFiltrados(filtrados);
}

function renderizarViloesFiltrados(filtrados) {
    const lista = document.getElementById('viloes-lista');
    if (!lista) return;
    
    if (filtrados.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">🔍</div>
                <h3>Nenhum vilão encontrado</h3>
                <p>Tente outros filtros</p>
            </div>
        `;
        return;
    }
    
    lista.innerHTML = filtrados.map(v => criarCardVilao(v)).join('');
}

function criarCardVilao(v) {
    const tipoVilao = classificarVilao(v.nome);
    const vidaPorcentagem = calcularPorcentagemVida(v.vida);
    
    return `
        <div class="card vilao-card" data-id="${v.id}">
            <div class="card-header">
                <div class="vilao-tipo-emoji" style="background-color: ${tipoVilao.cor}20; color: ${tipoVilao.cor}">
                    ${tipoVilao.emoji}
                </div>
                <h3 class="vilao-nome">${v.nome}</h3>
                <span class="badge-nivel">ND ${v.desafio || '?'}</span>
            </div>
            
            <div class="card-content">
                <div class="vilao-status">
                    <div class="status-item">
                        <span class="status-label">❤️ PONTOS DE VIDA</span>
                        <span class="status-value">${v.vida || '0/0'}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${vidaPorcentagem}%"></div>
                        </div>
                    </div>
                    
                    <div class="status-row">
                        <div class="status-mini">
                            <span class="label">🛡️ CA</span>
                            <span class="value">${v.ca || v.defesa || '?'}</span>
                        </div>
                        <div class="status-mini">
                            <span class="label">⚔️ DESL.</span>
                            <span class="value">${v.deslocamento || '9m'}</span>
                        </div>
                        <div class="status-mini">
                            <span class="label">🎲 XP</span>
                            <span class="value">${v.xp || '?'}</span>
                        </div>
                    </div>
                </div>

                <div class="atributos-mini">
                    <div class="atributo" title="Força">FOR ${v.atributos?.forca || 10}</div>
                    <div class="atributo" title="Destreza">DES ${v.atributos?.destreza || 10}</div>
                    <div class="atributo" title="Constituição">CON ${v.atributos?.constituicao || 10}</div>
                    <div class="atributo" title="Inteligência">INT ${v.atributos?.inteligencia || 10}</div>
                    <div class="atributo" title="Sabedoria">SAB ${v.atributos?.sabedoria || 10}</div>
                    <div class="atributo" title="Carisma">CAR ${v.atributos?.carisma || 10}</div>
                </div>

                <details class="detalhes-vilao">
                    <summary>📖 VER DETALHES COMPLETOS</summary>
                    
                    <div class="detalhes-conteudo">
                        ${v.pericias?.length ? `
                            <h4>🎯 PERÍCIAS</h4>
                            <p>${v.pericias.join(' • ')}</p>
                        ` : ''}
                        
                        <h4>⚔️ ATAQUES</h4>
                        <ul class="ataques-list">
                            ${v.ataques?.map(a => {
                                if (typeof a === 'string') {
                                    const [nome, dano] = a.split(':');
                                    return `
                                        <li>
                                            <span class="ataque-nome">${nome?.trim() || 'Ataque'}</span>
                                            <span class="ataque-dano">${dano?.trim() || '1d4'}</span>
                                        </li>
                                    `;
                                } else {
                                    return `
                                        <li>
                                            <span class="ataque-nome">${a.nome || 'Ataque'}</span>
                                            ${a.bono ? `<span class="ataque-bonus">+${a.bono}</span>` : ''}
                                            <span class="ataque-dano">${a.dano || '1d4'}</span>
                                        </li>
                                    `;
                                }
                            }).join('') || '<li>Nenhum ataque listado</li>'}
                        </ul>

                        ${v.habilidades?.length ? `
                            <h4>✨ HABILIDADES</h4>
                            <ul class="ataques-list">
                                ${v.habilidades.map(h => `<li>${h}</li>`).join('')}
                            </ul>
                        ` : ''}

                        <h4>📜 HISTÓRIA</h4>
                        <div class="historia">${v.historia || 'Nenhuma história registrada.'}</div>

                        ${v.taticas ? `
                            <h4>⚔️ TÁTICAS</h4>
                            <p class="taticas">${v.taticas}</p>
                        ` : ''}

                        ${v.fraquezas?.length ? `
                            <h4>💔 FRAQUEZAS</h4>
                            <p>${v.fraquezas.join(', ')}</p>
                        ` : ''}

                        ${v.tesouro ? `
                            <h4>💰 TESOURO</h4>
                            <p>${v.tesouro}</p>
                        ` : ''}
                    </div>
                </details>

                <div class="acoes-vilao">
                    <button class="btn-editar" onclick="editarVilao(${v.id})">
                        <span>✏️</span> EDITAR
                    </button>
                    <button class="btn-remover" onclick="removerVilao(${v.id})">
                        <span>🗑️</span> REMOVER
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Sobrescrever funções globais
window.renderizarViloes = function() {
    renderizarViloesFiltrados(state.viloes);
    atualizarStatsViloes();
};

window.filtrarViloes = filtrarViloes;