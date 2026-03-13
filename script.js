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
        // ===== NOVOS VILÕES DE NÍVEL INTERMEDIÁRIO =====
{
    id: 1004,
    nome: "Grimm, o Smurf Contaminado",
    vida: "98/98",
    ca: "15",
    deslocamento: "10m",
    xp: 700,
    desafio: "7 (700 XP)",
    atributos: { forca: 18, destreza: 16, constituicao: 17, inteligencia: 6, sabedoria: 8, carisma: 5 },
    pericias: ["Atletismo +8", "Intimidação +7", "Percepção +5"],
    resistencias: ["Dano necrótico", "Veneno"],
    imunidades: ["Medo", "Encantamento"],
    ataques: [
        { nome: "Soco Contaminado", dano: "1d8 + FOR", bono: "+7", efeito: "Se acertar, alvo faz CD 13 Constituição ou fica envenenado por 1d4 turnos" },
        { nome: "Garra da Raiva", dano: "2d6 + FOR", bono: "+7", efeito: "Só pode usar se estiver com menos de 50% de vida" },
        { nome: "Golpe Duplo", dano: "1d6 + FOR (duas mãos)", bono: "+7", efeito: "Faz dois ataques com as mãos no mesmo turno" }
    ],
    habilidades: [
        "Fúria Contaminada: Quando atinge 50% de vida, entra em fúria e causa +1d6 em todos os ataques",
        "Toque Pestilento: Inimigos adjacentes no início do turno tomam 1d4 dano necrótico",
        "Regeneração Sombria: Recupera 5 PV por turno se estiver com menos de 30% de vida"
    ],
    historia: "Grimm era um Smurf comum até ser capturado por Gargamel e submetido a experimentos alquímicos. Diferente dos heróis, sua marca falhou parcialmente, deixando-o em um estado de fúria constante. Agora é uma criatura selvagem que ataca qualquer um que se aproxime, movido por dor e raiva.",
    taticas: "Parte para cima sem medo, foca no inimigo mais próximo. Quando está com pouca vida, fica mais agressivo e perigoso.",
    tesouro: "Pedaços de sua antiga roupa Smurf, 1d10 po, fragmento da marca (pode ser usado para algo)",
    fraquezas: ["Luz solar plena (desvantagem nos ataques)", "Água benta (2d6 dano)", "Salsaparrilha (CD 15 ou fica atordoado)"]
},

{
    id: 1005,
    nome: "Corvax, o Espreitador das Sombras",
    vida: "82/82",
    ca: "17",
    deslocamento: "12m",
    xp: 800,
    desafio: "8 (800 XP)",
    atributos: { forca: 14, destreza: 20, constituicao: 14, inteligencia: 12, sabedoria: 14, carisma: 10 },
    pericias: ["Furtividade +12", "Percepção +9", "Acrobacia +10"],
    resistencias: ["Dano perfurante", "Dano cortante"],
    imunidades: ["Queda"],
    ataques: [
        { nome: "Adaga Sombria", dano: "1d6 + DES", bono: "+9", efeito: "Pode atacar e esconder como ação bônus" },
        { nome: "Chuva de Lâminas", dano: "2d4 + DES (3 alvos)", bono: "+7", efeito: "Ataque em área pequena" },
        { nome: "Golpe Furtivo", dano: "2d6 + DES", bono: "+9", efeito: "Se tiver vantagem, causa +2d6 dano" }
    ],
    habilidades: [
        "Passo Sombrio: Pode se teletransportar 6m entre sombras como ação bônus",
        "Emboscador: No primeiro turno de combate, tem vantagem em todos os ataques",
        "Visão nas Trevas: Perfeita visão no escuro até 36m"
    ],
    historia: "Um ladrão e assassino contratado por Gargamel para capturar Smurfs. Corvax é um mestre das sombras que nunca é visto até ser tarde demais. Dizem que ele já foi um Smurf, mas ninguém tem certeza.",
    taticas: "Ataca das sombras, foca em inimigos isolados, foge se estiver em desvantagem para preparar outra emboscada.",
    tesouro: "100 po, 2 gems (30 po cada), poção de invisibilidade",
    fraquezas: ["Luz clara (não pode usar habilidades sombrias)", "Batalha em espaço aberto"]
},

// ===== VILÕES DE NÍVEL DIFÍCIL =====
{
    id: 1006,
    nome: "Krog, o Ogro Esmagador",
    vida: "156/156",
    ca: "14",
    deslocamento: "8m",
    xp: 1100,
    desafio: "11 (1100 XP)",
    atributos: { forca: 22, destreza: 8, constituicao: 20, inteligencia: 6, sabedoria: 8, carisma: 6 },
    pericias: ["Atletismo +12", "Intimidação +10"],
    resistencias: ["Dano contundente", "Fogo"],
    imunidades: ["Medo"],
    ataques: [
        { nome: "Punho Esmagador", dano: "2d8 + FOR", bono: "+10", efeito: "Se acertar, alvo é empurrado 3m" },
        { nome: "Batida Dupla", dano: "1d10 + FOR (duas mãos)", bono: "+10", efeito: "Faz dois ataques, um com cada mão" },
        { nome: "Pisão Tremendo", dano: "2d6 + FOR", bono: "+8", efeito: "Área de 3m, todos fazem CD 15 Força ou caem" }
    ],
    habilidades: [
        "Frenesi: Quando atinge 25% de vida, faz 3 ataques por turno",
        "Pele Grossa: Reduz dano físico em 3",
        "Investida: Pode correr até 12m em linha reta e causar 3d6 + FOR em um alvo"
    ],
    historia: "Um ogro gigantesco contratado por Gargamel para proteger sua cabana. Krog não é inteligente, mas é incrivelmente forte e leal (enquanto receber comida).",
    taticas: "Parte para cima do inimigo mais próximo, ignora ataques menores, foca em esmagar.",
    tesouro: "200 po, osso grande (foco arcano), pele grossa (material para armadura)",
    fraquezas: ["Lento", "Pode ser enganado com comida", "Não nada"]
},

