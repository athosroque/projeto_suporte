document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticket-form');
    const triagensCount = document.getElementById('triagens-count');
    const criticalCount = document.getElementById('critical-count');
    const patternAlert = document.getElementById('pattern-alert');
    const dismissAlert = document.getElementById('dismiss-alert');

    let ticketCounter = 1042;
    let totalTriagens = 14;
    let criticalOpen = 2;
    let loginTicketCount = 0; // For pattern detection

    // Initialize Chart
    const ctx = document.getElementById('supportChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Financeiro', 'Portal Educ', 'RH', 'Integrações', 'Segurança'],
            datasets: [{
                label: 'Incidentes por Sistema',
                data: [15, 22, 5, 8, 12],
                backgroundColor: 'rgba(0, 120, 212, 0.6)',
                borderColor: 'rgba(0, 120, 212, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });

    // Dismiss pattern alert
    dismissAlert.addEventListener('click', () => patternAlert.classList.add('hidden'));

    // Form submission
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const user = document.getElementById('user').value;
        const prediction = classifyTicket(description);

        ticketCounter++;
        totalTriagens++;
        triagensCount.innerText = totalTriagens;

        if (prediction.priority === 'Crítico') {
            criticalOpen++;
            criticalCount.innerText = criticalOpen;
        }

        addTicketToKanban(ticketCounter, user, description, prediction);
        addLogEntry(ticketCounter, user);

        // Pattern detection for login issues
        if (description.toLowerCase().includes('login') || description.toLowerCase().includes('senha')) {
            loginTicketCount++;
            if (loginTicketCount >= 2) {
                document.getElementById('pattern-message').innerHTML =
                    `Padrão detectado: <strong>${loginTicketCount} tickets de "Login/Senha"</strong> recentes. Possível problema de autenticação!`;
                patternAlert.classList.remove('hidden');
            }
        }

        ticketForm.reset();
    });

    function classifyTicket(text) {
        const lower = text.toLowerCase();
        let priority = 'Normal';
        let topic = 'Técnico';

        if (lower.includes('urgente') || lower.includes('parado') || lower.includes('erro') || lower.includes('fora do ar')) {
            priority = 'Crítico';
        }
        if (lower.includes('pagamento') || lower.includes('boleto') || lower.includes('financeiro')) {
            topic = 'Financeiro';
        } else if (lower.includes('login') || lower.includes('senha') || lower.includes('acesso')) {
            topic = 'Acesso';
        } else if (lower.includes('api') || lower.includes('integração')) {
            topic = 'API';
        }
        return { priority, topic };
    }

    function addTicketToKanban(id, user, desc, prediction) {
        const column = document.querySelector('.kanban-items[data-status="aberto"]');
        const ticket = document.createElement('div');
        ticket.className = `kanban-ticket ${prediction.priority === 'Crítico' ? 'critical' : ''}`;
        ticket.draggable = true;
        ticket.innerHTML = `
            <span class="ticket-id">#${id} • ${prediction.topic}</span>
            <p style="margin: 5px 0; font-weight: 500;">${user}</p>
            <p style="font-size: 11px; color: var(--text-muted);">${desc.substring(0, 50)}...</p>
        `;

        // Drag and drop
        ticket.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', id));
        column.prepend(ticket);
    }

    function addLogEntry(id, user) {
        const logViewer = document.getElementById('log-viewer').querySelector('code');
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const newLog = `[${now}] INFO  - TicketService: Novo ticket #${id} criado por '${user}'.\n`;
        logViewer.textContent = newLog + logViewer.textContent;
    }

    // SQL Demo button
    document.getElementById('run-sql').addEventListener('click', () => {
        const resultDiv = document.getElementById('sql-result');
        resultDiv.innerHTML = `<p style="color: #34C759;">✓ Query executada com sucesso. 3 linhas retornadas.</p>
        <table>
            <thead><tr><th>sistema</th><th>total</th></tr></thead>
            <tbody>
                <tr><td>Portal Financeiro</td><td>5</td></tr>
                <tr><td>API Integrações</td><td>3</td></tr>
                <tr><td>RH Online</td><td>1</td></tr>
            </tbody>
        </table>`;
    });

    // Enable drag-and-drop for Kanban
    document.querySelectorAll('.kanban-items').forEach(col => {
        col.addEventListener('dragover', e => e.preventDefault());
        col.addEventListener('drop', e => {
            e.preventDefault();
            const ticket = document.querySelector('.kanban-ticket[draggable="true"]:active') ||
                document.querySelector('.kanban-ticket');
            if (ticket) col.appendChild(ticket);
        });
    });
});
