// ===== FUNÇÕES ESPECÍFICAS DE NPCs =====

function inicializarPaginaNPCs() {
    console.log('Inicializando página de NPCs');
    renderizarNPCs();
    configurarBuscasNPCs();
}

function configurarBuscasNPCs() {
    const buscaInput = document.getElementById('busca-npc');
    if (buscaInput) {
        buscaInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') buscarNPCs();
        });
    }
}

function calcularTotalSmurfs() {
    return state.npcs.filter(n => 
        n.raca?.toLowerCase().includes('smurf') || 
        n.nome?.toLowerCase().includes('smurf')
    ).length;
}

function renderizarNPCs() {
    const lista = document.getElementById('npcs-lista');
    if (!lista) return;

    if (state.npcs.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">👥</div>
                <h3>Nenhum NPC cadastrado!</h3>
                <p>Adicione personagens importantes para sua campanha</p>
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
            <div class="npc-avatar ${isSmurf ? 'smurf' : ''}">${avatarEmoji}</div>
            <div class="npc-info">
                <h3>
                    ${n.nome}
                    ${n.nivel ? `<span class="npc-nivel">Nv. ${n.nivel}</span>` : ''}
                </h3>
                <p class="funcao">
                    ${n.raca ? `${n.raca}` : ''} ${n.classe ? `• ${n.classe}` : ''}
                </p>
                <p class="descricao">${n.descricao || ''}</p>
                
                <details class="npc-detalhes">
                    <summary>VER MAIS</summary>
                    
                    ${n.atributos ? `
                        <div class="atributos-mini" style="margin: 10px 0;">
                            <div class="atributo">FOR ${n.atributos.forca}</div>
                            <div class="atributo">DES ${n.atributos.destreza}</div>
                            <div class="atributo">CON ${n.atributos.constituicao}</div>
                            <div class="atributo">INT ${n.atributos.inteligencia}</div>
                            <div class="atributo">SAB ${n.atributos.sabedoria}</div>
                            <div class="atributo">CAR ${n.atributos.carisma}</div>
                        </div>
                    ` : ''}
                    
                    ${n.historia ? `<p><strong>História:</strong> ${n.historia}</p>` : ''}
                    ${n.motivacoes ? `<p><strong>Motivações:</strong> ${n.motivacoes}</p>` : ''}
                    ${n.localizacao ? `<p><strong>📍 Onde encontrar:</strong> ${n.localizacao}</p>` : ''}
                    ${n.servicos ? `<p><strong>🛒 Oferece:</strong> ${n.servicos}</p>` : ''}
                </details>
            </div>
            <button class="btn-remover" onclick="removerNPC(${n.id})" style="width: auto; padding: 8px 15px;">🗑️</button>
        </div>
    `;
}

function atualizarStatsNPCs() {
    const totalNPCs = document.getElementById('total-npcs');
    const totalSmurfs = document.getElementById('total-smurfs');
    
    if (totalNPCs) totalNPCs.textContent = state.npcs.length;
    if (totalSmurfs) totalSmurfs.textContent = calcularTotalSmurfs();
}

function filtrarNPCs(tipo) {
    let filtrados = state.npcs;
    
    if (tipo === 'smurf') {
        filtrados = state.npcs.filter(n => 
            n.raca?.toLowerCase().includes('smurf') || 
            n.nome?.toLowerCase().includes('smurf')
        );
    } else if (tipo === 'amigo') {
        filtrados = state.npcs.filter(n => 
            !n.raca?.toLowerCase().includes('smurf')
        );
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
        n.descricao?.toLowerCase().includes(termo) ||
        n.localizacao?.toLowerCase().includes(termo)
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

// Sobrescrever funções globais
window.renderizarNPCs = renderizarNPCs;
window.filtrarNPCs = filtrarNPCs;
window.buscarNPCs = buscarNPCs;