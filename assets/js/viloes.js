// ===== FUNÇÕES ESPECÍFICAS DA PÁGINA DE VILÕES =====

// Atualizar estatísticas da página
function atualizarStatsViloes() {
    const totalViloes = document.getElementById('total-viloes');
    const totalND = document.getElementById('total-nd');
    const ameacaPrincipal = document.getElementById('ameaca-principal');
    
    if (totalViloes) {
        totalViloes.textContent = state.viloes.length || 0;
    }
    
    if (totalND) {
        const ndTotal = calcularTotalND();
        totalND.textContent = ndTotal;
    }
    
    if (ameacaPrincipal) {
        const principal = calcularAmeacaPrincipal();
        ameacaPrincipal.textContent = principal || '-';
    }
}

// Calcular total de ND
function calcularTotalND() {
    if (!state?.viloes?.length) return '0';
    
    let total = 0;
    state.viloes.forEach(v => {
        if (v.desafio) {
            const nd = parseInt(v.desafio.toString().replace(/[^0-9]/g, '')) || 0;
            total += nd;
        }
    });
    return total;
}

// Calcular ameaça principal (vilão com maior ND)
function calcularAmeacaPrincipal() {
    if (!state?.viloes?.length) return 'Nenhum';
    
    let maiorND = 0;
    let principal = null;
    
    state.viloes.forEach(v => {
        if (v.desafio) {
            const nd = parseInt(v.desafio.toString().replace(/[^0-9]/g, '')) || 0;
            if (nd > maiorND) {
                maiorND = nd;
                principal = v.nome;
            }
        }
    });
    
    return principal || state.viloes[0]?.nome || 'Nenhum';
}

// Filtrar vilões
function filtrarViloes() {
    const busca = document.getElementById('busca-vilao')?.value.toLowerCase() || '';
    const nivel = document.getElementById('filtro-nivel')?.value || '';
    const tipo = document.getElementById('filtro-tipo')?.value || '';
    
    // Filtrar a lista atual
    const viloesFiltrados = state.viloes.filter(v => {
        // Filtro de busca
        if (busca) {
            const nomeMatch = v.nome?.toLowerCase().includes(busca);
            const classeMatch = v.classe?.toLowerCase().includes(busca);
            const historiaMatch = v.historia?.toLowerCase().includes(busca);
            const ataquesMatch = v.ataques?.some(a => 
                (a.nome?.toLowerCase().includes(busca)) || 
                (typeof a === 'string' && a.toLowerCase().includes(busca))
            );
            
            if (!(nomeMatch || classeMatch || historiaMatch || ataquesMatch)) {
                return false;
            }
        }
        
        // Filtro de nível
        if (nivel) {
            const nd = parseInt(v.desafio?.toString().replace(/[^0-9]/g, '')) || 0;
            if (nivel === '10' && nd < 10) return false;
            if (nivel !== '10' && nd !== parseInt(nivel)) return false;
        }
        
        // Filtro de tipo
        if (tipo) {
            const nomeLower = v.nome?.toLowerCase() || '';
            if (tipo === 'gargamel' && !nomeLower.includes('gargamel')) return false;
            if (tipo === 'azrael' && !nomeLower.includes('azrael')) return false;
            if (tipo === 'hogatha' && !nomeLower.includes('hogatha')) return false;
            if (tipo === 'humano' && nomeLower.includes('gargamel')) return false;
            if (tipo === 'monstro' && !nomeLower.includes('azrael') && !nomeLower.includes('rato')) return false;
        }
        
        return true;
    });
    
    // Renderizar lista filtrada
    renderizarListaViloes(viloesFiltrados);
}

