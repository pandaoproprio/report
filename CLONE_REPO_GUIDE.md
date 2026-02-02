# 🚀 Como Clonar o Panda Dojo para Novo Repositório

## Método 1: Via GitHub Web (Mais Fácil)

### Passo 1: Crie o Repositório no GitHub

1. Acesse: https://github.com/new
2. Configure:
   - **Owner:** pandaoproprio
   - **Repository name:** pandadojo
   - **Description:** Sistema SaaS para gestão de academias de artes marciais
   - **Visibility:** Public (ou Private se preferir)
   - ⚠️ **NÃO** marque "Add a README file"
   - ⚠️ **NÃO** adicione .gitignore
   - ⚠️ **NÃO** escolha licença
3. Clique em **"Create repository"**

### Passo 2: Execute os Comandos Localmente

No terminal, dentro da pasta do projeto:

```bash
# 1. Adicione o novo repositório como remote
git remote add pandadojo https://github.com/pandaoproprio/pandadojo.git

# 2. Push da branch atual para main do novo repo
git push pandadojo claude/panda-dojo-system-7Fwnl:main -u

# 3. (Opcional) Push de todas as branches
git push pandadojo --all

# 4. (Opcional) Push de todas as tags
git push pandadojo --tags
```

✅ **Pronto!** O código estará em: https://github.com/pandaoproprio/pandadojo

---

## Método 2: Via GitHub CLI (gh)

Se você tem o GitHub CLI instalado:

```bash
# 1. Crie o repositório
gh repo create pandaoproprio/pandadojo --public --source=. --remote=pandadojo

# 2. Push do código
git push pandadojo claude/panda-dojo-system-7Fwnl:main -u
```

---

## Método 3: Fork do Repositório Atual

1. Acesse: https://github.com/pandaoproprio/report
2. Clique em **"Fork"**
3. Configure:
   - Owner: pandaoproprio
   - Repository name: **pandadojo**
4. Desmarque "Copy the main branch only"
5. Clique em **"Create fork"**

---

## Verificar se Funcionou

```bash
# Verificar remotes
git remote -v

# Deve mostrar:
# origin     https://github.com/pandaoproprio/report.git
# pandadojo  https://github.com/pandaoproprio/pandadojo.git

# Ver branches no novo repo
git ls-remote pandadojo
```

---

## Configurar Branch Padrão no GitHub

Após o push, acesse o novo repositório:

1. Vá em **Settings** → **Branches**
2. Em "Default branch", clique em **Switch to another branch**
3. Selecione **main**
4. Clique em **Update**

---

## Estrutura Final

```
Repositório Antigo:
https://github.com/pandaoproprio/report
└── Branch: claude/panda-dojo-system-7Fwnl

Repositório Novo:
https://github.com/pandaoproprio/pandadojo
└── Branch: main (código do Panda Dojo)
```

---

## Comandos Úteis

```bash
# Ver todos os remotes
git remote -v

# Remover remote antigo (se quiser)
git remote remove origin

# Renomear remote
git remote rename pandadojo origin

# Atualizar URL do remote
git remote set-url pandadojo https://github.com/pandaoproprio/pandadojo.git

# Push de uma branch específica
git push pandadojo nome-da-branch

# Clonar o novo repositório (em outro local)
git clone https://github.com/pandaoproprio/pandadojo.git
```

---

## Atualizar README no Novo Repositório

Após o push, edite o README para remover referências ao repositório antigo:

```bash
# Clone o novo repo
git clone https://github.com/pandaoproprio/pandadojo.git
cd pandadojo

# Edite o README.md
# Mude todas as referências de 'report' para 'pandadojo'

# Commit e push
git add README.md
git commit -m "Atualiza README para novo repositório"
git push origin main
```

---

## Deploy na Vercel com Novo Repositório

1. Acesse: https://vercel.com/dashboard
2. Clique em **"Add New"** → **"Project"**
3. Selecione **pandaoproprio/pandadojo**
4. Branch: **main**
5. Configure as variáveis de ambiente
6. Deploy! 🚀

---

## Troubleshooting

### Erro: "Permission denied"
```bash
# Configure suas credenciais do GitHub
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Use HTTPS com token ou SSH
```

### Erro: "Repository not found"
- Certifique-se que criou o repositório no GitHub primeiro
- Verifique se o nome está correto: `pandadojo` (tudo minúsculo, sem espaços)

### Erro: "Updates were rejected"
```bash
# Force push (cuidado!)
git push pandadojo claude/panda-dojo-system-7Fwnl:main -f
```

---

## 🎯 Checklist

- [ ] Repositório criado no GitHub (pandadojo)
- [ ] Remote adicionado localmente
- [ ] Push realizado com sucesso
- [ ] Código visível no GitHub
- [ ] Branch padrão configurada (main)
- [ ] README atualizado
- [ ] Deploy na Vercel configurado

---

**Pronto! Seu Panda Dojo agora tem um repositório próprio!** 🐼

Qualquer dúvida, me avise!
