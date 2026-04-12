const projects = [
    {
        title: "Landing Page - Gerlen Mascarenhas",
        description: "Landing page profissional para captação de clientes.",
        url: "https://www.gerlenmascarenhas.com.br",
        image: "public/images/placeholder-gerlenmascarenhas.png"
    },
    {
        title: "API de Gestão",
        description: "API REST em C# .NET para operações de cadastro, autenticação e relatórios.",
        url: null,
        image: "public/images/placeholder-api-gestao.png"
    },
    {
        title: "Dashboard Analytics",
        description: "Painel web para visualização de métricas e monitoramento de indicadores.",
        url: null,
        image: "public/images/placeholder-dashboard-analytics.png"
    }
];

function createProjectCard(project) {
    return `
        <div class="project-card">
            <img src="${project.image}" alt="Miniatura do projeto ${project.title}" class="project-thumbnail">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${
                project.url 
                ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer">Ver Projeto</a>` 
                : `<span class="coming-soon">Em breve</span>`
            }
        </div>
    `;
}

function renderProjects() {
    const container = document.querySelector('.projects-container');
    container.innerHTML = projects.map(createProjectCard).join('');
}

function updateHeaderOnScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
});