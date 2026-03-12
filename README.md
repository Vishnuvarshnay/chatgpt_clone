# 🤖 ChatGPT Clone with Contextual Memory
[![GitHub Code](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/Vishnuvarshnay/chatgpt_clone)
[![Tech Stack](https://img.shields.io/badge/Stack-FastAPI_%7C_Next.js-black?style=for-the-badge)](https://github.com/Vishnuvarshnay/chatgpt_clone)

A high-performance conversational AI interface that mimics the core functionality of ChatGPT. This project focuses on **Stateful AI Interactions** and **Real-time Data Streaming**.

## 🚀 Key Technical Highlights
- **Contextual Memory Management:** Engineered a custom logic to maintain and inject conversation history into GPT prompts, allowing the AI to "remember" previous user inputs for a coherent dialogue.
- **FastAPI Backend:** Leveraged **FastAPI** (Python) for asynchronous processing, ensuring low-latency communication between the client and the OpenAI/GPT engine.
- **Real-time Response Streaming:** Implemented Server-Sent Events (SSE) or streaming protocols to deliver AI responses token-by-token, significantly improving the perceived user experience.
- **Modern Frontend:** Built with **Next.js** and **Tailwind CSS** for a responsive, dark-themed UI that mirrors the professional look and feel of ChatGPT.

## 🛠️ Main Features
- **Persistent Chat History:** Seamlessly manage and store chat sessions to maintain context across multiple user interactions.
- **Interactive Messaging:** Clean, chat-bubble interface with support for markdown rendering and code highlighting.
- **Optimized Prompt Engineering:** Tailored system prompts to ensure the AI provides accurate, helpful, and safe responses.
- **Scalable Architecture:** Designed with a clear separation of concerns, making it easy to swap LLM providers (e.g., OpenAI, Anthropic, or Local LLMs).

## 💻 Tech Stack & Tools
- **Frontend:** Next.js, Tailwind CSS, React.js
- **Backend:** FastAPI (Python), Uvicorn
- **AI Integration:** OpenAI API / GPT-4 / GPT-3.5
- **State Management:** React Hooks & Context API

## ⚙️ Quick Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/Vishnuvarshnay/chatgpt_clone.git](https://github.com/Vishnuvarshnay/chatgpt_clone.git)
