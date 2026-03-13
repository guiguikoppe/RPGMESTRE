// ===== GARANTIR QUE A FUNÇÃO ESTÁ GLOBALMENTE DISPONÍVEL =====
window.carregarPagina = window.carregarPagina || function(page) {
    console.log('Função carregarPagina chamada para:', page);
    // Implementação básica de fallback
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `<div class="loading-screen"><h2>Carregando ${page}...</h2><div class="loading-spinner"></div></div>`;
    }
};


// ===== ESTADO GLOBAL =====
let state = {
    viloes: [],
    npcs: [],
    necessidades: [],
    currentPage: 'viloes'
};

// ===== CONSTANTES =====
const VILOES_SMURF = {
    GARGAMEL: { tipo: 'gargamel', emoji: '🧙', cor: '#8b4513' },
    AZRAEL: { tipo: 'azrael', emoji: '🐱', cor: '#f9a826' },
    HOGATHA: { tipo: 'hogatha', emoji: '🧙‍♀️', cor: '#9d4edd' }
};

const SMURFS = {
    PAPAI_SMURF: '👴', SMURFETTE: '👧', DESASTRADO: '🤕',
    VALENTE: '💪', GÊNIO: '👓', COZINHEIRO: '🍳',
    POETA: '📝', BÊBADO: '🍺', JORNALISTA: '📰', VAIDOSO: '🪞'
};

