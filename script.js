// ===== ESTADO GLOBAL =====
let state = {
    viloes: [],
    npcs: [],
    necessidades: [],
    mapa: {
        celulas: {},
        notas: '',
        zoom: 2,
        grade: true
    },
    currentPage: 'viloes'
};

// ===== CONSTANTES DO TEMA SMURFS =====
const VILOES_SMURF = {
    GARGAMEL: {
        tipo: 'gargamel',
        emoji: '🧙',
        cor: '#8b4513'
    },
    AZRAEL: {
        tipo: 'azrael',
        emoji: '🐱',
        cor: '#f9a826'
    },
    HOGATHA: {
        tipo: 'hogatha',
        emoji: '🧙‍♀️',
        cor: '#9d4edd'
    }
};

const SMURFS = {
    PAPAI_SMURF: '👴',
    SMURFETTE: '👧',
    DESASTRADO: '🤕',
    VALENTE: '💪',
    GÊNIO: '👓',
    COZINHEIRO: '🍳',
    POETA: '📝',
    BÊBADO: '🍺',
    JORNALISTA: '📰',
    VAIDOSO: '🪞'
};

// ===== SISTEMA D&D 5.5 COMPLETO =====
const DND_5E = {
    classes: [
        'Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 
        'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge',
        'Paladino', 'Patrulheiro'
    ],
    
    racas: [
        'Anão', 'Elfo', 'Halfling', 'Humano', 'Draconato',
        'Gnomo', 'Meio-Elfo', 'Meio-Orc', 'Tiefling', 'Aasimar'
    ],
    
    tendencias: [
        'Leal e Bom', 'Neutro e Bom', 'Caótico e Bom',
        'Leal e Neutro', 'Neutro', 'Caótico e Neutro',
        'Leal e Mau', 'Neutro e Mau', 'Caótico e Mau'
    ],
    
    tamanhos: ['Pequeno', 'Médio', 'Grande', 'Enorme'],
    
    dificuldades: {
        'Fácil': { xp: 50, nivel: '1-2' },
        'Médio': { xp: 100, nivel: '3-4' },
        'Difícil': { xp: 200, nivel: '5-6' },
        'Perigoso': { xp: 400, nivel: '7-8' },
        'Letal': { xp: 800, nivel: '9-10' }
    }
};