{
    id: 1007,
    nome: "Morgana, a Feiticeresa do Pântano",
    vida: "112/112",
    ca: "16 (19 com Armadura Arcana)",
    deslocamento: "9m",
    xp: 1200,
    desafio: "12 (1200 XP)",
    atributos: { forca: 8, destreza: 14, constituicao: 16, inteligencia: 20, sabedoria: 18, carisma: 16 },
    pericias: ["Arcanismo +15", "Natureza +14", "Enganação +13"],
    resistencias: ["Ácido", "Frio", "Elétrico"],
    imunidades: ["Doenças", "Veneno"],
    ataques: [
        { nome: "Cajado do Pântano", dano: "1d8 + INT", bono: "+9", efeito: "Dano contundente + 1d6 ácido" },
        { nome: "Raio Pútrido", dano: "3d8 ácido", bono: "+11", efeito: "Alcance 18m, CD 16 Constituição ou envenenado" },
        { nome: "Névoa Pestilenta", dano: "2d6 veneno", bono: "CD 15", efeito: "Área de 6m, permanece por 1 minuto" }
    ],
    habilidades: [
        "Mestre das Poções: Pode criar poções durante combate (cura, veneno, explosão)",
        "Invocar Criatura do Pântano: 1x por dia invoca 1 crocodilo gigante ou 2 cobras venenosas",
        "Passo na Névoa: Pode se teletransportar 9m em áreas com névoa"
    ],
    magias: {
        truques: ["Raio de Fogo", "Mão Mágica", "Veneno"],
        nivel1: ["Armadura Arcana", "Projétil Mágico", "Enfeitiçar"],
        nivel2: ["Névoa Fétida", "Imobilizar", "Invisibilidade"],
        nivel3: ["Bola de Fogo", "Conjurar Animais", "Respirar na Água"],
        nivel4: ["Muralha de Espinhos", "Porta Dimensional"]
    },
    historia: "Irmã mais nova de Hogatha, Morgana é uma feiticeira que vive nos pântanos mais profundos. Ela odeia intrusos e protege seu território com magia e criaturas. Gargamel já tentou recrutá-la, mas ela prefere ficar sozinha.",
    taticas: "Fica longe, usa magias de área, invoca criaturas para proteger, foge para dentro do pântano se estiver perdendo.",
    tesouro: "300 po, 3 poções (curar, força, invisibilidade), grimório de magias",
    fraquezas: ["Fogo (dano extra 2d6)", "Símbolos sagrados", "Área sem névoa/água"]
},

