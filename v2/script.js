import content from './content.js';

document.addEventListener('DOMContentLoaded', () => {
    renderExperience();
    setupTOC();
    setupActiveLinks();
});

function renderExperience() {
    const list = document.getElementById('experience-list');
    if (!list) return;

    list.innerHTML = content.experience.map(exp => `
        <div class="exp-item">
            <div class="exp-header">
                <div>
                    <div class="exp-role">${exp.role}</div>
                    <div class="exp-company">${exp.company}</div>
                </div>
                <div class="exp-period">${exp.period}</div>
            </div>
            <ul class="exp-list">
                ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
        </div>
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
    // Current page highlighting in top nav
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
