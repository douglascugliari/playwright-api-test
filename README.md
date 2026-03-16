# Playwright API Test Framework

## 📋 Visão Geral

Este projeto é um framework de testes automatizados de API construído com Playwright, desenvolvido para testar endpoints de uma API REST de e-commerce. O framework segue as melhores práticas de automação de testes, utilizando Page Object Model (POM) para APIs, Factory Pattern para dados de teste e Fixtures para gerenciamento de estado.

## 🏗️ Arquitetura

### Estrutura do Projeto

```
├── src/
│   ├── api/                    # Classes de API (Page Objects)
│   │   ├── apiClient.ts       # Cliente HTTP base
│   │   ├── usuarios.api.ts    # API de Usuários
│   │   ├── login.api.ts       # API de Login
│   │   ├── produtos.api.ts    # API de Produtos
│   │   └── carrinhos.api.ts   # API de Carrinhos
│   ├── config/
│   │   └── env.ts             # Configuração de ambiente
│   ├── factories/              # Data Factories
│   │   ├── usuario.factory.ts # Factory de Usuários
│   │   └── produto.factory.ts # Factory de Produtos
│   └── fixtures/
│       └── apiFixture.ts      # Fixtures reutilizáveis
├── tests/                      # Casos de teste
│   ├── usuarios.spec.ts       # Testes de Usuários
│   ├── login.spec.ts          # Testes de Login
│   ├── produtos.spec.ts       # Testes de Produtos
│   └── carrinhos.spec.ts      # Testes de Carrinhos
├── .env                        # Variáveis de ambiente
├── playwright.config.ts        # Configuração do Playwright
└── package.json               # Dependências e scripts
```

## 🚀 Tecnologias Utilizadas

- **Playwright** - Framework de automação de testes
- **TypeScript** - Linguagem de programação
- **Faker.js** - Geração de dados falsos para testes
- **dotenv** - Gerenciamento de variáveis de ambiente
- **pnpm** - Gerenciador de pacotes

## 📦 Dependências

### Dev Dependencies
- `@playwright/test`: ^1.58.2
- `@faker-js/faker`: ^10.3.0
- `@types/node`: ^25.5.0

### Dependencies
- `dotenv`: ^17.3.1

## ⚙️ Configuração

### Pré-requisitos
- Node.js (versão 18 ou superior)
- pnpm (versão 10.26.0 ou superior)

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd Playwright-Api-Test
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Instale os browsers do Playwright:
```bash
pnpm exec playwright install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
BASE_URL=https://api.example.com
```

## 🧪 Executando os Testes

### Executar todos os testes
```bash
pnpm test
```

### Executar testes específicos
```bash
# Testes de usuários
pnpm exec playwright test tests/usuarios.spec.ts

# Testes de login
pnpm exec playwright test tests/login.spec.ts

# Testes de produtos
pnpm exec playwright test tests/produtos.spec.ts

# Testes de carrinhos
pnpm exec playwright test tests/carrinhos.spec.ts
```

### Executar em modo headed (com interface gráfica)
```bash
pnpm exec playwright test --headed
```

### Gerar relatório de testes
```bash
pnpm exec playwright test --reporter=html
```

## 📊 Cobertura de Testes

### Módulos Testados

#### 🔐 Usuários (`usuarios.spec.ts`)
- **CT-001**: Criar usuário
- **CT-002**: Listar usuários
- **CT-003**: Obter usuário por ID
- **CT-004**: Atualizar usuário
- **CT-005**: Deletar usuário

#### 🔑 Login (`login.spec.ts`)
- Login com sucesso
- Login com senha incorreta
- Login com email não cadastrado

#### 📦 Produtos (`produtos.spec.ts`)
- **CT-001**: Criar produto
- **CT-002**: Listar produtos
- **CT-003**: Buscar produto por ID
- **CT-004**: Editar produto

#### 🛒 Carrinhos (`carrinhos.spec.ts`)
- **CT-001**: Cadastrar carrinho
- **CT-002**: Listar carrinhos
- **CT-003**: Buscar carrinho por ID

## 🏗️ Padrões e Design

### Page Object Model para APIs
Cada endpoint da API possui sua própria classe encapsulada:
- Métodos correspondentes às operações HTTP
- Tratamento de autenticação via token
- Validação de respostas

### Factory Pattern
Geração de dados dinâmicos para testes:
- `UsuarioFactory`: Cria dados de usuários válidos
- `ProdutoFactory`: Cria dados de produtos válidos
- Utilização do Faker.js para dados realistas

### Fixtures Reutilizáveis
Fixtures do Playwright para gerenciamento de estado:
- `criarUsuarioFixture`: Cria usuário automaticamente
- `pegarToken`: Obtém token de autenticação
- `criarProdutoFixture`: Cria produto automaticamente
- `criarCarrinhoFixture`: Cria carrinho automaticamente

### Cliente HTTP Centralizado
`apiClient.ts` gerencia:
- Configuração de base URL
- Headers de autenticação
- Tratamento de erros de configuração

## 🔧 Boas Práticas Implementadas

1. **Separação de Responsabilidades**: Classes específicas para cada módulo da API
2. **Dados Dinâmicos**: Uso de factories para evitar dados hard-coded
3. **Gerenciamento de Estado**: Fixtures para setup e teardown automatizados
4. **Validações**: Assertivas claras e específicas
5. **Configuração Externa**: Variáveis de ambiente para diferentes ambientes
6. **TypeScript**: Tipagem forte para melhor manutenção

## 📈 Relatórios e Resultados

Após executar os testes, você pode visualizar os relatórios detalhados:
```bash
pnpm exec playwright show-report
```

O relatório HTML inclui:
- Status de cada teste
- Tempo de execução
- Logs detalhados
- Screenshots (se aplicável)
- Network requests

## 🐛 Debug

### Modo Debug
```bash
pnpm exec playwright test --debug
```

### Executar teste específico com modo debug
```bash
pnpm exec playwright test --debug tests/usuarios.spec.ts --grep "CT-001"
```

## 🤝 Contribuição

1. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
2. Faça commit das suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
3. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
4. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a ISC License.

## 🔗 Links Úteis

- [Documentação do Playwright](https://playwright.dev/)
- [Documentação do Faker.js](https://fakerjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Desenvolvido com ❤️ para automação de testes de API**
