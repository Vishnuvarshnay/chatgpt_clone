# 🤖 Ultra-Fast ChatGPT Clone (Powered by Groq LPU)
![Groq](https://img.shields.io/badge/Inference-Groq_LPU-orange?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-005571?style=for-the-badge&logo=fastapi)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)

A high-performance conversational AI interface that leverages **Groq's LPU (Language Processing Unit)** technology for near-instantaneous text generation. This project focuses on minimizing latency and maximizing AI contextual intelligence.

## 🚀 Key Technical Highlights
- **Groq LPU Integration:** Achieved industry-leading inference speeds (high Tokens Per Second) by integrating **Groq API**, outperforming standard cloud LLM providers in real-time response delivery.
- **Contextual Memory Management:** Engineered a robust history-tracking logic that maintains conversation state, enabling the AI to handle complex, multi-turn dialogues seamlessly.
- **Asynchronous Streaming:** Implemented **Server-Sent Events (SSE)** via FastAPI to stream responses token-by-token, ensuring a zero-lag user experience.
- **Stateful AI Orchestration:** Designed a backend that manages system prompts and chat buffers to provide accurate, persona-driven AI interactions.

## 🛠️ Main Features
- **Instant Response:** Experience AI replies at the speed of thought, thanks to Groq's specialized hardware inference.
- **Persistent Chat History:** Maintains context across the session, allowing for follow-up questions and deep-dive discussions.
- **Code & Markdown Support:** Fully responsive UI with syntax highlighting for developers.
- **Scalable LLM Switching:** Modular architecture that allows switching between Llama-3, Mixtral, and other open-source models hosted on Groq.

## 💻 Tech Stack & Tools
- **Inference Engine:** Groq API (LPU Technology)
- **Backend:** FastAPI (Python), Uvicorn
- **Frontend:** Next.js, Tailwind CSS, React.js
- **State Management:** React Context API & Hooks

## ⚙️ Quick Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/Vishnuvarshnay/chatgpt_clone.git](https://github.com/Vishnuvarshnay/chatgpt_clone.git)
