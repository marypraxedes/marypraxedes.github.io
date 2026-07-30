/* =========================================
   1. ANIMAÇÃO DO TERMINAL (Letra por Letra)
========================================= */
const terminalText = document.getElementById("terminal-text");
if (terminalText) {
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
}

/* =========================================
   SPIDER CHART (TECH ARSENAL RADAR)
========================================= */
const ctx = document.getElementById('spiderChart');
if (ctx) {
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Java / Spring', 
                'Python', 
                'JavaScript', 
                'Banco de Dados', 
                'DevOps & CI/CD', 
                'DevSecOps & Git'
            ],
            datasets: [{
                label: 'Nível de Domínio',
                data: [90, 75, 75, 80, 85, 85], // Você pode ajustar esses valores de 0 a 100 conforme sua confiança!
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: '#2563EB',
                pointBackgroundColor: '#ef4444',
                pointBorderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    grid: {
                        color: 'rgba(37, 99, 235, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(37, 99, 235, 0.2)'
                    },
                    pointLabels: {
                        color: '#94a3b8',
                        font: {
                            size: 11,
                            family: 'inherit'
                        }
                    },
                    ticks: {
                        display: false,
                        max: 100
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/* =========================================
   3. SENTIDO ARANHA (PDI FORM + XSS DEFENSE + PROGRESS BAR)
========================================= */
const goalForm = document.getElementById('goal-form');
if (goalForm) {
    const goalInput = document.getElementById('goal-input');
    const goalList = document.getElementById('goal-list');
    const spiderSenseAlert = document.getElementById('spider-sense-alert');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressPercentage = document.getElementById('progress-percentage');

    let goals = JSON.parse(localStorage.getItem('maryane_pdi_goals')) || [
        { text: "Iniciar transição de carreira", completed: true },
        { text: "Entrar na Engenharia de Software", completed: true }
    ];

    function updateProgressBar() {
        if (goals.length === 0) {
            progressBarFill.style.width = '0%';
            progressPercentage.textContent = '0%';
            return;
        }

        const completedCount = goals.filter(goal => goal.completed).length;
        const percentage = Math.round((completedCount / goals.length) * 100);

        progressBarFill.style.width = percentage + '%';
        progressPercentage.textContent = percentage + '%';
    }

    function renderGoals() {
        goalList.innerHTML = "";
        goals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.style.cssText = "margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; background: rgba(15, 23, 42, 0.6); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(37, 99, 235, 0.2); cursor: pointer; transition: 0.3s;";
            
            const checkSymbol = goal.completed ? "[✓]" : "[ ]";
            const textColor = goal.completed ? "#10B981" : "#e2e8f0";
            const textDecoration = goal.completed ? "line-through" : "none";

            li.innerHTML = `
                <span style="color: ${textColor}; text-decoration: ${textDecoration}; font-size: 14px;">
                    ${checkSymbol} ${goal.text}
                </span>
                <button type="button" onclick="window.removeGoal(${index})" style="background: transparent; border: none; color: #DC2626; cursor: pointer; font-weight: bold; font-family: inherit; font-size: 14px;" title="Remover meta">[X]</button>
            `;

            li.addEventListener('click', (e) => {
                if(e.target.tagName !== 'BUTTON') {
                    goals[index].completed = !goals[index].completed;
                    saveAndRender();
                }
            });

            goalList.appendChild(li);
        });

        updateProgressBar();
    }

    window.removeGoal = function(index) {
        goals.splice(index, 1);
        saveAndRender();
    }

    function saveAndRender() {
        localStorage.setItem('maryane_pdi_goals', JSON.stringify(goals));
        renderGoals();
    }

    goalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let novaMeta = goalInput.value.trim();
        const xssPattern = /<[^>]*script/i;

        if (xssPattern.test(novaMeta)) {
            spiderSenseAlert.style.display = 'block';
            goalInput.value = "";
            setTimeout(() => {
                spiderSenseAlert.style.display = 'none';
            }, 4000);
            return;
        }

        if(novaMeta !== "") {
            goals.push({ text: novaMeta, completed: false });
            goalInput.value = "";
            saveAndRender();
        }
    });

    renderGoals();
}