// ===== VILÃO LENDÁRIO =====
{
    id: 1008,
    nome: "Zarg, o Smurf Corrompido (Experimento Zero)",
    vida: "210/210",
    ca: "18",
    deslocamento: "12m",
    xp: 2200,
    desafio: "15 (2200 XP)",
    atributos: { forca: 24, destreza: 18, constituicao: 22, inteligencia: 10, sabedoria: 12, carisma: 8 },
    pericias: ["Atletismo +15", "Intimidação +14", "Percepção +12"],
    resistencias: ["Dano físico", "Fogo", "Frio"],
    imunidades: ["Veneno", "Medo", "Encantamento"],
    ataques: [
        { nome: "Soco Devastador", dano: "2d10 + FOR", bono: "+14", efeito: "Se acertar, alvo fica atordoado até o fim do próximo turno (CD 18 Constituição)" },
        { nome: "Garras da Corrupção", dano: "2d8 + FOR", bono: "+14", efeito: "Faz dois ataques com garras, cada um causa 2d8 + FOR" },
        { nome: "Golpe de Raiva", dano: "3d10 + FOR", bono: "+14", efeito: "Só pode usar 1x por turno, recarrega com 5-6 no dado" },
        { nome: "Batida de Palmas", dano: "4d8 + FOR", bono: "+12", efeito: "Área de 3m, todos fazem CD 18 Força ou caem e ficam surdos" }
    ],
    habilidades: [
        "Fúria Incontrolável: A cada vez que perde 30 PV, entra em fúria e causa +1d8 em todos os ataques",
        "Regeneração Acelerada: Recupera 15 PV por turno (pode ser interrompida por fogo ou ácido)",
        "Marca Distorcida: Sua marca está distorcida no peito, ela pulsa com energia negra e pode lançar um raio 1x por combate (3d10 dano necrótico, linha de 12m)",
        "Presença Aterrorizante: Criaturas a 6m fazem CD 16 Sabedoria ou ficam apavoradas",
        "Salto Colossal: Pode saltar até 12m e cair sobre inimigos (causa 3d6 dano em área)"
    ],
    historia: "Zarg foi o PRIMEIRO experimento de Gargamel, muito antes dos outros. Ele era um Smurf comum que foi submetido a um processo alquímico brutal. Algo deu terrivelmente errado: sua marca se distorceu, sua mente se perdeu e ele se tornou uma máquina de destruição. Gargamel o manteve preso por anos, mas recentemente ele escapou. Agora vaga pela floresta destruindo tudo que vê. Ele é a prova viva de que os heróis poderiam ter se tornado monstros se a marca não tivesse funcionado corretamente.",
    taticas: "Ataca sem hesitação, foca em um alvo até destruí-lo, depois parte para o próximo. Não recua, não negocia, não pensa. Apenas DESTRÓI.",
    tesouro: "Pedaços de sua antiga roupa Smurf, fragmentos da marca distorcida (item de quest muito raro), 500 po, 1 item mágico poderoso",
    fraquezas: [
        "Fogo (causa dano extra e impede regeneração por 1 turno)",
        "Símbolos sagrados (CD 15 ou foge por 1 turno)",
        "A marca distorcida é um ponto fraco (ataques com vantagem contra ela)",
        "Se ver um Smurf 'normal', pode ficar confuso por 1 turno (memórias antigas)"
    ],
    fases: [
        "Fase 1 (100% - 70%): Ataques físicos pesados, usa garras e socos",
        "Fase 2 (69% - 30%): Entra em fúria, causa +1d8 dano, começa a usar golpes de área",
        "Fase 3 (29% - 0%): Fica desesperado, usa todos os ataques, regenera rápido, usa o raio da marca"
    ]
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
    id: 2005,
    nome: "Smurf Toguro",
    funcao: "Mestre das Poções / Vendedor de Energia",
    raca: "Smurf",
    classe: "Guerreiro Alquímico",
    nivel: 12,
    tendencia: "Caótico e Bom",
    tamanho: "Pequeno",
    vida: "95/95",
    ca: "16 (20 quando ativado)",
    deslocamento: "9m (18m quando ativado)",
    atributos: { 
        forca: 16, 
        destreza: 18, 
        constituicao: 18, 
        inteligencia: 14, 
        sabedoria: 12, 
        carisma: 20 
    },
    pericias: ["Atletismo +9", "Acrobacia +10", "Enganação +11", "Intimidação +11", "Percepção +7"],
    resistencias: ["Veneno", "Fogo", "Necrótico"],
    imunidades: ["Medo", "Encantamento"],
    
    // HABILIDADES ESPECIAIS
    habilidades: [
        "💪 FORÇA ENERGÉTICA: Quando bebe uma poção, entra em estado 'ATIVADO' por 3 turnos, ganhando +4 FOR, +4 DES, +4 CA e +6m deslocamento",
        "🧪 MESTRE DAS POÇÕES: Pode usar qualquer poção como ação bônus. Conhece 15 receitas diferentes.",
        "⚡ GOLPE ENERGÉTICO: Quando ativado, seus ataques causam +1d8 dano de energia",
        "🍶 RESISTÊNCIA A POÇÕES: Imune a efeitos negativos de poções que beber",
        "💥 EXPLOSÃO DE SABOR: 1x por dia, pode jogar uma poção no chão criando uma explosão de 4,5m que causa 4d6 de um tipo elemental (fogo, frio, elétrico ou ácido)"
    ],
    
    // ATAQUES
    ataques: [
        { 
            nome: "Soco Energético", 
            dano: "1d8 + FOR", 
            bono: "+9", 
            tipo: "contundente", 
            efeito: "Se ativado, causa +1d8 energia e pode atacar duas vezes"
        },
        { 
            nome: "Arremesso de Poção", 
            dano: "1d6 + INT", 
            bono: "+8", 
            tipo: "varia", 
            alcance: "12m", 
            efeito: "Escolhe um tipo de dano (fogo, frio, elétrico, ácido). Alvo faz CD 15 DES ou sofre efeito adicional (queimadura, lentidão, paralisia, etc)"
        },
        { 
            nome: "Chuva de Poções", 
            dano: "3d4", 
            bono: "CD 16", 
            tipo: "área", 
            alcance: "6m cone", 
            efeito: "Todos na área fazem CD 16 DES ou sofrem 3d4 e ficam desorientados 1 turno"
        },
        { 
            nome: "Golpe Final: SABOR ENERGÉTICO", 
            dano: "4d8 + FOR", 
            bono: "+11", 
            tipo: "energético", 
            efeito: "Só pode usar quando ativado. Se acertar, alvo fica atordoado 1 turno. Recarrega com 5-6 no dado."
        }
    ],
    
    // POÇÕES QUE ELE USA
    pocoes: [
        "🍷 Poção de Força: +4 FOR por 1 minuto",
        "⚡ Poção de Velocidade: +6m deslocamento e +1 ataque por turno",
        "🛡️ Poção de Resistência: Resistência a todos danos por 1 minuto",
        "🔥 Poção de Fogo: Ataques causam +1d6 fogo por 1 minuto",
        "❄️ Poção de Gelo: Pode congelar inimigos (CD 15 Constituição)",
        "💚 Poção de Cura: Cura 4d4+4 PV",
        "💛 Poção Energética: Entra em estado ATIVADO imediatamente",
        "🖤 Poção Sombria: Fica invisível por 1 minuto",
        "🤎 Poção de Terra: +4 CA por 1 minuto"
    ],
    
    // INVENTÁRIO
    equipamento: [
        "Cinto de Poções (carrega até 10 poções)",
        "Luvas de Proteção (resiste a dano das poções)",
        "Óculos de Mistura (vantagem em testes de Alquimia)",
        "Bolsa de Couro (contém 2d6 poções aleatórias)",
        "Chapéu de Smurf (vermelho, obviamente)"
    ],
    
    // DESCRIÇÃO DETALHADA
    descricao: "Smurf Toguro é uma lenda entre os Smurfs. Ele não é como os outros - ele bebe POÇÕES. Muitas poções. Todas as poções. Sua força vem diretamente dos frascos que carrega no cinto, e quando ele bebe uma poção energética, seus olhos brilham, seus músculos incham e ele diz a famosa frase: 'SABOR ENERGÉTICO!'. Dizem que ele já derrotou Gargamel sozinho... três vezes. No mesmo dia.",
    
    historia: "Toguro nem sempre foi assim. Era um Smurf comum, ajudante de Papai Smurf na fabricação de poções. Até que um dia, por acidente, ele bebeu uma poção experimental. Em vez de explodir, ele ficou FORTE. Muito forte. Desde então, ele busca a poção perfeita, a que dará a ele o 'verdadeiro sabor energético'. Vive viajando pela floresta atrás de ingredientes raros e testando novas receitas. Os Smurfs o admiram e temem na mesma medida.",
    
    motivacoes: "Encontrar a receita da poção suprema. Proteger a vila. Testar novas combinações de sabores. Dizer 'SABOR ENERGÉTICO' o mais alto possível.",
    
    servicos: "Vende poções (2d4 poções aleatórias por 50 po cada), treina outros Smurfs em combate com poções, pode criar poções personalizadas se levar os ingredientes (leva 1d4 dias).",
    
    localizacao: "Viajando pela floresta ou no laboratório de poções da vila",
    
    frases: [
        "SABOR ENERGÉTICO!",
        "Toma essa poção!",
        "Você não está pronto para esse sabor!",
        "Isso que é energia!",
        "Bebi todas e ainda quero mais!"
    ],
    
    tags: ["guerreiro", "vendedor", "poções", "meme", "forte", "energético", "quest"],
    
    dataCriacao: new Date().toISOString()
},
// ===== NPCs RELACIONADOS À HISTÓRIA PRINCIPAL =====

