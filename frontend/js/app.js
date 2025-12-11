const API_URL = 'http://localhost:5000/api';

let allReports = [];
let allConfigs = [];
let quillEditors = {};
let currentReportId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    initializeQuillEditors();
});

// ============= NAVEGAÇÃO =============

function showView(viewName) {
    // Esconder todas as views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // Mostrar view selecionada
    document.getElementById(viewName + 'View').classList.add('active');
    event.target.classList.add('active');

    // Carregar dados da view
    if (viewName === 'dashboard') {
        loadDashboard();
    } else if (viewName === 'reports') {
        loadAllReports();
    } else if (viewName === 'configs') {
        loadConfigs();
    }
}

// ============= DASHBOARD =============

async function loadDashboard() {
    try {
        const [statsRes, reportsRes] = await Promise.all([
            fetch(`${API_URL}/stats`),
            fetch(`${API_URL}/reports`)
        ]);

        const stats = await statsRes.json();
        const reports = await reportsRes.json();

        // Atualizar estatísticas
        document.getElementById('totalReports').textContent = stats.total_reports;
        document.getElementById('totalBeneficiaries').textContent = stats.total_beneficiaries;
        document.getElementById('draftReports').textContent = stats.by_status.draft || 0;
        document.getElementById('publishedReports').textContent = stats.by_status.published || 0;

        // Mostrar relatórios recentes (últimos 5)
        const recent = reports.slice(0, 5);
        displayReportCards('recentReportsList', recent);

    } catch (error) {
        showNotification('Erro ao carregar dashboard', 'error');
        console.error('Error:', error);
    }
}

// ============= RELATÓRIOS =============

async function loadAllReports() {
    try {
        const response = await fetch(`${API_URL}/reports`);
        allReports = await response.json();
        displayReportCards('allReportsList', allReports);
    } catch (error) {
        showNotification('Erro ao carregar relatórios', 'error');
        console.error('Error:', error);
    }
}

function displayReportCards(containerId, reports) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (reports.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #7f8c8d;">Nenhum relatório encontrado</p>';
        return;
    }

    reports.forEach(report => {
        const card = document.createElement('div');
        card.className = 'report-card';

        const period = report.period_start && report.period_end
            ? `${formatDate(report.period_start)} - ${formatDate(report.period_end)}`
            : 'Período não definido';

        card.innerHTML = `
            <div class="report-card-header">
                <div class="report-card-title">${report.title}</div>
                <span class="status-badge status-${report.status}">${translateStatus(report.status)}</span>
            </div>
            <div class="report-card-body">
                ${report.subtitle ? `<p>${report.subtitle}</p>` : ''}
                <p><strong>Organização:</strong> ${report.organization_name || '-'}</p>
                <p><strong>Projeto:</strong> ${report.project_name || '-'}</p>
                <p><strong>Tipo:</strong> ${report.report_type ? report.report_type.charAt(0).toUpperCase() + report.report_type.slice(1) : '-'}</p>
                <p><strong>Período:</strong> ${period}</p>
                ${report.beneficiaries ? `<p><strong>Beneficiários:</strong> ${report.beneficiaries}</p>` : ''}
            </div>
            <div class="report-card-footer">
                <span>Criado em ${formatDate(report.created_at)}</span>
                <div class="report-card-actions">
                    <button class="btn btn-edit" onclick="editReport(${report.id})">✏️ Editar</button>
                    <button class="btn btn-secondary" onclick="exportSinglePDF(${report.id})">📄 PDF</button>
                    <button class="btn btn-danger" onclick="deleteReport(${report.id})">🗑️</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterReports() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    const filtered = allReports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm) ||
                             (report.subtitle && report.subtitle.toLowerCase().includes(searchTerm)) ||
                             (report.organization_name && report.organization_name.toLowerCase().includes(searchTerm));
        const matchesType = !typeFilter || report.report_type === typeFilter;
        const matchesStatus = !statusFilter || report.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    displayReportCards('allReportsList', filtered);
}

// ============= QUILL EDITORS =============

function initializeQuillEditors() {
    const editorIds = [
        'executiveSummaryEditor',
        'introductionEditor',
        'objectivesEditor',
        'methodologyEditor',
        'activitiesEditor',
        'resultsEditor',
        'challengesEditor',
        'learningsEditor',
        'nextStepsEditor',
        'conclusionEditor',
        'additionalContentEditor'
    ];

    editorIds.forEach(id => {
        const element = document.getElementById(id);
        if (element && !quillEditors[id]) {
            quillEditors[id] = new Quill(`#${id}`, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['clean']
                    ]
                }
            });
        }
    });
}