// ===== VILÕES POR NÍVEL (D&D 5.5) =====
const VILOES_POR_NIVEL = {
    iniciante: [
        {
            id: 'lvl1-1',
            nome: "Ratinho da Masmorra",
            nivel: 1,
            xp: 50,
            vida: "15/15",
            ca: "12",
            deslocamento: "9m",
            atributos: {
                forca: 8,
                destreza: 14,
                constituicao: 10,
                inteligencia: 6,
                sabedoria: 8,
                carisma: 4
            },
            pericias: ["Furtividade +4", "Percepção +1"],
            resistencias: [],
            imunidades: [],
            sentidos: "Visão no escuro 18m",
            idiomas: "Comum",
            desafio: "1/4 (50 XP)",
            ataques: [
                { nome: "Mordida", bono: "+4", dano: "1d4+2 perfurante", alcance: "Corpo a corpo" }
            ],
            habilidades: [
                "Faro Aguçado: Vantagem em testes de Percepção baseados em olfato"
            ],
            acoesLendarias: [],
            equipamento: [],
            historia: "Um rato gigante que vive nas masmorras da floresta. Mais irritante que perigoso, mas em bando pode ser problemático.",
            taticas: "Ataca em grupos e foge quando sozinho",
            tesouro: "1d4 peças de cobre, ossos roídos",
            fraquezas: []
        },
        {
            id: 'lvl1-2',
            nome: "Goblin Petulante",
            nivel: 1,
            xp: 50,
            vida: "18/18",
            ca: "13",
            deslocamento: "9m",
            atributos: {
                forca: 8,
                destreza: 14,
                constituicao: 10,
                inteligencia: 10,
                sabedoria: 8,
                carisma: 8
            },
            pericias: ["Furtividade +6", "Percepção +1"],
            resistencias: [],
            imunidades: [],
            sentidos: "Visão no escuro 18m",
            idiomas: "Comum, Goblin",
            desafio: "1/4 (50 XP)",
            ataques: [
                { nome: "Espada Curta", bono: "+4", dano: "1d6+2 perfurante", alcance: "Corpo a corpo" },
                { nome: "Adaga", bono: "+4", dano: "1d4+2 perfurante", alcance: "9/18m" }
            ],
            habilidades: [
                "Esquiva Goblin: Pode usar Ação de Esquiva como ação bônus"
            ],
            acoesLendarias: [],
            equipamento: ["Espada curta", "Adaga", "10 peças de cobre"],
            historia: "Um goblin atrapalhado que tenta provar seu valor para a tribo.",
            taticas: "Ataca e se esconde, usa emboscadas",
            tesouro: "Objetos roubados sem valor",
            fraquezas: []
        }
    ],
    
    medio: [
        {
            id: 'lvl3-1',
            nome: "Hobgoblin Sargento",
            nivel: 3,
            xp: 150,
            vida: "45/45",
            ca: "16",
            deslocamento: "9m",
            atributos: {
                forca: 16,
                destreza: 14,
                constituicao: 15,
                inteligencia: 12,
                sabedoria: 12,
                carisma: 10
            },
            pericias: ["Intimidação +4", "Percepção +3", "Sobrevivência +3"],
            resistencias: [],
            imunidades: [],
            sentidos: "Visão no escuro 18m",
            idiomas: "Comum, Goblin",
            desafio: "1 (150 XP)",
            ataques: [
                { nome: "Espada Longa", bono: "+5", dano: "1d8+3 cortante", alcance: "Corpo a corpo" },
                { nome: "Arco Longo", bono: "+4", dano: "1d8+2 perfurante", alcance: "45/180m" }
            ],
            habilidades: [
                "Tática de Grupo: Aliados têm vantagem em ataques contra inimigos adjacentes"
            ],
            acoesLendarias: [],
            equipamento: ["Espada longa", "Arco longo", "20 flechas", "Armadura de couro batido"],
            historia: "Um hobgoblin disciplinado que comanda um pelotão de goblins nas fronteiras da floresta.",
            taticas: "Coordena ataques em grupo, formações defensivas",
            tesouro: "1d10 po, equipamento militar",
            fraquezas: []
        },
        {
            id: 'lvl4-1',
            nome: "Orc Berserker",
            nivel: 4,
            xp: 200,
            vida: "67/67",
            ca: "14",
            deslocamento: "9m",
            atributos: {
                forca: 18,
                destreza: 12,
                constituicao: 17,
                inteligencia: 8,
                sabedoria: 10,
                carisma: 7
            },
            pericias: ["Intimidação +6", "Percepção +2"],
            resistencias: [],
            imunidades: [],
            sentidos: "Visão no escuro 18m",
            idiomas: "Comum, Orc",
            desafio: "2 (200 XP)",
            ataques: [
                { nome: "Machado Grande", bono: "+6", dano: "1d12+4 cortante", alcance: "Corpo a corpo" }
            ],
            habilidades: [
                "Fúria (1/descanso): Vantagem em testes de Força, resistência a dano físico"
            ],
            acoesLendarias: [],
            equipamento: ["Machado grande", "Pele de urso", "Troféus de guerra"],
            historia: "Um guerreiro orc que busca glória em batalha. Respeita apenas a força bruta.",
            taticas: "Carga direta, foco no inimigo mais forte",
            tesouro: "1d20 po, crânios de inimigos",
            fraquezas: []
        }
    ],
    
    dificil: [
        {
            id: 'lvl5-1',
            nome: "Mago Negro das Sombras",
            nivel: 5,
            xp: 400,
            vida: "52/52",
            ca: "12",
            ca_com_armadura_arcana: "15",
            deslocamento: "9m",
            atributos: {
                forca: 8,
                destreza: 14,
                constituicao: 14,
                inteligencia: 18,
                sabedoria: 12,
                carisma: 10
            },
            pericias: ["Arcanismo +8", "História +8", "Investigação +8", "Percepção +5"],
            resistencias: ["Dano psíquico"],
            imunidades: [],
            sentidos: "Visão no escuro 18m",
            idiomas: "Comum, Élfico, Abissal, Draconico",
            desafio: "4 (400 XP)",
            magias: {
                truques: ["Raio de Gelo", "Mão Mágica", "Prestidigitação"],
                nivel1: ["Armadura Arcana", "Projétil Mágico", "Escudo"],
                nivel2: ["Invisibilidade", "Espada Flamejante", "Sugestão"],
                nivel3: ["Bola de Fogo", "Voo", "Dissipar Magia"]
            },
            ataques: [
                { nome: "Cajado Arcano", bono: "+5", dano: "1d6+2 concussão", alcance: "Corpo a corpo" },
                { nome: "Projétil Mágico", bono: "Automático", dano: "3d4+3", alcance: "36m" }
            ],
            habilidades: [
                "Resistência Arcana: Vantagem em testes contra magia"
            ],
            acoesLendarias: [
                "Magia Rápida (2 ações): Lança um truque",
                "Escudo Arcano (3 ações): +5 CA até o próximo turno"
            ],
            equipamento: ["Cajado arcano", "Livro de magias", "Poção de cura"],
            fraquezas: ["Luz solar plena", "Símbolos sagrados"],
            historia: "Um ex-mago que foi corrompido por um artefato sombrio encontrado nas ruínas.",
            taticas: "Fica na retaguarda, usa controle de grupo, foge quando ferido",
            tesouro: "Livro de magias (3 magias aleatórias), 3d20 po, item mágico menor"
        },
        {
            id: 'lvl6-1',
            nome: "Capitão dos Bandidos",
            nivel: 6,
            xp: 450,
            vida: "78/78",
            ca: "17",
            deslocamento: "9m",
            atributos: {
                forca: 16,
                destreza: 18,
                constituicao: 16,
                inteligencia: 12,
                sabedoria: 14,
                carisma: 16
            },
            pericias: ["Atletismo +7", "Furtividade +8", "Enganação +7", "Intimidação +7", "Percepção +6"],
            resistencias: [],
            imunidades: [],
            sentidos: "Percepção passiva 16",
            idiomas: "Comum, Ladino",
            desafio: "5 (450 XP)",
            ataques: [
                { nome: "Rapieira", bono: "+8", dano: "1d8+4 perfurante + 3d6 veneno", alcance: "Corpo a corpo" },
                { nome: "Besta Leve", bono: "+8", dano: "1d6+4 perfurante", alcance: "24/96m" }
            ],
            habilidades: [
                "Ataque Furtivo (4d6): Uma vez por turno",
                "Esquiva Sobrenatural: Reação para metade do dano",
                "Liderança Inspiradora: Aliados somam 1d4 em testes de ataque"
            ],
            acoesLendarias: [
                "Ataque Rápido (2 ações): Um ataque extra",
                "Manobra Evasiva (3 ações): Move metade do deslocamento sem provocar ataques"
            ],
            equipamento: ["Rapieira", "Besta leve", "20 virotes", "Armadura de couro batido"],
            historia: "Líder de uma gangue que aterroriza as rotas comerciais. Inteligente e carismático.",
            taticas: "Usa emboscadas, luta em terreno favorável, foge se a batalha virar",
            tesouro: "100 po, joias (2d20 po), mapa de tesouro",
            fraquezas: []
        }
    ],
    
    perigoso: [
        {
            id: 'lvl7-1',
            nome: "Guerreiro Esqueleto Amaldiçoado",
            nivel: 7,
            xp: 600,
            vida: "95/95",
            ca: "18",
            deslocamento: "9m",
            atributos: {
                forca: 18,
                destreza: 14,
                constituicao: 18,
                inteligencia: 6,
                sabedoria: 10,
                carisma: 5
            },
            pericias: ["Atletismo +8", "Percepção +4"],
            resistencias: ["Dano perfurante", "Dano necrótico"],
            imunidades: ["Veneno", "Encantamento", "Exaustão", "Paralisia"],
            sentidos: "Visão no escuro 18m, Percepção das trevas",
            idiomas: "Entende Comum mas não fala",
            desafio: "6 (600 XP)",
            ataques: [
                { nome: "Espada Amaldiçoada", bono: "+8", dano: "2d8+4 cortante + 1d8 necrótico", alcance: "Corpo a corpo" },
                { nome: "Grito Fantasmagórico", bono: "CD 15", dano: "3d6 psíquico e medo", alcance: "9m cone" }
            ],
            habilidades: [
                "Imposição Amaldiçoada: Criaturas que o veem fazem CD 13 Sabedoria ou ficam apavoradas",
                "Passo Sombrio: Teletransporte 9m como ação bônus"
            ],
            acoesLendarias: [
                "Ataque Amaldiçoado (2 ações): Um ataque extra com bônus de dano necrótico",
                "Grito de Guerra (3 ações): Todos inimigos em 9m fazem CD 14 Sabedoria ou ficam atordoados"
            ],
            fraquezas: ["Água benta (3d6)", "Símbolos sagrados", "Luz solar plena (desvantagem)"],
            taticas: "Persegue incansavelmente, não sente dor, usa o medo como arma",
            tesouro: "Espada amaldiçoada, 2d20 po, pedra da sorte",
            historia: "Um cavaleiro amaldiçoado que serve às forças das trevas."
        },
        {
            id: 'lvl8-1',
            nome: "Feiticeira da Floresta",
            nivel: 8,
            xp: 700,
            vida: "82/82",
            ca: "15",
            deslocamento: "9m",
            atributos: {
                forca: 8,
                destreza: 16,
                constituicao: 16,
                inteligencia: 14,
                sabedoria: 18,
                carisma: 20
            },
            pericias: ["Natureza +7", "Medicina +9", "Sobrevivência +9", "Enganação +10"],
            resistencias: ["Fogo", "Ácido"],
            imunidades: ["Doenças"],
            sentidos: "Visão na penumbra, Sentir vida 18m",
            idiomas: "Comum, Élfico, Silvestre, Druídico",
            desafio: "7 (700 XP)",
            magias: {
                truques: ["Chama Sagrada", "Curar Ferimentos", "Controlar Chamas"],
                nivel1: ["Enfeitiçar Pessoa", "Bênção", "Palavra Curativa"],
                nivel2: ["Imobilizar Pessoa", "Falar com Animais", "Caminho na Água"],
                nivel3: ["Conjurar Animais", "Malogro", "Respirar na Água"],
                nivel4: ["Controlar Água", "Domínio Bestial"]
            },
            ataques: [
                { nome: "Cajado de Madeira Viva", bono: "+7", dano: "1d6+3 concussão", alcance: "Corpo a corpo" },
                { nome: "Raio de Fogo", bono: "+9", dano: "3d6 fogo", alcance: "36m" }
            ],
            habilidades: [],
            acoesLendarias: [],
            equipamento: [],
            fraquezas: [],
            taticas: "Usa o terreno, conjura animais para ajudar, foge para dentro da floresta",
            tesouro: "Poções (2d4), ervas raras, cajado mágico",
            historia: "Uma poderosa feiticeira que protege a floresta e seus segredos."
        }
    ],
    
    letal: [
        {
            id: 'lvl9-1',
            nome: "Gargamel, o Bruxo Sombrio",
            nivel: 9,
            xp: 1000,
            vida: "120/120",
            ca: "16",
            deslocamento: "9m",
            atributos: {
                forca: 12,
                destreza: 14,
                constituicao: 16,
                inteligencia: 20,
                sabedoria: 16,
                carisma: 14
            },
            pericias: ["Arcanismo +12", "Alquimia +12", "Enganação +9", "Intimidação +9"],
            resistencias: ["Fogo", "Frio", "Elétrico"],
            imunidades: ["Veneno", "Encantamento"],
            sentidos: "Visão no escuro 36m, Ver invisibilidade",
            idiomas: "Comum, Abissal, Infernal, Draconico, Élfico",
            desafio: "9 (1000 XP)",
            magias: {
                truques: ["Raio de Fogo", "Mão Mágica", "Prestidigitação", "Aviso"],
                nivel1: ["Armadura Arcana", "Projétil Mágico", "Escudo", "Compreender Idiomas"],
                nivel2: ["Invisibilidade", "Espada Flamejante", "Sugestão", "Ver Invisibilidade"],
                nivel3: ["Bola de Fogo", "Voo", "Dissipar Magia", "Lentidão"],
                nivel4: ["Muralha de Fogo", "Invisibilidade Maior", "Polimorfia"],
                nivel5: ["Círculo de Teletransporte", "Mão de Bigby", "Olho Arcano"]
            },
            itensMagicos: [
                "Cajado do Poder",
                "Poções de Cura (3 unidades)",
                "Anel de Proteção",
                "Grimório Sombrio"
            ],
            aliados: [],
            fraquezas: [
                "Salsaparrilha (CD 15 Constituição ou fica tonto)",
                "Afeto por Azrael"
            ],
            historia: "O bruxo mais temido da região. Passou anos estudando magia negra e alquimia para descobrir o segredo dos Smurfs.",
            taticas: "Usa magias de controle primeiro, depois bola de fogo, foge se estiver com menos de 30% de vida",
            tesouro: "500 po, 3 gems, 2 itens mágicos, poções variadas",
            equipamento: ["Cajado do Poder", "Poções", "Grimório"]
        },
        {
            id: 'lvl10-1',
            nome: "Azrael, o Gato Demoníaco",
            nivel: 10,
            xp: 1200,
            vida: "95/95",
            ca: "17",
            deslocamento: "12m",
            atributos: {
                forca: 18,
                destreza: 22,
                constituicao: 18,
                inteligencia: 10,
                sabedoria: 16,
                carisma: 8
            },
            pericias: ["Furtividade +14", "Percepção +11", "Atletismo +8"],
            resistencias: ["Perfurante", "Cortante"],
            imunidades: ["Queda"],
            sentidos: "Visão no escuro 36m, Sentir cheiro 18m",
            idiomas: "Entende Comum mas não fala",
            desafio: "10 (1200 XP)",
            ataques: [
                { nome: "Mordida", bono: "+10", dano: "2d8+6 perfurante", alcance: "Corpo a corpo" },
                { nome: "Garras", bono: "+10", dano: "2d6+6 cortante", alcance: "Corpo a corpo" }
            ],
            habilidades: [
                "Agilidade Felina: Pode escalar qualquer superfície",
                "Visão Noturna: Perfeita visão no escuro",
                "Furtividade Sombria: Invisível em áreas de escuridão",
                "Nove Vidas: 3 vezes por dia, quando chegar a 0 HP, volta com 20 HP"
            ],
            acoesLendarias: [
                "Garra Fantasma (2 ações): Ataque de garra à distância (9m)",
                "Salto Sombrio (2 ações): Teletransporte 12m"
            ],
            fraquezas: [
                "Novelos de lã (CD 12 Sabedoria ou perde turno)",
                "Erva de gato (CD 12 Constituição ou fica pasmo)",
                "Luz solar plena (desvantagem nos ataques)"
            ],
            taticas: "Ataque furtivo, derruba e usa garras, foge para as sombras se ferido",
            tesouro: "Bolas de lã mágicas, coleira com joia (100 po)",
            historia: "O fiel companheiro de Gargamel, mas muito mais perigoso do que aparenta.",
            equipamento: []
        }
    ]
};

// ===== FUNÇÕES DE CLASSIFICAÇÃO =====
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
    if (nome.includes('gênio') || nome.includes('genio')) return SMURFS.GÊNIO;
    return '👤';
}

// ===== FUNÇÕES DO MAPA =====
function renderizarMapa() {
    const container = document.getElementById('mapa-container');
    const miniContainer = document.getElementById('mini-grid');
    if (!container) return;

    let html = `<div class="mapa-grid zoom-${state.mapa.zoom || 2}" id="mapa-grid">`;
    
    for (let i = 0; i < 64; i++) {
        const linha = Math.floor(i / 8) + 1;
        const coluna = (i % 8) + 1;
        const id = `${linha}-${coluna}`;
        const marcado = state.mapa.celulas?.[id] ? 'marcado' : '';
        const selecionada = state.mapa.celulaSelecionada === id ? 'selecionada' : '';
        
        html += `
            <div class="mapa-cell ${marcado} ${selecionada}" 
                 data-cell="${id}" 
                 onclick="selecionarCelula('${id}')"
                 oncontextmenu="abrirMenuContexto(event, '${id}')">
                <span class="cell-coordenada">${linha},${coluna}</span>
                ${state.mapa.celulas?.[id] || ''}
            </div>
        `;
    }
    
    html += `</div>`;
    container.innerHTML = html;

    if (miniContainer) {
        let miniHtml = '';
        for (let i = 0; i < 64; i++) {
            const linha = Math.floor(i / 8) + 1;
            const coluna = (i % 8) + 1;
            const id = `${linha}-${coluna}`;
            miniHtml += `<div class="mini-cell" onclick="irParaCelula('${id}')">${state.mapa.celulas?.[id] || '·'}</div>`;
        }
        miniContainer.innerHTML = miniHtml;
    }

    const notasInput = document.getElementById('mapa-notas');
    if (notasInput && state.mapa.notas) {
        notasInput.value = state.mapa.notas;
    }
}