{
    id: 2101,
    nome: "Velho Mendel, o Alquimista Recluso",
    funcao: "Ex-assistente de Gargamel / Testemunha dos experimentos",
    raca: "Humano",
    idade: "78 anos",
    descricao: "Um homem velho e curvado, com cicatrizes de queimaduras químicas nas mãos. Mora sozinho em uma cabana nos confins da floresta, evitando contato com qualquer pessoa. Fala em enigmas e parece sempre distraído, como se revivesse traumas do passado.",
    historia: "Mendel foi assistente de Gargamel durante os primeiros experimentos com os Smurfs. Ele ajudou a criar as marcas alquímicas, mas fugiu quando viu os resultados dos Experimentos 1, 2 e 3. Carrega culpa até hoje e sabe onde Gargamel escondeu os registros completos dos experimentos. Ele tem um diário com anotações sobre cada Smurf marcado, incluindo os nomes ORIGINAIS dos heróis (antes de terem suas memórias apagadas).",
    conexao_historia: "Sabe a verdade completa sobre a marca. Pode revelar que os nomes dos heróis foram riscados pelas próprias mãos deles, no laboratório, quando pediram para esquecer. Tem uma cicatriz no braço igual à marca, mas falha - ele tentou se marcar para 'entender' o processo.",
    localizacao: "Cabana escondida atrás de uma cachoeira",
    revelacoes: [
        "Os nomes originais dos heróis",
        "O local exato do laboratório original",
        "Como a marca pode ser ativada ou removida",
        "Que Gargamel NÃO criou o símbolo - ele encontrou em ruínas antigas"
    ],
    servicos: "Pode identificar itens mágicos, criar poções estranhas, contar histórias do passado (por um preço)",
    segredos: "Ele ainda tem UMA das marcas originais guardada em um frasco. Funciona? Ele não sabe. Nunca testou."
},

{
    id: 2102,
    nome: "Irmã Clarice, a Curandeira da Floresta",
    funcao: "Médica errante / Guardiã de segredos",
    raca: "Humana",
    idade: "45 anos",
    descricao: "Uma mulher de cabelos grisalhos prematuros, olhos cansados mas gentis. Carrega um cajado com ervas penduradas e uma bolsa cheia de remédios. Anda pela floresta ajudando quem precisa, mas nunca fica no mesmo lugar por mais de um dia.",
    historia: "Clarice era uma curandeira que vivia perto do pântano. Certa noite, encontrou um Smurf ferido e delirando - era um dos Experimentos 3 que havia escapado. Ela tentou ajudá-lo, mas ele a atacou. Na confusão, ela viu a marca no corpo dele e percebeu que era igual à de seu filho, que desaparecera anos atrás. Desde então, busca entender o significado da marca e ajudar os 'marcados' que encontra.",
    conexao_historia: "Ela pode reconhecer a marca nos heróis e reagir com choque. Seu filho desaparecido pode ser um dos experimentos (talvez até um dos heróis, se o jogador quiser essa conexão).",
    localizacao: "Errante, pode ser encontrada em qualquer lugar da floresta",
    servicos: "Cura ferimentos (2d4+4), identifica doenças, dá abrigo temporário",
    frases: [
        "Essa marca... eu conheço essa marca.",
        "Meu filho tinha uma igual. Antes de desaparecer.",
        "Cuidado com quem pergunta demais sobre isso."
    ]
},

{
    id: 2103,
    nome: "Bruxo Ancião Morvan",
    funcao: "Último guardião do conhecimento antigo",
    raca: "Humano (meio-elfo?)",
    idade: "Desconhecida (aparentemente centenário)",
    descricao: "Um ser misterioso que vive no topo da Montanha Proibida. Ninguém sabe sua idade real, mas ele alega ter visto a chegada dos primeiros Smurfs na floresta. Fala em parábolas e nunca dá respostas diretas. Sua cabana é cheia de pergaminhos antigos e símbolos estranhos.",
    historia: "Morvan é um estudioso das civilizações antigas. Ele descobriu que o símbolo △○— — é muito mais antigo que Gargamel - vem de uma civilização perdida que dominava a alquimia da alma. Ele pode explicar o SIGNIFICADO REAL do símbolo e por que ele funciona nos Smurfs.",
    conexao_historia: "Sabe que a marca não é apenas um estabilizador - ela é uma CHAVE para algo maior. Os quatro heróis marcados podem, juntos, acessar um poder antigo ou abrir um local secreto.",
    localizacao: "Topo da Montanha Proibida (acesso difícil)",
    revelacoes: [
        "A verdadeira origem do símbolo",
        "O que acontece se os quatro marcados se unirem",
        "Existem outros marcados pela floresta?",
        "Por que Gargamel escolheu Smurfs para o experimento"
    ],
    desafio: "Para obter respostas, os heróis precisam provar seu valor com um teste (combate, inteligência ou sabedoria)"
},

// ===== NPCs AFETADOS PELOS EXPERIMENTOS =====

{
    id: 2201,
    nome: "Lilith, a Smurf Errante",
    funcao: "Sobrevivente do Experimento 2",
    raca: "Smurf",
    estado: "Instável",
    descricao: "Uma Smurf que não se lembra do próprio nome, atende por Lilith (nome que ela mesma escolheu). Vive fugindo de tudo e todos, alternando entre momentos de lucidez e surtos. Quando está lúcida, é gentil e inteligente. Quando surta, corre e se esconde, murmurando sobre 'luz azul' e 'não quero voltar'.",
    historia: "Lilith é uma sobrevivente do Experimento 2 - o 'instável'. Sua marca funcionou parcialmente, mas deixou sequelas. Ela escapou do laboratório antes de Gargamel terminar o processo e vive escondida desde então. Ela é a PROVA VIVA de que os experimentos podem sobreviver, mesmo que de forma imperfeita.",
    conexao_historia: "Ela pode reconhecer os heróis como 'irmãos de sofrimento'. Pode ensinar a eles como controlar os momentos de instabilidade (se eles tiverem). Sabe a localização de outros sobreviventes.",
    localizacao: "Oscila entre cavernas e árvores ocas, difícil de encontrar",
    servicos: "Pode dar dicas de como esconder a marca, onde encontrar abrigo, quem evitar",
    perigo: "Em momentos de surto, pode atacar sem querer (1d4 dano não letal)"
},

