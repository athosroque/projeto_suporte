/**
 * SupportSync AI - Core Engine
 * Motor principal com todas as funcionalidades integradas
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // INITIALIZATION
    // ============================================
    const ticketForm = document.getElementById('ticket-form');
    const triagensCount = document.getElementById('triagens-count');
    const criticalCount = document.getElementById('critical-count');
    const patternAlert = document.getElementById('pattern-alert');
    const dismissAlert = document.getElementById('dismiss-alert');
    const logViewer = document.getElementById('log-viewer');
    const sqlInput = document.getElementById('sql-input');
    const sqlResult = document.getElementById('sql-result');
    const runSqlBtn = document.getElementById('run-sql');

    let ticketCounter = 1050;
    let localTickets = [];

    // Load tickets from database
    if (window.TicketsDB) {
        localTickets = [...window.TicketsDB.tickets];
    }

    // ============================================
    // KANBAN BOARD
    // ============================================
    function initializeKanban() {
        const columns = {
            aberto: document.querySelector('.kanban-items[data-status="aberto"]'),
            analise: document.querySelector('.kanban-items[data-status="analise"]'),
            concluido: document.querySelector('.kanban-items[data-status="concluido"]')
        };

        // Clear existing
        Object.values(columns).forEach(col => col.innerHTML = '');

        // Populate from database
        localTickets.forEach(ticket => {
            const column = columns[ticket.status];
            if (column) {
                column.appendChild(createTicketCard(ticket));
            }
        });

        // Setup drag and drop
        setupDragAndDrop();
        updateMetrics();
    }

    function createTicketCard(ticket) {
        const card = document.createElement('div');
        card.className = `kanban-ticket ${ticket.priority === 'Crítico' ? 'critical' : ''} ${ticket.priority === 'Alto' ? 'high' : ''}`;
        card.draggable = true;
        card.dataset.ticketId = ticket.id;

        const priorityEmoji = {
            'Crítico': '🔴',
            'Alto': '🟠',
            'Médio': '🟡',
            'Baixo': '🟢'
        };

        card.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-id">#${ticket.id}</span>
                <span class="ticket-priority">${priorityEmoji[ticket.priority] || '⚪'}</span>
            </div>
            <p class="ticket-user">${ticket.user}</p>
            <p class="ticket-desc">${ticket.description.substring(0, 60)}...</p>
            <div class="ticket-meta">
                <span class="ticket-system">${ticket.system}</span>
                <span class="ticket-category">${ticket.category}</span>
            </div>
        `;

        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);

        return card;
    }

    function setupDragAndDrop() {
        const columns = document.querySelectorAll('.kanban-items');

        columns.forEach(column => {
            column.addEventListener('dragover', handleDragOver);
            column.addEventListener('drop', handleDrop);
            column.addEventListener('dragenter', handleDragEnter);
            column.addEventListener('dragleave', handleDragLeave);
        });
    }

    let draggedElement = null;

    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.ticketId);
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        document.querySelectorAll('.kanban-items').forEach(col => {
            col.classList.remove('drag-over');
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        const ticketId = parseInt(e.dataTransfer.getData('text/plain'));
        const newStatus = this.dataset.status;

        // Update local data
        const ticket = localTickets.find(t => t.id === ticketId);
        if (ticket) {
            const oldStatus = ticket.status;
            ticket.status = newStatus;

            // Move card
            if (draggedElement) {
                this.appendChild(draggedElement);
            }

            // Log the change
            addLogEntry('INFO', 'KanbanService', `Ticket #${ticketId} movido de "${oldStatus}" para "${newStatus}"`);
            updateMetrics();
        }
    }

    // ============================================
    // METRICS & STATS
    // ============================================
    function updateMetrics() {
        const stats = {
            total: localTickets.length,
            abertos: localTickets.filter(t => t.status === 'aberto').length,
            criticos: localTickets.filter(t => t.priority === 'Crítico' && t.status !== 'concluido').length
        };

        if (triagensCount) triagensCount.textContent = stats.total;
        if (criticalCount) criticalCount.textContent = stats.criticos;

        // Update chart
        updateChart();
    }

    // ============================================
    // CHART.JS - BI DASHBOARD
    // ============================================
    let supportChart = null;

    function updateChart() {
        const ctx = document.getElementById('supportChart');
        if (!ctx) return;

        const systemCounts = localTickets.reduce((acc, t) => {
            const system = t.system.split(' ')[0]; // Shorten name
            acc[system] = (acc[system] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(systemCounts);
        const data = Object.values(systemCounts);

        if (supportChart) {
            supportChart.data.labels = labels;
            supportChart.data.datasets[0].data = data;
            supportChart.update();
        } else {
            supportChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Tickets por Sistema',
                        data: data,
                        backgroundColor: [
                            'rgba(0, 120, 212, 0.7)',
                            'rgba(80, 230, 255, 0.7)',
                            'rgba(52, 199, 89, 0.7)',
                            'rgba(255, 149, 0, 0.7)',
                            'rgba(255, 59, 48, 0.7)',
                            'rgba(175, 82, 222, 0.7)',
                            'rgba(255, 204, 0, 0.7)',
                            'rgba(90, 200, 250, 0.7)'
                        ],
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderWidth: 1,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            ticks: { color: '#A1A1A6' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#A1A1A6', maxRotation: 45 }
                        }
                    }
                }
            });
        }
    }

    // ============================================
    // LOG VIEWER
    // ============================================
    function addLogEntry(level, service, message) {
        const logCode = logViewer?.querySelector('code');
        if (!logCode) return;

        const now = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(',', '');
        const levelColor = {
            'INFO': '#34C759',
            'WARN': '#FF9500',
            'ERROR': '#FF3B30',
            'DEBUG': '#5AC8FA'
        };

        const newEntry = document.createElement('div');
        newEntry.className = `log-entry log-${level.toLowerCase()}`;
        newEntry.innerHTML = `<span class="log-time">[${now}]</span> <span class="log-level" style="color: ${levelColor[level]}">${level.padEnd(5)}</span> - <span class="log-service">${service}:</span> ${message}`;

        logCode.insertBefore(newEntry, logCode.firstChild);

        // Keep only last 50 entries
        while (logCode.children.length > 50) {
            logCode.removeChild(logCode.lastChild);
        }
    }

    function initializeLogs() {
        const logCode = logViewer?.querySelector('code');
        if (!logCode) return;

        logCode.innerHTML = '';

        // Add initial system logs
        const initialLogs = [
            { level: 'INFO', service: 'System', message: 'SupportSync AI inicializado com sucesso' },
            { level: 'INFO', service: 'Database', message: `${localTickets.length} tickets carregados da base de dados` },
            { level: 'INFO', service: 'Kanban', message: 'Board inicializado com 3 colunas' },
            { level: 'INFO', service: 'PatternEngine', message: 'Motor de detecção de padrões ativo' },
            { level: 'INFO', service: 'SQLParser', message: 'Parser SQL pronto para consultas' }
        ];

        initialLogs.reverse().forEach(log => {
            addLogEntry(log.level, log.service, log.message);
        });
    }

    // ============================================
    // SQL QUERY ENGINE
    // ============================================
    function executeSQLQuery(query) {
        addLogEntry('INFO', 'SQLParser', `Executando query: ${query.substring(0, 50)}...`);

        if (!window.TicketsDB) {
            return { error: 'Database não disponível' };
        }

        try {
            const result = window.TicketsDB.parseSQL(query);

            if (result.error) {
                addLogEntry('ERROR', 'SQLParser', result.error);
                return result;
            }

            addLogEntry('INFO', 'SQLParser', `Query executada: ${result.count} registros retornados`);
            return result;
        } catch (e) {
            addLogEntry('ERROR', 'SQLParser', `Erro: ${e.message}`);
            return { error: e.message };
        }
    }

    function renderSQLResult(result) {
        if (!sqlResult) return;

        if (result.error) {
            sqlResult.innerHTML = `<p class="sql-error">❌ Erro: ${result.error}</p>`;
            return;
        }

        if (!result.data || result.data.length === 0) {
            sqlResult.innerHTML = `<p class="sql-empty">Nenhum resultado encontrado.</p>`;
            return;
        }

        const columns = Object.keys(result.data[0]);

        let html = `<p class="sql-success">✓ ${result.count} registro(s) retornado(s)</p>`;
        html += '<table><thead><tr>';
        columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += '</tr></thead><tbody>';

        result.data.slice(0, 20).forEach(row => {
            html += '<tr>';
            columns.forEach(col => {
                let value = row[col];
                if (typeof value === 'string' && value.length > 40) {
                    value = value.substring(0, 40) + '...';
                }
                html += `<td>${value ?? 'N/A'}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table>';

        if (result.count > 20) {
            html += `<p class="sql-info">Mostrando 20 de ${result.count} resultados</p>`;
        }

        sqlResult.innerHTML = html;
    }

    // ============================================
    // PATTERN DETECTION
    // ============================================
    function checkPatterns() {
        if (!window.TicketsDB) return;

        const patterns = window.TicketsDB.detectPatterns(48); // Last 48 hours

        if (patterns.length > 0) {
            const topPattern = patterns[0];
            const message = `Padrão detectado: <strong>${topPattern.count} tickets</strong> sobre "${topPattern.category}" no sistema "${topPattern.system}" nas últimas 48h. Possível problema sistêmico!`;

            const patternMessage = document.getElementById('pattern-message');
            if (patternMessage) {
                patternMessage.innerHTML = message;
            }

            if (patternAlert && topPattern.count >= 3) {
                patternAlert.classList.remove('hidden');
                addLogEntry('WARN', 'PatternEngine', `Alerta: ${topPattern.count} tickets similares detectados (${topPattern.system})`);
            }
        }
    }

    // ============================================
    // TICKET CLASSIFICATION (AI)
    // ============================================
    function classifyTicket(description, user) {
        const text = description.toLowerCase();

        // Priority classification
        let priority = 'Médio';
        const criticalKeywords = ['urgente', 'parado', 'erro crítico', 'fora do ar', 'não funciona', 'travou', 'caiu', 'bloqueado'];
        const highKeywords = ['erro', 'problema', 'falha', 'não consigo', 'não carrega', 'lento', 'timeout'];
        const lowKeywords = ['dúvida', 'como faço', 'gostaria', 'é possível', 'sugestão'];

        if (criticalKeywords.some(k => text.includes(k))) {
            priority = 'Crítico';
        } else if (highKeywords.some(k => text.includes(k))) {
            priority = 'Alto';
        } else if (lowKeywords.some(k => text.includes(k))) {
            priority = 'Baixo';
        }

        // Category classification
        let category = 'Bug/Erro';
        if (text.includes('login') || text.includes('senha') || text.includes('acesso') || text.includes('autenticação')) {
            category = 'Acesso/Login';
        } else if (text.includes('pagamento') || text.includes('boleto') || text.includes('pix') || text.includes('taxa')) {
            category = 'Pagamentos';
        } else if (text.includes('integração') || text.includes('api') || text.includes('webhook')) {
            category = 'Integração';
        } else if (text.includes('lento') || text.includes('demora') || text.includes('timeout') || text.includes('performance')) {
            category = 'Performance';
        } else if (text.includes('relatório') || text.includes('dados') || text.includes('exportar') || text.includes('dashboard')) {
            category = 'Dados/Relatórios';
        } else if (text.includes('como') || text.includes('dúvida') || text.includes('ajuda') || text.includes('configurar')) {
            category = 'Dúvida/Suporte';
        }

        // System detection
        let system = 'Portal da Escola';
        if (text.includes('portal') && text.includes('família')) {
            system = 'Portal da Família';
        } else if (text.includes('app') || text.includes('mobile') || text.includes('celular')) {
            system = 'App Mobile';
        } else if (text.includes('api') || text.includes('integração')) {
            system = 'API de Pagamentos';
        } else if (text.includes('banco') || text.includes('cnab') || text.includes('remessa')) {
            system = 'Integração Bancária';
        } else if (text.includes('login') || text.includes('sso') || text.includes('autenticação')) {
            system = 'SSO/Autenticação';
        } else if (text.includes('email') || text.includes('cobrança') || text.includes('notificação')) {
            system = 'Serviço de Email';
        } else if (text.includes('dashboard') || text.includes('bi') || text.includes('gráfico') || text.includes('métrica')) {
            system = 'BI & Analytics';
        } else if (text.includes('erp') || text.includes('financeiro') || text.includes('boleto')) {
            system = 'ERP Financeiro';
        }

        return { priority, category, system };
    }

    // ============================================
    // EVENT HANDLERS
    // ============================================

    // Dismiss pattern alert
    if (dismissAlert) {
        dismissAlert.addEventListener('click', () => {
            patternAlert.classList.add('hidden');
            addLogEntry('INFO', 'PatternEngine', 'Alerta de padrão descartado pelo usuário');
        });
    }

    // Form submission
    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const description = document.getElementById('description').value;
            const user = document.getElementById('user').value;

            if (!description || !user) return;

            const classification = classifyTicket(description, user);
            ticketCounter++;

            const newTicket = {
                id: ticketCounter,
                createdAt: new Date().toISOString(),
                user: user,
                department: 'Suporte ao Cliente',
                description: description,
                system: classification.system,
                status: 'aberto',
                priority: classification.priority,
                category: classification.category
            };

            localTickets.unshift(newTicket);

            // Add to Kanban
            const abertoColumn = document.querySelector('.kanban-items[data-status="aberto"]');
            if (abertoColumn) {
                abertoColumn.insertBefore(createTicketCard(newTicket), abertoColumn.firstChild);
            }

            // Log
            addLogEntry('INFO', 'TicketService', `Novo ticket #${ticketCounter} criado - ${classification.priority} - ${classification.category}`);
            addLogEntry('INFO', 'AIClassifier', `Ticket classificado automaticamente: Sistema="${classification.system}", Prioridade="${classification.priority}"`);

            // Update metrics
            updateMetrics();

            // Check patterns
            checkPatterns();

            // Reset form
            ticketForm.reset();

            // Show classification result
            showClassificationResult(classification);
        });
    }

    function showClassificationResult(classification) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'classification-result';
        resultDiv.innerHTML = `
            <span class="result-icon">🤖</span>
            <div class="result-content">
                <strong>IA Classificou:</strong>
                <span class="tag priority-${classification.priority.toLowerCase()}">${classification.priority}</span>
                <span class="tag">${classification.category}</span>
                <span class="tag">${classification.system}</span>
            </div>
        `;

        const formCard = document.querySelector('.ticket-form-card');
        if (formCard) {
            const existing = formCard.querySelector('.classification-result');
            if (existing) existing.remove();
            formCard.appendChild(resultDiv);

            setTimeout(() => resultDiv.remove(), 5000);
        }
    }

    // SQL Query execution
    if (runSqlBtn) {
        runSqlBtn.addEventListener('click', () => {
            const query = sqlInput?.value || '';
            if (query.trim()) {
                const result = executeSQLQuery(query);
                renderSQLResult(result);
            }
        });
    }

    // SQL input keyboard shortcut
    if (sqlInput) {
        sqlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                runSqlBtn?.click();
            }
        });
    }
    // ============================================
    // EXCEL EXPORT
    // ============================================
    const exportBtn = document.getElementById('export-excel');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportToExcel();
        });
    }

    function exportToExcel() {
        if (!localTickets || localTickets.length === 0) {
            addLogEntry('WARN', 'ExportService', 'Nenhum ticket para exportar');
            return;
        }

        // Create CSV content (compatible with Excel)
        const headers = ['ID', 'Data Criação', 'Escola/Usuário', 'Departamento', 'Descrição', 'Sistema', 'Status', 'Prioridade', 'Categoria'];

        const rows = localTickets.map(ticket => {
            const createdAt = new Date(ticket.createdAt).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            return [
                ticket.id,
                createdAt,
                `"${(ticket.user || '').replace(/"/g, '""')}"`,
                ticket.department || '',
                `"${(ticket.description || '').replace(/"/g, '""')}"`,
                ticket.system || '',
                ticket.status || '',
                ticket.priority || '',
                ticket.category || ''
            ].join(';');
        });

        const csvContent = '\uFEFF' + headers.join(';') + '\n' + rows.join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        const now = new Date().toISOString().slice(0, 10);
        link.setAttribute('href', url);
        link.setAttribute('download', `tickets_supportsync_${now}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        addLogEntry('INFO', 'ExportService', `Exportados ${localTickets.length} tickets para Excel (CSV)`);
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    initializeLogs();
    initializeKanban();
    checkPatterns();

    addLogEntry('INFO', 'System', '✅ SupportSync AI totalmente operacional');
});