// ============= MODAL RELATÓRIO =============

function createNewReport() {
    currentReportId = null;
    document.getElementById('reportModalTitle').textContent = 'Novo Relatório';
    document.getElementById('reportForm').reset();
    document.getElementById('reportId').value = '';
    document.getElementById('exportPdfBtn').style.display = 'none';

    // Limpar editores
    Object.values(quillEditors).forEach(editor => {
        editor.setContents([]);
    });

    // Mostrar primeira tab
    showTab('info');

    document.getElementById('reportModal').style.display = 'block';
}

async function editReport(id) {
    try {
        const response = await fetch(`${API_URL}/reports/${id}`);
        const report = await response.json();

        currentReportId = id;
        document.getElementById('reportModalTitle').textContent = 'Editar Relatório';
        document.getElementById('reportId').value = report.id;

        // Preencher campos básicos
        document.getElementById('title').value = report.title || '';
        document.getElementById('subtitle').value = report.subtitle || '';
        document.getElementById('organizationName').value = report.organization_name || '';
        document.getElementById('projectName').value = report.project_name || '';
        document.getElementById('reportType').value = report.report_type || '';
        document.getElementById('status').value = report.status || 'draft';
        document.getElementById('author').value = report.author || '';

        // Datas
        if (report.period_start) {
            document.getElementById('periodStart').value = report.period_start.split('T')[0];
        }
        if (report.period_end) {
            document.getElementById('periodEnd').value = report.period_end.split('T')[0];
        }

        // Dados quantitativos
        document.getElementById('beneficiaries').value = report.beneficiaries || 0;
        document.getElementById('budgetTotal').value = report.budget_total || 0;
        document.getElementById('budgetUsed').value = report.budget_used || 0;

        // Preencher editores
        const editorFields = {
            'executiveSummaryEditor': report.executive_summary,
            'introductionEditor': report.introduction,
            'objectivesEditor': report.objectives,
            'methodologyEditor': report.methodology,
            'activitiesEditor': report.activities,
            'resultsEditor': report.results,
            'challengesEditor': report.challenges,
            'learningsEditor': report.learnings,
            'nextStepsEditor': report.next_steps,
            'conclusionEditor': report.conclusion,
            'additionalContentEditor': report.additional_content
        };

        Object.entries(editorFields).forEach(([editorId, content]) => {
            if (quillEditors[editorId] && content) {
                quillEditors[editorId].root.innerHTML = content;
            }
        });

        document.getElementById('exportPdfBtn').style.display = 'inline-block';
        document.getElementById('reportModal').style.display = 'block';
        showTab('info');

    } catch (error) {
        showNotification('Erro ao carregar relatório', 'error');
        console.error('Error:', error);
    }
}

function closeReportModal() {
    document.getElementById('reportModal').style.display = 'none';
}

async function saveReport(event) {
    event.preventDefault();

    const reportId = document.getElementById('reportId').value;

    // Coletar dados do formulário
    const data = {
        title: document.getElementById('title').value,
        subtitle: document.getElementById('subtitle').value || null,
        organization_name: document.getElementById('organizationName').value || null,
        project_name: document.getElementById('projectName').value || null,
        report_type: document.getElementById('reportType').value || null,
        status: document.getElementById('status').value,
        author: document.getElementById('author').value || null,
        period_start: document.getElementById('periodStart').value || null,
        period_end: document.getElementById('periodEnd').value || null,
        beneficiaries: parseInt(document.getElementById('beneficiaries').value) || 0,
        budget_total: parseFloat(document.getElementById('budgetTotal').value) || 0,
        budget_used: parseFloat(document.getElementById('budgetUsed').value) || 0,

        // Conteúdo dos editores
        executive_summary: quillEditors['executiveSummaryEditor'].root.innerHTML,
        introduction: quillEditors['introductionEditor'].root.innerHTML,
        objectives: quillEditors['objectivesEditor'].root.innerHTML,
        methodology: quillEditors['methodologyEditor'].root.innerHTML,
        activities: quillEditors['activitiesEditor'].root.innerHTML,
        results: quillEditors['resultsEditor'].root.innerHTML,
        challenges: quillEditors['challengesEditor'].root.innerHTML,
        learnings: quillEditors['learningsEditor'].root.innerHTML,
        next_steps: quillEditors['nextStepsEditor'].root.innerHTML,
        conclusion: quillEditors['conclusionEditor'].root.innerHTML,
        additional_content: quillEditors['additionalContentEditor'].root.innerHTML
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
            const savedReport = await response.json();
            currentReportId = savedReport.id;
            document.getElementById('reportId').value = savedReport.id;
            document.getElementById('exportPdfBtn').style.display = 'inline-block';

            showNotification(reportId ? 'Relatório atualizado com sucesso' : 'Relatório criado com sucesso', 'success');
            loadDashboard();
            loadAllReports();
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
            loadDashboard();
            loadAllReports();
        } else {
            showNotification('Erro ao deletar relatório', 'error');
        }
    } catch (error) {
        showNotification('Erro ao deletar relatório', 'error');
        console.error('Error:', error);
    }
}