{
    id: 2202,
    nome: "Os Três Esquecidos",
    funcao: "Vítimas do Experimento 1 (deformados)",
    quantidade: 3,
    racas: ["Smurf", "Smurf", "Desconhecida"],
    descricao: "Três criaturas que vivem nas profundezas de uma caverna escura. São completamente deformadas pelos experimentos, mal lembrando que um dia foram Smurfs. Não falam, apenas emitem sons guturais. Mas... elas NÃO SÃO AGRESSIVAS. Apenas querem ficar sozinhas.",
    historia: "São os únicos sobreviventes conhecidos do Experimento 1 (deformados). Gargamel os descartou como 'falhas', mas eles sobreviveram de alguma forma. Vivem reclusos, se alimentando de fungos e água da caverna. Têm MEDO de luz e de barulhos altos.",
    conexao_historia: "Se os heróis conseguirem se aproximar sem ameaçá-los, podem encontrar pistas: restos de roupas de Smurf, números tatuados (4A, 4B, 4C, 4D - os nomes dos heróis?), desenhos na parede mostrando o laboratório.",
    localizacao: "Caverna dos Suspiros (entrada escondida por vegetação)",
    recompensa: "Se ajudados (levando comida, afastando ameaças), podem mostrar um túnel secreto que leva direto aos fundos do laboratório de Gargamel."
},

{
    id: 2203,
    nome: "Espectro do Experimento 3",
    funcao: "Manifestação da agressividade pura",
    tipo: "Espírito / Sombra",
    descricao: "Não é uma criatura viva, mas uma manifestação da raiva e agressividade do Experimento 3 que morreu na cabana. Aparece em noites de lua cheia perto do local onde o Smurf contaminado foi morto. É uma sombra que repete os últimos momentos do experimento.",
    historia: "Quando o Smurf do Experimento 3 (agressivo) morreu, sua raiva era tão intensa que deixou uma marca no local. O espectro não é malicioso - apenas REPETE a cena da morte, revivendo a agressão que o consumiu.",
    conexao_historia: "Se observarem o espectro, os heróis podem ver FLASHBACKS do que aconteceu no laboratório. Podem ver Gargamel, os outros experimentos, e talvez... ver a si mesmos, sendo marcados. O espectro não ataca a menos que seja provocado.",
    localizacao: "Clareira perto da cabana de Gargamel (noite de lua cheia)",
    revelacao: "Se acalmado (com música, palavras gentis ou oferecendo algo), o espectro pode mostrar uma visão clara do momento em que os heróis PEDIRAM para esquecer."
},

// ===== NPCs QUE PODEM AJUDAR NA JORNADA =====

{
    id: 2301,
    nome: "Coruja Sábia",
    funcao: "Observadora da floresta",
    raca: "Coruja (animal falante?)",
    descricao: "Uma coruja enorme que vive na árvore mais alta da floresta. Ela observa TUDO que acontece. Não fala diretamente, mas pode se comunicar por imagens mentais ou deixando pistas (penas, objetos, etc).",
    historia: "A Coruja está na floresta há séculos. Viu Gargamel chegar, viu os experimentos, viu os heróis serem levados e trazidos de volta. Ela não interfere, apenas observa. Mas... ela pode ESCOLHER ajudar se achar que é importante.",
    conexao_historia: "Pode guiar os heróis até locais importantes (cabana de Mendel, entrada da caverna, etc) deixando penas no caminho. Se os heróis a respeitarem, pode deixá-los ver memórias antigas da floresta.",
    localizacao: "Árvore Ancestral (centro da floresta antiga)",
    condicao: "Só aparece para quem tem coração puro ou está em grande desespero."
},

{
    id: 2302,
    nome: "Grimm, o Coletor",
    funcao: "Catador de objetos perdidos",
    raca: "Humano (trapaceiro)",
    descricao: "Um homem sujo e bagunceiro que vive em uma carroça cheia de TRALHAS. Ele coleta tudo que encontra na floresta e vende por preços absurdos. Mas... entre as tralhas, às vezes há TESOUROS. Ele não sabe o valor do que tem, só quer dinheiro.",
    historia: "Grimm já foi um aventureiro, mas desistiu dessa vida. Agora vive revirando restos. Ele já passou PELO LABORATÓRIO de Gargamel e pegou várias coisas antes de Gargamel voltar. Não sabe o que é, só pegou porque brilhava.",
    conexao_historia: "Ele pode ter objetos do laboratório: frascos com restos de poções, anotações rasgadas, PEDAÇOS DE ROUPA com números (4A, 4B, etc), e até UM DIÁRIO de Gargamel (parcial, claro).",
    localizacao: "Errante, mas sempre perto de estradas",
    negociacao: "Não aceita menos que o dobro do valor real. Mas aceita TROCAS (objetos interessantes).",
    servicos: "Vende itens comuns (cordas, rações, etc) e itens ESTRANHOS (1d4 itens misteriosos por visita)"
},

{
    id: 2303,
    nome: "Fonte dos Desejos (Poço)",
    funcao: "Local mágico / Entidade anciã",
    tipo: "Lugar sagrado",
    descricao: "Um poço antigo no meio da floresta, coberto de musgo e símbolos. Diz a lenda que quem jogar uma moeda e fizer um pedido de coração puro, pode ter uma VISÃO do passado ou do futuro. Mas só funciona uma vez por pessoa.",
    historia: "O poço é, na verdade, um local de poder antigo, muito anterior aos Smurfs. Ele absorve memórias da floresta e pode mostrá-las a quem pedir. Gargamel já tentou destruí-lo, mas não conseguiu.",
    conexao_historia: "Se um herói jogar uma moeda e pedir para VER A VERDADE, o poço pode mostrar o momento em que ele foi marcado. Pode mostrar seu nome original. Pode mostrar seu pedido para esquecer.",
    localizacao: "Clareira dos Ecos (protegida por neblina mágica)",
    limitacao: "Só funciona UMA VEZ por pessoa. Depois disso, só dá visões confusas."
},

// ===== NPCS CÔMICOS (RESPIRO) =====

