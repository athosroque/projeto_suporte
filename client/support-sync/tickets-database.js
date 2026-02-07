/**
 * SupportSync AI - Tickets Database
 * Base de dados de tickets IT realistas baseados no contexto Educbank
 * (Fintech educacional - gestão de mensalidades e inadimplência)
 */

const SYSTEMS = {
    PORTAL_ESCOLA: 'Portal da Escola',
    PORTAL_FAMILIA: 'Portal da Família',
    API_PAGAMENTOS: 'API de Pagamentos',
    ERP_FINANCEIRO: 'ERP Financeiro',
    BI_ANALYTICS: 'BI & Analytics',
    INTEGRACAO_BANCO: 'Integração Bancária',
    SSO_AUTH: 'SSO/Autenticação',
    EMAIL_SERVICE: 'Serviço de Email',
    MOBILE_APP: 'App Mobile',
    INFRA_REDE: 'Infraestrutura/Rede'
};

const DEPARTMENTS = [
    'Secretaria Acadêmica',
    'Financeiro',
    'TI Interno',
    'Comercial',
    'Suporte ao Cliente',
    'Diretoria',
    'Operações',
    'Cobrança'
];

const STATUSES = {
    ABERTO: 'aberto',
    ANALISE: 'analise',
    CONCLUIDO: 'concluido'
};

const PRIORITIES = {
    CRITICO: 'Crítico',
    ALTO: 'Alto',
    MEDIO: 'Médio',
    BAIXO: 'Baixo'
};

const CATEGORIES = {
    ACESSO: 'Acesso/Login',
    PAGAMENTO: 'Pagamentos',
    INTEGRACAO: 'Integração',
    PERFORMANCE: 'Performance',
    DADOS: 'Dados/Relatórios',
    BUG: 'Bug/Erro',
    DUVIDA: 'Dúvida/Suporte'
};

// Gerador de datas aleatórias nos últimos 30 dias
function randomDate(daysBack = 30) {
    const now = new Date();
    const past = new Date(now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000);
    return past.toISOString();
}