function selecionarCelula(id) {
    state.mapa.celulaSelecionada = id;
    const [linha, coluna] = id.split('-');
    const coordElement = document.getElementById('coordenadas-atuais');
    const infoElement = document.getElementById('celula-info');
    
    if (coordElement) coordElement.textContent = `📍 Posição: ${linha},${coluna}`;
    if (infoElement) {
        infoElement.textContent = state.mapa.celulas?.[id] ? `Símbolo: ${state.mapa.celulas[id]}` : 'Vazio';
    }
    
    renderizarMapa();
}

function irParaCelula(id) {
    selecionarCelula(id);
    const grid = document.getElementById('mapa-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
}

function inserirSimbolo(simbolo) {
    if (!state.mapa.celulaSelecionada) {
        alert('Selecione uma célula primeiro!');
        return;
    }
    
    const id = state.mapa.celulaSelecionada;
    if (!state.mapa.celulas) state.mapa.celulas = {};
    state.mapa.celulas[id] = simbolo;
    
    salvarDados();
    renderizarMapa();
}

function abrirMenuContexto(event, id) {
    event.preventDefault();
    selecionarCelula(id);
    
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.innerHTML = `
        <div onclick="inserirSimboloPrompt('${id}')">✏️ Inserir símbolo</div>
        <div onclick="removerSimbolo('${id}')">🗑️ Remover símbolo</div>
        <div onclick="adicionarNotaCelula('${id}')">📝 Adicionar nota</div>
        <div onclick="marcarPerigo('${id}')">⚠️ Marcar perigo</div>
    `;
    
    menu.style.position = 'absolute';
    menu.style.left = event.pageX + 'px';
    menu.style.top = event.pageY + 'px';
    menu.style.background = '#1a1a2e';
    menu.style.border = '2px solid #ffd700';
    menu.style.borderRadius = '10px';
    menu.style.padding = '10px';
    menu.style.zIndex = '1000';
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        document.addEventListener('click', function removeMenu() {
            menu.remove();
            document.removeEventListener('click', removeMenu);
        });
    }, 100);
}

function inserirSimboloPrompt(id) {
    const simbolo = prompt('Digite o símbolo para esta célula:');
    if (simbolo) {
        if (!state.mapa.celulas) state.mapa.celulas = {};
        state.mapa.celulas[id] = simbolo.substring(0, 2);
        salvarDados();
        renderizarMapa();
    }
}

function removerSimbolo(id) {
    if (state.mapa.celulas?.[id]) {
        delete state.mapa.celulas[id];
        salvarDados();
        renderizarMapa();
    }
}

function adicionarNotaCelula(id) {
    const nota = prompt('Adicione uma nota para esta localização:');
    if (nota) {
        if (!state.mapa.notasCelulas) state.mapa.notasCelulas = {};
        state.mapa.notasCelulas[id] = nota;
        salvarDados();
        alert('Nota salva!');
    }
}

function marcarPerigo(id) {
    if (!state.mapa.celulas) state.mapa.celulas = {};
    state.mapa.celulas[id] = '⚠️';
    salvarDados();
    renderizarMapa();
}

function zoomMapa(direcao) {
    if (direcao === 'in' && state.mapa.zoom < 3) {
        state.mapa.zoom++;
    } else if (direcao === 'out' && state.mapa.zoom > 1) {
        state.mapa.zoom--;
    }
    renderizarMapa();
}

function centralizarMapa() {
    if (state.mapa.celulaSelecionada) {
        irParaCelula(state.mapa.celulaSelecionada);
    }
}

function alternarGrade() {
    state.mapa.grade = !state.mapa.grade;
    renderizarMapa();
}

function salvarNotasMapa() {
    const notas = document.getElementById('mapa-notas')?.value;
    if (notas !== undefined) {
        state.mapa.notas = notas;
        salvarDados();
        alert('Notas salvas!');
    }
}

