const projects = [
    {
        category: "Frontend / Landing Pages",
        title: "Landing Page - Gerlen Mascarenhas",
        description: "Landing page profissional para captação de clientes.",
        liveUrl: "https://www.gerlenmascarenhas.com.br",
        detailsUrl: "projects/index.html",
        techs: ["HTML", "CSS", "JavaScript", "SEO"],
        image: "public/images/placeholder-gerlenmascarenhas.png"
    },
    {
        category: "Backend / .NET APIs",
        title: "API de Gestão",
        description: "API REST em C# .NET para operações de cadastro, autenticação e relatórios.",
        liveUrl: null,
        detailsUrl: "projects/index.html",
        techs: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server"],
        image: "public/images/placeholder-api-gestao.png"
    },
    {
        category: "Fullsctack Projects",
        title: "Dashboard Analytics",
        description: "Painel web para visualização de métricas e monitoramento de indicadores.",
        liveUrl: null,
        detailsUrl: "projects/index.html",
        techs: [".NET", "REST APIs", "Charting", "SQL"],
        image: "public/images/placeholder-dashboard-analytics.png"
    },
    {
        category: "Backend / .NET APIs",
        title: "Arquitetura Cloud para APIs",
        description: "Estudo aplicado de deploy e observabilidade para APIs .NET em ambiente cloud.",
        liveUrl: null,
        detailsUrl: "projects/index.html",
        techs: ["Azure", "Docker", ".NET", "CI/CD"],
        image: "public/images/placeholder-dashboard-analytics.png"
    }
];

const projectCategories = ["Todos", "Backend / .NET APIs", "Fullsctack Projects", "Frontend / Landing Pages"];
let activeProjectCategory = "Todos";

function createProjectFilterButton(category) {
    const isActive = category === activeProjectCategory;
    return `
        <button class="project-filter-btn${isActive ? ' is-active' : ''}" type="button" data-category="${category}" aria-pressed="${isActive}">
            ${category}
        </button>
    `;
}

function createProjectCard(project) {
    const techList = project.techs
        .map((tech) => `<li class="project-tech-chip">${tech}</li>`)
        .join('');

    return `
        <div class="project-card">
            <img src="${project.image}" alt="Miniatura do projeto ${project.title}" class="project-thumbnail">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <ul class="project-tech-list" aria-label="Tecnologias do projeto ${project.title}">${techList}</ul>
            <div class="project-actions">
                <a href="${project.detailsUrl}" class="project-btn project-btn-outline">Ver mais</a>
                ${
                    project.liveUrl
                    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-primary">Abrir site</a>`
                    : `<span class="project-btn project-btn-disabled" aria-disabled="true">Em breve</span>`
                }
            </div>
        </div>
    `;
}

function renderProjectFilters() {
    const filtersContainer = document.querySelector('.projects-filters');
    if (!filtersContainer) return;

    filtersContainer.innerHTML = projectCategories
        .map(createProjectFilterButton)
        .join('');
}

function renderProjects() {
    const container = document.querySelector('.projects-container');
    if (!container) return;

    const filteredProjects = activeProjectCategory === "Todos"
        ? projects
        : projects.filter((project) => project.category === activeProjectCategory);

    container.innerHTML = filteredProjects.map(createProjectCard).join('');
}

function setupProjectFilters() {
    const filtersContainer = document.querySelector('.projects-filters');
    if (!filtersContainer) return;

    filtersContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.project-filter-btn');
        if (!button) return;

        const { category } = button.dataset;
        if (!category || category === activeProjectCategory) return;

        activeProjectCategory = category;
        renderProjectFilters();
        renderProjects();
    });
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

function setupMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!nav || !toggle) return;

    const closeMenu = () => {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjectFilters();
    renderProjects();
    setupProjectFilters();
    setupMobileMenu();
    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
});