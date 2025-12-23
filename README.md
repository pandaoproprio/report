# 🐼 Panda Dojo - Sistema de Gestão para Academias de Artes Marciais

Sistema SaaS multitenant completo e inovador para gestão de academias de artes marciais, desenvolvido pela **AnnITech - IT Solutions**. Moderno, intuitivo, responsivo e focado em maximizar a rentabilidade das academias através de automação inteligente e experiência excepcional do usuário.

## 🚀 Características Principais

### 💡 Multitenancy Completo
- Isolamento total de dados entre academias
- Subdomínios personalizados (ex: minhaacademia.pandadojo.com)
- Customização de marca (logo, cores, domínio próprio)
- Base de dados com segregação por tenant_id

### 🎯 RBAC (Controle de Acesso Baseado em Funções)
- **Super Admin** (AnnITech): gestão global do sistema
- **Admin Academia**: gestão completa da academia
- **Instrutor/Professor**: visualiza alunos, frequência, graduações
- **Recepcionista**: check-in, matrículas, mensalidades
- **Aluno**: área pessoal, treinos, pagamentos
- **Responsável**: acompanha alunos menores de idade

### 🌐 Landing Page Pública Conversiva
- Design moderno com vídeo hero section
- **Agendamento de aulas experimentais** com calendário em tempo real
- **Calendário público de eventos** e campeonatos
- Grade de horários das turmas
- Seção de instrutores e depoimentos
- Planos e preços transparentes
- Chatbot com IA integrado
- FAQ interativo

### 📊 Painel Administrativo Completo
- Dashboard com KPIs em tempo real
- Gestão de alunos, leads e instrutores
- Sistema financeiro com múltiplos métodos de pagamento
- Controle de frequência com check-in por QR Code
- Gestão de aulas e horários
- **Módulo completo de eventos e campeonatos**
- Sistema de graduações e faixas
- Relatórios e analytics avançados

### 🎉 Eventos e Campeonatos
- Criação de eventos com categorias customizadas
- Inscrições online com pagamento integrado
- Calendário público na landing page
- Sistema de chaveamento automático para campeonatos
- Certificados digitais automáticos
- Galeria de fotos e resultados
- Transmissão ao vivo (add-on)

### 💰 Sistema Financeiro Robusto
- Planos de mensalidade configuráveis
- Assinaturas recorrentes via Stripe
- Múltiplas formas de pagamento (cartão, PIX, boleto)
- Controle de inadimplência com automação
- Relatórios financeiros completos
- Comissões para professores

### 📱 Área do Aluno
- Dashboard pessoal intuitivo
- Inscrição em eventos com pagamento online
- Histórico de frequência e pagamentos
- Certificados digitais
- Plano de treino personalizado com IA
- Programa de fidelidade e gamificação

### 🤖 IA e Automação
- Chatbot inteligente multicanal
- Predição de churn (alunos em risco)
- Recomendações de upsell
- Insights automáticos
- Geração de conteúdo para redes sociais

## 🛠️ Stack Tecnológica

### Frontend
- **Framework:** Next.js 14 (App Router) com TypeScript
- **Estilização:** TailwindCSS + Shadcn/ui
- **Estado:** Zustand + React Query (TanStack Query)
- **Formulários:** React Hook Form + Zod
- **Calendário:** React Big Calendar
- **Gráficos:** Recharts
- **Animações:** Framer Motion

### Backend
- **Runtime:** Node.js 18+
- **API:** Next.js API Routes
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL 15+

### Autenticação & Pagamentos
- **Auth:** NextAuth.js v5
- **Pagamentos:** Stripe + Mercado Pago
- **Email:** Resend + React Email
- **SMS/WhatsApp:** Twilio

### IA & Integrações
- **LLM:** OpenAI GPT-4
- **Upload:** Uploadthing
- **QR Code:** qrcode.react

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL 15+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/pandaoproprio/report.git
cd report
git checkout claude/panda-dojo-system-7Fwnl
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

Edite `.env.local` e configure:
- `DATABASE_URL`: URL do PostgreSQL
- `NEXTAUTH_SECRET`: Gere com `openssl rand -base64 32`
- `NEXTAUTH_URL`: URL da aplicação
- Credenciais de serviços (Stripe, Resend, Twilio, OpenAI, etc.)

### 4. Configure o banco de dados
```bash
npx prisma db push
npm run db:seed
```

### 5. Execute em desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🏗️ Estrutura do Projeto