// Base de tickets realistas
const TICKETS_DATABASE = [
    // === CRÍTICOS - Problemas urgentes ===
    {
        id: 1001,
        createdAt: randomDate(2),
        user: 'Colégio São Paulo',
        department: 'Financeiro',
        description: 'URGENTE: Sistema de pagamentos fora do ar. Não conseguimos processar boletos desde as 8h. Mais de 200 famílias aguardando.',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.CRITICO,
        category: CATEGORIES.BUG
    },
    {
        id: 1002,
        createdAt: randomDate(1),
        user: 'Instituto Educacional ABC',
        department: 'Secretaria Acadêmica',
        description: 'Erro crítico: Portal da Família não carrega. Pais não conseguem acessar boletos nem extrato. Recebendo muitas ligações.',
        system: SYSTEMS.PORTAL_FAMILIA,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.CRITICO,
        category: CATEGORIES.BUG
    },
    {
        id: 1003,
        createdAt: randomDate(1),
        user: 'Escola Montessori',
        department: 'TI Interno',
        description: 'Integração com banco parou de funcionar. Retorno de arquivos CNAB não está sendo processado. Conciliação travada.',
        system: SYSTEMS.INTEGRACAO_BANCO,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.CRITICO,
        category: CATEGORIES.INTEGRACAO
    },
    {
        id: 1004,
        createdAt: randomDate(3),
        user: 'Centro Educacional Futuro',
        department: 'Operações',
        description: 'API retornando erro 503 em todas as requisições. Dashboard de inadimplência não atualiza há 6 horas.',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.CRITICO,
        category: CATEGORIES.PERFORMANCE
    },

    // === ALTO - Problemas importantes ===
    {
        id: 1005,
        createdAt: randomDate(5),
        user: 'Colégio Inovação',
        department: 'Financeiro',
        description: 'Relatório de repasses não bate com extrato bancário. Diferença de R$ 15.000 identificada.',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.DADOS
    },
    {
        id: 1006,
        createdAt: randomDate(4),
        user: 'Escola Piaget',
        department: 'Suporte ao Cliente',
        description: 'Famílias relatando que boletos estão sendo gerados com valor errado. Desconto de pontualidade não aplicado.',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.BUG
    },
    {
        id: 1007,
        createdAt: randomDate(6),
        user: 'Instituto Saber',
        department: 'TI Interno',
        description: 'Login SSO não funciona para novos usuários. Erro "Token inválido" ao tentar autenticar via Azure AD.',
        system: SYSTEMS.SSO_AUTH,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.ACESSO
    },
    {
        id: 1008,
        createdAt: randomDate(7),
        user: 'Colégio Dom Bosco',
        department: 'Secretaria Acadêmica',
        description: 'Importação de matrículas do ERP não está funcionando. Arquivo com 150 alunos não foi processado.',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.INTEGRACAO
    },
    {
        id: 1009,
        createdAt: randomDate(3),
        user: 'Escola Viva',
        department: 'Cobrança',
        description: 'Emails de cobrança não estão sendo enviados. Última campanha de lembrete não foi disparada.',
        system: SYSTEMS.EMAIL_SERVICE,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.BUG
    },
    {
        id: 1010,
        createdAt: randomDate(8),
        user: 'Centro de Ensino Moderno',
        department: 'Diretoria',
        description: 'Dashboard executivo mostrando dados de inadimplência de ontem. Não atualiza em tempo real.',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.PERFORMANCE
    },

    // === MÉDIO - Problemas moderados ===
    {
        id: 1011,
        createdAt: randomDate(10),
        user: 'Colégio Santa Maria',
        department: 'Financeiro',
        description: 'App mobile não mostra histórico de pagamentos anteriores a janeiro/2025.',
        system: SYSTEMS.MOBILE_APP,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1012,
        createdAt: randomDate(12),
        user: 'Escola Nova Era',
        department: 'Suporte ao Cliente',
        description: 'Pais não conseguem alterar dados cadastrais no portal. Botão "Salvar" não responde.',
        system: SYSTEMS.PORTAL_FAMILIA,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1013,
        createdAt: randomDate(14),
        user: 'Instituto Paulo Freire',
        department: 'TI Interno',
        description: 'VPN corporativa lenta. Demora 30 segundos para cada tela carregar quando conectado remotamente.',
        system: SYSTEMS.INFRA_REDE,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.PERFORMANCE
    },
    {
        id: 1014,
        createdAt: randomDate(9),
        user: 'Colégio Objetivo',
        department: 'Comercial',
        description: 'Relatório de projeção de inadimplência apresenta valores negativos para alguns alunos.',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.DADOS
    },
    {
        id: 1015,
        createdAt: randomDate(11),
        user: 'Escola Criativa',
        department: 'Secretaria Acadêmica',
        description: 'Ao exportar relatório para Excel, algumas colunas aparecem com caracteres estranhos (encoding).',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1016,
        createdAt: randomDate(15),
        user: 'Centro Educacional Luz',
        department: 'Financeiro',
        description: 'Segunda via de boleto não gera código de barras. Apenas QR Code PIX disponível.',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1017,
        createdAt: randomDate(8),
        user: 'Colégio Adventista',
        department: 'Operações',
        description: 'Webhook de confirmação de pagamento atrasando. Média de 2 horas para atualizar status.',
        system: SYSTEMS.INTEGRACAO_BANCO,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.PERFORMANCE
    },
    {
        id: 1018,
        createdAt: randomDate(13),
        user: 'Instituto Educar',
        department: 'Suporte ao Cliente',
        description: 'Notificações push do app não chegam para usuários iOS. Android funciona normalmente.',
        system: SYSTEMS.MOBILE_APP,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1019,
        createdAt: randomDate(7),
        user: 'Escola Waldorf',
        department: 'TI Interno',
        description: 'Sessão expira muito rápido no portal. Usuários tendo que logar novamente a cada 15 minutos.',
        system: SYSTEMS.SSO_AUTH,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.ACESSO
    },
    {
        id: 1020,
        createdAt: randomDate(16),
        user: 'Colégio Einstein',
        department: 'Diretoria',
        description: 'Gráfico de tendência de arrecadação não mostra linha de projeção para próximos meses.',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.DADOS
    },

    // === BAIXO - Pequenos ajustes ===
    {
        id: 1021,
        createdAt: randomDate(20),
        user: 'Escola Americana',
        department: 'Secretaria Acadêmica',
        description: 'Gostaria de alterar o logo que aparece nos boletos. Como faço?',
        system: SYSTEMS.PORTAL_ESCOLA,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },
    {
        id: 1022,
        createdAt: randomDate(18),
        user: 'Centro de Educação Bilíngue',
        department: 'Financeiro',
        description: 'É possível personalizar o texto do email de lembrete de vencimento?',
        system: SYSTEMS.EMAIL_SERVICE,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },
    {
        id: 1023,
        createdAt: randomDate(22),
        user: 'Colégio São José',
        department: 'Suporte ao Cliente',
        description: 'Data de nascimento aparece no formato americano (MM/DD/YYYY) no relatório.',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.BUG
    },
    {
        id: 1024,
        createdAt: randomDate(25),
        user: 'Instituto Monteiro Lobato',
        department: 'Comercial',
        description: 'Como exportar a lista de escolas parceiras para apresentação comercial?',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },
    {
        id: 1025,
        createdAt: randomDate(19),
        user: 'Escola Técnica Federal',
        department: 'TI Interno',
        description: 'Favicon do portal está desatualizado. Ainda mostra logo antiga.',
        system: SYSTEMS.PORTAL_ESCOLA,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.BUG
    },
    {
        id: 1026,
        createdAt: randomDate(21),
        user: 'Colégio Marista',
        department: 'Operações',
        description: 'Ordenação padrão de alunos deveria ser por nome, não por matrícula.',
        system: SYSTEMS.PORTAL_ESCOLA,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },
    {
        id: 1027,
        createdAt: randomDate(24),
        user: 'Escola Pequeno Príncipe',
        department: 'Secretaria Acadêmica',
        description: 'Cor do botão "Pagar" no portal está muito clara. Difícil visualização.',
        system: SYSTEMS.PORTAL_FAMILIA,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.BUG
    },
    {
        id: 1028,
        createdAt: randomDate(26),
        user: 'Instituto Federal',
        department: 'Financeiro',
        description: 'Existe previsão para app desktop? Seria mais prático que o navegador.',
        system: SYSTEMS.MOBILE_APP,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },

    // === Mais tickets para volume ===
    {
        id: 1029,
        createdAt: randomDate(4),
        user: 'Colégio Bandeirantes',
        department: 'Cobrança',
        description: 'Régua de cobrança não está respeitando o intervalo configurado. Emails sendo enviados diariamente.',
        system: SYSTEMS.EMAIL_SERVICE,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.BUG
    },
    {
        id: 1030,
        createdAt: randomDate(5),
        user: 'Escola Lumiar',
        department: 'TI Interno',
        description: 'Erro de certificado SSL ao acessar API. Mensagem: "NET::ERR_CERT_DATE_INVALID"',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.INTEGRACAO
    },
    {
        id: 1031,
        createdAt: randomDate(6),
        user: 'Centro Educacional Horizonte',
        department: 'Financeiro',
        description: 'Boleto vencido há 30 dias ainda aparece como "A vencer" no sistema.',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1032,
        createdAt: randomDate(2),
        user: 'Colégio Anglo',
        department: 'Suporte ao Cliente',
        description: 'URGENTE: Família recebeu boleto em duplicidade. Já pagou um, mas outro ainda aparece pendente.',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.CRITICO,
        category: CATEGORIES.BUG
    },
    {
        id: 1033,
        createdAt: randomDate(9),
        user: 'Escola Pueri Domus',
        department: 'Diretoria',
        description: 'Dashboard de KPIs não mostra comparativo com mesmo período do ano anterior.',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.DADOS
    },
    {
        id: 1034,
        createdAt: randomDate(11),
        user: 'Instituto Presbiteriano',
        department: 'Secretaria Acadêmica',
        description: 'Ao cadastrar aluno, campo CEP não busca endereço automaticamente.',
        system: SYSTEMS.PORTAL_ESCOLA,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.BUG
    },
    {
        id: 1035,
        createdAt: randomDate(3),
        user: 'Colégio Pentágono',
        department: 'Operações',
        description: 'Timeout na API ao gerar relatório de mais de 1000 registros. Erro 504.',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.PERFORMANCE
    },
    {
        id: 1036,
        createdAt: randomDate(7),
        user: 'Escola Aubrick',
        department: 'Financeiro',
        description: 'Filtro de período no relatório financeiro não funciona para datas de 2024.',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1037,
        createdAt: randomDate(12),
        user: 'Centro de Ensino Integrado',
        department: 'TI Interno',
        description: 'Dois usuários com mesmo email cadastrados. Sistema deveria bloquear duplicidade.',
        system: SYSTEMS.SSO_AUTH,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.DADOS
    },
    {
        id: 1038,
        createdAt: randomDate(15),
        user: 'Colégio Vera Cruz',
        department: 'Cobrança',
        description: 'SMS de cobrança sendo enviado fora do horário comercial (22h). Famílias reclamando.',
        system: SYSTEMS.EMAIL_SERVICE,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.BUG
    },
    {
        id: 1039,
        createdAt: randomDate(8),
        user: 'Escola Stance Dual',
        department: 'Suporte ao Cliente',
        description: 'Link de recuperação de senha não chega no email dos pais. Nem no spam.',
        system: SYSTEMS.SSO_AUTH,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.ACESSO
    },
    {
        id: 1040,
        createdAt: randomDate(10),
        user: 'Instituto Sidarta',
        department: 'Comercial',
        description: 'Apresentação de slides do dashboard não tem opção de fullscreen.',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },
    {
        id: 1041,
        createdAt: randomDate(14),
        user: 'Colégio Pio XII',
        department: 'Financeiro',
        description: 'Desconto de irmão não está sendo calculado automaticamente para 3º filho.',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1042,
        createdAt: randomDate(1),
        user: 'Escola Projeto Vida',
        department: 'Diretoria',
        description: 'Preciso de acesso ao painel de métricas consolidadas. Atual usuário só vê dados parciais.',
        system: SYSTEMS.BI_ANALYTICS,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.ACESSO
    },
    {
        id: 1043,
        createdAt: randomDate(17),
        user: 'Centro Educacional Pioneiro',
        department: 'Secretaria Acadêmica',
        description: 'Importação em lote de alunos aceita arquivo .xlsx ou apenas .csv?',
        system: SYSTEMS.PORTAL_ESCOLA,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },
    {
        id: 1044,
        createdAt: randomDate(19),
        user: 'Colégio Porto Seguro',
        department: 'TI Interno',
        description: 'Logs de auditoria não mostram IP do usuário que fez a alteração.',
        system: SYSTEMS.SSO_AUTH,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.DADOS
    },
    {
        id: 1045,
        createdAt: randomDate(4),
        user: 'Escola Eleva',
        department: 'Operações',
        description: 'Erro ao conciliar pagamentos via PIX. Status permanece como "Aguardando confirmação".',
        system: SYSTEMS.INTEGRACAO_BANCO,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.ALTO,
        category: CATEGORIES.INTEGRACAO
    },
    {
        id: 1046,
        createdAt: randomDate(23),
        user: 'Instituto Singularidades',
        department: 'Suporte ao Cliente',
        description: 'Tamanho da fonte no portal da família está muito pequeno para idosos.',
        system: SYSTEMS.PORTAL_FAMILIA,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    },
    {
        id: 1047,
        createdAt: randomDate(6),
        user: 'Colégio Dante Alighieri',
        department: 'Financeiro',
        description: 'Extrato consolidado não mostra breakdown por tipo de receita (mensalidade/material/transporte).',
        system: SYSTEMS.ERP_FINANCEIRO,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.DADOS
    },
    {
        id: 1048,
        createdAt: randomDate(2),
        user: 'Escola Santi',
        department: 'Cobrança',
        description: 'Sistema calculou multa sobre boleto que já tinha sido pago. Cliente quer reembolso.',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ABERTO,
        priority: PRIORITIES.CRITICO,
        category: CATEGORIES.BUG
    },
    {
        id: 1049,
        createdAt: randomDate(13),
        user: 'Centro de Ensino Renovação',
        department: 'TI Interno',
        description: 'API retornando JSON malformado em alguns endpoints. Erro de parsing no frontend.',
        system: SYSTEMS.API_PAGAMENTOS,
        status: STATUSES.ANALISE,
        priority: PRIORITIES.MEDIO,
        category: CATEGORIES.BUG
    },
    {
        id: 1050,
        createdAt: randomDate(28),
        user: 'Colégio Oswald de Andrade',
        department: 'Secretaria Acadêmica',
        description: 'Como configurar boletos para vencimento sempre no dia 10? Atualmente é dia 5.',
        system: SYSTEMS.PORTAL_ESCOLA,
        status: STATUSES.CONCLUIDO,
        priority: PRIORITIES.BAIXO,
        category: CATEGORIES.DUVIDA
    }
];

