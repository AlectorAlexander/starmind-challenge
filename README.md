# 🛍️ diRavena Clone - E-commerce com IA

Clone fullstack do site diRavena desenvolvido em React + Node.js com integração de IA para atendimento ao cliente.

## 🚀 Demo

- **Deploy:** [Link do Deploy]
- **Repositório:** [https://github.com/AlectorAlexander/starmind-challenge](https://github.com/AlectorAlexander/starmind-challenge)

## ✨ Funcionalidades

### 🤖 Chat Bot com IA
- **IA Inteligente:** Groq API com Llama 3-8B para respostas contextuais
- **Respostas Úteis:** Fornece preços, parcelamento e links automaticamente
- **Interface Adaptativa:** Chat em tela cheia no mobile, flutuante no desktop
- **Prompt Otimizado:** Instruções específicas para respostas precisas

### 📱 Design Responsivo
- **Mobile-First:** Layout otimizado para todos os dispositivos
- **Grid Adaptativo:** 1 coluna (mobile) → 4 colunas (desktop)
- **Header Fixo:** Com gradiente colorido (#F8B50B → #EE03A5 → #5857D3)
- **Cards Interativos:** Totalmente clicáveis com botões estilizados

### 🛒 Catálogo de Produtos
- **15 Produtos:** Calçados e lingerie da diRavena
- **Informações Completas:** Preços, parcelamento e links originais
- **Layout Moderno:** Cards sem bordas com botões "Ver Produto" destacados

## 🛠️ Stack Técnica

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Bootstrap 5** + **React Bootstrap**
- **Axios** (requisições HTTP)
- **React Icons**

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Groq API** (Llama 3-8B)
- **CORS** habilitado

### Ferramentas
- **ESLint** (linting)
- **Concurrently** (execução simultânea)
- **dotenv** (variáveis de ambiente)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- NPM ou Yarn
- Chave da API Groq

### Instalação Rápida
```bash
# Clone o repositório
git clone https://github.com/AlectorAlexander/starmind-challenge.git
cd starmind-challenge

# Instale todas as dependências (backend + frontend)
npm run install:all

# Configure as variáveis de ambiente
cp .env.example .env
# Adicione sua GROQ_API_KEY no arquivo .env

# Execute o projeto completo
npm run dev:full
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev:full          # Backend + Frontend simultaneamente
npm run dev               # Apenas backend
cd front && npm run dev   # Apenas frontend

# Produção
npm run start:full        # Build + Start completo
npm run build             # Build backend
npm run start             # Start backend

# Utilitários
npm run install:all       # Instala deps do back + front
npm run lint              # Verifica código
npm run lint:fix          # Corrige código automaticamente
```

## 🌐 Endpoints da API

### POST `/api/ask`
Endpoint para interação com a IA.

**Request:**
```json
{
  "question": "Qual o produto mais barato?"
}
```

**Response:**
```json
{
  "answer": "O produto mais barato é o Babydoll Bailarina por R$ 79,90. Link: https://diravena.com/products/babydoll-bailarina-diravena"
}
```

## 📁 Estrutura do Projeto

```
starmind-challenge/
├── front/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Main.tsx
│   │   │   ├── ProductList.tsx
│   │   │   └── ChatBot.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── itens.json        # Dados dos produtos
│   └── package.json
├── public/
│   └── itens.json            # Dados dos produtos (backend)
├── server.ts                 # Servidor Express
├── package.json              # Dependências do backend
└── .env                      # Variáveis de ambiente
```

## 🎨 Características do Design

- **Header Fixo:** Gradiente colorido que permanece visível durante scroll
- **Logo Centralizada:** Imagem da diRavena entre header e produtos
- **Cards Modernos:** Sem bordas, totalmente clicáveis
- **Botões Destacados:** "Ver Produto" no canto superior esquerdo
- **Chat Responsivo:** UX diferenciada para mobile e desktop
- **Z-index Otimizado:** Chat sempre visível sobre outros elementos

## 🤖 Configuração da IA

A IA utiliza a Groq API com o modelo Llama 3-8B e possui:

- **Prompt Otimizado:** Instruções específicas para respostas úteis
- **Contexto Completo:** Acesso a todos os dados dos produtos
- **Respostas Inteligentes:** Fornece preços, links e comparações
- **Tratamento de Erros:** Fallbacks para casos de falha na API

## 📱 Responsividade

### Mobile (< 576px)
- 1 coluna de produtos
- Chat em tela cheia
- Header compacto

### Tablet (576px - 992px)
- 2-3 colunas de produtos
- Chat em janela flutuante
- Layout balanceado

### Desktop (> 992px)
- 4 colunas de produtos
- Chat compacto no canto
- Máximo aproveitamento do espaço

## 🔧 Variáveis de Ambiente

```env
GROQ_API_KEY=sua_chave_da_groq_api
PORT=3001
```

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico e é de uso educacional.

## 👨‍💻 Desenvolvedor

Desenvolvido por **Alector Alexander** como parte de um desafio técnico.

---

⭐ **Gostou do projeto? Deixe uma estrela no repositório!**