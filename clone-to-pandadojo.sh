#!/bin/bash

# 🐼 Script para Clonar Panda Dojo para Novo Repositório
# Autor: AnnITech - IT Solutions

set -e  # Parar em caso de erro

echo "🐼 Panda Dojo - Clone para Novo Repositório"
echo "=============================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ] || [ ! -d "prisma" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto Panda Dojo${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  ATENÇÃO: Certifique-se que você já criou o repositório no GitHub:${NC}"
echo "   https://github.com/pandaoproprio/pandadojo"
echo ""
echo "Pressione ENTER para continuar ou CTRL+C para cancelar..."
read

# Verificar se o remote já existe
if git remote | grep -q "^pandadojo$"; then
    echo -e "${YELLOW}Remote 'pandadojo' já existe. Removendo...${NC}"
    git remote remove pandadojo
fi

# Adicionar novo remote
echo -e "${GREEN}✓ Adicionando remote 'pandadojo'...${NC}"
git remote add pandadojo https://github.com/pandaoproprio/pandadojo.git

# Verificar branch atual
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${GREEN}✓ Branch atual: ${CURRENT_BRANCH}${NC}"

# Push para main
echo ""
echo -e "${YELLOW}Fazendo push para o novo repositório...${NC}"
git push pandadojo ${CURRENT_BRANCH}:main -u

# Verificar se deu certo
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}✅ Sucesso!${NC}"
    echo -e "${GREEN}================================${NC}"
    echo ""
    echo "O Panda Dojo foi clonado para:"
    echo "🔗 https://github.com/pandaoproprio/pandadojo"
    echo ""
    echo "Próximos passos:"
    echo "1. Acesse: https://github.com/pandaoproprio/pandadojo"
    echo "2. Configure a branch 'main' como padrão em Settings → Branches"
    echo "3. Faça deploy na Vercel usando o novo repositório"
    echo ""
    echo "Comandos úteis:"
    echo "  git remote -v                    # Ver todos os remotes"
    echo "  git push pandadojo main          # Push futuro"
    echo ""
else
    echo ""
    echo -e "${RED}================================${NC}"
    echo -e "${RED}❌ Erro no push${NC}"
    echo -e "${RED}================================${NC}"
    echo ""
    echo "Possíveis causas:"
    echo "1. O repositório não foi criado no GitHub ainda"
    echo "2. Você não tem permissão de escrita"
    echo "3. Precisa autenticar no GitHub"
    echo ""
    echo "Solução:"
    echo "1. Crie o repositório: https://github.com/new"
    echo "2. Nome: pandadojo"
    echo "3. NÃO inicialize com README"
    echo "4. Execute este script novamente"
    echo ""
fi
