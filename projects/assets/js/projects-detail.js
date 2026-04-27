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
    const architecture = (project.architecture || []).map((item) => `<li>${item}</li>`).join('');
    const decisions = (project.decisions || []).map((item) => `<li>${item}</li>`).join('');
    const tradeOffs = (project.tradeOffs || []).map((item) => `<li>${item}</li>`).join('');

    const renderSection = (title, content, modifier = '') => `
        <section class="project-detail-block ${modifier}">
            <h3>${title}</h3>
            ${content}
        </section>
    `;

    host.innerHTML = `
        <article class="project-detail-card">
            <div class="project-detail-media">
                <img src="${project.image}" alt="Screenshot do projeto ${project.title} — ${project.shortDescription}">
            </div>
            <div class="project-detail-content">
                <p class="project-detail-eyebrow">Detalhamento técnico</p>
                <p class="project-detail-category">${project.category}</p>
                <h2>${project.title}</h2>
                <p class="project-detail-lead">${project.shortDescription}</p>

                ${renderSection('Descrição do projeto', `<p>${project.longDescription}</p>`, 'is-description')}
                ${renderSection('Problema', `<p>${project.problem}</p>`)}
                ${renderSection('Solução', `<p>${project.solution}</p>`)}
                ${renderSection('Arquitetura', `<ul class="project-detail-list">${architecture}</ul>`)}
                ${renderSection('Stack', `<ul class="catalog-techs">${techs}</ul>`, 'is-stack')}
                ${renderSection('Decisões', `<ul class="project-detail-list">${decisions}</ul>`)}
                ${renderSection('Trade-offs', `<ul class="project-detail-list">${tradeOffs}</ul>`)}

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