{
    id: 2401,
    nome: "Gus, o Esquilo Dramático",
    funcao: "Testemunha exagerada",
    raca: "Esquilo falante",
    descricao: "Um esquilo que PRESENCIOU TUDO e ADORA contar histórias... de forma EXTREMAMENTE DRAMÁTICA. Ele viu os heróis sendo levados, viu Gargamel, viu os experimentos, mas sua versão é sempre exagerada e confusa.",
    historia: "Gus estava em uma árvore perto do laboratório no dia do experimento. Viu tudo. Mas como é um esquilo, entendeu tudo do jeito dele. Para ele, Gargamel era um 'gigante malvado com cheiro de queijo', os heróis eram 'smurfs brilhantes', e a marca era uma 'tatuagem mágica que fazia cócegas'.",
    conexao_historia: "Ele pode dar pistas VERDADEIRAS misturadas com ABSURDOS. Cabe aos jogadores descobrir o que é real. Ex: 'Eles gritaram muito! E depois pediram para dormir e esquecer!' (verdade). 'O gigante tinha um gato que falava!' (mentira, Azrael não fala).",
    localizacao: "Qualquer árvore, mas especialmente perto do laboratório",
    recompensa: "Se os heróis ouvirem suas histórias (e derem nozes), ele pode mostrar onde Gargamel escondeu uma chave."
},

{
    id: 2402,
    nome: "Velho Chico, o Pescador de Histórias",
    funcao: "Contador de causos",
    raca: "Humano",
    descricao: "Um velho que vive à beira do rio, pescando e contando histórias. Ninguém sabe se ele é louco ou sábio. Ele fala sobre 'smurfs que brilham no escuro', 'uma cabana que aparece só na lua nova' e 'um homem que vende memórias'.",
    historia: "Chico já viu MUITA coisa na floresta. Ele não entende o que vê, mas lembra de tudo. Pode descrever os heróis sendo carregados inconscientes por Gargamel ('uns azulzinhos desmaiados, o homem de roxo levou').",
    conexao_historia: "Ele pode dar pistas sobre o paradeiro de outros NPCs (Mendel, Grimm, a Coruja). Também pode contar a lenda do POÇO DOS DESEJOS.",
    localizacao: "Margens do Rio Salsaparrilha",
    frases: [
        "Já vi coisa estranha nessa floresta... mas esses azulzinho marcado... esses são os mais estranhos.",
        "Teve uma noite que o rio brilhou azul. No dia seguinte, apareceu um homem com uma capa roxa.",
        "Cuidado com quem pergunta demais. A floresta ouve."
    ]
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
    id: 3101,
    item: "🔍 Rastreando o Passado - O Assistente Esquecido",
    categoria: "Missão Principal",
    descricao: "Após descobrir o símbolo na cabana de Gargamel, os heróis encontram uma pista sobre um antigo assistente chamado Mendel, que fugiu durante os experimentos. Dizem que ele mora em uma cabana escondida atrás de uma cachoeira. Ele pode ter respostas sobre a marca.",
    objetivos: [
        "Encontrar a cachoeira escondida na floresta densa",
        "Convencer Mendel a falar sobre o passado (ele é traumatizado)",
        "Obter o diário de Mendel com anotações sobre os experimentos",
        "Descobrir os nomes originais dos heróis (antes de terem a memória apagada)"
    ],
    xp: "800 XP",
    ouro: "150 po",
    recompensaItens: "Diário de Mendel (revela informações sobre a marca), Poção de Memória (permite ver um flashback do passado)",
    local: "Cachoeira dos Sussurros (nordeste da floresta)",
    npcs: "Velho Mendel",
    inimigos: "Nenhum (mas Mendel pode ser difícil de convencer)",
    desafios: "Subir a cachoeira, ganhar a confiança de Mendel, lidar com as próprias emoções ao ouvir a verdade",
    status: "pendente"
},

{
    id: 3102,
    item: "👤 O Sobrevivente do Experimento 2",
    categoria: "Missão Principal",
    descricao: "Mendel menciona que uma Smurf do Experimento 2 (o 'instável') sobreviveu e vive escondida na floresta. Ela pode ter informações valiosas sobre como controlar os efeitos da marca. Mas ela é instável e pode atacar se assustada.",
    objetivos: [
        "Encontrar Lilith, a Smurf Errante (difícil, ela se esconde)",
        "Ganhar sua confiança sem assustá-la",
        "Ajudá-la a controlar um surto de instabilidade",
        "Descobrir o que ela lembra sobre o experimento"
    ],
    xp: "600 XP",
    ouro: "100 po",
    recompensaItens: "Técnica de Controle Mental (vantagem em testes contra medo), Localização de outros sobreviventes",
    local: "Floresta Sombria (Lilith se move constantemente)",
    npcs: "Lilith",
    inimigos: "Lilith (se assustada, ataca sem querer, dano não letal)",
    desafios: "Encontrar alguém que não quer ser encontrado, lidar com instabilidade emocional, escolher entre ajudar ou explorar",
    status: "pendente"
},

{
    id: 3103,
    item: "🕯️ Os Deformados da Caverna",
    categoria: "Missão Principal",
    descricao: "Lilith menciona que existem outros sobreviventes - os do Experimento 1, que vivem deformados em uma caverna. Eles são inofensivos, mas têm medo de luz e barulho. Eles podem ter pistas sobre os nomes originais dos heróis.",
    objetivos: [
        "Encontrar a Caverna dos Suspiros (entrada escondida)",
        "Entrar na caverna sem usar luz forte ou fazer barulho",
        "Comunicar-se com as criaturas (elas não falam, apenas se comunicam por gestos)",
        "Encontrar os desenhos na parede que mostram o laboratório e os números 4A, 4B, 4C, 4D"
    ],
    xp: "700 XP",
    ouro: "120 po",
    recompensaItens: "Mapa desenhado na parede (mostra uma entrada secreta no laboratório de Gargamel), Fungos Raros (podem ser vendidos ou usados em poções)",
    local: "Caverna dos Suspiros (sul da floresta, perto do pântano)",
    npcs: "Os Três Esquecidos",
    inimigos: "Nenhum (as criaturas não atacam, só fogem)",
    desafios: "Encontrar a entrada escondida, navegar na escuridão total, comunicar-se sem palavras, resistir à tristeza da situação",
    status: "pendente"
},