/* =========================================
   4. INTEGRAÇÃO COM A API DO GITHUB
========================================= */
const githubUser = "marypraxedes"; 
const repoToHide = "coloque-o-nome-do-repo-aqui"; // Se quiser esconder algum repositório específico

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
    if (!reposContainer) return;
    
    try {
        const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`);
        if (!response.ok) throw new Error('Não foi possível conectar ao GitHub.');

        const repos = await response.json();
        reposContainer.innerHTML = "";

        const filteredRepos = repos.filter(repo => repo.name !== repoToHide);

        if (filteredRepos.length === 0) {
            reposContainer.innerHTML = "<p>> Nenhum projeto público encontrado.</p>";
            return;
        }

        const reposToShow = filteredRepos.slice(0, 3); 

        reposToShow.forEach((repo, index) => {
            const treeBranch = (index === reposToShow.length - 1) ? "└──" : "├──";
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

/* =========================================
   5. CONTROLADOR DE ABAS (HUD VIEWS)
========================================= */
const navLinks = document.querySelectorAll('.navbar a');
const views = document.querySelectorAll('.pdi-view');
const mainNav = document.getElementById('main-nav');
const hudSidebar = document.getElementById('hud-sidebar');
const enterBtn = document.getElementById('enter-journey-btn');

function switchView(targetId) {
    views.forEach(view => view.classList.remove('active'));
    navLinks.forEach(nav => nav.classList.remove('active'));

    const targetView = document.getElementById(targetId);
    if (targetView) {
        targetView.classList.add('active');
    }

    // Se estiver na intro, esconde a navbar e o painel lateral. Se não, mostra ambos!
    if (targetId !== 'intro') {
        if (mainNav) mainNav.style.display = 'flex';
        if (hudSidebar) hudSidebar.style.display = 'block';
        
        const activeLink = document.querySelector(`.navbar a[href="#${targetId}"]`);
        if (activeLink) activeLink.classList.add('active');
    } else {
        if (mainNav) mainNav.style.display = 'none';
        if (hudSidebar) hudSidebar.style.display = 'none';
        runBootSequence(); 
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Eventos de clique na Navbar
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        switchView(targetId);
    });
});

// Evento do botão "Enter Journey"
if (enterBtn) {
    enterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        switchView('home');
    });
}

/* =========================================
   0. ANIMAÇÃO DE BOOT DO SISTEMA (INTRO)
========================================= */
function runBootSequence() {
    const bootLogsContainer = document.getElementById('boot-logs');
    const bootAction = document.getElementById('boot-action');
    if (!bootLogsContainer) return;

    // Reseta o estado visual se o usuário voltar para o intro
    bootLogsContainer.innerHTML = "";
    if (bootAction) {
        bootAction.style.opacity = '0';
        bootAction.style.pointerEvents = 'none';
    }

    const bootSteps = [
        "> Loading kernel: maryane_suit_v2.0...",
        "[ OK ] Initializing Java & Spring Boot environment...",
        "[ OK ] Mounting database schema (MySQL)...",
        "[ SECURE ] Activating Spider-Sense (XSS / DevSecOps defense)...",
        "[ OK ] Establishing secure uplink to GitHub API...",
        "> SYSTEM READY. ACCESS GRANTED. 🕷️"
    ];

    let stepIndex = 0;

    function showNextLog() {
        if (stepIndex < bootSteps.length) {
            const p = document.createElement('p');
            p.style.marginBottom = '6px';
            p.style.color = (stepIndex === bootSteps.length - 1) ? '#10B981' : '#94a3b8';
            p.textContent = bootSteps[stepIndex];
            bootLogsContainer.appendChild(p);
            stepIndex++;
            setTimeout(showNextLog, 350); // Velocidade que as linhas aparecem
        } else {
            // Quando termina o boot, faz o título e o botão surgirem suavemente
            if (bootAction) {
                bootAction.style.opacity = '1';
                bootAction.style.pointerEvents = 'auto';
            }
        }
    }

    showNextLog();
}

// Dispara o boot assim que a página carregar pela primeira vez
window.addEventListener('DOMContentLoaded', () => {
    runBootSequence();
});

/* =========================================
   SPIDER-SENSE PRANK CONTROLLER
========================================= */
const prankInput = document.getElementById('pdi-input-prank');
const prankBtn = document.getElementById('pdi-btn-prank');
const prankAlert = document.getElementById('spider-sense-alert');
const prankContainer = document.getElementById('prank-container');

if (prankBtn && prankInput) {
    const triggerSpiderSense = () => {
        const userInput = prankInput.value.trim();
        
        prankAlert.style.display = 'block';
        prankContainer.classList.add('spider-sense-active');
        
        if (userInput === "") {
            prankAlert.innerHTML = "🕷️ [SENTIDO ARANHA DISPARADO!] ⚠️ Campo vazio! Você nem tentou digitar nada, operador.";
        } else {
            prankAlert.innerHTML = `🕷️ [SENTIDO ARANHA DISPARADO!] ⚠️ Alerta de intruso! Tentativa de registrar <em>"${userInput}"</em> bloqueada. O PDI pertence exclusivamente à Maryane Praxedes!`;
        }

        // Remove a classe de tremor após a animação acabar para poder repetir se quiser
        setTimeout(() => {
            prankContainer.classList.remove('spider-sense-active');
        }, 400);
        
        prankInput.value = "";
    };

    prankBtn.addEventListener('click', triggerSpiderSense);
    prankInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            triggerSpiderSense();
        }
    });
}