// ===== DADOS INICIAIS =====
const DADOS_INICIAIS = {
    viloes: [
        {
            id: 1001,
            nome: "Gargamel, o Bruxo Sombrio",
            vida: "120/120",
            ca: "16",
            deslocamento: "9m",
            xp: 1000,
            desafio: "9 (1000 XP)",
            atributos: { forca: 12, destreza: 14, constituicao: 16, inteligencia: 20, sabedoria: 16, carisma: 14 },
            pericias: ["Arcanismo +12", "Alquimia +12"],
            resistencias: ["Fogo", "Frio"],
            imunidades: ["Veneno"],
            ataques: [
                { nome: "Cajado do Poder", dano: "2d6+4", bono: "+8" },
                { nome: "Poção Explosiva", dano: "4d6 fogo", bono: "+6" }
            ],
            habilidades: ["Mestre Alquimista", "Magia Sombria"],
            historia: "O bruxo mais temido da região, sempre atrás dos Smurfs para criar a Pedra Filosofal. Vive em uma cabana sombria com seu gato Azrael, sempre tramando novos planos malignos.",
            taticas: "Usa magias de controle primeiro, depois parte para o ataque direto. Quando está com pouca vida, foge para preparar emboscadas.",
            tesouro: "500 po, 2 itens mágicos, grimório de magias",
            fraquezas: ["Salsaparrilha", "Luz solar plena"]
        },
        {
            id: 1002,
            nome: "Azrael, o Gato Demoníaco",
            vida: "95/95",
            ca: "17",
            deslocamento: "12m",
            xp: 1200,
            desafio: "10 (1200 XP)",
            atributos: { forca: 18, destreza: 22, constituicao: 18, inteligencia: 10, sabedoria: 16, carisma: 8 },
            pericias: ["Furtividade +14", "Percepção +11"],
            resistencias: ["Perfurante", "Cortante"],
            ataques: [
                { nome: "Mordida", bono: "+10", dano: "2d8+6" },
                { nome: "Garras", bono: "+10", dano: "2d6+6" }
            ],
            habilidades: ["Nove Vidas", "Furtividade Sombria", "Agilidade Felina"],
            historia: "O fiel companheiro de Gargamel, muito mais perigoso do que aparenta. Adora brincar com as vítimas antes de atacar.",
            taticas: "Ataque furtivo, sempre pelos flancos. Quando ferido, foge para as sombras.",
            tesouro: "Bolas de lã mágicas, coleira encantada",
            fraquezas: ["Novelos de lã", "Erva de gato"]
        },
        {
            id: 1003,
            nome: "Hogatha, a Bruxa do Pântano",
            vida: "145/145",
            ca: "15",
            deslocamento: "9m (voo 12m)",
            xp: 1500,
            desafio: "12 (1500 XP)",
            atributos: { forca: 12, destreza: 14, constituicao: 18, inteligencia: 18, sabedoria: 20, carisma: 16 },
            pericias: ["Arcanismo +12", "Natureza +13"],
            resistencias: ["Ácido", "Frio"],
            imunidades: ["Doenças"],
            ataques: [
                { nome: "Cajado do Pântano", bono: "+7", dano: "1d8+3" },
                { nome: "Raio de Fogo", bono: "+9", dano: "4d6 fogo" }
            ],
            habilidades: ["Magia do Pântano", "Invocar Criaturas"],
            historia: "Uma bruxa poderosa que vive nos pântanos, sempre em busca da juventude eterna.",
            taticas: "Fica voando, usa magias de área, invoca criaturas.",
            tesouro: "1000 po, 3 itens mágicos",
            fraquezas: ["Fogo", "Luz solar"]
        }
    ],
    npcs: [
        {
            id: 2001,
            nome: "Papai Smurf",
            funcao: "Líder da vila",
            raca: "Smurf",
            classe: "Sábio",
            nivel: 15,
            vida: "85/85",
            ca: "14",
            atributos: { forca: 10, destreza: 12, constituicao: 14, inteligencia: 18, sabedoria: 20, carisma: 18 },
            descricao: "O sábio líder dos Smurfs, com mais de 500 anos. Usa barba branca e roupas vermelhas.",
            historia: "Fundador da vila dos Smurfs, conhece todos os segredos da floresta.",
            localizacao: "Casa cogumelo no centro da vila",
            servicos: "Poções curativas, conselhos sábios"
        },
        {
            id: 2002,
            nome: "Smurfette",
            funcao: "Única Smurf feminina",
            raca: "Smurf",
            nivel: 8,
            descricao: "Loira, usa vestido branco. Foi criada por Gargamel mas se tornou uma verdadeira Smurf.",
            localizacao: "Casa rosa na vila"
        },
        {
            id: 2003,
            nome: "Desastrado",
            funcao: "Ajudante atrapalhado",
            raca: "Smurf",
            nivel: 6,
            descricao: "Sempre derruba tudo e causa confusão, mas tem um coração de ouro.",
            localizacao: "Oficina"
        },
        {
            id: 2004,
            nome: "Valente",
            funcao: "Protetor da vila",
            raca: "Smurf",
            classe: "Guerreiro",
            nivel: 10,
            descricao: "O Smurf aventureiro que está sempre pronto para enfrentar Gargamel.",
            localizacao: "Torre de vigia"
        }
    ],
    necessidades: [
        {
            id: 3001,
            item: "Encontrar a Salsaparrilha Perdida",
            categoria: "Missão Principal",
            descricao: "O estoque de salsaparrilha foi roubado por Gargamel. Os Smurfs estão fracos e precisam recuperar.",
            local: "Cabana do Gargamel",
            npcs: "Valente, Desastrado",
            inimigos: "Gargamel, Azrael",
            status: "pendente"
        },
        {
            id: 3002,
            item: "Construir Nova Ponte",
            categoria: "Importante",
            descricao: "A ponte que liga a vila à floresta foi destruída.",
            local: "Rio da Vila",
            status: "andamento"
        },
        {
            id: 3003,
            item: "Poção da Juventude",
            categoria: "Missão Secundária",
            descricao: "Hogatha está procurando ingredientes para sua poção.",
            local: "Pântano Sombrio",
            status: "pendente"
        }
    ]
};

// ===== FUNÇÕES UTILITÁRIAS =====
function classificarVilao(nome) {
    nome = nome.toLowerCase();
    if (nome.includes('gargamel')) return VILOES_SMURF.GARGAMEL;
    if (nome.includes('azrael')) return VILOES_SMURF.AZRAEL;
    if (nome.includes('hogatha')) return VILOES_SMURF.HOGATHA;
    return { tipo: 'outro', emoji: '👾', cor: '#666' };
}

function classificarSmurf(nome) {
    nome = nome.toLowerCase();
    if (nome.includes('papai') || nome.includes('papa')) return SMURFS.PAPAI_SMURF;
    if (nome.includes('smurfette')) return SMURFS.SMURFETTE;
    if (nome.includes('desastrado')) return SMURFS.DESASTRADO;
    if (nome.includes('valente')) return SMURFS.VALENTE;
    return '👤';
}

function calcularPorcentagemVida(vidaStr) {
    try {
        if (vidaStr && vidaStr.includes('/')) {
            const [atual, max] = vidaStr.split('/').map(Number);
            return (atual / max) * 100;
        }
        return 100;
    } catch {
        return 100;
    }
}

function salvarDados() {
    localStorage.setItem('rpgMestreState', JSON.stringify(state));
}