// Função para obter tickets por status
function getTicketsByStatus(status) {
    return TICKETS_DATABASE.filter(t => t.status === status);
}

// Função para obter tickets por prioridade
function getTicketsByPriority(priority) {
    return TICKETS_DATABASE.filter(t => t.priority === priority);
}

// Função para obter tickets por sistema
function getTicketsBySystem(system) {
    return TICKETS_DATABASE.filter(t => t.system === system);
}

// Função para contar tickets por categoria
function countByCategory() {
    return TICKETS_DATABASE.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + 1;
        return acc;
    }, {});
}

// Função para contar tickets por sistema
function countBySystem() {
    return TICKETS_DATABASE.reduce((acc, t) => {
        acc[t.system] = (acc[t.system] || 0) + 1;
        return acc;
    }, {});
}

// Função para contar tickets por prioridade
function countByPriority() {
    return TICKETS_DATABASE.reduce((acc, t) => {
        acc[t.priority] = (acc[t.priority] || 0) + 1;
        return acc;
    }, {});
}

// Função para contar tickets por status
function countByStatus() {
    return TICKETS_DATABASE.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
    }, {});
}

// Detectar padrões (tickets similares recentes)
function detectPatterns(hoursBack = 24) {
    const cutoff = new Date(Date.now() - hoursBack * 60 * 60 * 1000);
    const recentTickets = TICKETS_DATABASE.filter(t => new Date(t.createdAt) >= cutoff);

    const patterns = {};
    recentTickets.forEach(t => {
        const key = `${t.system}|${t.category}`;
        if (!patterns[key]) {
            patterns[key] = { system: t.system, category: t.category, count: 0, tickets: [] };
        }
        patterns[key].count++;
        patterns[key].tickets.push(t);
    });

    return Object.values(patterns).filter(p => p.count >= 2).sort((a, b) => b.count - a.count);
}

