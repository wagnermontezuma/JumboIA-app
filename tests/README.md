# Testes Automatizados para JumboIA

Este diretório contém testes automatizados utilizando o Playwright para o projeto JumboIA.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (versão 6 ou superior)

## Instalação

Para instalar as dependências necessárias, execute:

```bash
npm install
```

Para instalar os navegadores do Playwright, execute:

```bash
npx playwright install
```

## Executando os Testes

Para executar todos os testes em modo headless (sem mostrar o navegador):

```bash
npm test
```

Para executar os testes com o navegador visível:

```bash
npm run test:headed
```

Para executar os testes em modo debug:

```bash
npm run test:debug
```

Para executar os testes com a interface do usuário do Playwright:

```bash
npm run test:ui
```

## Visualizando Relatórios

Para visualizar os relatórios de testes:

```bash
npm run report
```

## Estrutura de Arquivos

- `specs/` - Contém os arquivos de teste
  - `home.spec.ts` - Testes para a página inicial
  - `quiz.spec.ts` - Testes para a funcionalidade de quiz
  - `calendar.spec.ts` - Testes para a funcionalidade de calendário
- `playwright.config.ts` - Configuração do Playwright

## Diretrizes para Testes

1. **Isolamento**: Cada teste deve ser independente e não depender de outros testes.
2. **Teste comportamentos visíveis**: Foque em testar comportamentos que o usuário final veria ou interagiria.
3. **Evite dependências externas**: Utilize mocks quando necessário para evitar dependências externas.
4. **Mantenha os testes simples**: Um teste deve verificar apenas uma funcionalidade específica.

## Manutenção dos Testes

Lembre-se de atualizar os testes quando a interface do usuário mudar. Os seletores CSS e XPath podem precisar ser atualizados conforme a aplicação evolui. 