function carregarDados() {
    const saved = localStorage.getItem('rpgMestreState');
    if (saved) {
        state = JSON.parse(saved);
    } else {
        state = { ...DADOS_INICIAIS, currentPage: 'viloes' };
        salvarDados();
    }
}

// ===== FUNÇÕES GLOBAIS =====
function fecharModal() {
    document.getElementById('modal')?.classList.remove('active');
}

function toggleMenu() {
    alert('Menu em desenvolvimento');
}

function abrirModalVilao() { 
    alert('Função de adicionar vilão será implementada em breve!'); 
}

function abrirModalNPC() { 
    alert('Função de adicionar NPC será implementada em breve!'); 
}

function abrirModalNecessidade() { 
    alert('Função de adicionar missão será implementada em breve!'); 
}

function editarVilao(id) {
    const vilao = state.viloes.find(v => v.id === id);
    if (vilao) alert(`Editar: ${vilao.nome}`);
}

function removerVilao(id) {
    if (confirm('Remover este vilão?')) {
        state.viloes = state.viloes.filter(v => v.id !== id);
        salvarDados();
        if (typeof window.renderizarViloes === 'function') window.renderizarViloes();
    }
}

function removerNPC(id) {
    if (confirm('Remover este NPC?')) {
        state.npcs = state.npcs.filter(n => n.id !== id);
        salvarDados();
        if (typeof window.renderizarNPCs === 'function') window.renderizarNPCs();
    }
}

function removerNecessidade(id) {
    if (confirm('Remover este item?')) {
        state.necessidades = state.necessidades.filter(n => n.id !== id);
        salvarDados();
        if (typeof window.renderizarNecessidades === 'function') window.renderizarNecessidades();
    }
}

function mudarStatusNecessidade(id, novoStatus) {
    const item = state.necessidades.find(n => n.id === id);
    if (item) {
        item.status = novoStatus;
        salvarDados();
        if (typeof window.renderizarNecessidades === 'function') window.renderizarNecessidades();
    }
}

function exportarTodosDados() {
    const dados = JSON.stringify(state, null, 2);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados-campanha-smurfs.json';
    a.click();
}

