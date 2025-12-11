const API_URL = 'http://localhost:5000/api';

let allReports = [];
let statusChart = null;
let categoryChart = null;

document.addEventListener('DOMContentLoaded', () => {
    loadReports();
    loadStats();
});

async function loadReports() {
    try {
        const response = await fetch(`${API_URL}/reports`);
        allReports = await response.json();
        displayReports(allReports);
    } catch (error) {
        showNotification('Erro ao carregar relatórios', 'error');
        console.error('Error:', error);
    }
}

async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const stats = await response.json();

        document.getElementById('totalReports').textContent = stats.total_reports;
        document.getElementById('totalValue').textContent = `R$ ${stats.total_value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        document.getElementById('pendingReports').textContent = stats.by_status.pending || 0;
        document.getElementById('completedReports').textContent = stats.by_status.completed || 0;

        updateCharts(stats);
    } catch (error) {
        showNotification('Erro ao carregar estatísticas', 'error');
        console.error('Error:', error);
    }
}

function updateCharts(stats) {
    const statusLabels = Object.keys(stats.by_status);
    const statusData = Object.values(stats.by_status);
    const statusColors = statusLabels.map(status => {
        switch(status) {
            case 'pending': return '#f39c12';
            case 'in_progress': return '#3498db';
            case 'completed': return '#2ecc71';
            case 'cancelled': return '#e74c3c';
            default: return '#95a5a6';
        }
    });

    if (statusChart) {
        statusChart.destroy();
    }

    const statusCtx = document.getElementById('statusChart').getContext('2d');
    statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: statusLabels.map(s => translateStatus(s)),
            datasets: [{
                data: statusData,
                backgroundColor: statusColors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    const categoryLabels = Object.keys(stats.by_category);
    const categoryData = Object.values(stats.by_category);

    if (categoryChart) {
        categoryChart.destroy();
    }

    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'bar',
        data: {
            labels: categoryLabels.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
            datasets: [{
                label: 'Quantidade',
                data: categoryData,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function displayReports(reports) {
    const tbody = document.getElementById('reportsBody');
    tbody.innerHTML = '';

    if (reports.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: #7f8c8d;">Nenhum relatório encontrado</td></tr>';
        return;
    }

    reports.forEach(report => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${report.id}</td>
            <td><strong>${report.title}</strong></td>
            <td>${report.category || '-'}</td>
            <td><span class="status-badge status-${report.status}">${translateStatus(report.status)}</span></td>
            <td>R$ ${(report.value || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td>${formatDate(report.created_at)}</td>
            <td>
                <button class="btn btn-edit" onclick="editReport(${report.id})">✏️</button>
                <button class="btn btn-danger" onclick="deleteReport(${report.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterReports() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    const filtered = allReports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm) ||
                             (report.description && report.description.toLowerCase().includes(searchTerm));
        const matchesCategory = !categoryFilter || report.category === categoryFilter;
        const matchesStatus = !statusFilter || report.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    displayReports(filtered);
}

function openModal() {
    document.getElementById('reportModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Novo Relatório';
    document.getElementById('reportForm').reset();
    document.getElementById('reportId').value = '';
}

function closeModal() {
    document.getElementById('reportModal').style.display = 'none';
}

async function editReport(id) {
    try {
        const response = await fetch(`${API_URL}/reports/${id}`);
        const report = await response.json();

        document.getElementById('reportId').value = report.id;
        document.getElementById('title').value = report.title;
        document.getElementById('description').value = report.description || '';
        document.getElementById('category').value = report.category;
        document.getElementById('status').value = report.status;
        document.getElementById('value').value = report.value;

        document.getElementById('modalTitle').textContent = 'Editar Relatório';
        document.getElementById('reportModal').style.display = 'block';
    } catch (error) {
        showNotification('Erro ao carregar relatório', 'error');
        console.error('Error:', error);
    }
}

async function saveReport(event) {
    event.preventDefault();

    const reportId = document.getElementById('reportId').value;
    const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        status: document.getElementById('status').value,
        value: parseFloat(document.getElementById('value').value) || 0
    };

    try {
        let response;
        if (reportId) {
            response = await fetch(`${API_URL}/reports/${reportId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            response = await fetch(`${API_URL}/reports`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        if (response.ok) {
            showNotification(reportId ? 'Relatório atualizado com sucesso' : 'Relatório criado com sucesso', 'success');
            closeModal();
            loadReports();
            loadStats();
        } else {
            showNotification('Erro ao salvar relatório', 'error');
        }
    } catch (error) {
        showNotification('Erro ao salvar relatório', 'error');
        console.error('Error:', error);
    }
}

async function deleteReport(id) {
    if (!confirm('Tem certeza que deseja deletar este relatório?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/reports/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Relatório deletado com sucesso', 'success');
            loadReports();
            loadStats();
        } else {
            showNotification('Erro ao deletar relatório', 'error');
        }
    } catch (error) {
        showNotification('Erro ao deletar relatório', 'error');
        console.error('Error:', error);
    }
}

async function exportPDF() {
    try {
        const response = await fetch(`${API_URL}/reports/export/pdf`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_${new Date().getTime()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showNotification('PDF exportado com sucesso', 'success');
    } catch (error) {
        showNotification('Erro ao exportar PDF', 'error');
        console.error('Error:', error);
    }
}

async function exportExcel() {
    try {
        const response = await fetch(`${API_URL}/reports/export/excel`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_${new Date().getTime()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showNotification('Excel exportado com sucesso', 'success');
    } catch (error) {
        showNotification('Erro ao exportar Excel', 'error');
        console.error('Error:', error);
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function translateStatus(status) {
    const translations = {
        'pending': 'Pendente',
        'in_progress': 'Em Progresso',
        'completed': 'Concluído',
        'cancelled': 'Cancelado'
    };
    return translations[status] || status;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

window.onclick = function(event) {
    const modal = document.getElementById('reportModal');
    if (event.target === modal) {
        closeModal();
    }
}
