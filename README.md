# 🚀 SubTrackr - Frontend

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## 📌 Sobre o Projeto
O **SubTrackr** é um consolidador financeiro pessoal focado em gerenciar gastos recorrentes (assinaturas de software, streaming, academias, etc). 

Este repositório contém a aplicação **Frontend**, construída como uma *Single Page Application* (SPA) altamente responsiva, acessível e otimizada. O objetivo de aprendizado e arquitetura deste frontend foi criar uma interface moderna delegando todo o processamento de regras de negócios e cálculos matemáticos estritamente para a API (Backend), focando o React apenas em gerenciamento inteligente de estado, UI/UX avançada e consumo de dados.

🌐 **[Acesse o projeto rodando ao vivo aqui](https://subtrackr-web.vercel.app/)**

## ⚙️ Arquitetura e Padrões (Diferenciais)
* **Arquitetura:** SPA (Single Page Application) orientada a componentes.
* **Design Patterns:** * *Component Wrappers:* Encapsulamento de componentes de bibliotecas externas (ex: `InputComponent`, `SelectComponent`) para proteger a aplicação contra *breaking changes* e evitar *prop drilling*.
  * *Custom Hooks:* Isolamento de lógicas complexas (ex: `useDebounce`).
* **Boas Práticas:** * Acessibilidade nativa e estrita (WAI-ARIA) garantida pelo HeroUI/React Aria.
  * *State Management* assíncrono: Uso do **TanStack Query** para *caching*, sincronização em background e invalidação de rotas (evitando re-renders desnecessários).
  * Tratamento impecável dos "Caminhos Tristes" (Empty States, Error Boundaries e Skeletons de carregamento fluidos).

## 🚀 Funcionalidades Principais
* **Dashboard Resumo:** Exibição dos gastos mensais, anuais e totais de assinaturas ativas em tempo real.
* **Gestão Completa (CRUD):** Listagem, adição, edição, exclusão e alteração rápida de status (Ativo/Cancelado) via *Switch*.
* **Formulários Tipados:** Validação rigorosa *client-side* com **Zod** aliado ao **TanStack Form**, prevenindo o envio de dados inválidos (ex: valores negativos ou ciclos incorretos).
* **Busca Otimizada:** Implementação de um sistema de busca com *Debounce* de 500ms, impedindo o disparo de requisições excessivas à API enquanto o usuário digita.
* **Animações e Micro-interações:** Uso do **Framer Motion** para *layout transitions* automáticas. Ao excluir, buscar ou alterar a ordem dos itens, a lista se reorganiza de forma suave na tela.

## 💻 Tecnologias Utilizadas

### Frontend
* **Linguagem:** TypeScript
* **Framework:** React 19 (via Vite)
* **Estilização e UI:** TailwindCSS v4, HeroUI, Lucide React (Ícones)
* **Gerenciamento de Estado da API:** TanStack Query v5
* **Formulários:** TanStack Form e Zod
* **Animações:** Framer Motion (`motion/react`)

### 🛠️ Ferramentas Auxiliares
* ESLint & Prettier (Padronização de código)
* Axios (Cliente HTTP)
* Vercel (Hospedagem e CI/CD)