function importarTodosDados() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                state = JSON.parse(event.target.result);
                salvarDados();
                recarregarPaginaAtual();
                alert('Dados importados!');
            } catch {
                alert('Erro ao importar arquivo');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function limparTodosDados() {
    if (confirm('Tem certeza? Isso apagará TODOS os dados!')) {
        state = {
            viloes: [],
            npcs: [],
            necessidades: [],
            currentPage: state.currentPage
        };
        salvarDados();
        recarregarPaginaAtual();
        alert('Todos os dados foram apagados!');
    }
}

function recarregarPaginaAtual() {
    if (state.currentPage) {
        window.carregarPagina(state.currentPage);
    }
}

// ===== RENDERIZAÇÃO DE VILÕES =====
function renderizarViloes() {
    const lista = document.getElementById('viloes-lista');
    if (!lista) return;

    if (state.viloes.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">🧙</div>
                <h3>Nenhum vilão cadastrado!</h3>
                <p>Adicione vilões usando o botão abaixo</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = state.viloes.map(v => criarCardVilao(v)).join('');
    atualizarStatsViloes();
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
                    <div class="atributo">FOR ${v.atributos?.forca || 10}</div>
                    <div class="atributo">DES ${v.atributos?.destreza || 10}</div>
                    <div class="atributo">CON ${v.atributos?.constituicao || 10}</div>
                    <div class="atributo">INT ${v.atributos?.inteligencia || 10}</div>
                    <div class="atributo">SAB ${v.atributos?.sabedoria || 10}</div>
                    <div class="atributo">CAR ${v.atributos?.carisma || 10}</div>
                </div>

                <details class="detalhes-vilao">
                    <summary>📖 VER DETALHES</summary>
                    
                    <div class="detalhes-conteudo">
                        ${v.pericias?.length ? `
                            <h4>🎯 PERÍCIAS</h4>
                            <p>${v.pericias.join(' • ')}</p>
                        ` : ''}
                        
                        <h4>⚔️ ATAQUES</h4>
                        <ul class="ataques-list">
                            ${v.ataques?.map(a => `
                                <li>
                                    <span class="ataque-nome">${a.nome}</span>
                                    <span class="ataque-dano">${a.dano}</span>
                                </li>
                            `).join('') || '<li>Nenhum ataque</li>'}
                        </ul>

                        ${v.habilidades?.length ? `
                            <h4>✨ HABILIDADES</h4>
                            <ul class="ataques-list">
                                ${v.habilidades.map(h => `<li>${h}</li>`).join('')}
                            </ul>
                        ` : ''}

                        <h4>📜 HISTÓRIA</h4>
                        <div class="historia">${v.historia || 'Nenhuma história.'}</div>

                        ${v.taticas ? `<h4>⚔️ TÁTICAS</h4><p class="taticas">${v.taticas}</p>` : ''}
                        ${v.fraquezas?.length ? `<h4>💔 FRAQUEZAS</h4><p>${v.fraquezas.join(', ')}</p>` : ''}
                        ${v.tesouro ? `<h4>💰 TESOURO</h4><p>${v.tesouro}</p>` : ''}
                    </div>
                </details>

                <div class="acoes-vilao">
                    <button class="btn-editar" onclick="editarVilao(${v.id})">✏️ EDITAR</button>
                    <button class="btn-remover" onclick="removerVilao(${v.id})">🗑️ REMOVER</button>
                </div>
            </div>
        </div>
    `;
}

function atualizarStatsViloes() {
    const totalViloes = document.getElementById('total-viloes');
    const totalND = document.getElementById('total-nd');
    const ameacaPrincipal = document.getElementById('ameaca-principal');
    
    if (totalViloes) totalViloes.textContent = state.viloes.length;
    
    if (totalND) {
        const ndTotal = state.viloes.reduce((acc, v) => {
            const nd = parseInt(v.desafio?.toString().replace(/[^0-9]/g, '')) || 0;
            return acc + nd;
        }, 0);
        totalND.textContent = ndTotal;
    }
    
    if (ameacaPrincipal) {
        if (state.viloes.length === 0) {
            ameacaPrincipal.textContent = '-';
        } else {
            let maiorND = 0;
            let principal = state.viloes[0]?.nome || '-';
            state.viloes.forEach(v => {
                const nd = parseInt(v.desafio?.toString().replace(/[^0-9]/g, '')) || 0;
                if (nd > maiorND) {
                    maiorND = nd;
                    principal = v.nome;
                }
            });
            ameacaPrincipal.textContent = principal;
        }
    }
}

function filtrarViloes() {
    const busca = document.getElementById('busca-vilao')?.value.toLowerCase() || '';
    const nivel = document.getElementById('filtro-nivel')?.value || '';
    const tipo = document.getElementById('filtro-tipo')?.value || '';
    
    const filtrados = state.viloes.filter(v => {
        if (busca && !v.nome.toLowerCase().includes(busca)) return false;
        
        if (nivel) {
            const nd = parseInt(v.desafio?.toString().replace(/[^0-9]/g, '')) || 0;
            if (nivel === '10' && nd < 10) return false;
            if (nivel !== '10' && nd !== parseInt(nivel)) return false;
        }
        
        if (tipo) {
            const nomeLower = v.nome.toLowerCase();
            if (tipo === 'gargamel' && !nomeLower.includes('gargamel')) return false;
            if (tipo === 'azrael' && !nomeLower.includes('azrael')) return false;
        }
        return true;
    });
    
    const lista = document.getElementById('viloes-lista');
    if (lista) {
        if (filtrados.length === 0) {
            lista.innerHTML = '<div class="empty-state">Nenhum vilão encontrado</div>';
        } else {
            lista.innerHTML = filtrados.map(v => criarCardVilao(v)).join('');
        }
    }
}

// ===== RENDERIZAÇÃO DE NPCs =====
function renderizarNPCs() {
    const lista = document.getElementById('npcs-lista');
    if (!lista) return;

    if (state.npcs.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">👥</div>
                <h3>Nenhum NPC cadastrado!</h3>
                <p>Adicione personagens importantes</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = state.npcs.map(n => criarCardNPC(n)).join('');
    atualizarStatsNPCs();
}

function criarCardNPC(n) {
    const isSmurf = n.raca?.toLowerCase().includes('smurf') || n.nome?.toLowerCase().includes('smurf');
    const avatarEmoji = isSmurf ? classificarSmurf(n.nome) : '👤';
    
    return `
        <div class="npc-card ${isSmurf ? 'smurf' : ''}">
            <div class="npc-avatar">${avatarEmoji}</div>
            <div class="npc-info">
                <h3>
                    ${n.nome}
                    ${n.nivel ? `<span class="npc-nivel">Nv. ${n.nivel}</span>` : ''}
                </h3>
                <p class="funcao">${n.raca || ''} ${n.classe ? `• ${n.classe}` : ''}</p>
                <p class="descricao">${n.descricao || ''}</p>
                
                <details class="npc-detalhes">
                    <summary>VER MAIS</summary>
                    ${n.historia ? `<p><strong>História:</strong> ${n.historia}</p>` : ''}
                    ${n.localizacao ? `<p><strong>📍 Local:</strong> ${n.localizacao}</p>` : ''}
                    ${n.servicos ? `<p><strong>🛒 Oferece:</strong> ${n.servicos}</p>` : ''}
                </details>
            </div>
            <button class="btn-remover" onclick="removerNPC(${n.id})" style="width: auto; padding: 10px 15px;">🗑️</button>
        </div>
    `;
}

function atualizarStatsNPCs() {
    const totalNPCs = document.getElementById('total-npcs');
    const totalSmurfs = document.getElementById('total-smurfs');
    
    if (totalNPCs) totalNPCs.textContent = state.npcs.length;
    if (totalSmurfs) {
        const smurfs = state.npcs.filter(n => 
            n.raca?.toLowerCase().includes('smurf') || 
            n.nome?.toLowerCase().includes('smurf')
        ).length;
        totalSmurfs.textContent = smurfs;
    }
}

function filtrarNPCs(tipo) {
    let filtrados = state.npcs;
    
    if (tipo === 'smurf') {
        filtrados = state.npcs.filter(n => 
            n.raca?.toLowerCase().includes('smurf') || 
            n.nome?.toLowerCase().includes('smurf')
        );
    } else if (tipo === 'amigo') {
        filtrados = state.npcs.filter(n => !n.raca?.toLowerCase().includes('smurf'));
    }
    
    const lista = document.getElementById('npcs-lista');
    if (lista) {
        if (filtrados.length === 0) {
            lista.innerHTML = '<div class="empty-state">Nenhum NPC encontrado</div>';
        } else {
            lista.innerHTML = filtrados.map(n => criarCardNPC(n)).join('');
        }
    }
}

function buscarNPCs() {
    const termo = document.getElementById('busca-npc')?.value.toLowerCase() || '';
    
    if (!termo) {
        renderizarNPCs();
        return;
    }
    
    const filtrados = state.npcs.filter(n => 
        n.nome.toLowerCase().includes(termo) ||
        n.funcao?.toLowerCase().includes(termo) ||
        n.descricao?.toLowerCase().includes(termo)
    );
    
    const lista = document.getElementById('npcs-lista');
    if (lista) {
        if (filtrados.length === 0) {
            lista.innerHTML = '<div class="empty-state">Nenhum NPC encontrado</div>';
        } else {
            lista.innerHTML = filtrados.map(n => criarCardNPC(n)).join('');
        }
    }
}

// ===== RENDERIZAÇÃO DE MISSÕES =====
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
    if (pendentes) pendentes.textContent = state.necessidades.filter(n => n.status === 'pendente' || !n.status).length;
    if (concluidas) concluidas.textContent = state.necessidades.filter(n => n.status === 'concluida').length;
}

function filtrarNecessidades(status) {
    const statusTabs = document.querySelectorAll('.status-tabs .tab-btn');
    statusTabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    let filtrados = state.necessidades;
    if (status !== 'todas') {
        filtrados = state.necessidades.filter(n => n.status === status);
    }
    
    const lista = document.getElementById('necessidades-lista');
    if (lista) {
        if (filtrados.length === 0) {
            lista.innerHTML = '<div class="empty-state">Nenhuma missão encontrada</div>';
        } else {
            lista.innerHTML = filtrados.map(n => criarItemNecessidade(n, n.status === 'concluida')).join('');
        }
    }
}

// ===== FUNÇÕES DA HISTÓRIA =====
function inicializarPaginaHistoria() {
    console.log('Inicializando página de história');
    
    // Carregar CSS específico
    const linkExistente = document.getElementById('css-historia');
    if (!linkExistente) {
        const link = document.createElement('link');
        link.id = 'css-historia';
        link.rel = 'stylesheet';
        link.href = './assets/css/historia.css';
        document.head.appendChild(link);
    }
    
    // Buscar o conteúdo completo da história
    fetch('pages/historia.html')
        .then(response => response.text())
        .then(html => {
            const content = document.getElementById('content');
            if (content) {
                content.innerHTML = html;
                configurarTimeline();
                mostrarArco('visao-geral');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar história:', error);
            // Fallback para o conteúdo padrão
            const content = document.getElementById('content');
            if (content) {
                content.innerHTML = `
                    <div class="historia-page">
                        <div class="historia-header">
                            <div class="historia-titulo">
                                <h1>A MARCA AZUL</h1>
                                <div class="historia-subtitulo">O segredo da origem dos Smurfs</div>
                            </div>
                        </div>
                        <div class="historia-timeline">
                            <div class="timeline-item active"><div class="timeline-dot">🔮</div><div class="timeline-label">Visão</div></div>
                            <div class="timeline-item"><div class="timeline-dot">🌲</div><div class="timeline-label">S1</div></div>
                            <div class="timeline-item"><div class="timeline-dot">🔍</div><div class="timeline-label">S2</div></div>
                            <div class="timeline-item"><div class="timeline-dot">🧪</div><div class="timeline-label">S3</div></div>
                            <div class="timeline-item"><div class="timeline-dot">🏰</div><div class="timeline-label">S4</div></div>
                            <div class="timeline-item"><div class="timeline-dot">⭐</div><div class="timeline-label">Fim</div></div>
                        </div>
                        <div class="historia-conteudo">
                            <div id="arco-visao-geral" class="arco-conteudo active">
                                <div class="simbolo-container">
                                    <div class="simbolo-marca">
                                        <span class="triangulo">△</span>
                                        <span class="circulo">○</span>
                                        <span class="linhas">— —</span>
                                    </div>
                                </div>
                                <div class="historia-card">
                                    <h2>A Marca do Experimento</h2>
                                    <p>Todos os personagens possuem uma pequena marca azul mais escura na pele. Eles sempre acharam que era apenas uma mancha de nascimento, mas na verdade é uma marca alquímica de um experimento.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                configurarTimeline();
                mostrarArco('visao-geral');
            }
        });
}

function configurarTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const arcos = ['visao-geral', 'sessao1', 'sessao2', 'sessao3', 'sessao4', 'revelacao'];
            if (index < arcos.length) {
                mostrarArco(arcos[index]);
            }
        });
    });
}

function mostrarArco(arco) {
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const timelineIndex = ['visao-geral', 'sessao1', 'sessao2', 'sessao3', 'sessao4', 'revelacao'].indexOf(arco);
    if (timelineIndex !== -1) {
        document.querySelectorAll('.timeline-item')[timelineIndex]?.classList.add('active');
    }
    
    document.querySelectorAll('.arco-conteudo').forEach(el => {
        el.classList.remove('active');
    });
    
    const arcoElement = document.getElementById(`arco-${arco}`);
    if (arcoElement) {
        arcoElement.classList.add('active');
    }
}

// ===== FUNÇÕES DA PÁGINA DE ARMAS =====
function inicializarPaginaArmas() {
    console.log('Inicializando página de armas');
    
    // Carregar o conteúdo da página de armas
    fetch('pages/armas.html')
        .then(response => response.text())
        .then(html => {
            const content = document.getElementById('content');
            if (content) {
                content.innerHTML = html;
                atualizarStatsArmas();
                configurarBuscasArmas();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar armas:', error);
            // Fallback para conteúdo padrão
            const content = document.getElementById('content');
            if (content) {
                content.innerHTML = `
                    <div class="armas-page">
                        <div class="page-header">
                            <div class="header-title">
                                <span class="header-emoji">⚔️</span>
                                <h1>ARMAS DOS SMURFS</h1>
                            </div>
                            <p class="header-subtitle">Erro ao carregar arsenal</p>
                        </div>
                    </div>
                `;
            }
        });
}

// Dados das armas para cálculos
const armasData = {
    natureza: 5,
    tecnologia: 4,
    forca: 4,
    bipolar: 4,
    militar: 4,
    total: 25
};

function atualizarStatsArmas() {
    const totalArmas = document.getElementById('total-armas');
    const totalNatureza = document.getElementById('total-natureza');
    const totalTecnologia = document.getElementById('total-tecnologia');
    const totalForca = document.getElementById('total-forca');
    const totalBipolar = document.getElementById('total-bipolar');
    const totalMilitar = document.getElementById('total-militar');
    
    if (totalArmas) totalArmas.textContent = armasData.total;
    if (totalNatureza) totalNatureza.textContent = armasData.natureza;
    if (totalTecnologia) totalTecnologia.textContent = armasData.tecnologia;
    if (totalForca) totalForca.textContent = armasData.forca;
    if (totalBipolar) totalBipolar.textContent = armasData.bipolar;
    if (totalMilitar) totalMilitar.textContent = armasData.militar;
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
        const btnTodas = document.querySelector('.filtro-tag[onclick*="todas"]');
        if (btnTodas) btnTodas.classList.add('active');
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
        if (lista) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'empty-state';
            msgDiv.innerHTML = `
                <div class="emoji">🔍</div>
                <h3>Nenhuma arma encontrada</h3>
                <p>Tente outros termos de busca</p>
            `;
            lista.innerHTML = '';
            lista.appendChild(msgDiv);
        }
    }
}

