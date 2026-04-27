function sanitize(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const projects = [
    {
        category: "Frontend / Landing Pages",
        title: "Landing Page - Gerlen Mascarenhas",
        description: "Landing page profissional para captação de clientes, com foco em conversão e SEO.",
        liveUrl: "https://www.gerlenmascarenhas.com.br",
        detailsUrl: "projects/projetos.html?id=landing-gerlen",
        techs: ["HTML", "CSS", "JavaScript", "SEO"],
        image: "public/images/placeholder-gerlenmascarenhas.png",
        status: "live"
    },
    {
        category: "Backend / .NET APIs",
        title: "ERPSchoolAPI",
        description: "API REST em desenvolvimento para gestão escolar com ASP.NET Core e Entity Framework Core.",
        liveUrl: null,
        detailsUrl: "projects/projetos.html?id=erp-school-api",
        techs: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
        image: "public/images/placeholder-api-gestao.png",
        status: "in-progress"
    }
];

const projectCategories = ["Todos", "Backend / .NET APIs", "Frontend / Landing Pages"];
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
        .map((tech) => `<li class="project-tech-chip">${sanitize(tech)}</li>`)
        .join('');

    return `
        <div class="project-card">
            ${project.status === "in-progress" ? `
                <span class="project-status-badge" aria-label="Projeto em desenvolvimento">Em desenvolvimento</span>
            ` : ''}
            <img src="${project.image}" alt="Miniatura do projeto ${sanitize(project.title)}" class="project-thumbnail">
            <span class="project-category">${sanitize(project.category)}</span>
            <h3>${sanitize(project.title)}</h3>
            <p>${sanitize(project.description)}</p>
            <ul class="project-tech-list" aria-label="Tecnologias do projeto ${sanitize(project.title)}">${techList}</ul>
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

    container.innerHTML = filteredProjects.slice(0, 3).map(createProjectCard).join('');
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

function setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const status = form.querySelector('.contact-form-status');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.querySelector('#contact-name')?.value.trim() || '';
        const email = form.querySelector('#contact-email')?.value.trim() || '';
        const subject = form.querySelector('#contact-subject')?.value.trim() || '';
        const message = form.querySelector('#contact-message')?.value.trim() || '';

        if (!name || !email || !subject || !message) {
            if (status) {
                status.textContent = 'Preencha todos os campos antes de enviar.';
                status.classList.remove('is-success');
                status.classList.add('is-error');
            }
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (status) {
                status.textContent = 'Informe um e-mail válido antes de enviar.';
                status.classList.remove('is-success');
                status.classList.add('is-error');
            }
            return;
        }

        const whatsappMessage = [
            'Ola, Iokim! Quero entrar em contato pelo site.',
            '',
            `Nome: ${name}`,
            `E-mail: ${email}`,
            `Assunto: ${subject}`,
            `Mensagem: ${message}`
        ].join('\n');

        const whatsappUrl = `https://wa.me/5592981940300?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        if (status) {
            status.textContent = 'Mensagem preparada! Você será redirecionado para o WhatsApp.';
            status.classList.remove('is-error');
            status.classList.add('is-success');
        }

        form.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjectFilters();
    renderProjects();
    setupProjectFilters();
    setupContactForm();
    setupMobileMenu();
    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
});