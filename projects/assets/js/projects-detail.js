function getProjectIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderProjectDetail() {
    const host = document.getElementById('projectDetail');
    if (!host) return;

    const projectId = getProjectIdFromUrl();
    const projects = window.PROJECTS_CATALOG || [];
    const project = projects.find((item) => item.id === projectId);

    if (!project) {
        host.innerHTML = `
            <article class="project-detail-card">
                <h2>Projeto não encontrado</h2>
                <p>O projeto solicitado não existe ou foi removido.</p>
                <a href="index.html" class="catalog-btn catalog-btn-outline">Voltar ao catálogo</a>
            </article>
        `;
        return;
    }

    const techs = project.techs.map((tech) => `<li>${tech}</li>`).join('');
    const details = project.details.map((detail) => `<li>${detail}</li>`).join('');

    host.innerHTML = `
        <article class="project-detail-card">
            <div class="project-detail-media">
                <img src="${project.image}" alt="Imagem do projeto ${project.title}">
            </div>
            <div class="project-detail-content">
                <p class="project-detail-category">${project.category}</p>
                <h2>${project.title}</h2>
                <p class="project-detail-lead">${project.shortDescription}</p>
                <p>${project.longDescription}</p>
                <ul class="project-detail-list">${details}</ul>
                <h3>Tecnologias</h3>
                <ul class="catalog-techs">${techs}</ul>
                <div class="catalog-actions">
                    <a href="index.html" class="catalog-btn catalog-btn-outline">Voltar ao catálogo</a>
                    <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="catalog-btn catalog-btn-outline">Ver no GitHub</a>
                    ${project.liveUrl
                        ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="catalog-btn catalog-btn-primary">Abrir projeto</a>`
                        : `<span class="catalog-btn catalog-btn-disabled" aria-disabled="true">Projeto não publicado</span>`}
                </div>
            </div>
        </article>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    setupSharedHeader();
    renderProjectDetail();
});