// ===== CARREGAMENTO DE PÁGINA =====
window.carregarPagina = function(page) {
    state.currentPage = page;
    localStorage.setItem('currentPage', page);
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });

    const content = document.getElementById('content');
    if (!content) return;
    
    // Templates das páginas
    const templates = {
        viloes: `
            <div class="viloes-page">
                <div class="page-header">
                    <div class="header-title">
                        <span class="header-emoji">👾</span>
                        <h1>VILÕES DA CAMPANHA</h1>
                    </div>
                    <p class="header-subtitle">Gerencie todos os antagonistas da sua aventura</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">👾</div>
                        <div class="stat-info">
                            <span class="stat-value" id="total-viloes">${state.viloes.length}</span>
                            <span class="stat-label">Total</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⚔️</div>
                        <div class="stat-info">
                            <span class="stat-value" id="total-nd">0</span>
                            <span class="stat-label">ND Total</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">👑</div>
                        <div class="stat-info">
                            <span class="stat-value" id="ameaca-principal">-</span>
                            <span class="stat-label">Ameaça</span>
                        </div>
                    </div>
                </div>
                
                <div class="filtros-container">
                    <div class="busca-wrapper">
                        <input type="text" id="busca-vilao" placeholder="🔍 Buscar por nome..." class="busca-input">
                        <button class="btn-busca" onclick="filtrarViloes()">Buscar</button>
                    </div>
                    <div class="filtros-grid">
                        <select id="filtro-nivel" class="filtro-select" onchange="filtrarViloes()">
                            <option value="">Todos os Níveis</option>
                            <option value="1">Nível 1</option>
                            <option value="2">Nível 2</option>
                            <option value="3">Nível 3</option>
                            <option value="4">Nível 4</option>
                            <option value="5">Nível 5</option>
                            <option value="6">Nível 6</option>
                            <option value="7">Nível 7</option>
                            <option value="8">Nível 8</option>
                            <option value="9">Nível 9</option>
                            <option value="10">Nível 10+</option>
                        </select>
                        <select id="filtro-tipo" class="filtro-select" onchange="filtrarViloes()">
                            <option value="">Todos os Tipos</option>
                            <option value="gargamel">Gargamel</option>
                            <option value="azrael">Azrael</option>
                        </select>
                    </div>
                </div>
                
                <div id="viloes-lista" class="viloes-lista"></div>
                
                <button class="btn-add" onclick="abrirModalVilao()">
                    <span class="btn-icon">👾</span>
                    ADICIONAR VILÃO
                    <span class="btn-icon">✨</span>
                </button>
            </div>
        `,
        
        npcs: `
            <div class="npcs-page">
                <div class="page-header">
                    <div class="header-title">
                        <span class="header-emoji">👥</span>
                        <h1>SMURFS E NPCs</h1>
                    </div>
                    <p class="header-subtitle">Todos os personagens importantes</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-info">
                            <span class="stat-value" id="total-npcs">${state.npcs.length}</span>
                            <span class="stat-label">Total</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🧢</div>
                        <div class="stat-info">
                            <span class="stat-value" id="total-smurfs">0</span>
                            <span class="stat-label">Smurfs</span>
                        </div>
                    </div>
                </div>
                
                <div class="filtros-rapidos">
                    <button class="filtro-tag" onclick="filtrarNPCs('todos')">Todos</button>
                    <button class="filtro-tag" onclick="filtrarNPCs('smurf')">🧢 Smurfs</button>
                    <button class="filtro-tag" onclick="filtrarNPCs('amigo')">🦊 Amigos</button>
                </div>
                
                <div class="busca-wrapper" style="margin-bottom: 25px;">
                    <input type="text" id="busca-npc" placeholder="🔍 Buscar por nome..." class="busca-input">
                    <button class="btn-busca" onclick="buscarNPCs()">Buscar</button>
                </div>
                
                <div id="npcs-lista" class="npcs-lista"></div>
                
                <button class="btn-add" onclick="abrirModalNPC()">
                    <span class="btn-icon">👥</span>
                    ADICIONAR NPC
                    <span class="btn-icon">✨</span>
                </button>
            </div>
        `,


armas: `
    <div class="armas-page">
        <div class="loading-screen">
            <div class="loading-spinner"></div>
            <p>Carregando arsenal...</p>
        </div>
    </div>
` ,
        necessidades: `
            <div class="necessidades-page">
                <div class="page-header">
                    <div class="header-title">
                        <span class="header-emoji">📋</span>
                        <h1>MISSÕES E ITENS</h1>
                    </div>
                    <p class="header-subtitle">Organize missões e tarefas</p>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">📋</div>
                        <div class="stat-info">
                            <span class="stat-value" id="total-missoes">${state.necessidades.length}</span>
                            <span class="stat-label">Total</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-info">
                            <span class="stat-value" id="pendentes">0</span>
                            <span class="stat-label">Pendentes</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-info">
                            <span class="stat-value" id="concluidas">0</span>
                            <span class="stat-label">Concluídas</span>
                        </div>
                    </div>
                </div>
                
                <div class="status-tabs">
                    <button class="tab-btn active" onclick="filtrarNecessidades('todas')">Todas</button>
                    <button class="tab-btn" onclick="filtrarNecessidades('pendente')">⏳ Pendentes</button>
                    <button class="tab-btn" onclick="filtrarNecessidades('andamento')">⚙️ Andamento</button>
                    <button class="tab-btn" onclick="filtrarNecessidades('concluida')">✅ Concluídas</button>
                </div>
                
                <ul id="necessidades-lista" class="necessidades-lista"></ul>
                
                <button class="btn-add" onclick="abrirModalNecessidade()">
                    <span class="btn-icon">📋</span>
                    ADICIONAR MISSÃO
                    <span class="btn-icon">✨</span>
                </button>
            </div>
        `,
        
        historia: `
            <div class="historia-page">
                <div class="loading-screen">
                    <div class="loading-spinner"></div>
                    <p>Carregando a história...</p>
                </div>
            </div>
        `
    };
    
    content.innerHTML = templates[page] || '<div>Erro</div>';
    
    // Renderizar dados específicos
    setTimeout(() => {
        if (page === 'viloes') {
            renderizarViloes();
        } else if (page === 'npcs') {
            renderizarNPCs();
        } else if (page === 'necessidades') {
            renderizarNecessidades();
        } else if (page === 'historia') {
            inicializarPaginaHistoria();
        } else if (page === 'armas') {
            inicializarPaginaArmas();
        }
    }, 100);
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            window.carregarPagina(item.dataset.page);
        });
    });
    
    const ultimaPagina = localStorage.getItem('currentPage') || 'viloes';
    window.carregarPagina(ultimaPagina);
});

