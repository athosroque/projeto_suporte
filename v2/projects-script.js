import content from './content.js';

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupTOC();
    setupActiveLinks();
});

function renderProjects() {
    const container = document.getElementById('projects-container');
    const tocList = document.getElementById('project-toc');
    if (!container) return;

    container.innerHTML = content.projects.map(project => `
        <article id="${project.id}" class="section case-study">
            <h2 class="case-title">${project.title}</h2>
            <span class="case-category">${project.category}</span>
            
            <div class="case-grid">
                <div class="case-section">
                    <h4>O Problema</h4>
                    <p class="case-text">${project.problem}</p>
                </div>
                <div class="case-section">
                    <h4>O Resultado</h4>
                    <p class="case-text">${project.solution}</p>
                </div>
            </div>

            <div class="case-visual">
                <div class="placeholder-icon">📊</div>
                <p>[Gráfico de Impacto: ${project.impact}]</p>
                <small>(Visualização Simulada estilo Streamlit)</small>
            </div>

            <div class="case-footer">
                <div class="case-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <a href="${project.link}" class="case-link">Acessar Demonstração Funcional →</a>
            </div>
        </article>
    `).join('');

    tocList.innerHTML = content.projects.map(project => `
        <li><a href="#${project.id}">${project.title}</a></li>
    `).join('');
}

function setupTOC() {
    const sections = document.querySelectorAll('.section');
    const tocLinks = document.querySelectorAll('.toc a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function setupActiveLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
