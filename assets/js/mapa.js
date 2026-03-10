let mapaState = {
    imagem: null,
    marcadores: [],
    zoom: 1,
    posicao: { x: 0, y: 0 },
    grid: {
        mostrar: true,
        tamanho: 50,
        opacidade: 0.3,
        cor: '#ffd700',
        colunas: 10,
        linhas: 8
    },
    imagemData: null
};

// ===== INICIALIZAÇÃO =====
function inicializarMapa() {
    carregarMapaSalvo();
    renderizarMapa();
}

// ===== GERENCIAMENTO DE ABAS =====
function mudarAbaMapa(aba) {
    // Esconder todas as abas
    document.querySelectorAll('.aba-mapa, .aba-marcadores, .aba-config').forEach(el => {
        el.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    document.getElementById(`aba-${aba}`).classList.add('active');
    
    // Ativar botão correspondente
    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
        if ((aba === 'mapa' && index === 0) ||
            (aba === 'marcadores' && index === 1) ||
            (aba === 'config' && index === 2)) {
            btn.classList.add('active');
        }
    });
    
    // Renderizar conteúdo da aba
    if (aba === 'marcadores') {
        renderizarListaTodosMarcadores();
    } else if (aba === 'mapa') {
        renderizarMapa();
    }
}

// ===== UPLOAD DE IMAGEM =====
function abrirSeletorImagem() {
    document.getElementById('mapa-imagem').click();
}

function carregarImagemMapa(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // Salvar imagem no estado
                mapaState.imagem = img;
                mapaState.imagemData = e.target.result;
                
                // Mostrar preview
                document.getElementById('mapa-placeholder').style.display = 'none';
                document.getElementById('mapa-canvas').style.display = 'block';
                document.getElementById('preview-imagem').style.display = 'block';
                document.getElementById('img-preview').src = e.target.result;
                
                // Renderizar mapa
                renderizarMapa();
                salvarMapa();
            };
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

function removerImagemMapa() {
    mapaState.imagem = null;
    mapaState.imagemData = null;
    
    document.getElementById('mapa-placeholder').style.display = 'flex';
    document.getElementById('mapa-canvas').style.display = 'none';
    document.getElementById('preview-imagem').style.display = 'none';
    document.getElementById('img-preview').src = '';
    document.getElementById('mapa-imagem').value = '';
    
    renderizarMapa();
    salvarMapa();
}

// ===== RENDERIZAÇÃO DO MAPA =====
function renderizarMapa() {
    const canvas = document.getElementById('mapa-canvas');
    const container = document.getElementById('mapa-principal');
    const marcacoesContainer = document.getElementById('marcacoes-container');
    
    if (!canvas || !container) return;
    
    if (mapaState.imagem) {
        // Configurar canvas
        const ctx = canvas.getContext('2d');
        const containerWidth = container.clientWidth;
        
        // Calcular dimensões proporcionais
        const proporcao = mapaState.imagem.width / mapaState.imagem.height;
        let canvasWidth = containerWidth;
        let canvasHeight = canvasWidth / proporcao;
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Desenhar imagem
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(mapaState.imagem, 0, 0, canvas.width, canvas.height);
        
        // Desenhar grid
        if (mapaState.grid.mostrar) {
            desenharGrid(ctx, canvas.width, canvas.height);
        }
        
        // Atualizar marcadores
        renderizarMarcadores(marcacoesContainer, canvasWidth, canvasHeight);
    }
    
    // Atualizar lista de marcadores visíveis
    atualizarListaMarcadoresVisiveis();
}