{
    id: 3104,
    item: "👻 A Calmaria do Espectro",
    categoria: "Missão Principal",
    descricao: "Os heróis ouvem histórias sobre um fantasma que aparece na clareira perto da cabana de Gargamel em noites de lua cheia. É o espírito do Smurf do Experimento 3, que morreu agressivo. Ele revive sua agonia toda noite. Talvez, se acalmado, ele possa mostrar o que aconteceu.",
    objetivos: [
        "Ir à clareira em uma noite de lua cheia",
        "Observar o espectro sem atacá-lo",
        "Descobrir como acalmá-lo (música, palavras gentis, oferecer algo)",
        "Testemunhar o flashback do momento da morte e do pedido dos heróis para esquecer"
    ],
    xp: "900 XP",
    ouro: "200 po",
    recompensaItens: "Visão Completa do Experimento (os heróis veem tudo), Lágrima do Espectro (item mágico que pode ser usado em rituais)",
    local: "Clareara da Cabana (noite de lua cheia)",
    npcs: "Espectro do Experimento 3",
    inimigos: "Espectro (só ataca se provocado, nível de desafio 5)",
    desafios: "Esperar a lua cheia, resistir ao medo, encontrar a forma correta de acalmar o espírito, processar a verdade emocional",
    status: "pendente"
},

{
    id: 3105,
    item: "🦉 O Conselho da Coruja",
    categoria: "Missão Secundária",
    descricao: "Uma coruja gigante vive na árvore mais alta da floresta. Dizem que ela vê tudo e pode mostrar visões do passado para quem a respeita. Os heróis precisam provar que são dignos de sua sabedoria.",
    objetivos: [
        "Encontrar a Árvore Ancestral (centro da floresta antiga)",
        "Ganhar a confiança da Coruja (oferecer comida, mostrar respeito)",
        "Pedir para ver o passado - a Coruja mostra imagens do dia do experimento",
        "Descobrir um detalhe novo: quem riscou os nomes nas cadeiras foram os PRÓPRIOS HERÓIS"
    ],
    xp: "500 XP",
    ouro: "50 po",
    recompensaItens: "Pena da Coruja (pode ser usada para pedir ajuda uma vez), Visão Clara do Passado",
    local: "Árvore Ancestral",
    npcs: "Coruja Sábia",
    inimigos: "Nenhum (a Coruja não ataca, mas pode ignorar quem não respeita a natureza)",
    desafios: "Encontrar a árvore, provar dignidade, interpretar as visões",
    status: "pendente"
},

{
    id: 3106,
    item: "💧 O Poço dos Desejos",
    categoria: "Missão Secundária",
    descricao: "Existe um poço antigo na floresta que dizem realizar desejos... mas só uma vez por pessoa. Na verdade, ele mostra visões do passado ou futuro para quem tem coração puro. Os heróis podem usá-lo para ver a verdade.",
    objetivos: [
        "Encontrar o Poço dos Desejos (protegido por neblina mágica)",
        "Jogar uma moeda e fazer um pedido sincero: 'quero ver a verdade'",
        "Testemunhar a visão do próprio momento da marcação",
        "Descobrir o nome original (antes de esquecer)"
    ],
    xp: "400 XP",
    ouro: "0 po (na verdade, perde uma moeda)",
    recompensaItens: "Visão Personalizada (cada herói vê algo diferente), Paz Interior (vantagem em testes de sabedoria por 1 dia)",
    local: "Clareira dos Ecos",
    npcs: "Fonte dos Desejos (entidade do poço)",
    inimigos: "Nenhum",
    desafios: "Encontrar o poço (a neblina confunde), ter coragem de enfrentar a verdade",
    status: "pendente"
},

{
    id: 3107,
    item: "📦 O Coletor de Relíquias",
    categoria: "Missão Secundária",
    descricao: "Grimm, o Coletor, é um trap aceiro que vive em uma carroça cheia de tralhas. Ele costuma revirar os arredores do laboratório de Gargamel e pode ter objetos importantes. Mas ele só vende (caro) ou troca por coisas interessantes.",
    objetivos: [
        "Encontrar a carroça de Grimm (ele vive perto de estradas)",
        "Negociar com ele (não aceita menos que o dobro do valor)",
        "Conseguir um dos objetos do laboratório: diário de Gargamel, frascos com restos de poções, pedaços de roupa com números"
    ],
    xp: "300 XP",
    ouro: "Varia (gasta de 50 a 200 po dependendo do item)",
    recompensaItens: "Itens de laboratório (cada um revela uma pista diferente)",
    local: "Errante (sempre perto de estradas da floresta)",
    npcs: "Grimm, o Coletor",
    inimigos: "Nenhum (Grimm é pacífico, só quer dinheiro)",
    desafios: "Encontrá-lo, negociar, decidir o que comprar",
    status: "pendente"
},

{
    id: 3108,
    item: "🐿️ O Esquilo que Sabia Demais",
    categoria: "Missão Secundária (Cômica)",
    descricao: "Gus, um esquilo falante e extremamente dramático, afirma ter VISTO TUDO no dia do experimento. O problema é que ele exagera, se contradiz e mistura verdades com absurdos. Mas... entre a confusão, há pistas reais.",
    objetivos: [
        "Encontrar Gus (ele está sempre em árvores perto do laboratório)",
        "Ouvir suas histórias (leva tempo, ele é muito falante)",
        "Separar fatos de ficção (teste de inteligência CD 12)",
        "Descobrir uma pista real: onde Gargamel escondeu uma chave importante"
    ],
    xp: "200 XP",
    ouro: "0 po (mas Gus aceita nozes como pagamento)",
    recompensaItens: "Nozes Mágicas (curam 1d4), Localização da Chave Escondida",
    local: "Árvores perto do laboratório de Gargamel",
    npcs: "Gus, o Esquilo Dramático",
    inimigos: "Nenhum (Gus é inofensivo, só irritante)",
    desafios: "Achar graça nas histórias, paciência para ouvir, inteligência para interpretar",
    status: "pendente"
},