// Renderizar lista específica de vilões
function renderizarListaViloes(viloes) {
    const lista = document.getElementById('viloes-lista');
    if (!lista) return;

    if (!viloes || viloes.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">🧙</div>
                <h3>Nenhum vilão encontrado!</h3>
                <p class="text-dim">Tente outros filtros ou adicione um novo vilão</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = viloes.map(v => criarCardVilao(v)).join('');
}

// Criar card de vilão
function criarCardVilao(v) {
    const tipoVilao = classificarVilao(v.nome);
    const vidaPorcentagem = calcularPorcentagemVida(v.vida);
    
    return `
        <div class="card vilao-card" data-id="${v.id}" data-perigo="${v.desafio && parseInt(v.desafio) > 7 ? 'alto' : 'normal'}">
            <div class="card-header">
                <div class="vilao-tipo-emoji" style="background-color: ${tipoVilao.cor}20; color: ${tipoVilao.cor}">
                    ${tipoVilao.emoji}
                </div>
                <h3 class="vilao-nome">${v.nome}</h3>
                <span class="badge-nivel">ND ${v.desafio || '?'}</span>
            </div>
            
            <div class="vilao-status">
                <div class="status-item vida">
                    <span class="status-label">❤️ VIDA</span>
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
                        <span class="label">⚔️ DES</span>
                        <span class="value">${v.deslocamento || '9m'}</span>
                    </div>
                    <div class="status-mini">
                        <span class="label">🎲 ND</span>
                        <span class="value">${v.desafio ? v.desafio.toString().replace(/[^0-9]/g, '') : '?'}</span>
                    </div>
                </div>
            </div>

            ${v.atributos ? `
            <div class="atributos-mini">
                <div class="atributo" title="Força">FOR ${v.atributos.forca || 10}</div>
                <div class="atributo" title="Destreza">DES ${v.atributos.destreza || 10}</div>
                <div class="atributo" title="Constituição">CON ${v.atributos.constituicao || 10}</div>
                <div class="atributo" title="Inteligência">INT ${v.atributos.inteligencia || 10}</div>
                <div class="atributo" title="Sabedoria">SAB ${v.atributos.sabedoria || 10}</div>
                <div class="atributo" title="Carisma">CAR ${v.atributos.carisma || 10}</div>
            </div>
            ` : ''}

            <details class="detalhes-vilao">
                <summary>📖 Ver detalhes completos</summary>
                
                <div class="detalhes-conteudo">
                    <h4>🎲 ATAQUES</h4>
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
                    <ul class="habilidades-list">
                        ${v.habilidades.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    ` : ''}

                    ${v.acoesLendarias?.length ? `
                    <h4>👑 AÇÕES LENDÁRIAS</h4>
                    <ul class="acoes-lendarias-list">
                        ${v.acoesLendarias.map(a => `<li>${a}</li>`).join('')}
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
                    <p class="fraquezas">${v.fraquezas.join(', ')}</p>
                    ` : ''}

                    ${v.tesouro ? `
                    <h4>💰 TESOURO</h4>
                    <p class="tesouro">${v.tesouro}</p>
                    ` : ''}

                    ${v.equipamento?.length ? `
                    <h4>⚔️ EQUIPAMENTO</h4>
                    <ul class="equipamento-list">
                        ${v.equipamento.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                    ` : ''}
                </div>
            </details>

            <div class="acoes-vilao">
                <button class="btn-editar" onclick="editarVilao(${v.id})">
                    <span>✏️</span> Editar
                </button>
                <button class="btn-remover" onclick="removerVilao(${v.id})">
                    <span>🗑️</span> Remover
                </button>
                <button class="btn-duplicar" onclick="duplicarVilao(${v.id})" title="Duplicar">
                    <span>📋</span>
                </button>
            </div>
        </div>
    `;
}

// Duplicar vilão
function duplicarVilao(id) {
    const vilao = state.viloes.find(v => v.id === id);
    if (vilao) {
        const novoVilao = {
            ...vilao,
            id: Date.now(),
            nome: `${vilao.nome} (Cópia)`,
            dataCriacao: new Date().toISOString()
        };
        state.viloes.push(novoVilao);
        salvarDados();
        renderizarViloes();
        atualizarStatsViloes();
    }
}

// Remover vilão (sobrescreve a função global para atualizar stats)
function removerVilao(id) {
    if (confirm('Tem certeza que deseja remover este vilão?')) {
        state.viloes = state.viloes.filter(v => v.id !== id);
        salvarDados();
        renderizarViloes();
        atualizarStatsViloes();
    }
}

// Editar vilão (usando a função global)
function editarVilao(id) {
    if (window.abrirModalVilao) {
        const vilao = state.viloes.find(v => v.id === id);
        if (vilao) {
            window.abrirModalVilao(vilao);
        }
    }
}

// Exportar lista de vilões
function exportarViloes() {
    const dados = JSON.stringify(state.viloes, null, 2);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'viloes-smurfs.json';
    a.click();
}

// Importar lista de vilões
function importarViloes() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const viloesImportados = JSON.parse(event.target.result);
                if (Array.isArray(viloesImportados)) {
                    state.viloes = [...state.viloes, ...viloesImportados];
                    salvarDados();
                    renderizarViloes();
                    atualizarStatsViloes();
                    alert(`${viloesImportados.length} vilões importados com sucesso!`);
                } else {
                    alert('Arquivo inválido');
                }
            } catch {
                alert('Erro ao importar arquivo');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Inicializar página de vilões
function inicializarPaginaViloes() {
    atualizarStatsViloes();
    
    // Adicionar listeners de busca
    const buscaInput = document.getElementById('busca-vilao');
    if (buscaInput) {
        buscaInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                filtrarViloes();
            }
        });
    }
    
    // Adicionar botões de exportação/importação no menu
    const menuContent = document.querySelector('.menu-content');
    if (menuContent) {
        const botoesExtras = document.createElement('div');
        botoesExtras.className = 'botoes-extras';
        botoesExtras.innerHTML = `
            <button onclick="exportarViloes()">📤 Exportar Vilões</button>
            <button onclick="importarViloes()">📥 Importar Vilões</button>
        `;
        menuContent.appendChild(botoesExtras);
    }
}

// Sobrescrever a função global de renderizarViloes
window.renderizarViloes = function() {
    renderizarListaViloes(state.viloes);
    atualizarStatsViloes();
};

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se estamos na página de vilões
    if (document.querySelector('.viloes-page')) {
        inicializarPaginaViloes();
    }
});

// Exportar funções para o escopo global
window.filtrarViloes = filtrarViloes;
window.duplicarVilao = duplicarVilao;
window.exportarViloes = exportarViloes;
window.importarViloes = importarViloes;
window.removerVilao = removerVilao;
window.editarVilao = editarVilao;