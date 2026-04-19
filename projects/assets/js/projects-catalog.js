function createCatalogCard(project) {
    const techs = project.techs.map((tech) => `<li>${tech}</li>`).join('');
    const detailsUrl = `projetos.html?id=${encodeURIComponent(project.id)}`;

    return `
        <article class="catalog-card">
            <a href="${detailsUrl}" class="catalog-card-link" aria-label="Abrir detalhes de ${project.title}">
                <img src="${project.image}" alt="Imagem do projeto ${project.title}" class="catalog-thumb">
            </a>
            <div class="catalog-card-body">
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
                <ul class="catalog-techs">${techs}</ul>
                <div class="catalog-actions">
                    <a href="${detailsUrl}" class="catalog-btn catalog-btn-outline">Ver detalhes</a>
                    ${project.liveUrl
                        ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="catalog-btn catalog-btn-primary">Abrir site</a>`
                        : `<span class="catalog-btn catalog-btn-disabled" aria-disabled="true">Em breve</span>`}
                </div>
            </div>
        </article>
    `;
}

function renderCategorySections(activeCategory) {
    const host = document.getElementById('catalogSections');
    if (!host) return;

    const categories = window.PROJECT_CATEGORIES || [];
    const projects = window.PROJECTS_CATALOG || [];

    const sections = categories
        .filter((category) => activeCategory === 'Todos' || category === activeCategory)
        .map((category) => {
            const categoryProjects = projects.filter((project) => project.category === category);
            if (categoryProjects.length === 0) return '';

            return `
                <section class="catalog-category" data-category="${category}">
                    <div class="catalog-category-head">
                        <h3>${category}</h3>
                        <span>${categoryProjects.length} projeto(s)</span>
                    </div>
                    <div class="catalog-row">
                        ${categoryProjects.map(createCatalogCard).join('')}
                    </div>
                </section>
            `;
        })
        .join('');

    host.innerHTML = sections;
}

function createFilter(category, active) {
    const isActive = category === active;
    return `<button type="button" class="catalog-filter${isActive ? ' is-active' : ''}" data-category="${category}" aria-pressed="${isActive}">${category}</button>`;
}

function setupCatalog() {
    const filtersContainer = document.querySelector('.catalog-filters');
    if (!filtersContainer) return;

    let active = 'Todos';
    const categories = ['Todos', ...(window.PROJECT_CATEGORIES || [])];

    const renderAll = () => {
        filtersContainer.innerHTML = categories.map((category) => createFilter(category, active)).join('');
        renderCategorySections(active);
    };

    filtersContainer.addEventListener('click', (event) => {
        const btn = event.target.closest('.catalog-filter');
        if (!btn) return;
        const { category } = btn.dataset;
        if (!category || category === active) return;
        active = category;
        renderAll();
    });

    renderAll();
}

document.addEventListener('DOMContentLoaded', () => {
    setupSharedHeader();
    setupCatalog();
});