// Parser SQL simples
function parseSimpleSQL(query) {
    const upperQuery = query.toUpperCase();

    if (!upperQuery.includes('SELECT')) {
        return { error: 'Query deve começar com SELECT' };
    }

    let results = [...TICKETS_DATABASE];

    // WHERE simples
    if (upperQuery.includes('WHERE')) {
        const whereMatch = query.match(/WHERE\s+(\w+)\s*=\s*['"]?([^'"]+)['"]?/i);
        if (whereMatch) {
            const [, field, value] = whereMatch;
            results = results.filter(t => {
                const fieldValue = t[field.toLowerCase()];
                return fieldValue && fieldValue.toString().toLowerCase().includes(value.toLowerCase());
            });
        }
    }

    // GROUP BY
    if (upperQuery.includes('GROUP BY')) {
        const groupMatch = query.match(/GROUP BY\s+(\w+)/i);
        if (groupMatch) {
            const field = groupMatch[1].toLowerCase();
            const grouped = results.reduce((acc, t) => {
                const key = t[field] || 'N/A';
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});
            results = Object.entries(grouped).map(([key, count]) => ({ [field]: key, total: count }));
        }
    }

    // ORDER BY
    if (upperQuery.includes('ORDER BY')) {
        const orderMatch = query.match(/ORDER BY\s+(\w+)(?:\s+(ASC|DESC))?/i);
        if (orderMatch) {
            const field = orderMatch[1].toLowerCase();
            const direction = (orderMatch[2] || 'ASC').toUpperCase();
            results.sort((a, b) => {
                if (direction === 'DESC') {
                    return (b[field] || 0) - (a[field] || 0);
                }
                return (a[field] || 0) - (b[field] || 0);
            });
        }
    }

    // LIMIT
    if (upperQuery.includes('LIMIT')) {
        const limitMatch = query.match(/LIMIT\s+(\d+)/i);
        if (limitMatch) {
            results = results.slice(0, parseInt(limitMatch[1]));
        }
    }

    return { data: results, count: results.length };
}

// Exportar para uso global
window.TicketsDB = {
    tickets: TICKETS_DATABASE,
    systems: SYSTEMS,
    statuses: STATUSES,
    priorities: PRIORITIES,
    categories: CATEGORIES,
    getByStatus: getTicketsByStatus,
    getByPriority: getTicketsByPriority,
    getBySystem: getTicketsBySystem,
    countByCategory,
    countBySystem,
    countByPriority,
    countByStatus,
    detectPatterns,
    parseSQL: parseSimpleSQL
};
