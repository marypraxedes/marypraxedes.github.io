/* =========================================
   1. ANIMAÇÃO DO TERMINAL (Letra por Letra)
========================================= */
const terminalText = document.getElementById("terminal-text");

const messages = [
    "> initializing maryane_suit_os...",
    "[✓] Connecting to WEB (Java/Spring Boot)",
    "[✓] Database linked (MySQL)",
    "[✓] Spider-Sense Enabled (DevSecOps Active)",
    "[✓] Loading PDI Protocols...",
    "",
    "System ready. Go get 'em, Tiger! 🕸️🚀"
];

let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (lineIndex < messages.length) {
        let currentLineText = messages[lineIndex];
        
        if (charIndex < currentLineText.length) {
            terminalText.innerHTML += currentLineText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 30); 
        } else {
            terminalText.innerHTML += "<br>";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 500); 
        }
    }
}
typeWriter();

/* =========================================
   2. GRÁFICO DE TEIA (RADAR CHART)
========================================= */
const ctx = document.getElementById('spiderChart').getContext('2d');
const spiderChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Java', 'Spring Boot', 'MySQL', 'DevSecOps', 'Git/Linux', 'Visão de Produto'],
        datasets: [{
            label: 'Nível de Domínio',
            data: [75, 60, 70, 80, 85, 90], // Você pode ajustar esses números!
            backgroundColor: 'rgba(220, 38, 38, 0.4)', // Vermelho Aranha com transparência
            borderColor: '#DC2626',
            pointBackgroundColor: '#2563EB',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#2563EB'
        }]
    },
    options: {
        scales: {
            r: {
                angleLines: { color: 'rgba(96, 165, 250, 0.3)' }, // Linhas da teia
                grid: { color: 'rgba(96, 165, 250, 0.3)' },
                pointLabels: {
                    color: '#e2e8f0',
                    font: { family: "'JetBrains Mono', monospace", size: 12 }
                },
                ticks: { display: false, min: 0, max: 100 }
            }
        },
        plugins: {
            legend: { display: false } // Esconde a legenda para ficar mais "hacker"
        }
    }
});

/* =========================================
   3. SENTIDO ARANHA (PDI FORM + XSS DEFENSE)
========================================= */
const goalForm = document.getElementById('goal-form');
const goalInput = document.getElementById('goal-input');
const goalList = document.getElementById('goal-list');
const spiderSenseAlert = document.getElementById('spider-sense-alert');

goalForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar
    
    let novaMeta = goalInput.value.trim();

    // Lógica DEVSECOPS: Validação Básica contra Injeção de Script (XSS)
    const xssPattern = /<[^>]*script/i; // Detecta a palavra <script> ou similares

    if (xssPattern.test(novaMeta)) {
        // Dispara o alerta do Sentido Aranha
        spiderSenseAlert.style.display = 'block';
        goalInput.value = ""; // Limpa o input
        
        // Esconde o alerta depois de 4 segundos
        setTimeout(() => {
            spiderSenseAlert.style.display = 'none';
        }, 4000);
        
        return; // Interrompe a função, não adiciona a meta
    }

    // Se o código for limpo e não estiver vazio, adiciona a meta na lista
    if(novaMeta !== "") {
        // Criando elemento seguro (evita que tags HTML vazem)
        const li = document.createElement('li');
        li.style.marginBottom = '10px';
        li.style.color = '#e2e8f0';
        li.textContent = "[ ] " + novaMeta; // .textContent é seguro contra XSS natural

        goalList.appendChild(li);
        goalInput.value = ""; // Limpa o input
    }
});

/* =========================================
   4. INTEGRAÇÃO COM A API DO GITHUB (COM NOMES PERSONALIZADOS)
========================================= */

// 1. Coloque o seu usuário do GitHub aqui
const githubUser = "marypraxedes"; 

// 🔥 Coloque aqui o nome EXATO do repositório do seu site PDI (como está lá no GitHub) para ele não aparecer na lista
const repoToHide = "marypraxedes.github.io"; 

// 2. Mapeamento de nomes e descrições personalizadas
const customRepoData = {
    "projeto_final_bloco_02": {
        name: "Farmácia API",
        description: "Sistema de gerenciamento de farmácia"
    },
    "lojadegames_spring": {
        name: "Loja de Games",
        description: "Sistema de e-commerce para venda de jogos"
    },
    "blogpessoal_spring": {
        name: "Blog Pessoal",
        description: "Blog pessoal com autenticação e CRUD de postagens"
    }
};

async function getGitHubRepos() {
    const reposContainer = document.getElementById('github-repos');
    
    try {
        const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`);
        
        if (!response.ok) {
            throw new Error('Não foi possível conectar ao GitHub.');
        }

        const repos = await response.json();
        reposContainer.innerHTML = "";

        // 🔥 O TRUQUE ARANHA: Filtra a lista removendo o repositório do próprio PDI
        const filteredRepos = repos.filter(repo => repo.name !== repoToHide);

        // Se o usuário não tiver repositórios (ou se o único for o que foi escondido)
        if (filteredRepos.length === 0) {
            reposContainer.innerHTML = "<p>> Nenhum projeto público encontrado.</p>";
            return;
        }

        // Pega os 3 primeiros projetos da lista JÁ FILTRADA
        const reposToShow = filteredRepos.slice(0, 3); 

        reposToShow.forEach((repo, index) => {
            const treeBranch = (index === reposToShow.length - 1) ? "└──" : "├──";
            
            // Mágica do nome e descrição
            const displayName = customRepoData[repo.name] ? customRepoData[repo.name].name : repo.name;
            const displayDesc = customRepoData[repo.name] ? customRepoData[repo.name].description : (repo.description || "Projeto em desenvolvimento...");

            const repoHTML = `
                <div class="repo-item" style="margin-bottom: 15px;">
                    <p style="color: #60a5fa; margin-bottom: 5px;">
                        ${treeBranch} <a href="${repo.html_url}" target="_blank" style="color: #e2e8f0; text-decoration: none; font-weight: bold; border-bottom: 1px dashed #DC2626; transition: 0.3s;" onmouseover="this.style.color='#DC2626'" onmouseout="this.style.color='#e2e8f0'">${displayName}</a>
                    </p>
                    <p style="color: #94a3b8; padding-left: 30px; font-size: 14px;">
                        │   ${displayDesc}
                    </p>
                    <p style="color: #2563EB; padding-left: 30px; font-size: 12px; margin-top: 5px;">
                        │   [Linguagem: ${repo.language || 'N/A'}]
                    </p>
                </div>
            `;
            
            reposContainer.innerHTML += repoHTML;
        });

    } catch (error) {
        console.error("Erro no Sentido Aranha de Repositórios:", error);
        reposContainer.innerHTML = `<p style="color: #DC2626;">> Erro ao carregar projetos do GitHub. Servidores fora do ar? 🕷️</p>`;
    }
}

getGitHubRepos();