async function exportReportPDF() {
    const reportId = currentReportId || document.getElementById('reportId').value;
    if (!reportId) {
        showNotification('Salve o relatório antes de exportar', 'error');
        return;
    }

    exportSinglePDF(reportId);
}

async function exportSinglePDF(reportId) {
    try {
        const response = await fetch(`${API_URL}/reports/${reportId}/pdf`);
        if (!response.ok) {
            showNotification('Erro ao gerar PDF', 'error');
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_${reportId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showNotification('PDF gerado com sucesso', 'success');
    } catch (error) {
        showNotification('Erro ao gerar PDF', 'error');
        console.error('Error:', error);
    }
}

// ============= TABS RELATÓRIO =============

function showTab(tabName) {
    // Desativar todas as tabs
    document.querySelectorAll('.tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Ativar tab selecionada
    event.target.classList.add('active');
    document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
}

// ============= CONFIGURAÇÕES =============

async function loadConfigs() {
    try {
        const response = await fetch(`${API_URL}/configs`);
        allConfigs = await response.json();
        displayConfigs();
    } catch (error) {
        showNotification('Erro ao carregar configurações', 'error');
        console.error('Error:', error);
    }
}

function displayConfigs() {
    const container = document.getElementById('configsList');
    container.innerHTML = '';

    if (allConfigs.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #7f8c8d;">Nenhuma configuração encontrada</p>';
        return;
    }

    allConfigs.forEach(config => {
        const card = document.createElement('div');
        card.className = 'config-card';

        card.innerHTML = `
            <div class="config-card-header">
                <div class="config-card-title">${config.name}</div>
                ${config.is_default ? '<span class="config-default-badge">Padrão</span>' : ''}
            </div>
            <div class="config-card-body">
                <p><strong>Tamanho:</strong> ${config.page_size}</p>
                <p><strong>Capa:</strong> ${config.cover_enabled ? 'Habilitada' : 'Desabilitada'}</p>
                <p><strong>Cabeçalho:</strong> ${config.header_enabled ? config.header_text || 'Habilitado' : 'Desabilitado'}</p>
                <p><strong>Rodapé:</strong> ${config.footer_enabled ? config.footer_text || 'Habilitado' : 'Desabilitado'}</p>
            </div>
            <div class="config-card-actions">
                <button class="btn btn-edit" onclick="editConfig(${config.id})">✏️ Editar</button>
                ${!config.is_default ? `<button class="btn btn-danger" onclick="deleteConfig(${config.id})">🗑️ Deletar</button>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// ============= MODAL CONFIGURAÇÃO =============

function createNewConfig() {
    document.getElementById('configModalTitle').textContent = 'Nova Configuração';
    document.getElementById('configForm').reset();
    document.getElementById('configId').value = '';
    showConfigTab('cover');
    document.getElementById('configModal').style.display = 'block';
}

async function editConfig(id) {
    try {
        const response = await fetch(`${API_URL}/configs/${id}`);
        const config = await response.json();

        document.getElementById('configModalTitle').textContent = 'Editar Configuração';
        document.getElementById('configId').value = config.id;
        document.getElementById('configName').value = config.name;
        document.getElementById('configIsDefault').checked = config.is_default;

        // Capa
        document.getElementById('coverEnabled').checked = config.cover_enabled;
        document.getElementById('coverTitle').value = config.cover_title || '';
        document.getElementById('coverSubtitle').value = config.cover_subtitle || '';
        document.getElementById('coverOrganization').value = config.cover_organization || '';
        document.getElementById('coverAddress').value = config.cover_address || '';
        document.getElementById('coverContact').value = config.cover_contact || '';
        document.getElementById('coverFooterText').value = config.cover_footer_text || '';

        // Cabeçalho
        document.getElementById('headerEnabled').checked = config.header_enabled;
        document.getElementById('headerText').value = config.header_text || '';
        document.getElementById('headerAlign').value = config.header_align;

        // Rodapé
        document.getElementById('footerEnabled').checked = config.footer_enabled;
        document.getElementById('footerText').value = config.footer_text || '';
        document.getElementById('footerAlign').value = config.footer_align;
        document.getElementById('footerShowPageNumber').checked = config.footer_show_page_number;
        document.getElementById('footerPageFormat').value = config.footer_page_format;

        // Página
        document.getElementById('pageSize').value = config.page_size;
        document.getElementById('marginTop').value = config.page_margin_top;
        document.getElementById('marginBottom').value = config.page_margin_bottom;
        document.getElementById('marginLeft').value = config.page_margin_left;
        document.getElementById('marginRight').value = config.page_margin_right;
        document.getElementById('fontSizeNormal').value = config.font_size_normal;
        document.getElementById('fontSizeH1').value = config.font_size_heading1;
        document.getElementById('fontSizeH2').value = config.font_size_heading2;
        document.getElementById('primaryColor').value = config.primary_color;
        document.getElementById('secondaryColor').value = config.secondary_color;

        showConfigTab('cover');
        document.getElementById('configModal').style.display = 'block';
    } catch (error) {
        showNotification('Erro ao carregar configuração', 'error');
        console.error('Error:', error);
    }
}

function closeConfigModal() {
    document.getElementById('configModal').style.display = 'none';
}

async function saveConfig(event) {
    event.preventDefault();

    const configId = document.getElementById('configId').value;

    const data = {
        name: document.getElementById('configName').value,
        is_default: document.getElementById('configIsDefault').checked,

        cover_enabled: document.getElementById('coverEnabled').checked,
        cover_title: document.getElementById('coverTitle').value || null,
        cover_subtitle: document.getElementById('coverSubtitle').value || null,
        cover_organization: document.getElementById('coverOrganization').value || null,
        cover_address: document.getElementById('coverAddress').value || null,
        cover_contact: document.getElementById('coverContact').value || null,
        cover_footer_text: document.getElementById('coverFooterText').value || null,

        header_enabled: document.getElementById('headerEnabled').checked,
        header_text: document.getElementById('headerText').value || null,
        header_align: document.getElementById('headerAlign').value,

        footer_enabled: document.getElementById('footerEnabled').checked,
        footer_text: document.getElementById('footerText').value || null,
        footer_align: document.getElementById('footerAlign').value,
        footer_show_page_number: document.getElementById('footerShowPageNumber').checked,
        footer_page_format: document.getElementById('footerPageFormat').value,

        page_size: document.getElementById('pageSize').value,
        page_margin_top: parseFloat(document.getElementById('marginTop').value),
        page_margin_bottom: parseFloat(document.getElementById('marginBottom').value),
        page_margin_left: parseFloat(document.getElementById('marginLeft').value),
        page_margin_right: parseFloat(document.getElementById('marginRight').value),

        font_size_normal: parseInt(document.getElementById('fontSizeNormal').value),
        font_size_heading1: parseInt(document.getElementById('fontSizeH1').value),
        font_size_heading2: parseInt(document.getElementById('fontSizeH2').value),

        primary_color: document.getElementById('primaryColor').value,
        secondary_color: document.getElementById('secondaryColor').value
    };

    try {
        let response;
        if (configId) {
            response = await fetch(`${API_URL}/configs/${configId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            response = await fetch(`${API_URL}/configs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        if (response.ok) {
            showNotification(configId ? 'Configuração atualizada com sucesso' : 'Configuração criada com sucesso', 'success');
            closeConfigModal();
            loadConfigs();
        } else {
            showNotification('Erro ao salvar configuração', 'error');
        }
    } catch (error) {
        showNotification('Erro ao salvar configuração', 'error');
        console.error('Error:', error);
    }
}

async function deleteConfig(id) {
    if (!confirm('Tem certeza que deseja deletar esta configuração?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/configs/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Configuração deletada com sucesso', 'success');
            loadConfigs();
        } else {
            const error = await response.json();
            showNotification(error.error || 'Erro ao deletar configuração', 'error');
        }
    } catch (error) {
        showNotification('Erro ao deletar configuração', 'error');
        console.error('Error:', error);
    }
}

// ============= TABS CONFIGURAÇÃO =============

function showConfigTab(tabName) {
    // Desativar todas as tabs
    document.querySelectorAll('#configModal .tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('#configModal .tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Ativar tab selecionada
    event.target.classList.add('active');
    document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
}

// ============= UTILIDADES =============

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
        'draft': 'Rascunho',
        'review': 'Em Revisão',
        'approved': 'Aprovado',
        'published': 'Publicado'
    };
    return translations[status] || status;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Fechar modals ao clicar fora
window.onclick = function(event) {
    const reportModal = document.getElementById('reportModal');
    const configModal = document.getElementById('configModal');

    if (event.target === reportModal) {
        closeReportModal();
    }
    if (event.target === configModal) {
        closeConfigModal();
    }
}
