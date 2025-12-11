# Sistema de Relatórios para ONGs

Sistema completo e profissional de geração de relatórios narrativos para organizações não governamentais, com editor de texto rico, campos totalmente editáveis, e personalização de documentos (cabeçalho, rodapé e página de rosto).

## Características Principais

### Relatórios Narrativos Completos
- ✅ Editor de texto rico (WYSIWYG) com Quill.js
- ✅ Múltiplas seções editáveis: Resumo Executivo, Introdução, Objetivos, Metodologia, Atividades, Resultados, Desafios, Aprendizados, Próximos Passos e Conclusão
- ✅ Campos customizáveis para cada projeto e organização
- ✅ Dados quantitativos (beneficiários, orçamento)
- ✅ Gestão de status (Rascunho, Em Revisão, Aprovado, Publicado)

### Personalização de Documentos
- ✅ Página de rosto personalizável com logo, endereço e contato
- ✅ Cabeçalho customizável com alinhamento configurável
- ✅ Rodapé configurável com numeração de páginas automática
- ✅ Formato de página (A4 ou Letter)
- ✅ Margens ajustáveis
- ✅ Tamanhos de fonte personalizados
- ✅ Cores primárias e secundárias configuráveis

### Exportação Profissional
- ✅ Geração de PDF com todas as configurações aplicadas
- ✅ Numeração automática de páginas
- ✅ Layout profissional e formatação adequada
- ✅ Suporte a múltiplas configurações de documento

### Interface Moderna
- ✅ Dashboard com estatísticas
- ✅ Interface responsiva e intuitiva
- ✅ Sistema de abas para organização
- ✅ Filtros avançados
- ✅ Design específico para ONGs

## Tecnologias Utilizadas

### Backend
- Python 3.8+
- Flask (API REST)
- SQLAlchemy (ORM)
- SQLite (Banco de dados)
- ReportLab (Geração de PDF)
- OpenPyXL (Exportação Excel)

### Frontend
- HTML5
- CSS3 (Design responsivo)
- JavaScript (Vanilla)
- Quill.js (Editor de texto rico)

## Estrutura do Projeto

```
report/
├── backend/
│   ├── app.py              # Aplicação Flask principal com endpoints
│   ├── models.py           # Modelos de dados (Report, ReportConfig)
│   ├── database.py         # Configuração do banco de dados
│   ├── pdf_generator.py    # Gerador de PDF com customizações
│   └── requirements.txt    # Dependências Python
├── frontend/
│   ├── index.html         # Interface principal com modals
│   ├── css/
│   │   └── style.css      # Estilos personalizados
│   └── js/
│       └── app.js         # Lógica da aplicação
├── .gitignore
└── README.md
```

## Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/pandaoproprio/report.git
cd report
git checkout claude/locate-system-01S8fKHMCEGhK8Hnj4FA9EQd
```

### 2. Configurar Backend

```bash
cd backend

# Criar ambiente virtual (recomendado)
python -m venv venv

# Ativar ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
python app.py
```

O servidor estará disponível em: `http://localhost:5000`

### 3. Configurar Frontend

Abra o arquivo `frontend/index.html` em um navegador moderno, ou use um servidor HTTP:

```bash
cd frontend
python -m http.server 8000

# Acesse: http://localhost:8000
```

## Uso do Sistema

### 1. Criar um Novo Relatório

1. Clique em "+ Novo Relatório" no Dashboard ou na página de Relatórios
2. Preencha as informações básicas:
   - Título e Subtítulo
   - Nome da Organização e Projeto
   - Tipo de Relatório (mensal, trimestral, anual, atividade, impacto)
   - Período de referência
   - Autor
3. Navegue para a aba "Conteúdo" e escreva o conteúdo narrativo usando os editores de texto rico
4. Na aba "Dados Quantitativos", insira informações numéricas
5. Clique em "Salvar Relatório"

### 2. Gerar PDF

1. Após salvar o relatório, clique em "Exportar PDF" no modal de edição
2. Ou clique no botão "📄 PDF" no card do relatório
3. O PDF será gerado com todas as configurações aplicadas

### 3. Configurar Documento

1. Acesse a aba "Configurações" no menu superior
2. Clique em "+ Nova Configuração" ou edite uma existente
3. Configure:
   - **Capa**: Título, organização, endereço, contato
   - **Cabeçalho**: Texto e alinhamento
   - **Rodapé**: Texto, alinhamento e formato de numeração
   - **Página**: Tamanho, margens, fontes e cores
4. Marque como "Padrão" se desejar usar em novos relatórios

## API Endpoints

### Relatórios