{
    id: 3109,
    item: "🎣 O Velho do Rio",
    categoria: "Missão Secundária",
    descricao: "Velho Chico, um pescador que vive à beira do rio, conta causos estranhos sobre a floresta. Ele já viu os heróis sendo carregados por Gargamel e pode dar pistas sobre onde outros NPCs estão escondidos.",
    objetivos: [
        "Encontrar Velho Chico (margens do Rio Salsaparrilha)",
        "Ouvir suas histórias (ele adora conversar)",
        "Perguntar sobre o paradeiro de Mendel, Lilith ou a Caverna",
        "Ganhar uma dica valiosa de localização"
    ],
    xp: "150 XP",
    ouro: "0 po (mas oferecer peixe ajuda)",
    recompensaItens: "Mapa Mental (revela localização de um NPC aleatório), Peixe Fresco (pode ser trocado)",
    local: "Rio Salsaparrilha",
    npcs: "Velho Chico",
    inimigos: "Nenhum",
    desafios: "Encontrá-lo (ele se move ao longo do rio), paciência para ouvir histórias longas",
    status: "pendente"
},

{
    id: 3110,
    item: "⚔️ O Último Experimento - Zarg",
    categoria: "Missão Principal (Clímax)",
    descricao: "Gargamel menciona, em um momento de descuido, que houve um experimento ANTES dos outros. O Experimento Zero. Um Smurf chamado Zarg, que foi completamente corrompido e se tornou uma máquina de destruição. Ele escapou e agora vagueia pela floresta. Os heróis precisam encontrá-lo... ou ele os encontrará primeiro.",
    objetivos: [
        "Descobrir a existência de Zarg (com Mendel ou no diário de Gargamel)",
        "Seguir os rastros de destruição (árvores arrancadas, marcas de garras)",
        "Enfrentar Zarg em batalha (ND 15 - MUITO perigoso)",
        "Decidir o destino dele: matar, tentar curar ou deixar viver"
    ],
    xp: "2200 XP",
    ouro: "500 po",
    recompensaItens: "Fragmento da Marca Distorcida (item de quest raríssimo), Zarg pode ser curado? (missão extra), Respostas sobre o experimento original",
    local: "Floresta Profunda (Zarg se move, sempre em direção a barulhos)",
    npcs: "Zarg, o Smurf Corrompido",
    inimigos: "Zarg (nível 15, batalha difícil)",
    desafios: "Sobreviver ao encontro, escolher o destino de uma criatura que é o que eles poderiam ter se tornado",
    status: "pendente"
},

{
    id: 3111,
    item: "💔 O Pedido para Esquecer",
    categoria: "Missão Principal (Emocional)",
    descricao: "Após descobrir toda a verdade, os heróis enfrentam um dilema: recuperar as memórias perdidas ou manter o esquecimento que eles mesmos pediram. O espectro do Experimento 3 mostrou o momento do pedido. Agora, cabe a eles decidir.",
    objetivos: [
        "Reunir todas as pistas (diário de Mendel, visão da Coruja, flashbacks do espectro)",
        "Realizar um ritual no Poço dos Desejos para tentar recuperar as memórias",
        "Fazer uma escolha: lembrar ou continuar esquecido",
        "Aceitar as consequências da escolha"
    ],
    xp: "1000 XP",
    ouro: "0 po",
    recompensaItens: "Memórias Recuperadas (ou Paz Interior por manter o esquecimento), Habilidade Especial (depende da escolha)",
    local: "Poço dos Desejos",
    npcs: "Todos os NPCs podem aparecer na visão",
    inimigos: "Nenhum (o desafio é emocional)",
    desafios: "Enfrentar a verdade, aceitar o passado, escolher o futuro",
    status: "pendente"
},

{
    id: 3112,
    item: "🏡 A Aceitação",
    categoria: "Missão Principal (Final)",
    descricao: "Depois de toda a jornada, os heróis voltam à vila. Papai Smurf os espera. Ele sempre soube a verdade, mas nunca importou. Agora, cabe aos heróis decidir como viverão com ela.",
    objetivos: [
        "Voltar à vila dos Smurfs",
        "Conversar com Papai Smurf sobre tudo que descobriram",
        "Decidir o que fazer com a marca (manter, tentar remover, aceitar)",
        "Encontrar seu lugar na vila, sabendo quem realmente são"
    ],
    xp: "500 XP",
    ouro: "0 po",
    recompensaItens: "Aceitação (ponto de experiência de história), Respeito dos outros Smurfs, Paz Interior",
    local: "Vila dos Smurfs",
    npcs: "Papai Smurf, todos os Smurfs",
    inimigos: "Nenhum",
    desafios: "Aceitar a si mesmo, encontrar seu lugar, seguir em frente",
    status: "pendente"
},


// ===== MISSÕES EXTRAS (OPCIONAIS) =====

{
    id: 3201,
    item: "🧪 Ingredientes Raros para Mendel",
    categoria: "Missão Secundária",
    descricao: "Mendel pede ajuda para coletar ingredientes raros para uma poção especial que pode ajudar a estabilizar Lilith. Ele precisa de: flor que desabrocha só de noite, musgo da caverna dos esquecidos, e água do poço dos desejos.",
    xp: "300 XP",
    ouro: "100 po",
    recompensaItens: "Poção de Estabilidade (para Lilith ou para uso próprio)",
    local: "Vários locais da floresta",
    status: "pendente"
},

{
    id: 3202,
    item: "🌿 Curando Lilith",
    categoria: "Missão Secundária",
    descricao: "Com os ingredientes de Mendel, é possível tentar curar a instabilidade de Lilith. O processo é arriscado e pode dar errado. Mas se funcionar, ela pode se tornar uma aliada poderosa.",
    xp: "400 XP",
    ouro: "0 po",
    recompensaItens: "Lilith curada (vira aliada), Gratidão eterna",
    local: "Esconderijo de Lilith",
    status: "pendente"
},

{
    id: 3203,
    item: "📖 O Diário Completo de Gargamel",
    categoria: "Missão Secundária",
    descricao: "Grimm menciona que viu um livro grosso na cabana de Gargamel, mas não conseguiu pegar. Se os heróis invadirem a cabana novamente (ou quando enfrentarem Gargamel), podem tentar pegar o diário completo, que contém TODOS os detalhes dos experimentos.",
    xp: "600 XP",
    ouro: "200 po",
    recompensaItens: "Diário Completo (revela tudo, pode ser usado contra Gargamel)",
    local: "Cabana de Gargamel",
    status: "pendente"
}
    ],
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