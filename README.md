# Cost App

Um aplicativo para rastreamento e visualização de custos, desenvolvido usando Next.js para a interface do usuário e Puppeteer para a automação de tarefas.

## Funcionalidades

- **Interface de Usuário**: Desenvolvida com Next.js, oferecendo uma navegação fluida e responsiva.
- **Automação de Dados**: Utiliza Puppeteer para capturar e processar dados de fontes web.
- **Relatórios e Visualizações**: Geração de relatórios e gráficos com base nos dados coletados.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **Puppeteer**: Biblioteca Node.js para controle de um navegador headless e automação de tarefas de scraping.
- **Node.js**: Ambiente de execução JavaScript para o backend.

## Instalação

Siga estas etapas para configurar o projeto localmente:

1. **Clone o Repositório**

```bash
git clone https://github.com/seuusuario/cost-app.git
```

2. **Instale as Dependências**

   Navegue para o diretório do projeto e execute:

```bash
cd cost-app
npm install
```

3. **Execute o Projeto**

```bash
npm run dev
Acesse o aplicativo em http://localhost:3000.
```

## Uso

Para iniciar o Puppeteer e realizar a automação, execute o comando:

```bash
npm run pupp
```

## Scripts

```bash
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"pupp": "node src/scraper/index.js"
```

## Open Source

Este projeto é open-source e está disponível para colaboração e melhoria. É destinado principalmente para estudos e experimentações com Next.js e Puppeteer. Sinta-se à vontade para contribuir com melhorias ou correções. Abra uma issue ou um pull request no GitHub.

## Notas sobre Puppeteer

O uso do Puppeteer neste projeto é feito com fins de estudo e demonstração de suas capacidades. É importante respeitar os Termos de Serviço dos sites que você está acessando e seguir as melhores práticas de scraping para evitar problemas legais.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Abra uma issue ou um pull request no GitHub.
