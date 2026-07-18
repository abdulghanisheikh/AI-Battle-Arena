# ⚔️ AI Battle Arena

### Where Language Models Compete, and AI Judges the Winner

A multi-agent LLM system where two AI models respond to a user's message in a chat interface — and a third LLM steps in as an impartial judge to score and deliver a final verdict.

---

## 🧠 About the Project

**AI Battle Arena** is a multi-agent LLM orchestration platform that turns model comparison into a competitive, judged showdown.

Here's how it works:

1. **✍️ Type a Message** — The user types a message into the chat interface and clicks send.
2. **🥊 Dual Responses** — Two different LLMs independently generate their own response to the same message.
3. **⚖️ The Judge Steps In** — A third LLM acts as an impartial judge, evaluating both responses and scoring each one on a scale of **0–10** based on accuracy, reasoning, clarity, and completeness.
4. **🏆 Final Verdict** — Right below both responses in the chat, the judge posts a final verdict explaining its reasoning and declaring which model performed better.

The result is a transparent, automated way to benchmark and compare LLM outputs head-to-head in a simple, familiar chat experience — powered entirely by LLM-driven orchestration and evaluation.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express |
| **AI Orchestration** | LangChain.js, LangGraph.js |
| **LLM Providers** | Gemini, Mistral AI, Cohere |

---

## ✨ Key Features

- 🔄 **Multi-Model Orchestration** — Seamlessly coordinates multiple LLM providers within a single agentic workflow using LangGraph.js.
- 🎯 **Automated Judging** — A dedicated judge agent delivers unbiased, structured scoring (0–10) with reasoning for each verdict.
- ⚡ **Real-Time Battle Flow** — Clean, responsive UI built with React and Tailwind for a smooth, engaging user experience.
- 🧩 **Modular Agent Design** — Easily swap or extend LLM providers thanks to LangChain.js's abstraction layer.
- 🔐 **Type-Safe Codebase** — End-to-end TypeScript for reliability across frontend and backend.

---

## 🚀 How It Works — Architecture Flow

1. User sends a message from the chat interface.
2. The LangGraph orchestrator receives the message and fans it out to two LLM agents (e.g., Gemini and Mistral, or Cohere) in parallel.
3. Each LLM independently generates a response, which is rendered in the chat.
4. Once both responses are ready, a third LLM (the judge) receives both outputs and evaluates them.
5. The judge assigns a score from 0–10 to each response and generates a final verdict with reasoning.
6. The verdict is displayed in the chat directly below the two responses.

---

## 📌 Why This Project?

AI Battle Arena was built to explore practical, hands-on multi-agent LLM system design — combining **prompt orchestration**, **agent-to-agent evaluation**, and **LLM-as-a-judge** patterns that are increasingly relevant in real-world AI evaluation pipelines.
Made with ⚔️ and a lot of prompt engineering.

</div>
