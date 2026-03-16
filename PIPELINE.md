# 🚀 CI/CD Pipeline - Playwright API Tests

## 📋 Overview

Este pipeline automatiza a execução de testes de API com Playwright e geração de relatórios Allure, publicando os resultados no GitHub Pages.

## 🔄 Workflow Triggers

### Automatic Triggers
- **Push** para branches `main` e `develop`
- **Pull Requests** para branches `main` e `develop`
- **Schedule**: Execução diária às 2 AM UTC (testes noturnos)

### Manual Triggers
- **Workflow Dispatch**: Execução manual com seleção de ambiente
  - `production` (default)
  - `staging`
  - `development`

## 🏗️ Pipeline Architecture

### Jobs Overview

#### 1. **test** - Execução de Testes
- **Matrix Strategy**: Executa em Node.js 20 e 22
- **Timeout**: 15 minutos
- **Features**:
  - Cache de dependências npm
  - Instalação automática de browsers Playwright
  - Configuração dinâmica de ambiente
  - Execução com Allure integration
  - Upload de múltiplos artefatos

#### 2. **publish-report** - Publicação de Relatórios
- **Condition**: Apenas em push para `main`/`develop`
- **Features**:
  - Download e merge de resultados Allure
  - Geração de relatório final
  - Publicação no GitHub Pages
  - Index customizado para melhor UX

#### 3. **notify** - Notificação de Resultados
- **Condition**: Sempre executa (independente de sucesso/falha)
- **Features**:
  - Sumário de resultados
  - Status de cada job
  - Links para relatórios

## 📊 Artefatos Gerados

| Artefato | Descrição | Retenção |
|----------|-----------|----------|
| `allure-results-node-*` | Dados brutos do Allure | 30 dias |
| `allure-report-node-*` | Relatório HTML estático | 7 dias |
| `test-results-node-*` | Resultados Playwright | 30 dias |
| `html-report-node-*` | Relatório nativo Playwright | 7 dias |

## 🌐 GitHub Pages Integration

### Configuração Necessária
1. **Repository Settings > Pages**
   - Source: GitHub Actions
   - Branch: `gh-pages`

2. **Permissions**
   - Actions: `Read and write permissions`
   - Pages: `Read and write permissions`

### URL do Relatório
```
https://[username].github.io/[repository]/
```

## 🔧 Variáveis de Ambiente

### Repository Variables (Settings > Secrets and variables > Actions)
```bash
API_BASE_URL=https://serverest.dev  # ou sua API URL
```

### Variáveis Automáticas
- `ENVIRONMENT`: Ambiente de execução
- `RUN_ID`: ID da execução
- `RUN_NUMBER`: Número da execução
- `BRANCH`: Branch atual
- `COMMIT`: Hash do commit

## 📱 Execução Manual

### Via GitHub UI
1. Actions > Playwright API Tests with Allure Report
2. "Run workflow"
3. Selecionar ambiente
4. "Run workflow"

### Via CLI
```bash
gh workflow run playwright-allure.yml \
  --field environment=staging
```

## 🐛 Debug e Troubleshooting

### Logs Úteis
```bash
# Verificar logs de um job específico
gh run view [run-id] --job=[job-id]

# Download de artefatos
gh run download [run-id] --name allure-results-node-20
```

### Problemas Comuns

#### 1. Module Not Found
```yaml
# Verificar consistência packageManager
# Usar npm ci se package.json não tem pnpm
```

#### 2. Permissões GitHub Pages
```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

#### 3. Timeout em Testes
```yaml
timeout-minutes: 15  # Aumentar se necessário
```

## 📈 Métricas e Monitoramento

### KPIs Automatizados
- **Taxa de Sucesso**: Status dos jobs
- **Performance**: Tempo de execução
- **Coverage**: Se integrado com cobertura
- **Trends**: Histórico via GitHub Actions

### Alertas
- Falha em testes críticos
- Indisponibilidade do relatório
- Timeout de execução

## 🔄 Melhorias Futuras

### Short-term
- [ ] Integração com Slack/Discord
- [ ] Paralelização de testes
- [ ] Testes de carga simultâneos

### Long-term
- [ ] Dashboard customizado
- [ ] Integração com monitoramento
- [ ] Testes em múltiplos ambientes

## 📚 Referências

- [Playwright Documentation](https://playwright.dev/)
- [Allure Report](https://docs.qameta.io/allure-report/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Pages](https://docs.github.com/en/pages)

---

**Maintainer**: QA Team  
**Last Updated**: 2025-03-16  
**Version**: 1.0.0