// ===== EXPORTAR FUNÇÕES =====
window.abrirModalVilao = abrirModalVilao;
window.abrirModalNPC = abrirModalNPC;
window.abrirModalNecessidade = abrirModalNecessidade;
window.fecharModal = fecharModal;
window.toggleMenu = toggleMenu;
window.editarVilao = editarVilao;
window.removerVilao = removerVilao;
window.removerNPC = removerNPC;
window.removerNecessidade = removerNecessidade;
window.mudarStatusNecessidade = mudarStatusNecessidade;
window.renderizarViloes = renderizarViloes;
window.renderizarNPCs = renderizarNPCs;
window.renderizarNecessidades = renderizarNecessidades;
window.filtrarViloes = filtrarViloes;
window.filtrarNPCs = filtrarNPCs;
window.buscarNPCs = buscarNPCs;
window.filtrarNecessidades = filtrarNecessidades;
window.exportarTodosDados = exportarTodosDados;
window.importarTodosDados = importarTodosDados;
window.limparTodosDados = limparTodosDados;
window.mostrarArco = mostrarArco;
window.inicializarPaginaHistoria = inicializarPaginaHistoria;
window.inicializarPaginaArmas = inicializarPaginaArmas;
window.filtrarArmas = filtrarArmas;
window.buscarArmas = buscarArmas;