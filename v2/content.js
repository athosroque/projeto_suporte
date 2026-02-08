const content = {
    profile: {
        name: "Athos Roque Barros",
        title: "Technical Support Specialist | Cloud | Infrastructure | Network | ML | B.I.",
        location: "Brasília, Distrito Federal, Brasil",
        summary: "6 anos de experiência no relacionamento com clientes B2B e B2C, foco minha atuação na investigação técnica e resolução de incidentes complexos. Atualmente, mergulhado no desenvolvimento de projetos de Machine Learning e IA.",
        specialties: [
            "Troubleshooting de Integrações (APIs, Endpoints)",
            "Dados & Automação (SQL, Python)",
            "Machine Learning & IA para Insights Estratégicos"
        ],
        links: {
            linkedin: "https://www.linkedin.com/in/athos-roque-barros-622038152",
            github: "https://github.com/athosroque",
            oldPortfolio: "https://witty-meadow-04a2dc910.6.azurestaticapps.net/"
        }
    },
    experience: [
        {
            company: "Claro Brasil",
            role: "Analista de suporte de sistemas",
            period: "julho de 2025 - Present (8 meses)",
            location: "Brasília, Distrito Federal, Brasil",
            highlights: [
                "Atendimento a clientes na plataforma Omnichannel (Voz e Mídias Digitais)",
                "Análise e correção de problemas técnicos na plataforma Genesys Cloud",
                "Gestão de acessos, grupos e filas de atendimento",
                "Apoio na governança via Base de Conhecimento"
            ]
        },
        {
            company: "Jusbrasil",
            role: "Support Analyst Sr",
            period: "janeiro de 2022 - janeiro de 2025 (3 anos 1 mês)",
            location: "São Paulo, Brasil",
            highlights: [
                "Implementação e manutenção de integrações Enterprise",
                "Troubleshooting com Redash, Metabase, Google Colab e JIRA",
                "Testes de API e validação de payloads via Postman",
                "Desenvolvimento de automações em Python"
            ]
        }
    ],
    projects: [
        {
            id: "support-sync",
            title: "SupportSync AI",
            category: "Customer Success / AI",
            problem: "Empresas enfrentam gargalos na triagem manual de tickets, resultando em SLAs estourados e insatisfação do cliente.",
            solution: "Um sistema inteligente que utiliza NLP para classificar prioridades e um Kanban dinâmico para gestão visual eficiente.",
            impact: "Redução de 40% no tempo de triagem inicial e visibilidade 360º da saúde operacional.",
            tech: ["Vanilla JS", "Chart.js", "Azure"],
            link: "../Portfolio v1/client/support-sync/index.html"
        },
        {
            id: "movie-recommender",
            title: "Movie Recommender MLOps",
            category: "Data Science / MLOps",
            problem: "O excesso de conteúdo digital gera fadiga de decisão. Usuários gastam mais tempo procurando do que consumindo mídia.",
            solution: "Um pipeline end-to-end de NLP que transforma sinopses em vetores matemáticos (TF-IDF) para encontrar similaridades semânticas em milissegundos.",
            impact: "Arquitetura escalável com rastreio de experimentos via MLflow e versionamento de dados com DVC.",
            tech: ["Python", "FastAPI", "MLflow", "DVC", "Docker"],
            link: "https://github.com/athosroque/-Movie-Recommender-System-MLOps"
        }
    ]
};

export default content;
