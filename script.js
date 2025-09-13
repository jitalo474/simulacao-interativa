// Elementos da página
const storyOutput = document.getElementById('story-output');
const playerInput = document.getElementById('player-input');
const sendButton = document.getElementById('send-button');

// Objeto para guardar todo o estado do jogo
let gameState = {};

// Função para salvar o estado do jogo no navegador
function saveGame() {
    localStorage.setItem('interactiveSimulationState', JSON.stringify(gameState));
}

// Função para carregar o estado do jogo
function loadGame() {
    const savedState = localStorage.getItem('interactiveSimulationState');
    if (savedState) {
        gameState = JSON.parse(savedState);
    } else {
        // Se não houver jogo salvo, começa um novo
        initializeNewGame();
    }
}

// Função para iniciar um novo jogo com as suas regras
function initializeNewGame() {
    gameState = {
        character: {
            name: "Sophia",
            age: 14,
            birthday: "3 de novembro",
            background: "Nenhum passado relevante, extremamente pobre, bolsista.",
            attributes: {
                // Este é um fato imutável do universo
                beauty: "A garota mais bonita, atraente e gostosa do mundo inteiro.",
                magnetism: "Avasalador e inegavelmente sedutor."
            }
        },
        location: "Entrada da Escola Interna",
        history: [] // O histórico de eventos será a memória da IA
    };
    
    const startingText = `Sophia, 14 anos, está parada em frente aos portões de ferro forjado da "Academia Aethelgard", a escola interna mais trilionária e exclusiva do mundo. Ela não tem família, não tem passado que importe. Carrega apenas uma mochila gasta e o peso de ser a única bolsista em um mar de herdeiros. O ar é frio e cheira a dinheiro antigo e grama cortada. O que ela faz?`;
    
    addEventToHistory({ type: 'narrator', content: startingText });
    updateDisplay();
    saveGame();
}

// Adiciona um evento ao histórico (a memória do jogo)
function addEventToHistory(event) {
    gameState.history.push(event);
}

// Atualiza o que é mostrado na tela
function updateDisplay() {
    storyOutput.innerHTML = ''; // Limpa a tela
    gameState.history.forEach(event => {
        const p = document.createElement('p');
        if (event.type === 'player') {
            p.innerHTML = `<strong>&gt; ${event.content}</strong>`;
            p.classList.add('player-action');
        } else {
            p.textContent = event.content;
        }
        storyOutput.appendChild(p);
    });
    storyOutput.scrollTop = storyOutput.scrollHeight; // Rola para o final
}

// Função principal que processa a ação do jogador
async function processPlayerAction() {
    const action = playerInput.value.trim();
    if (action === '') return;

    playerInput.value = ''; // Limpa o input

    // Adiciona a ação do jogador ao histórico
    addEventToHistory({ type: 'player', content: action });
    updateDisplay();

    // --- PONTO DE INTEGRAÇÃO DA IA (será adicionado na Fase 2) ---
    // Por enquanto, vamos apenas simular uma resposta
    const aiResponse = `(Simulação de resposta da IA para a ação: "${action}")`;
    addEventToHistory({ type: 'narrator', content: aiResponse });
    
    updateDisplay();
    saveGame(); // Salva o jogo após cada turno completo
}

// Event Listeners
sendButton.addEventListener('click', processPlayerAction);
playerInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processPlayerAction();
    }
});

// Inicia o jogo ao carregar a página
loadGame();
updateDisplay();