function exportarMapa() {
    const dadosMapa = JSON.stringify(state.mapa, null, 2);
    const blob = new Blob([dadosMapa], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapa-smurfs.json';
    a.click();
}

function importarMapa() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                state.mapa = JSON.parse(event.target.result);
                salvarDados();
                renderizarMapa();
                alert('Mapa importado!');
            } catch {
                alert('Erro ao importar arquivo');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function limparMapa() {
    if (confirm('Limpar todas as marcações do mapa?')) {
        state.mapa.celulas = {};
        salvarDados();
        renderizarMapa();
    }
}

// ===== FUNÇÕES DOS VILÕES =====
function abrirModalVilao(vilao = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');

    modalTitle.textContent = vilao ? 'EDITAR VILÃO' : 'NOVO VILÃO (D&D 5.5)';
    
    modalBody.innerHTML = `
        <form id="form-vilao" onsubmit="salvarVilao(event, ${vilao?.id || 'null'})">
            <div class="form-group">
                <label>Nível de Desafio</label>
                <select id="vilao-nivel" onchange="carregarDadosPorNivel(this.value)">
                    <option value="">Selecione um nível...</option>
                    <option value="iniciante">Iniciante (Nível 1-2)</option>
                    <option value="medio">Médio (Nível 3-4)</option>
                    <option value="dificil">Difícil (Nível 5-6)</option>
                    <option value="perigoso">Perigoso (Nível 7-8)</option>
                    <option value="letal">Letal (Nível 9-12)</option>
                </select>
            </div>
            
            <div id="vilao-predefinidos" style="display: none;">
                <div class="form-group">
                    <label>Vilão Pré-definido</label>
                    <select id="vilao-template" onchange="carregarTemplateVilao(this.value)"></select>
                </div>
            </div>

            <div class="form-group">
                <label>Nome do Vilão</label>
                <input type="text" id="vilao-nome" value="${vilao?.nome || ''}" placeholder="Ex: Gargamel" required>
            </div>
            
            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Vida (D&D 5.5)</label>
                    <input type="text" id="vilao-vida" value="${vilao?.vida || ''}" placeholder="Ex: 85/85" required>
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label>Classe de Armadura (CA)</label>
                    <input type="text" id="vilao-defesa" value="${vilao?.ca || vilao?.defesa || ''}" placeholder="Ex: 14" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Deslocamento</label>
                    <input type="text" id="vilao-deslocamento" value="${vilao?.deslocamento || ''}" placeholder="Ex: 9m">
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label>Desafio (XP)</label>
                    <input type="text" id="vilao-desafio" value="${vilao?.desafio || ''}" placeholder="Ex: 4 (400 XP)">
                </div>
            </div>

            <h4>🎲 Atributos</h4>
            <div class="atributos-grid">
                <div class="form-group">
                    <label>FOR</label>
                    <input type="number" id="vilao-forca" value="${vilao?.atributos?.forca || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>DES</label>
                    <input type="number" id="vilao-destreza" value="${vilao?.atributos?.destreza || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>CON</label>
                    <input type="number" id="vilao-constituicao" value="${vilao?.atributos?.constituicao || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>INT</label>
                    <input type="number" id="vilao-inteligencia" value="${vilao?.atributos?.inteligencia || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>SAB</label>
                    <input type="number" id="vilao-sabedoria" value="${vilao?.atributos?.sabedoria || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>CAR</label>
                    <input type="number" id="vilao-carisma" value="${vilao?.atributos?.carisma || 10}" min="1" max="30">
                </div>
            </div>

            <div class="form-group">
                <label>Perícias</label>
                <input type="text" id="vilao-pericias" value="${vilao?.pericias?.join(', ') || ''}" placeholder="Ex: Furtividade +4, Percepção +3">
            </div>

            <div class="form-group">
                <label>Resistências/Imunidades</label>
                <input type="text" id="vilao-resistencias" value="${vilao?.resistencias?.join(', ') || ''}" placeholder="Ex: Fogo, Veneno">
            </div>

            <h4>⚔️ Ataques</h4>
            <div id="ataques-container">
                ${vilao?.ataques?.map((ataque, index) => {
                    if (typeof ataque === 'string') {
                        const [nome, dano] = ataque.split(':');
                        return `
                            <div class="ataque-row">
                                <input type="text" placeholder="Nome do ataque" value="${nome?.trim() || ''}" class="ataque-nome">
                                <input type="text" placeholder="Bônus" value="" class="ataque-bono">
                                <input type="text" placeholder="Dano" value="${dano?.trim() || ''}" class="ataque-dano">
                                <button type="button" onclick="removerAtaque(this)">❌</button>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="ataque-row">
                                <input type="text" placeholder="Nome do ataque" value="${ataque.nome || ''}" class="ataque-nome">
                                <input type="text" placeholder="Bônus" value="${ataque.bono || ''}" class="ataque-bono">
                                <input type="text" placeholder="Dano" value="${ataque.dano || ''}" class="ataque-dano">
                                <button type="button" onclick="removerAtaque(this)">❌</button>
                            </div>
                        `;
                    }
                }).join('') || ''}
            </div>
            <button type="button" class="btn-secondary" onclick="adicionarAtaque()" style="margin-bottom: 15px;">+ Adicionar Ataque</button>

            <h4>✨ Habilidades Especiais</h4>
            <div class="form-group">
                <textarea id="vilao-habilidades" rows="3" placeholder="Liste as habilidades especiais...">${vilao?.habilidades?.join('\n') || ''}</textarea>
            </div>

            <h4>📜 Ações Lendárias</h4>
            <div class="form-group">
                <textarea id="vilao-acoes-lendarias" rows="2" placeholder="Ações lendárias...">${vilao?.acoesLendarias?.join('\n') || ''}</textarea>
            </div>

            <h4>📖 História</h4>
            <div class="form-group">
                <textarea id="vilao-historia" rows="4" placeholder="História completa do vilão..." required>${vilao?.historia || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Táticas de Combate</label>
                <textarea id="vilao-taticas" rows="2" placeholder="Como ele luta?">${vilao?.taticas || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Equipamento</label>
                <textarea id="vilao-equipamento" rows="2" placeholder="Itens e equipamentos...">${vilao?.equipamento?.join('\n') || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Tesouro/Recompensa</label>
                <textarea id="vilao-tesouro" rows="2" placeholder="O que dropa?">${vilao?.tesouro || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Fraquezas</label>
                <input type="text" id="vilao-fraquezas" value="${vilao?.fraquezas?.join(', ') || ''}" placeholder="Ex: Luz solar, Água benta">
            </div>
            
            <button type="submit" class="btn-add">✨ SALVAR VILÃO ✨</button>
        </form>
    `;

    modal.classList.add('active');
}

function adicionarAtaque() {
    const container = document.getElementById('ataques-container');
    const div = document.createElement('div');
    div.className = 'ataque-row';
    div.innerHTML = `
        <input type="text" placeholder="Nome do ataque" class="ataque-nome">
        <input type="text" placeholder="Bônus" class="ataque-bono">
        <input type="text" placeholder="Dano" class="ataque-dano">
        <button type="button" onclick="removerAtaque(this)">❌</button>
    `;
    container.appendChild(div);
}

function removerAtaque(botao) {
    botao.parentElement.remove();
}

function carregarDadosPorNivel(nivel) {
    const selectTemplate = document.getElementById('vilao-template');
    const divPredefinidos = document.getElementById('vilao-predefinidos');
    
    if (!nivel || !VILOES_POR_NIVEL[nivel]) {
        divPredefinidos.style.display = 'none';
        return;
    }
    
    const viloes = VILOES_POR_NIVEL[nivel];
    let options = '<option value="">Selecione um vilão...</option>';
    
    viloes.forEach(v => {
        options += `<option value="${v.id}">${v.nome} (Nível ${v.nivel})</option>`;
    });
    
    selectTemplate.innerHTML = options;
    divPredefinidos.style.display = 'block';
}

function carregarTemplateVilao(id) {
    for (const nivel in VILOES_POR_NIVEL) {
        const vilao = VILOES_POR_NIVEL[nivel].find(v => v.id === id);
        if (vilao) {
            preencherFormularioVilao(vilao);
            break;
        }
    }
}

function preencherFormularioVilao(vilao) {
    document.getElementById('vilao-nome').value = vilao.nome || '';
    document.getElementById('vilao-vida').value = vilao.vida || '';
    document.getElementById('vilao-defesa').value = vilao.ca || vilao.defesa || '';
    document.getElementById('vilao-deslocamento').value = vilao.deslocamento || '';
    document.getElementById('vilao-desafio').value = vilao.desafio || '';
    
    if (vilao.atributos) {
        document.getElementById('vilao-forca').value = vilao.atributos.forca || 10;
        document.getElementById('vilao-destreza').value = vilao.atributos.destreza || 10;
        document.getElementById('vilao-constituicao').value = vilao.atributos.constituicao || 10;
        document.getElementById('vilao-inteligencia').value = vilao.atributos.inteligencia || 10;
        document.getElementById('vilao-sabedoria').value = vilao.atributos.sabedoria || 10;
        document.getElementById('vilao-carisma').value = vilao.atributos.carisma || 10;
    }
    
    if (vilao.pericias) {
        document.getElementById('vilao-pericias').value = vilao.pericias.join(', ');
    }
    
    if (vilao.resistencias) {
        document.getElementById('vilao-resistencias').value = vilao.resistencias.join(', ');
    }
    
    const container = document.getElementById('ataques-container');
    container.innerHTML = '';
    if (vilao.ataques) {
        vilao.ataques.forEach(ataque => {
            const div = document.createElement('div');
            div.className = 'ataque-row';
            
            if (typeof ataque === 'string') {
                const [nome, dano] = ataque.split(':');
                div.innerHTML = `
                    <input type="text" placeholder="Nome do ataque" value="${nome?.trim() || ''}" class="ataque-nome">
                    <input type="text" placeholder="Bônus" value="" class="ataque-bono">
                    <input type="text" placeholder="Dano" value="${dano?.trim() || ''}" class="ataque-dano">
                    <button type="button" onclick="removerAtaque(this)">❌</button>
                `;
            } else {
                div.innerHTML = `
                    <input type="text" placeholder="Nome do ataque" value="${ataque.nome || ''}" class="ataque-nome">
                    <input type="text" placeholder="Bônus" value="${ataque.bono || ''}" class="ataque-bono">
                    <input type="text" placeholder="Dano" value="${ataque.dano || ''}" class="ataque-dano">
                    <button type="button" onclick="removerAtaque(this)">❌</button>
                `;
            }
            container.appendChild(div);
        });
    }
    
    if (vilao.habilidades) {
        document.getElementById('vilao-habilidades').value = Array.isArray(vilao.habilidades) ? vilao.habilidades.join('\n') : vilao.habilidades;
    }
    
    if (vilao.acoesLendarias) {
        document.getElementById('vilao-acoes-lendarias').value = Array.isArray(vilao.acoesLendarias) ? vilao.acoesLendarias.join('\n') : vilao.acoesLendarias;
    }
    
    document.getElementById('vilao-historia').value = vilao.historia || '';
    document.getElementById('vilao-taticas').value = vilao.taticas || '';
    
    if (vilao.equipamento) {
        document.getElementById('vilao-equipamento').value = Array.isArray(vilao.equipamento) ? vilao.equipamento.join('\n') : vilao.equipamento;
    }
    
    document.getElementById('vilao-tesouro').value = vilao.tesouro || '';
    
    if (vilao.fraquezas) {
        document.getElementById('vilao-fraquezas').value = Array.isArray(vilao.fraquezas) ? vilao.fraquezas.join(', ') : vilao.fraquezas;
    }
}

function salvarVilao(event, id = null) {
    event.preventDefault();

    const ataques = [];
    document.querySelectorAll('.ataque-row').forEach(row => {
        const nome = row.querySelector('.ataque-nome')?.value;
        const bono = row.querySelector('.ataque-bono')?.value;
        const dano = row.querySelector('.ataque-dano')?.value;
        if (nome && (bono || dano)) {
            ataques.push({ nome, bono, dano });
        }
    });

    const vilao = {
        id: id || Date.now(),
        nome: document.getElementById('vilao-nome').value,
        vida: document.getElementById('vilao-vida').value,
        ca: document.getElementById('vilao-defesa').value,
        deslocamento: document.getElementById('vilao-deslocamento')?.value || '',
        desafio: document.getElementById('vilao-desafio')?.value || '',
        
        atributos: {
            forca: parseInt(document.getElementById('vilao-forca')?.value) || 10,
            destreza: parseInt(document.getElementById('vilao-destreza')?.value) || 10,
            constituicao: parseInt(document.getElementById('vilao-constituicao')?.value) || 10,
            inteligencia: parseInt(document.getElementById('vilao-inteligencia')?.value) || 10,
            sabedoria: parseInt(document.getElementById('vilao-sabedoria')?.value) || 10,
            carisma: parseInt(document.getElementById('vilao-carisma')?.value) || 10
        },
        
        pericias: document.getElementById('vilao-pericias')?.value.split(',').map(p => p.trim()).filter(p => p) || [],
        resistencias: document.getElementById('vilao-resistencias')?.value.split(',').map(r => r.trim()).filter(r => r) || [],
        
        ataques: ataques,
        
        habilidades: document.getElementById('vilao-habilidades')?.value.split('\n').filter(h => h.trim()) || [],
        acoesLendarias: document.getElementById('vilao-acoes-lendarias')?.value.split('\n').filter(a => a.trim()) || [],
        
        historia: document.getElementById('vilao-historia').value,
        taticas: document.getElementById('vilao-taticas')?.value || '',
        
        equipamento: document.getElementById('vilao-equipamento')?.value.split('\n').filter(e => e.trim()) || [],
        tesouro: document.getElementById('vilao-tesouro')?.value || '',
        fraquezas: document.getElementById('vilao-fraquezas')?.value.split(',').map(f => f.trim()).filter(f => f) || [],
        
        dataCriacao: new Date().toISOString()
    };

    if (id) {
        const index = state.viloes.findIndex(v => v.id === id);
        if (index !== -1) {
            state.viloes[index] = vilao;
        }
    } else {
        state.viloes.push(vilao);
    }

    salvarDados();
    renderizarViloes();
    fecharModal();
}

function editarVilao(id) {
    const vilao = state.viloes.find(v => v.id === id);
    if (vilao) {
        abrirModalVilao(vilao);
    }
}

function removerVilao(id) {
    if (confirm('Tem certeza que deseja remover este vilão?')) {
        state.viloes = state.viloes.filter(v => v.id !== id);
        salvarDados();
        renderizarViloes();
    }
}

// ===== FUNÇÕES DOS NPCs =====
function abrirModalNPC(npc = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');

    modalTitle.textContent = npc ? 'EDITAR NPC' : 'NOVO NPC (D&D 5.5)';
    
    modalBody.innerHTML = `
        <form id="form-npc" onsubmit="salvarNPC(event, ${npc?.id || 'null'})">
            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Nome</label>
                    <input type="text" id="npc-nome" value="${npc?.nome || ''}" placeholder="Ex: Papai Smurf" required>
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label>Raça</label>
                    <select id="npc-raca">
                        <option value="">Selecione...</option>
                        ${DND_5E.racas.map(r => `<option value="${r}" ${npc?.raca === r ? 'selected' : ''}>${r}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Classe</label>
                    <select id="npc-classe">
                        <option value="">Selecione...</option>
                        ${DND_5E.classes.map(c => `<option value="${c}" ${npc?.classe === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label>Nível</label>
                    <input type="number" id="npc-nivel" value="${npc?.nivel || 1}" min="1" max="20">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Tendência</label>
                    <select id="npc-tendencia">
                        <option value="">Selecione...</option>
                        ${DND_5E.tendencias.map(t => `<option value="${t}" ${npc?.tendencia === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label>Tamanho</label>
                    <select id="npc-tamanho">
                        ${DND_5E.tamanhos.map(t => `<option value="${t}" ${npc?.tamanho === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Vida Máxima</label>
                    <input type="text" id="npc-vida" value="${npc?.vida || ''}" placeholder="Ex: 45">
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label>Classe de Armadura</label>
                    <input type="text" id="npc-ca" value="${npc?.ca || ''}" placeholder="Ex: 14">
                </div>
            </div>

            <h4>🎲 Atributos</h4>
            <div class="atributos-grid">
                <div class="form-group">
                    <label>FOR</label>
                    <input type="number" id="npc-forca" value="${npc?.atributos?.forca || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>DES</label>
                    <input type="number" id="npc-destreza" value="${npc?.atributos?.destreza || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>CON</label>
                    <input type="number" id="npc-constituicao" value="${npc?.atributos?.constituicao || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>INT</label>
                    <input type="number" id="npc-inteligencia" value="${npc?.atributos?.inteligencia || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>SAB</label>
                    <input type="number" id="npc-sabedoria" value="${npc?.atributos?.sabedoria || 10}" min="1" max="30">
                </div>
                <div class="form-group">
                    <label>CAR</label>
                    <input type="number" id="npc-carisma" value="${npc?.atributos?.carisma || 10}" min="1" max="30">
                </div>
            </div>

            <div class="form-group">
                <label>Perícias</label>
                <input type="text" id="npc-pericias" value="${npc?.pericias?.join(', ') || ''}" placeholder="Ex: Furtividade, Percepção">
            </div>

            <div class="form-group">
                <label>Descrição</label>
                <textarea id="npc-descricao" rows="3" placeholder="Descreva o personagem..." required>${npc?.descricao || ''}</textarea>
            </div>

            <div class="form-group">
                <label>História</label>
                <textarea id="npc-historia" rows="3" placeholder="História do personagem...">${npc?.historia || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Motivações</label>
                <textarea id="npc-motivacoes" rows="2" placeholder="O que ele quer?">${npc?.motivacoes || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Habilidades Especiais</label>
                <textarea id="npc-habilidades" rows="2" placeholder="Habilidades especiais...">${npc?.habilidades?.join('\n') || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Equipamento</label>
                <textarea id="npc-equipamento" rows="2" placeholder="Itens importantes...">${npc?.equipamento?.join('\n') || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Serviços</label>
                <textarea id="npc-servicos" rows="2" placeholder="O que pode oferecer?">${npc?.servicos || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Segredos</label>
                <textarea id="npc-segredos" rows="2" placeholder="Informações secretas...">${npc?.segredos || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Localização</label>
                <input type="text" id="npc-localizacao" value="${npc?.localizacao || ''}" placeholder="Onde encontrar?">
            </div>

            <div class="form-group">
                <label>Tags</label>
                <input type="text" id="npc-tags" value="${npc?.tags?.join(', ') || ''}" placeholder="Ex: vendedor, quest, importante">
            </div>
            
            <button type="submit" class="btn-add">🍄 SALVAR NPC 🍄</button>
        </form>
    `;

    modal.classList.add('active');
}

function salvarNPC(event, id = null) {
    event.preventDefault();

    const npc = {
        id: id || Date.now(),
        nome: document.getElementById('npc-nome').value,
        raca: document.getElementById('npc-raca')?.value || '',
        classe: document.getElementById('npc-classe')?.value || '',
        nivel: parseInt(document.getElementById('npc-nivel')?.value) || 1,
        tendencia: document.getElementById('npc-tendencia')?.value || '',
        tamanho: document.getElementById('npc-tamanho')?.value || '',
        vida: document.getElementById('npc-vida')?.value || '',
        ca: document.getElementById('npc-ca')?.value || '',
        
        atributos: {
            forca: parseInt(document.getElementById('npc-forca')?.value) || 10,
            destreza: parseInt(document.getElementById('npc-destreza')?.value) || 10,
            constituicao: parseInt(document.getElementById('npc-constituicao')?.value) || 10,
            inteligencia: parseInt(document.getElementById('npc-inteligencia')?.value) || 10,
            sabedoria: parseInt(document.getElementById('npc-sabedoria')?.value) || 10,
            carisma: parseInt(document.getElementById('npc-carisma')?.value) || 10
        },
        
        pericias: document.getElementById('npc-pericias')?.value.split(',').map(p => p.trim()).filter(p => p) || [],
        descricao: document.getElementById('npc-descricao').value,
        historia: document.getElementById('npc-historia')?.value || '',
        motivacoes: document.getElementById('npc-motivacoes')?.value || '',
        
        habilidades: document.getElementById('npc-habilidades')?.value.split('\n').filter(h => h.trim()) || [],
        equipamento: document.getElementById('npc-equipamento')?.value.split('\n').filter(e => e.trim()) || [],
        
        servicos: document.getElementById('npc-servicos')?.value || '',
        segredos: document.getElementById('npc-segredos')?.value || '',
        localizacao: document.getElementById('npc-localizacao')?.value || '',
        tags: document.getElementById('npc-tags')?.value.split(',').map(t => t.trim()).filter(t => t) || [],
        
        dataCriacao: new Date().toISOString()
    };

    if (id) {
        const index = state.npcs.findIndex(n => n.id === id);
        if (index !== -1) {
            state.npcs[index] = npc;
        }
    } else {
        state.npcs.push(npc);
    }

    salvarDados();
    renderizarNPCs();
    fecharModal();
}

function removerNPC(id) {
    if (confirm('Remover este NPC?')) {
        state.npcs = state.npcs.filter(n => n.id !== id);
        salvarDados();
        renderizarNPCs();
    }
}

// ===== FUNÇÕES DAS NECESSIDADES =====
function abrirModalNecessidade(necessidade = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');

    modalTitle.textContent = necessidade ? 'EDITAR ITEM' : 'NOVA MISSÃO/ITEM';
    
    modalBody.innerHTML = `
        <form id="form-necessidade" onsubmit="salvarNecessidade(event, ${necessidade?.id || 'null'})">
            <div class="form-group">
                <label>Título da Missão/Item</label>
                <input type="text" id="necessidade-item" value="${necessidade?.item || ''}" placeholder="Ex: Colher salsaparrilha" required>
            </div>
            
            <div class="form-group">
                <label>Categoria</label>
                <select id="necessidade-categoria">
                    <option value="Missão" ${necessidade?.categoria === 'Missão' ? 'selected' : ''}>🎯 Missão Principal</option>
                    <option value="Missão Secundária" ${necessidade?.categoria === 'Missão Secundária' ? 'selected' : ''}>⚔️ Missão Secundária</option>
                    <option value="Urgente" ${necessidade?.categoria === 'Urgente' ? 'selected' : ''}>⚠️ Urgente</option>
                    <option value="Importante" ${necessidade?.categoria === 'Importante' ? 'selected' : ''}>⭐ Importante</option>
                    <option value="Loot" ${necessidade?.categoria === 'Loot' ? 'selected' : ''}>💎 Loot/Recompensa</option>
                    <option value="Poção" ${necessidade?.categoria === 'Poção' ? 'selected' : ''}>🧪 Poção/Item Mágico</option>
                    <option value="Equipamento" ${necessidade?.categoria === 'Equipamento' ? 'selected' : ''}>⚔️ Equipamento</option>
                    <option value="Informação" ${necessidade?.categoria === 'Informação' ? 'selected' : ''}>📜 Informação</option>
                </select>
            </div>

            <div class="form-group">
                <label>Descrição Detalhada</label>
                <textarea id="necessidade-descricao" rows="3" placeholder="Descreva a missão ou item em detalhes...">${necessidade?.descricao || ''}</textarea>
            </div>

            <div class="form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Recompensa (XP)</label>
                    <input type="text" id="necessidade-xp" value="${necessidade?.xp || ''}" placeholder="Ex: 100 XP">
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label>Recompensa (Ouro)</label>
                    <input type="text" id="necessidade-ouro" value="${necessidade?.ouro || ''}" placeholder="Ex: 50 po">
                </div>
            </div>

            <div class="form-group">
                <label>Recompensa (Itens)</label>
                <textarea id="necessidade-recompensa-itens" rows="2" placeholder="Itens especiais como recompensa...">${necessidade?.recompensaItens || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Local onde acontece</label>
                <input type="text" id="necessidade-local" value="${necessidade?.local || ''}" placeholder="Ex: Floresta Sombria">
            </div>

            <div class="form-group">
                <label>NPCs envolvidos</label>
                <input type="text" id="necessidade-npcs" value="${necessidade?.npcs || ''}" placeholder="Ex: Papai Smurf, Valente">
            </div>

            <div class="form-group">
                <label>Inimigos/Desafios</label>
                <textarea id="necessidade-inimigos" rows="2" placeholder="Liste os inimigos ou desafios...">${necessidade?.inimigos || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Status</label>
                <select id="necessidade-status">
                    <option value="pendente" ${necessidade?.status === 'pendente' ? 'selected' : ''}>⏳ Pendente</option>
                    <option value="andamento" ${necessidade?.status === 'andamento' ? 'selected' : ''}>⚙️ Em Andamento</option>
                    <option value="concluida" ${necessidade?.status === 'concluida' ? 'selected' : ''}>✅ Concluída</option>
                    <option value="falhou" ${necessidade?.status === 'falhou' ? 'selected' : ''}>❌ Falhou</option>
                </select>
            </div>

            <div class="form-group">
                <label>Notas do Mestre</label>
                <textarea id="necessidade-notas" rows="2" placeholder="Informações secretas só para o mestre...">${necessidade?.notas || ''}</textarea>
            </div>
            
            <button type="submit" class="btn-add">✨ SALVAR MISSÃO/ITEM ✨</button>
        </form>
    `;

    modal.classList.add('active');
}

function salvarNecessidade(event, id = null) {
    event.preventDefault();

    const necessidade = {
        id: id || Date.now(),
        item: document.getElementById('necessidade-item').value,
        categoria: document.getElementById('necessidade-categoria').value,
        descricao: document.getElementById('necessidade-descricao')?.value || '',
        xp: document.getElementById('necessidade-xp')?.value || '',
        ouro: document.getElementById('necessidade-ouro')?.value || '',
        recompensaItens: document.getElementById('necessidade-recompensa-itens')?.value || '',
        local: document.getElementById('necessidade-local')?.value || '',
        npcs: document.getElementById('necessidade-npcs')?.value || '',
        inimigos: document.getElementById('necessidade-inimigos')?.value || '',
        status: document.getElementById('necessidade-status')?.value || 'pendente',
        notas: document.getElementById('necessidade-notas')?.value || '',
        dataCriacao: new Date().toISOString()
    };

    if (id) {
        const index = state.necessidades.findIndex(n => n.id === id);
        if (index !== -1) {
            state.necessidades[index] = necessidade;
        }
    } else {
        state.necessidades.push(necessidade);
    }

    salvarDados();
    renderizarNecessidades();
    fecharModal();
}

function editarNecessidade(id) {
    const necessidade = state.necessidades.find(n => n.id === id);
    if (necessidade) {
        abrirModalNecessidade(necessidade);
    }
}

function removerNecessidade(id) {
    if (confirm('Remover este item?')) {
        state.necessidades = state.necessidades.filter(n => n.id !== id);
        salvarDados();
        renderizarNecessidades();
    }
}

function mudarStatusNecessidade(id, novoStatus) {
    const necessidade = state.necessidades.find(n => n.id === id);
    if (necessidade) {
        necessidade.status = novoStatus;
        salvarDados();
        renderizarNecessidades();
    }
}

// ===== RENDERIZAÇÃO =====
function renderizarViloes() {
    const lista = document.getElementById('viloes-lista');
    if (!lista) return;

    if (state.viloes.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">🧙</div>
                <h3>Nenhum vilão cadastrado!</h3>
                <p class="text-dim">Adicione vilões usando o botão abaixo</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = state.viloes.map(v => {
        const tipoVilao = classificarVilao(v.nome);
        
        return `
            <div class="card vilao-card">
                <div class="card-title">
                    <span>${tipoVilao.emoji}</span>
                    <h3 style="color: ${tipoVilao.cor};">${v.nome}</h3>
                    <span class="badge-nivel">ND ${v.desafio || '?'}</span>
                </div>
                
                <div class="vilao-stats">
                    <div class="status-item">
                        <span class="label">❤️ VIDA</span>
                        <span class="value">${v.vida}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${calcularPorcentagemVida(v.vida)}%"></div>
                        </div>
                    </div>
                    
                    <div class="status-row">
                        <div class="status-mini">
                            <span class="label">🛡️ CA</span>
                            <span class="value">${v.ca || v.defesa}</span>
                        </div>
                        <div class="status-mini">
                            <span class="label">⚔️ DES</span>
                            <span class="value">${v.deslocamento || '9m'}</span>
                        </div>
                    </div>
                </div>

                ${v.atributos ? `
                <div class="atributos-mini">
                    <div class="atributo" title="Força">FOR ${v.atributos.forca}</div>
                    <div class="atributo" title="Destreza">DES ${v.atributos.destreza}</div>
                    <div class="atributo" title="Constituição">CON ${v.atributos.constituicao}</div>
                    <div class="atributo" title="Inteligência">INT ${v.atributos.inteligencia}</div>
                    <div class="atributo" title="Sabedoria">SAB ${v.atributos.sabedoria}</div>
                    <div class="atributo" title="Carisma">CAR ${v.atributos.carisma}</div>
                </div>
                ` : ''}

                <details class="detalhes-vilao">
                    <summary>📖 Ver detalhes completos</summary>
                    
                    <h4>🎲 ATAQUES</h4>
                    <ul class="ataques-list">
                        ${v.ataques?.map(a => {
                            if (typeof a === 'string') {
                                const [nome, dano] = a.split(':');
                                return `
                                    <li>
                                        <span class="ataque-nome">${nome}</span>
                                        <span class="ataque-dano">${dano || '1d4'}</span>
                                    </li>
                                `;
                            } else {
                                return `
                                    <li>
                                        <span class="ataque-nome">${a.nome}</span>
                                        <span class="ataque-bonus">${a.bono ? '+' + a.bono : ''}</span>
                                        <span class="ataque-dano">${a.dano}</span>
                                    </li>
                                `;
                            }
                        }).join('')}
                    </ul>

                    ${v.habilidades?.length ? `
                    <h4>✨ HABILIDADES</h4>
                    <ul class="habilidades-list">
                        ${v.habilidades.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    ` : ''}

                    ${v.acoesLendarias?.length ? `
                    <h4>👑 AÇÕES LENDÁRIAS</h4>
                    <ul class="habilidades-list">
                        ${v.acoesLendarias.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                    ` : ''}

                    <h4>📜 HISTÓRIA</h4>
                    <div class="historia">${v.historia}</div>

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
                </details>

                <div class="acoes-vilao">
                    <button class="btn-secondary" onclick="editarVilao(${v.id})">✏️ Editar</button>
                    <button class="btn-secondary btn-remover" onclick="removerVilao(${v.id})">🗑️ Remover</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderizarNPCs() {
    const lista = document.getElementById('npcs-lista');
    if (!lista) return;

    if (state.npcs.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">👥</div>
                <h3>Nenhum NPC cadastrado!</h3>
                <p class="text-dim">Adicione personagens importantes para a campanha</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = state.npcs.map(n => {
        const isSmurf = !n.nome?.toLowerCase().includes('gargamel') && !n.nome?.toLowerCase().includes('azrael');
        const avatarEmoji = isSmurf ? classificarSmurf(n.nome) : '👤';
        const npcClass = isSmurf ? 'smurf' : 'gargamel';
        
        return `
            <div class="npc-card ${npcClass}">
                <div class="npc-avatar ${npcClass}">${avatarEmoji}</div>
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
                        <summary>Ver mais</summary>
                        
                        ${n.atributos ? `
                        <div class="atributos-mini">
                            <div class="atributo" title="Força">FOR ${n.atributos.forca}</div>
                            <div class="atributo" title="Destreza">DES ${n.atributos.destreza}</div>
                            <div class="atributo" title="Constituição">CON ${n.atributos.constituicao}</div>
                            <div class="atributo" title="Inteligência">INT ${n.atributos.inteligencia}</div>
                            <div class="atributo" title="Sabedoria">SAB ${n.atributos.sabedoria}</div>
                            <div class="atributo" title="Carisma">CAR ${n.atributos.carisma}</div>
                        </div>
                        ` : ''}
                        
                        ${n.historia ? `<p class="npc-historia"><strong>História:</strong> ${n.historia}</p>` : ''}
                        ${n.motivacoes ? `<p class="npc-motivacoes"><strong>Motivações:</strong> ${n.motivacoes}</p>` : ''}
                        ${n.localizacao ? `<p class="npc-localizacao"><strong>📍 Onde encontrar:</strong> ${n.localizacao}</p>` : ''}
                        ${n.servicos ? `<p class="npc-servicos"><strong>🛒 Oferece:</strong> ${n.servicos}</p>` : ''}
                        ${n.segredos ? `<p class="npc-segredos"><strong>🤫 Segredo:</strong> ${n.segredos}</p>` : ''}
                    </details>
                </div>
                <button class="btn-remover" onclick="removerNPC(${n.id})">🗑️</button>
            </div>
        `;
    }).join('');
}

function renderizarNecessidades() {
    const lista = document.getElementById('necessidades-lista');
    if (!lista) return;

    if (state.necessidades.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <div class="emoji">📋</div>
                <h3>Nenhuma missão ou item!</h3>
                <p class="text-dim">Adicione missões, itens necessários e lembretes</p>
            </div>
        `;
        return;
    }

    const pendentes = state.necessidades.filter(n => n.status === 'pendente' || !n.status);
    const andamento = state.necessidades.filter(n => n.status === 'andamento');
    const concluidas = state.necessidades.filter(n => n.status === 'concluida');
    const falhas = state.necessidades.filter(n => n.status === 'falhou');

    let html = '';

    if (pendentes.length > 0) {
        html += '<h4 class="categoria-titulo">⏳ PENDENTES</h4>';
        html += renderizarListaNecessidades(pendentes);
    }

    if (andamento.length > 0) {
        html += '<h4 class="categoria-titulo">⚙️ EM ANDAMENTO</h4>';
        html += renderizarListaNecessidades(andamento);
    }

    if (concluidas.length > 0) {
        html += '<h4 class="categoria-titulo">✅ CONCLUÍDAS</h4>';
        html += renderizarListaNecessidades(concluidas);
    }

    if (falhas.length > 0) {
        html += '<h4 class="categoria-titulo">❌ FALHAS</h4>';
        html += renderizarListaNecessidades(falhas);
    }

    lista.innerHTML = html;
}

function renderizarListaNecessidades(lista) {
    return lista.map(n => {
        let classeCategoria = '';
        if (n.categoria === 'Urgente') classeCategoria = 'urgente';
        if (n.categoria === 'Importante') classeCategoria = 'importante';
        if (n.categoria === 'Missão') classeCategoria = 'missao';
        if (n.categoria === 'Loot') classeCategoria = 'loot';
        
        return `
            <li class="necessidade-item-completo ${classeCategoria}" data-id="${n.id}">
                <div class="necessidade-header">
                    <span class="necessidade-categoria ${classeCategoria}">${n.categoria}</span>
                    <span class="necessidade-status status-${n.status || 'pendente'}">
                        ${n.status === 'concluida' ? '✅' : n.status === 'andamento' ? '⚙️' : n.status === 'falhou' ? '❌' : '⏳'}
                    </span>
                </div>
                
                <div class="necessidade-conteudo">
                    <h4 class="necessidade-titulo">${n.item}</h4>
                    ${n.descricao ? `<p class="necessidade-descricao">${n.descricao}</p>` : ''}
                    
                    <details class="necessidade-detalhes">
                        <summary>📋 Ver detalhes</summary>
                        
                        ${n.local ? `<p><strong>📍 Local:</strong> ${n.local}</p>` : ''}
                        ${n.npcs ? `<p><strong>👥 NPCs:</strong> ${n.npcs}</p>` : ''}
                        ${n.inimigos ? `<p><strong>⚔️ Desafios:</strong> ${n.inimigos}</p>` : ''}
                        
                        ${n.xp || n.ouro || n.recompensaItens ? `
                            <div class="recompensas">
                                <strong>💰 Recompensas:</strong>
                                ${n.xp ? `<span class="recompensa-xp">🎲 ${n.xp}</span>` : ''}
                                ${n.ouro ? `<span class="recompensa-ouro">🪙 ${n.ouro}</span>` : ''}
                                ${n.recompensaItens ? `<span class="recompensa-itens">✨ ${n.recompensaItens}</span>` : ''}
                            </div>
                        ` : ''}
                        
                        ${n.notas ? `<div class="notas-mestre"><strong>🤫 Notas do Mestre:</strong> ${n.notas}</div>` : ''}
                    </details>
                </div>
                
                <div class="necessidade-acoes">
                    <button class="btn-icon" onclick="mudarStatusNecessidade(${n.id}, 'concluida')" title="Marcar como concluída">✅</button>
                    <button class="btn-icon" onclick="mudarStatusNecessidade(${n.id}, 'andamento')" title="Em andamento">⚙️</button>
                    <button class="btn-icon" onclick="editarNecessidade(${n.id})" title="Editar">✏️</button>
                    <button class="btn-icon btn-remover" onclick="removerNecessidade(${n.id})" title="Remover">🗑️</button>
                </div>
            </li>
        `;
    }).join('');
}

// ===== FUNÇÕES UTILITÁRIAS =====
function calcularPorcentagemVida(vidaStr) {
    try {
        if (typeof vidaStr === 'string' && vidaStr.includes('/')) {
            const [atual, maxima] = vidaStr.split('/').map(Number);
            return Math.min(100, Math.max(0, (atual / maxima) * 100));
        }
        return 100;
    } catch {
        return 100;
    }
}

function fecharModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('active');
}

function toggleMenu() {
    const menu = document.createElement('div');
    menu.className = 'menu-lateral';
    menu.innerHTML = `
        <div class="menu-content">
            <h3>📌 MENU RÁPIDO</h3>
            <button onclick="exportarTodosDados()">📤 Exportar tudo</button>
            <button onclick="importarTodosDados()">📥 Importar tudo</button>
            <button onclick="limparTodosDados()">⚠️ Limpar todos os dados</button>
            <button onclick="fecharMenu()">Fechar</button>
        </div>
    `;
    document.body.appendChild(menu);
    
    window.fecharMenu = () => menu.remove();
}

function exportarTodosDados() {
    const dados = JSON.stringify(state, null, 2);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados-campanha-smurfs.json';
    a.click();
    fecharMenu();
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
                renderizarViloes();
                renderizarNPCs();
                renderizarNecessidades();
                if (state.currentPage === 'mapa') renderizarMapa();
                alert('Dados importados!');
                fecharMenu();
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
            mapa: {
                celulas: {},
                notas: '',
                zoom: 2,
                grade: true
            },
            currentPage: 'viloes'
        };
        salvarDados();
        renderizarViloes();
        renderizarNPCs();
        renderizarNecessidades();
        if (state.currentPage === 'mapa') renderizarMapa();
        alert('Todos os dados foram apagados!');
        fecharMenu();
    }
}

function salvarDados() {
    try {
        localStorage.setItem('rpgMestreState', JSON.stringify(state));
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}

function carregarDados() {
    try {
        const saved = localStorage.getItem('rpgMestreState');
        if (saved) {
            state = JSON.parse(saved);
        } else {
            // ===== CARREGAR VILÕES PRÉ-DEFINIDOS =====
            const viloesIniciais = [];
            
            // Adicionar vilões de todos os níveis
            for (const nivel in VILOES_POR_NIVEL) {
                VILOES_POR_NIVEL[nivel].forEach(vilao => {
                    viloesIniciais.push({
                        ...vilao,
                        id: vilao.id || Date.now() + Math.random(),
                        dataCriacao: new Date().toISOString()
                    });
                });
            }

            // ===== CARREGAR NPCs PRÉ-DEFINIDOS =====
            const npcsIniciais = [
                {
                    id: 1001,
                    nome: "Papai Smurf",
                    funcao: "Líder da vila",
                    raca: "Smurf",
                    classe: "Sábio",
                    nivel: 15,
                    tendencia: "Leal e Bom",
                    tamanho: "Pequeno",
                    vida: "85/85",
                    ca: "14",
                    atributos: {
                        forca: 10,
                        destreza: 12,
                        constituicao: 14,
                        inteligencia: 18,
                        sabedoria: 20,
                        carisma: 18
                    },
                    pericias: ["Sabedoria +8", "Medicina +7", "História +7"],
                    descricao: "O sábio líder dos Smurfs, com mais de 500 anos. Usa barba branca e roupas vermelhas. Sempre tem um conselho sábio e uma poção para cada ocasião.",
                    historia: "Fundador da vila dos Smurfs, conhece todos os segredos da floresta e das estrelas.",
                    motivacoes: "Proteger todos os Smurfs e manter a harmonia na vila",
                    habilidades: ["Sabedoria Ancestral", "Criação de Poções", "Conhecimento Arcano"],
                    equipamento: ["Cajado ancião", "Grimório de poções", "Chapéu vermelho"],
                    servicos: "Poções curativas, conselhos sábios, identificação de itens mágicos",
                    localizacao: "Casa em forma de cogumelo no centro da vila",
                    tags: ["líder", "sábio", "poções", "quest"],
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 1002,
                    nome: "Smurfette",
                    funcao: "Única Smurf feminina",
                    raca: "Smurf",
                    classe: "Encantadora",
                    nivel: 8,
                    tendencia: "Neutro e Bom",
                    tamanho: "Pequeno",
                    vida: "55/55",
                    ca: "13",
                    atributos: {
                        forca: 8,
                        destreza: 14,
                        constituicao: 12,
                        inteligencia: 14,
                        sabedoria: 16,
                        carisma: 20
                    },
                    pericias: ["Persuasão +9", "Enganação +9", "Percepção +6"],
                    descricao: "Loira, usa vestido branco. Foi criada por Gargamel mas se tornou uma verdadeira Smurf. Gentil, carinhosa e admirada por todos.",
                    historia: "Criada por Gargamel para semear discórdia, mas o amor dos Smurfs a transformou em uma deles.",
                    motivacoes: "Provar seu valor e ser aceita, ajudar os amigos",
                    habilidades: ["Encanto Natural", "Empatia", "Diplomacia"],
                    equipamento: ["Vestido branco", "Flor mágica"],
                    servicos: "Pode convencer pessoas, informações sobre Gargamel",
                    localizacao: "Casa rosa na vila",
                    tags: ["encantadora", "amiga", "importante"],
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 1003,
                    nome: "Desastrado",
                    funcao: "Ajudante atrapalhado",
                    raca: "Smurf",
                    classe: "Aventureiro",
                    nivel: 6,
                    tendencia: "Caótico e Bom",
                    tamanho: "Pequeno",
                    vida: "65/65",
                    ca: "12",
                    atributos: {
                        forca: 14,
                        destreza: 6,
                        constituicao: 16,
                        inteligencia: 8,
                        sabedoria: 10,
                        carisma: 12
                    },
                    pericias: ["Atletismo +5", "Sobrevivência +3"],
                    descricao: "Sempre derruba tudo e causa confusão, mas tem um coração de ouro. Vive com um urubu de estimação chamado Corvo.",
                    historia: "O Smurf mais atrapalhado da vila, mas sempre tenta ajudar, mesmo que acabe piorando as coisas.",
                    motivacoes: "Quer ser útil e reconhecido",
                    habilidades: ["Sorte do Desastrado", "Resistência Física"],
                    equipamento: ["Martelo (que sempre derruba)", "Pá torta"],
                    servicos: "Ajuda em tarefas pesadas (com riscos)",
                    localizacao: "Oficina (quando não está quebrando algo)",
                    tags: ["engraçado", "aventureiro", "atrapalhado"],
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 1004,
                    nome: "Valente",
                    funcao: "Protetor da vila",
                    raca: "Smurf",
                    classe: "Guerreiro",
                    nivel: 10,
                    tendencia: "Leal e Bom",
                    tamanho: "Pequeno",
                    vida: "95/95",
                    ca: "16",
                    atributos: {
                        forca: 18,
                        destreza: 14,
                        constituicao: 16,
                        inteligencia: 10,
                        sabedoria: 12,
                        carisma: 14
                    },
                    pericias: ["Atletismo +8", "Intimidação +6", "Percepção +5"],
                    descricao: "O Smurf aventureiro que está sempre pronto para enfrentar Gargamel. Usa um chapéu com pena e carrega uma espada de brinquedo.",
                    historia: "Sempre sonhou em ser um grande herói e proteger a vila de todas as ameaças.",
                    motivacoes: "Proteger os fracos, derrotar Gargamel, ganhar fama",
                    habilidades: ["Coragem Inabalável", "Combate com Espada", "Liderança"],
                    equipamento: ["Espada (de brinquedo, mas afiada)", "Escudo", "Chapéu de pena"],
                    servicos: "Proteção, escolta, treinamento de combate",
                    localizacao: "Torre de vigia da vila",
                    tags: ["guerreiro", "protetor", "herói"],
                    dataCriacao: new Date().toISOString()
                }
            ];

            // ===== CARREGAR MISSÕES INICIAIS =====
            const necessidadesIniciais = [
                {
                    id: 2001,
                    item: "Encontrar a Salsaparrilha Perdida",
                    categoria: "Missão Principal",
                    descricao: "O estoque de salsaparrilha da vila foi roubado por Gargamel. Os Smurfs estão fracos e precisam recuperar o estoque antes que seja tarde.",
                    xp: "500 XP",
                    ouro: "100 po",
                    recompensaItens: "Poção de Cura Superior",
                    local: "Cabana do Gargamel",
                    npcs: "Valente, Desastrado",
                    inimigos: "Gargamel, Azrael, 4 goblins",
                    status: "pendente",
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 2002,
                    item: "Construir Nova Ponte",
                    categoria: "Importante",
                    descricao: "A ponte que liga a vila à floresta foi destruída na última tempestade. Precisamos de madeira e trabalhadores.",
                    xp: "200 XP",
                    ouro: "50 po",
                    local: "Rio da Vila",
                    npcs: "Papai Smurf, Desastrado",
                    status: "andamento",
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 2003,
                    item: "Poção da Juventude",
                    categoria: "Missão Secundária",
                    descricao: "Hogatha está procurando ingredientes para sua poção da juventude. Precisamos interceptar antes que ela capture Smurfs.",
                    xp: "300 XP",
                    local: "Pântano Sombrio",
                    inimigos: "Hogatha, Crocodilos Gigantes",
                    status: "pendente",
                    dataCriacao: new Date().toISOString()
                },
                {
                    id: 2004,
                    item: "Aniversário do Papai Smurf",
                    categoria: "Evento",
                    descricao: "Preparar a festa de aniversário do Papai Smurf. Precisamos de bolo, decorações e presentes.",
                    local: "Vila dos Smurfs",
                    npcs: "Todos os Smurfs",
                    status: "pendente",
                    dataCriacao: new Date().toISOString()
                }
            ];

            // ===== CARREGAR MAPA INICIAL =====
            const mapaInicial = {
                celulas: {
                    "1-1": "🏰", // Vila dos Smurfs
                    "2-4": "🧙", // Cabana do Gargamel
                    "3-2": "🍄", // Cogumelos mágicos
                    "4-5": "🌲", // Floresta densa
                    "5-3": "⛰️", // Montanha
                    "6-6": "💀", // Masmorra
                    "7-2": "⭐", // Tesouro escondido
                    "8-4": "💧"  // Rio
                },
                notas: "A vila fica no centro da floresta. A cabana do Gargamel fica a noroeste, perto do pântano. Cuidado com a masmorra a sudeste!",
                zoom: 2,
                grade: true
            };

            state = {
                viloes: viloesIniciais,
                npcs: npcsIniciais,
                necessidades: necessidadesIniciais,
                mapa: mapaInicial,
                currentPage: 'viloes'
            };

            // Salvar dados iniciais no localStorage
            salvarDados();
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}
// ===== FUNÇÕES DE CARREGAMENTO DE COMPONENTES =====
function carregarComponentes() {
    usarComponentesPadrao();
}

function usarComponentesPadrao() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="header">
                <div class="header-content">
                    <h1>🧢 SMURFS RPG 🧢</h1>
                    <button class="header-menu" onclick="toggleMenu()">☰</button>
                </div>
            </header>
        `;
    }

    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
        modalContainer.innerHTML = `
            <div id="modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modal-title">Título</h2>
                        <button class="close-modal" onclick="fecharModal()">&times;</button>
                    </div>
                    <div id="modal-body"></div>
                </div>
            </div>
        `;
    }
}

function adicionarElementosDecorativos() {
    const body = document.body;
    
    const mushroom = document.createElement('div');
    mushroom.className = 'floating-mushroom';
    mushroom.innerHTML = '🍄';
    body.appendChild(mushroom);
    
    const smurf = document.createElement('div');
    smurf.className = 'floating-smurf';
    smurf.innerHTML = '🧢';
    body.appendChild(smurf);
}

function configurarEventos() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            carregarPagina(page);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });
}

function carregarPagina(page) {
    state.currentPage = page;
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });

    const content = document.getElementById('content');
    if (!content) return;
    
    content.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';

    usarTemplatePadrao(page);
}

function usarTemplatePadrao(page) {
    const content = document.getElementById('content');
    if (!content) return;
    
    const templates = {
        viloes: `
            <div class="card">
                <div class="card-title">
                    <span>🧙</span>
                    <h2>VILÕES</h2>
                </div>
                <div id="viloes-lista"></div>
                <button class="btn-add" onclick="abrirModalVilao()">
                    <span>+</span> ADICIONAR VILÃO
                </button>
            </div>
        `,
        mapa: `
            <div class="card">
                <div class="card-title">
                    <span>🗺️</span>
                    <h2>MAPA DA VILA</h2>
                </div>
                <div id="mapa-container"></div>
                <button class="btn-add" onclick="limparMapa()">
                    <span>🗑️</span> LIMPAR MARCAÇÕES
                </button>
            </div>
        `,
        npcs: `
            <div class="card">
                <div class="card-title">
                    <span>👥</span>
                    <h2>SMURFS E NPCs</h2>
                </div>
                <div id="npcs-lista"></div>
                <button class="btn-add" onclick="abrirModalNPC()">
                    <span>+</span> ADICIONAR NPC
                </button>
            </div>
        `,
        necessidades: `
            <div class="card">
                <div class="card-title">
                    <span>📋</span>
                    <h2>MISSÕES E ITENS</h2>
                </div>
                <ul id="necessidades-lista" class="necessidades-list"></ul>
                <button class="btn-add" onclick="abrirModalNecessidade()">
                    <span>+</span> ADICIONAR ITEM
                </button>
            </div>
        `
    };

    content.innerHTML = templates[page] || templates.viloes;
    
    switch(page) {
        case 'viloes':
            renderizarViloes();
            break;
        case 'mapa':
            renderizarMapa();
            break;
        case 'npcs':
            renderizarNPCs();
            break;
        case 'necessidades':
            renderizarNecessidades();
            break;
    }
}

function adicionarEstilosGlobais() {
    const style = document.createElement('style');
    style.textContent = `
        .badge-nivel {
            background: #cfb53b;
            color: #1a1a2e;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: bold;
            margin-left: 10px;
        }

        .status-row {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }

        .status-mini {
            flex: 1;
            background: rgba(0,0,0,0.3);
            border-radius: 8px;
            padding: 8px;
            text-align: center;
        }

        .atributos-mini {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin: 10px 0;
            padding: 10px;
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
        }

        .atributo {
            background: #3b7dbd;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: bold;
        }

        .detalhes-vilao, .npc-detalhes {
            margin: 10px 0;
            padding: 10px;
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
        }

        details summary {
            cursor: pointer;
            color: #3b7dbd;
            font-weight: bold;
            padding: 5px;
        }

        details summary:hover {
            color: #ffb703;
        }

        .acoes-vilao {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        .ataque-row {
            display: flex;
            gap: 5px;
            margin-bottom: 5px;
        }

        .ataque-row input {
            flex: 1;
            padding: 8px;
        }

        .ataque-row button {
            width: 40px;
            background: #c41e3a;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }

        .form-row {
            display: flex;
            gap: 10px;
        }

        .atributos-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 10px 0;
        }

        .categoria-titulo {
            color: #3b7dbd;
            margin: 15px 0 10px 0;
            font-size: 1.1rem;
            border-bottom: 2px solid #e63946;
            padding-bottom: 5px;
        }

        .necessidade-item-completo {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 15px;
            margin-bottom: 10px;
            border-left: 5px solid #3b7dbd;
        }

        .necessidade-item-completo.urgente {
            border-left-color: #c41e3a;
        }

        .necessidade-item-completo.importante {
            border-left-color: #cfb53b;
        }

        .necessidade-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .necessidade-conteudo {
            margin-bottom: 10px;
        }

        .necessidade-titulo {
            font-size: 1.1rem;
            color: #f5f5f5;
            margin-bottom: 5px;
        }

        .necessidade-descricao {
            font-size: 0.9rem;
            color: #888;
            margin-bottom: 8px;
        }

        .recompensas {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
            padding: 8px;
            background: rgba(255, 215, 0, 0.1);
            border-radius: 8px;
        }

        .recompensa-xp {
            background: #cfb53b;
            color: #1a1a2e;
            padding: 2px 8px;
            border-radius: 12px;
        }

        .recompensa-ouro {
            background: #ffb703;
            color: #1a1a2e;
            padding: 2px 8px;
            border-radius: 12px;
        }

        .recompensa-itens {
            background: #9d4edd;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
        }

        .notas-mestre {
            margin-top: 8px;
            padding: 8px;
            background: rgba(0,0,0,0.3);
            border-radius: 8px;
            font-style: italic;
            border-left: 3px solid #c41e3a;
        }

        .necessidade-acoes {
            display: flex;
            gap: 5px;
            justify-content: flex-end;
        }

        .btn-icon {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 5px;
            border-radius: 5px;
            transition: all 0.2s;
        }

        .btn-icon:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }

        .menu-lateral {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .menu-content {
            background: #1a1a2e;
            padding: 30px;
            border-radius: 20px;
            border: 3px solid #e63946;
            max-width: 300px;
            width: 90%;
        }

        .menu-content h3 {
            color: #f5f5f5;
            margin-bottom: 20px;
            text-align: center;
        }

        .menu-content button {
            width: 100%;
            padding: 12px;
            margin-bottom: 10px;
            background: #3b7dbd;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            cursor: pointer;
        }

        .menu-content button:last-child {
            background: #c41e3a;
        }

        .context-menu {
            position: absolute;
            background: #1a1a2e;
            border: 2px solid #ffd700;
            border-radius: 10px;
            padding: 8px 0;
            z-index: 1000;
            min-width: 150px;
        }

        .context-menu div {
            padding: 10px 15px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .context-menu div:hover {
            background: #3b7dbd;
        }
    `;
    document.head.appendChild(style);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    carregarComponentes();
    configurarEventos();
    carregarPagina('viloes');
    adicionarElementosDecorativos();
    adicionarEstilosGlobais();
});


// ===== EXPORTAR FUNÇÕES PARA O ESCOPO GLOBAL =====
window.abrirModalVilao = abrirModalVilao;
window.abrirModalNPC = abrirModalNPC;
window.abrirModalNecessidade = abrirModalNecessidade;
window.salvarVilao = salvarVilao;
window.salvarNPC = salvarNPC;
window.salvarNecessidade = salvarNecessidade;
window.fecharModal = fecharModal;
window.toggleMenu = toggleMenu;
window.marcarCelula = marcarCelula;
window.limparMapa = limparMapa;
window.editarVilao = editarVilao;
window.removerVilao = removerVilao;
window.removerNPC = removerNPC;
window.removerNecessidade = removerNecessidade;
window.zoomMapa = zoomMapa;
window.centralizarMapa = centralizarMapa;
window.alternarGrade = alternarGrade;
window.salvarNotasMapa = salvarNotasMapa;
window.exportarMapa = exportarMapa;
window.importarMapa = importarMapa;
window.selecionarCelula = selecionarCelula;
window.irParaCelula = irParaCelula;
window.inserirSimbolo = inserirSimbolo;
window.abrirMenuContexto = abrirMenuContexto;
window.inserirSimboloPrompt = inserirSimboloPrompt;
window.removerSimbolo = removerSimbolo;
window.adicionarNotaCelula = adicionarNotaCelula;
window.marcarPerigo = marcarPerigo;
window.adicionarAtaque = adicionarAtaque;
window.removerAtaque = removerAtaque;
window.carregarDadosPorNivel = carregarDadosPorNivel;
window.carregarTemplateVilao = carregarTemplateVilao;
window.mudarStatusNecessidade = mudarStatusNecessidade;
window.editarNecessidade = editarNecessidade;
window.exportarTodosDados = exportarTodosDados;
window.importarTodosDados = importarTodosDados;
window.limparTodosDados = limparTodosDados;
window.fecharMenu = fecharMenu;