- `GET /api/reports` - Listar todos os relatórios
- `POST /api/reports` - Criar novo relatório
- `GET /api/reports/:id` - Obter relatório específico
- `PUT /api/reports/:id` - Atualizar relatório
- `DELETE /api/reports/:id` - Deletar relatório
- `GET /api/reports/:id/pdf` - Exportar relatório em PDF

### Configurações

- `GET /api/configs` - Listar todas as configurações
- `POST /api/configs` - Criar nova configuração
- `GET /api/configs/:id` - Obter configuração específica
- `PUT /api/configs/:id` - Atualizar configuração
- `DELETE /api/configs/:id` - Deletar configuração

### Estatísticas

- `GET /api/stats` - Obter estatísticas gerais

## Exemplo de Uso da API

### Criar um relatório

```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Relatório de Atividades - Janeiro 2024",
    "subtitle": "Projeto Educação para Todos",
    "organization_name": "Instituto Esperança",
    "project_name": "Educação para Todos",
    "report_type": "mensal",
    "period_start": "2024-01-01",
    "period_end": "2024-01-31",
    "author": "Maria Silva",
    "status": "draft",
    "introduction": "<p>Este relatório apresenta...</p>",
    "activities": "<p>Durante o mês foram realizadas...</p>",
    "results": "<p>Os principais resultados alcançados foram...</p>",
    "beneficiaries": 150,
    "budget_used": 25000.00,
    "budget_total": 30000.00
  }'
```

### Exportar PDF

```bash
curl -X GET http://localhost:5000/api/reports/1/pdf --output relatorio.pdf
```

## Seções Disponíveis nos Relatórios

1. **Resumo Executivo** - Visão geral do relatório
2. **Introdução** - Contexto e apresentação
3. **Objetivos** - Metas e objetivos do período
4. **Metodologia** - Métodos e abordagens utilizados
5. **Atividades Realizadas** - Descrição detalhada das atividades
6. **Resultados Alcançados** - Conquistas e impactos
7. **Desafios e Dificuldades** - Obstáculos encontrados
8. **Aprendizados** - Lições aprendidas
9. **Próximos Passos** - Planejamento futuro
10. **Conclusão** - Considerações finais
11. **Conteúdo Adicional** - Informações complementares

## Tipos de Relatórios

- **Mensal** - Relatório de atividades mensais
- **Trimestral** - Relatório trimestral
- **Anual** - Relatório anual de atividades
- **Atividade** - Relatório de atividade específica
- **Impacto** - Relatório de impacto social

## Status dos Relatórios

- **Rascunho** (draft) - Relatório em elaboração
- **Em Revisão** (review) - Aguardando revisão
- **Aprovado** (approved) - Relatório aprovado
- **Publicado** (published) - Relatório publicado

## Personalização

### Cores

As cores primárias e secundárias podem ser ajustadas na configuração de documento para refletir a identidade visual da organização.

### Fontes

Tamanhos de fonte configuráveis:
- Texto normal: 8-16pt
- Título 1: 12-24pt
- Título 2: 10-20pt

### Margens

Margens ajustáveis em centímetros para cada lado da página.

## Banco de Dados

O sistema usa SQLite por padrão. O banco é criado automaticamente na primeira execução em `backend/reports.db`.

### Modelos

- **Report**: Armazena os dados do relatório incluindo todos os campos narrativos e quantitativos
- **ReportConfig**: Armazena configurações de documento (capa, cabeçalho, rodapé, página)

## Desenvolvimento

### Adicionar Novas Seções

Para adicionar uma nova seção ao relatório:

1. Adicione o campo no modelo `Report` em `backend/models.py`
2. Atualize os endpoints em `backend/app.py`
3. Adicione o editor no HTML em `frontend/index.html`
4. Adicione a lógica em `frontend/js/app.js`
5. Atualize o gerador de PDF em `backend/pdf_generator.py`

### Customizar Geração de PDF

Edite `backend/pdf_generator.py` para ajustar:
- Estilos de texto
- Layout de página
- Tabelas e gráficos
- Formatação especial

## Problemas Comuns

### PDF não está gerando

- Verifique se o ReportLab está instalado corretamente
- Verifique logs do servidor Flask para erros

### Editor de texto não carrega

- Verifique a conexão com CDN do Quill.js
- Abra o console do navegador para ver erros

### Banco de dados não inicializa

- Verifique permissões de escrita na pasta `backend/`
- Delete o arquivo `reports.db` e reinicie o servidor

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

## Créditos

Desenvolvido para organizações não governamentais que precisam de relatórios profissionais e personalizáveis.
