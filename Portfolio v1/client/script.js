document.addEventListener('DOMContentLoaded', () => {
    // ===== NAVEGAÇÃO E MENU MOBILE =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Destacar link da página atual
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuToggle.innerText = navLinks.classList.contains('nav-active') ? '✕' : '☰';
        });

        // Fechar menu ao clicar em um link
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                menuToggle.innerText = '☰';
            });
        });
    }

    // ===== DESTAQUE DE NAVEGAÇÃO LATERAL (TOC) =====
    const tocLinks = document.querySelectorAll('.toc-links a');
    const pageSections = document.querySelectorAll('main section[id]');

    const updateActiveToc = () => {
        let current = '';
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        pageSections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    };

    if (tocLinks.length > 0) {
        window.addEventListener('scroll', updateActiveToc);
        window.addEventListener('load', updateActiveToc);

        // Scroll suave para links do TOC
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ===== FUNÇÃO COPIAR CÓDIGO =====
    const setupCopyButtons = () => {
        const preBlocks = document.querySelectorAll('pre');

        preBlocks.forEach(pre => {
            // Criar container se não existir
            if (!pre.parentElement.classList.contains('code-container')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'code-container';
                pre.parentNode.insertBefore(wrapper, pre);
                wrapper.appendChild(pre);
            }

            // Adicionar botão de cópia
            if (!pre.parentElement.querySelector('.copy-btn')) {
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.innerHTML = 'Copiar';
                pre.parentElement.appendChild(btn);

                btn.addEventListener('click', () => {
                    const code = pre.querySelector('code').innerText;
                    navigator.clipboard.writeText(code).then(() => {
                        btn.innerHTML = 'Copiado!';
                        btn.classList.add('copied');
                        setTimeout(() => {
                            btn.innerHTML = 'Copiar';
                            btn.classList.remove('copied');
                        }, 2000);
                    });
                });
            }
        });
    };

    setupCopyButtons();

    // ===== ANIMAÇÕES DE ENTRADA (Intersection Observer) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Adicionamos a classe 'visible' para disparar as animações CSS
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona elementos para animar
    const elementsToAnimate = document.querySelectorAll('.fade-in, .project-card, .skill-category, .contact-card, .floating-card');
    elementsToAnimate.forEach(el => observer.observe(el));

    // ===== EFEITO PARALLAX SUTIL NO HERO =====
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            heroVisual.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    console.log('ARB.dev | Portfólio Carregado 🚀');
});