function desenharGrid(ctx, width, height) {
    const cellWidth = width / mapaState.grid.colunas;
    const cellHeight = height / mapaState.grid.linhas;
    
    ctx.strokeStyle = mapaState.grid.cor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = mapaState.grid.opacidade;
    
    // Desenhar linhas verticais
    for (let i = 0; i <= mapaState.grid.colunas; i++) {
        const x = i * cellWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Desenhar linhas horizontais
    for (let i = 0; i <= mapaState.grid.linhas; i++) {
        const y = i * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
}

// ===== GERENCIAMENTO DE MARCADORES =====
function renderizarMarcadores(container, canvasWidth, canvasHeight) {
    if (!container) return;
    
    container.innerHTML = '';
    
    mapaState.marcadores.forEach(marcador => {
        const cellWidth = canvasWidth / mapaState.grid.colunas;
        const cellHeight = canvasHeight / mapaState.grid.linhas;
        
        // Calcular posição no canvas
        const x = (marcador.x - 0.5) * cellWidth;
        const y = (marcador.y - 0.5) * cellHeight;
        
        const marcadorEl = document.createElement('div');
        marcadorEl.className = 'marcador-mapa';
        marcadorEl.style.left = x + 'px';
        marcadorEl.style.top = y + 'px';
        marcadorEl.style.color = marcador.cor;
        marcadorEl.innerHTML = `
            ${marcador.icone}
            <span class="marcador-tooltip">${marcador.nome}</span>
        `;
        marcadorEl.onclick = () => abrirDetalhesMarcador(marcador);
        
        container.appendChild(marcadorEl);
    });
}

function abrirModalMarcador(marcador = null) {
    const modal = document.getElementById('modal-marcador');
    const titulo = document.getElementById('modal-marcador-titulo');
    
    if (marcador) {
        titulo.textContent = 'Editar Marcador';
        document.getElementById('marcador-icone').value = marcador.icone;
        document.getElementById('marcador-nome').value = marcador.nome;
        document.getElementById('marcador-descricao').value = marcador.descricao || '';
        document.getElementById('marcador-x').value = marcador.x;
        document.getElementById('marcador-y').value = marcador.y;
        document.getElementById('marcador-tipo').value = marcador.tipo;
        document.getElementById('marcador-cor').value = marcador.cor;
        
        // Guardar ID para edição
        modal.dataset.editId = marcador.id;
    } else {
        titulo.textContent = 'Novo Marcador';
        document.getElementById('form-marcador').reset();
        document.getElementById('marcador-icone').value = '📍';
        document.getElementById('marcador-x').value = 1;
        document.getElementById('marcador-y').value = 1;
        document.getElementById('marcador-cor').value = '#ffd700';
        delete modal.dataset.editId;
    }
    
    modal.style.display = 'block';
}

function fecharModalMarcador() {
    document.getElementById('modal-marcador').style.display = 'none';
}

function selecionarIcone(icone) {
    document.getElementById('marcador-icone').value = icone;
}

function salvarMarcador(event) {
    event.preventDefault();
    
    const modal = document.getElementById('modal-marcador');
    const editId = modal.dataset.editId;
    
    const marcador = {
        id: editId ? parseInt(editId) : Date.now(),
        icone: document.getElementById('marcador-icone').value,
        nome: document.getElementById('marcador-nome').value,
        descricao: document.getElementById('marcador-descricao').value,
        x: parseInt(document.getElementById('marcador-x').value),
        y: parseInt(document.getElementById('marcador-y').value),
        tipo: document.getElementById('marcador-tipo').value,
        cor: document.getElementById('marcador-cor').value
    };
    
    if (editId) {
        // Editar existente
        const index = mapaState.marcadores.findIndex(m => m.id === parseInt(editId));
        if (index !== -1) {
            mapaState.marcadores[index] = marcador;
        }
    } else {
        // Adicionar novo
        mapaState.marcadores.push(marcador);
    }
    
    fecharModalMarcador();
    renderizarMapa();
    salvarMapa();
}

function removerMarcador(id) {
    if (confirm('Remover este marcador?')) {
        mapaState.marcadores = mapaState.marcadores.filter(m => m.id !== id);
        renderizarMapa();
        renderizarListaTodosMarcadores();
        salvarMapa();
    }
}

function editarMarcador(id) {
    const marcador = mapaState.marcadores.find(m => m.id === id);
    if (marcador) {
        abrirModalMarcador(marcador);
    }
}

function renderizarListaTodosMarcadores() {
    const container = document.getElementById('todos-marcadores');
    if (!container) return;
    
    if (mapaState.marcadores.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum marcador criado ainda</p>';
        return;
    }
    
    container.innerHTML = mapaState.marcadores.map(m => `
        <div class="marcador-item">
            <div class="icone" style="color: ${m.cor}">${m.icone}</div>
            <div class="info">
                <h4>${m.nome}</h4>
                <p>${m.descricao || 'Sem descrição'} • Posição: ${m.x},${m.y}</p>
            </div>
            <div class="acoes">
                <button onclick="editarMarcador(${m.id})">✏️</button>
                <button onclick="removerMarcador(${m.id})">🗑️</button>
                <button onclick="irParaMarcador(${m.id})">📍</button>
            </div>
        </div>
    `).join('');
}

function atualizarListaMarcadoresVisiveis() {
    const container = document.getElementById('lista-marcadores');
    if (!container) return;
    
    if (mapaState.marcadores.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum marcador neste mapa</p>';
        return;
    }
    
    container.innerHTML = mapaState.marcadores.map(m => `
        <div class="marcador-item" onclick="irParaMarcador(${m.id})">
            <div class="icone" style="color: ${m.cor}">${m.icone}</div>
            <div class="info">
                <h4>${m.nome}</h4>
                <p>${m.descricao || 'Sem descrição'}</p>
            </div>
        </div>
    `).join('');
}

function irParaMarcador(id) {
    const marcador = mapaState.marcadores.find(m => m.id === id);
    if (marcador) {
        mudarAbaMapa('mapa');
        // TODO: Centralizar no marcador
        alert(`Ir para: ${marcador.nome}`);
    }
}

function abrirDetalhesMarcador(marcador) {
    alert(`
📍 ${marcador.nome}
${marcador.descricao || 'Sem descrição'}
Posição: ${marcador.x}, ${marcador.y}
Tipo: ${marcador.tipo}
    `);
}

// ===== CONFIGURAÇÕES DO GRID =====
function toggleGrid() {
    mapaState.grid.mostrar = document.getElementById('mostrar-grid').checked;
    renderizarMapa();
    salvarMapa();
}

function mudarTamanhoCelula() {
    mapaState.grid.tamanho = parseInt(document.getElementById('tamanho-celula').value);
    renderizarMapa();
    salvarMapa();
}

function mudarOpacidadeGrid() {
    mapaState.grid.opacidade = parseFloat(document.getElementById('grid-opacidade').value);
    renderizarMapa();
    salvarMapa();
}

function mudarCorGrid() {
    mapaState.grid.cor = document.getElementById('grid-cor').value;
    renderizarMapa();
    salvarMapa();
}

function redimensionarMapa() {
    mapaState.grid.colunas = parseInt(document.getElementById('mapa-colunas').value);
    mapaState.grid.linhas = parseInt(document.getElementById('mapa-linhas').value);
    renderizarMapa();
    salvarMapa();
}

// ===== ZOOM E CONTROLES =====
function zoomMapa(direcao) {
    const canvas = document.getElementById('mapa-canvas');
    if (!canvas) return;
    
    if (direcao === 'in') {
        mapaState.zoom = Math.min(mapaState.zoom + 0.1, 2);
    } else {
        mapaState.zoom = Math.max(mapaState.zoom - 0.1, 0.5);
    }
    
    canvas.style.transform = `scale(${mapaState.zoom})`;
    canvas.style.transformOrigin = 'top left';
    
    salvarMapa();
}

function resetarZoom() {
    mapaState.zoom = 1;
    const canvas = document.getElementById('mapa-canvas');
    if (canvas) {
        canvas.style.transform = 'scale(1)';
    }
    salvarMapa();
}

function centralizarMapa() {
    // Implementar centralização
    resetarZoom();
}

// ===== SALVAR E CARREGAR =====
function salvarMapa() {
    try {
        localStorage.setItem('mapaState', JSON.stringify({
            marcadores: mapaState.marcadores,
            grid: mapaState.grid,
            zoom: mapaState.zoom,
            imagemData: mapaState.imagemData
        }));
    } catch (error) {
        console.error('Erro ao salvar mapa:', error);
    }
}

function carregarMapaSalvo() {
    try {
        const saved = localStorage.getItem('mapaState');
        if (saved) {
            const data = JSON.parse(saved);
            mapaState.marcadores = data.marcadores || [];
            mapaState.grid = { ...mapaState.grid, ...data.grid };
            mapaState.zoom = data.zoom || 1;
            
            if (data.imagemData) {
                const img = new Image();
                img.onload = function() {
                    mapaState.imagem = img;
                    mapaState.imagemData = data.imagemData;
                    renderizarMapa();
                };
                img.src = data.imagemData;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
    }
}

function exportarMapaCompleto() {
    const dados = {
        marcadores: mapaState.marcadores,
        grid: mapaState.grid,
        imagemData: mapaState.imagemData
    };
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapa-smurfs.json';
    a.click();
}

function importarMapaCompleto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (data.imagemData) {
                    const img = new Image();
                    img.onload = function() {
                        mapaState.imagem = img;
                        mapaState.imagemData = data.imagemData;
                        mapaState.marcadores = data.marcadores || [];
                        mapaState.grid = { ...mapaState.grid, ...data.grid };
                        
                        renderizarMapa();
                        salvarMapa();
                        alert('Mapa importado com sucesso!');
                    };
                    img.src = data.imagemData;
                }
            } catch {
                alert('Erro ao importar arquivo');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function resetarMapaCompleto() {
    if (confirm('Tem certeza? Isso apagará TODOS os dados do mapa!')) {
        mapaState = {
            imagem: null,
            marcadores: [],
            zoom: 1,
            posicao: { x: 0, y: 0 },
            grid: {
                mostrar: true,
                tamanho: 50,
                opacidade: 0.3,
                cor: '#ffd700',
                colunas: 10,
                linhas: 8
            },
            imagemData: null
        };
        
        removerImagemMapa();
        salvarMapa();
        renderizarMapa();
        renderizarListaTodosMarcadores();
    }
}

// ===== INICIALIZAR QUANDO A PÁGINA CARREGAR =====
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.mapa-page')) {
        inicializarMapa();
    }
});

// Exportar funções para o escopo global
window.mudarAbaMapa = mudarAbaMapa;
window.abrirSeletorImagem = abrirSeletorImagem;
window.carregarImagemMapa = carregarImagemMapa;
window.removerImagemMapa = removerImagemMapa;
window.abrirModalMarcador = abrirModalMarcador;
window.fecharModalMarcador = fecharModalMarcador;
window.selecionarIcone = selecionarIcone;
window.salvarMarcador = salvarMarcador;
window.removerMarcador = removerMarcador;
window.editarMarcador = editarMarcador;
window.irParaMarcador = irParaMarcador;
window.zoomMapa = zoomMapa;
window.resetarZoom = resetarZoom;
window.centralizarMapa = centralizarMapa;
window.toggleGrid = toggleGrid;
window.mudarTamanhoCelula = mudarTamanhoCelula;
window.mudarOpacidadeGrid = mudarOpacidadeGrid;
window.mudarCorGrid = mudarCorGrid;
window.redimensionarMapa = redimensionarMapa;
window.exportarMapaCompleto = exportarMapaCompleto;
window.importarMapaCompleto = importarMapaCompleto;
window.resetarMapaCompleto = resetarMapaCompleto;