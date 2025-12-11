# Sistema de Relatórios

Sistema completo de gerenciamento de relatórios com backend em Flask e frontend em HTML/CSS/JavaScript.

## Funcionalidades

- ✅ Dashboard com estatísticas em tempo real
- ✅ CRUD completo de relatórios
- ✅ Filtros por categoria, status e busca textual
- ✅ Gráficos interativos (status e categorias)
- ✅ Exportação para PDF
- ✅ Exportação para Excel
- ✅ Interface responsiva e moderna
- ✅ API RESTful

## Tecnologias Utilizadas

### Backend
- Python 3.8+
- Flask (API REST)
- SQLAlchemy (ORM)
- SQLite (Banco de dados)
- ReportLab (Geração de PDF)
- OpenPyXL (Geração de Excel)

### Frontend
- HTML5
- CSS3 (Design responsivo)
- JavaScript (Vanilla)
- Chart.js (Gráficos)

## Estrutura do Projeto

```
report/
├── backend/
│   ├── app.py              # Aplicação Flask principal
│   ├── models.py           # Modelos do banco de dados
│   ├── database.py         # Configuração do banco
│   └── requirements.txt    # Dependências Python
├── frontend/
│   ├── index.html         # Página principal
│   ├── css/
│   │   └── style.css      # Estilos
│   └── js/
│       └── app.js         # Lógica do frontend
└── README.md
```

## Instalação e Execução

### 1. Backend

```bash
# Navegue até a pasta backend
cd backend

# Crie um ambiente virtual (opcional, mas recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
python app.py
```

O servidor estará disponível em: `http://localhost:5000`

### 2. Frontend

Abra o arquivo `frontend/index.html` em um navegador web moderno, ou use um servidor HTTP local:

```bash
# Usando Python
cd frontend
python -m http.server 8000

# Acesse: http://localhost:8000
```

## API Endpoints

### Relatórios

- `GET /api/reports` - Listar todos os relatórios
- `POST /api/reports` - Criar novo relatório
- `GET /api/reports/:id` - Obter relatório específico
- `PUT /api/reports/:id` - Atualizar relatório
- `DELETE /api/reports/:id` - Deletar relatório

### Estatísticas

- `GET /api/stats` - Obter estatísticas gerais

### Exportação

- `GET /api/reports/export/pdf` - Exportar relatórios em PDF
- `GET /api/reports/export/excel` - Exportar relatórios em Excel

## Exemplo de Uso da API

### Criar um relatório

```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Relatório de Vendas Q4",
    "description": "Análise das vendas do quarto trimestre",
    "category": "vendas",
    "status": "pending",
    "value": 15000.50
  }'
```

### Listar relatórios

```bash
curl http://localhost:5000/api/reports
```

### Filtrar por categoria

```bash
curl http://localhost:5000/api/reports?category=vendas
```

## Categorias Disponíveis

- Vendas
- Financeiro
- Marketing
- Operacional

## Status Disponíveis

- Pendente (pending)
- Em Progresso (in_progress)
- Concluído (completed)
- Cancelado (cancelled)

## Recursos do Frontend

### Dashboard
- Visualização de métricas principais
- Gráficos interativos
- Estatísticas em tempo real

### Gerenciamento de Relatórios
- Interface intuitiva para criar/editar relatórios
- Filtros avançados
- Busca em tempo real

### Exportação
- PDF com formatação profissional
- Excel com colunas organizadas

## Desenvolvimento

### Banco de Dados

O sistema usa SQLite por padrão. O banco é criado automaticamente na primeira execução em `backend/reports.db`.

### Personalização

- **Backend**: Edite `backend/app.py` para adicionar novos endpoints
- **Frontend**: Modifique `frontend/js/app.js` para novas funcionalidades
- **Estilos**: Customize `frontend/css/style.css` com suas cores e layout

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## Suporte

Para reportar bugs ou solicitar funcionalidades, abra uma issue no repositório.