```
panda-dojo/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Rotas de autenticação
│   ├── (public)/            # Landing pages públicas
│   ├── (dashboard)/         # Dashboards (admin, aluno, etc.)
│   ├── api/                 # API Routes
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # Componentes Shadcn
│   ├── landing/             # Componentes da landing page
│   ├── dashboard/           # Componentes dos dashboards
│   ├── events/              # Componentes de eventos
│   ├── calendar/            # Componentes de calendário
│   └── shared/              # Componentes compartilhados
├── lib/
│   ├── prisma.ts           # Cliente Prisma
│   ├── auth.ts             # Configuração NextAuth
│   ├── stripe.ts           # Cliente Stripe
│   ├── constants.ts        # Constantes do sistema
│   └── utils.ts            # Utilitários
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   └── seed.ts             # Dados de exemplo
├── public/                  # Assets estáticos
└── types/                   # Tipos TypeScript
```

## 💎 Planos e Preços

### Planos Principais
- **Starter**: R$ 97/mês - Até 50 alunos, 5 eventos/mês
- **Growth**: R$ 197/mês - Até 200 alunos, 15 eventos/mês
- **Professional**: R$ 397/mês - Até 500 alunos, 30 eventos/mês
- **Enterprise**: R$ 697/mês - Ilimitado

### Add-ons Opcionais
- Campeonatos Avançados: +R$ 99/mês
- IA Premium: +R$ 79/mês
- App White-Label: +R$ 299/mês
- Suporte Prioritário: +R$ 149/mês
- Transmissão ao Vivo: +R$ 199/mês

## 🎨 Funcionalidades Implementadas

### ✅ Fase 1: Foundation (Completo)
- ✅ Setup Next.js 14 com TypeScript
- ✅ Prisma ORM + Schema completo multitenant
- ✅ Sistema multitenant com tenant_id
- ✅ TailwindCSS + Shadcn/ui configurado
- ✅ Componentes UI base (Button, Card, Input, Badge, Dialog, Accordion, Label)

### ✅ Fase 2: Autenticação & RBAC (Completo)
- ✅ NextAuth.js v5 configurado
- ✅ Login com credenciais + OAuth (Google/Facebook)
- ✅ Registro com criação automática de tenant
- ✅ 6 níveis de RBAC (Super Admin → Guardian)
- ✅ Middleware de proteção de rotas
- ✅ API de registro com validação Zod

### ✅ Fase 3: Landing Page (Completo)
- ✅ Navbar responsivo com menu mobile
- ✅ Hero section com gradientes e CTAs
- ✅ Seção de modalidades (8 artes marciais)
- ✅ Seção de eventos com inscrições
- ✅ Grade de horários semanal
- ✅ Seção de instrutores
- ✅ Depoimentos com avaliações
- ✅ Planos e preços (3 opções)
- ✅ FAQ com Accordion
- ✅ CTA final e Footer completo

### ✅ Fase 4: Dashboard Admin (Básico)
- ✅ Layout com sidebar de navegação
- ✅ Dashboard com KPIs (alunos, receita, eventos)
- ✅ Cards de atividade recente
- ✅ Alertas e notificações
- ✅ Links para módulos futuros

### 📋 Próximas Implementações (Roadmap)
- ⏳ CRUD completo de Alunos
- ⏳ Gestão de Leads com follow-up
- ⏳ Módulo de Eventos completo
- ⏳ Sistema de Inscrições em eventos
- ⏳ Integração Stripe para pagamentos
- ⏳ Check-in por QR Code
- ⏳ Área do Aluno self-service
- ⏳ Sistema de chaveamento para campeonatos
- ⏳ Chatbot com IA (OpenAI)
- ⏳ Sistema de notificações (Email/SMS)
- ⏳ Seed data completo

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é proprietário da **AnnITech - IT Solutions**.

## 🆘 Suporte

Para reportar bugs ou solicitar funcionalidades:
- Abra uma issue no repositório
- Entre em contato: suporte@annitech.com

## 🎯 Roadmap

- [ ] Landing Page completa
- [ ] Dashboard Admin
- [ ] Módulo de Eventos
- [ ] Sistema Financeiro (Stripe + MercadoPago)
- [ ] Check-in QR Code
- [ ] Área do Aluno
- [ ] Chatbot com IA
- [ ] App Mobile (React Native)
- [ ] Marketplace de produtos
- [ ] Ranking nacional de atletas
- [ ] Federação virtual

---

**Desenvolvido com ❤️ pela AnnITech - IT Solutions**

🐼 Revolucionando a gestão de academias de artes marciais!
