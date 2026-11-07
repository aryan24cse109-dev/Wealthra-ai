# ⚡ Switch Integration — Wealthra AI

> Built for the **Flip the Switch Hackathon** (Powered by Switch AI, WeMakeDevs & DevTools Academy)  
> Repository: [Wealthra-ai](https://github.com/aryan24cse109-dev/Wealthra-ai) · Live App: [wealthra-ai.vercel.app](https://wealthra-ai.vercel.app/) · Video Demo: [youtu.be/mG45OiztM1I](https://youtu.be/mG45OiztM1I)

---

## 💡 Overview

**Wealthra AI** (BizPilot AI) is an autonomous business management and financial operations platform. Through **Switch**, solo AI capabilities are connected as collaborative teammates inside dedicated communication channels to automate invoicing, multi-language speech interpretation, and payment reconciliation.

Switch orchestrates the communication flow between human operators (freelancers, business owners, clients) and specialized AI agents, enabling real-time collaboration directly in chat channels.

---

## 🤖 1. Connected Agents

Through Switch, Wealthra AI orchestrates **three specialized AI agents**:

```mermaid
graph TD
    User["👤 Human Operator (Chat)"] --> Switch["⚡ Switch Router / Bridge"]
    
    subgraph "Connected Agents in Switch"
        Switch <-->|Transcripts & Audio| Agent1["🗣️ Agent 1: Multilingual Voice & Triage Agent\n(Sarvam Saaras v4 STT)"]
        Switch <-->|Intent & Draft Specs| Agent2["🧾 Agent 2: Operations & Invoicing Agent\n(Groq / Gemini Llama-3 Engine)"]
        Switch <-->|Signature & Payment Events| Agent3["💳 Agent 3: Payment & Reconciliation Agent\n(Razorpay HMAC Webhook Engine)"]
    end
    
    Agent2 --> Backend["⚙️ Express 5 Core API + PostgreSQL"]
    Agent3 --> Backend
```

### Agent Breakdown:

| Agent Name | Engine / Technology | Primary Role in Switch |
|---|---|---|
| **Agent 1: Voice & Language Triage** | Sarvam Saaras v4 STT | Listens to voice notes and text in **Hindi, English, and Hinglish** (e.g. *"Rahul ke liye 15000 ka invoice banao"*), converts audio into normalized structured intent payloads. |
| **Agent 2: Operations & Invoicing Assistant** | Groq (Llama 3.3) / Google Gemini | Parses business parameters, checks line items, applies 18% GST calculations with fixed-point decimal arithmetic, previews draft confirmations, and posts them to the channel. |
| **Agent 3: Payment & Audit Agent** | Express Core + Razorpay HMAC-SHA256 | Monitors checkout orders, listens to payment webhooks, verifies cryptographic signatures, prevents double-charging via idempotency keys, and notifies the channel when invoices are settled. |

---

## 💬 2. Channel & Room Setup

Switch maps multi-agent communication streams so agents and teammates interact in dedicated, purpose-driven rooms:

```mermaid
flowchart LR
    subgraph "Switch Channel Architecture"
        R1["#ops-assistant\n(Commands & Voice Invoicing)"]
        R2["#invoice-approvals\n(Draft Previews & Human-in-the-Loop)"]
        R3["#payment-feed\n(Live Settlement & Webhook Alerts)"]
    end

    Human["👤 Business Owner / Client"] --> R1
    Agent1["🗣️ Voice Agent"] <--> R1
    Agent2["🧾 Invoice Agent"] <--> R1
    
    Agent2 --> R2
    Human -.->|Approves Draft| R2
    
    Agent3["💳 Payment Agent"] --> R3
```

### Channel Details:

* **Channel Platform:** Switch Desktop / Headless Daemon with Webhook Bridge
* **Configured Rooms:**
  1. **`#ops-assistant`** — The primary interactive room where users send natural language text or voice notes. **Agent 1** transcribes the message and triggers **Agent 2** to understand business intent.
  2. **`#invoice-approvals`** — Human-in-the-loop room. Invoices with amounts, tax computations, and client names are published here as structured previews before any database writes occur.
  3. **`#payment-feed`** — Automated audit room. Whenever Razorpay processes a payment (or webhook event), **Agent 3** posts verified real-time receipts with transaction IDs.

---

## ⚙️ 3. End-to-End Workflow

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 Business Owner
    participant SW as ⚡ Switch Channel
    participant A1 as 🗣️ Voice Agent (Sarvam)
    participant A2 as 🧾 Invoice Agent (Groq)
    participant BE as ⚙️ Backend & PostgreSQL
    participant A3 as 💳 Payment Agent (Razorpay)

    User->>SW: Sends audio: "Rahul ke liye 15,000 ka invoice banao"
    SW->>A1: Transcribe & normalize language
    A1-->>SW: "Create invoice: Client Rahul, Amount ₹15,000"
    SW->>A2: Interpret action & calculate 18% GST
    A2-->>SW: Posts Draft Preview: Total ₹17,700 (Incl. ₹2,700 GST)
    User->>SW: Confirms: "Approved"
    SW->>BE: Commit INV-2026-0001 with decimal precision
    BE-->>SW: Invoice PDF + QR Code generated
    Note over SW,A3: Client completes payment via Razorpay Sandbox
    A3->>SW: Webhook verified (HMAC-SHA256) → Invoice PAID!
    SW-->>User: 🔔 Notification: "Payment of ₹17,700 received from Rahul"
```

---

## 🚀 4. How to Run It

### Prerequisites
- Node.js 20+ installed
- PostgreSQL 18 (or a free [Neon](https://neon.tech) database)
- Switch Desktop App or Daemon installed
- Provider API keys: Sarvam AI, Groq, Razorpay Sandbox

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/aryan24cse109-dev/Wealthra-ai.git
cd Wealthra-ai
```

---

### Step 2: Configure Environment Variables

Create `.env` in the root (and inside `/backend` and `/ai-service`):

```env
# Switch Configuration
SWITCH_PORT=55009
SWITCH_WEBHOOK_URL=http://localhost:5000/api/switch/webhook

# AI Provider Keys
SARVAM_API_KEY=your_sarvam_api_key
GROQ_API_KEY=your_groq_api_key
AI_SERVICE_SECRET=your_shared_internal_secret

# Database
DATABASE_URL=postgresql://user:password@host/neondb?sslmode=require

# Razorpay Sandbox
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

---

### Step 3: Install & Start All Microservices

Open three terminal tabs:

#### Tab 1: AI Microservice (Agents 1 & 2)
```bash
cd ai-service
npm install
npm run dev
# AI Service running on http://localhost:5001
```

#### Tab 2: Backend API & Payment Engine (Agent 3)
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
# Core API running on http://localhost:5000
```

#### Tab 3: Frontend Web Interface
```bash
cd frontend
npm install
npm run dev
# Frontend running on http://localhost:5173
```

---

### Step 4: Connect & Test with Switch

1. Launch your **Switch Desktop App** or daemon.
2. Add your Switch channel routing to point incoming events to:
   ```
   POST http://localhost:5000/api/switch/webhook
   ```
3. In the Switch `#ops-assistant` channel, send:
   > *"Rahul ke liye 15000 ka invoice banao for web development"*
4. **Agent 1** transcribes the Hinglish audio/text.
5. **Agent 2** responds in the channel with the computed draft preview.
6. Verify and approve to complete the lifecycle!

---

## 🔗 Live Deployments & Health Endpoints

| Service | Live URL | Wake-Up / Health Check |
|---|---|---|
| 🌐 **Frontend** | [wealthra-ai.vercel.app](https://wealthra-ai.vercel.app/) | — |
| ⚙️ **Backend API** | [bizpilot-ai-1-o2e5.onrender.com](https://bizpilot-ai-1-o2e5.onrender.com) | [GET /api/health](https://bizpilot-ai-1-o2e5.onrender.com/api/health) |
| 🤖 **AI Microservice** | [bizpilot-ai-cx0e5.onrender.com](https://bizpilot-ai-cx0e5.onrender.com) | [GET /api/health](https://bizpilot-ai-cx0e5.onrender.com/api/health) |
| 🎥 **Video Walkthrough** | [Watch YouTube Demo](https://youtu.be/mG45OiztM1I) | — |

---

## ©️ Submission Information
- **Project:** Wealthra AI (BizPilot AI)
- **Hackathon:** Flip the Switch Hackathon (Switch AI × WeMakeDevs × DevTools Academy)
- **Team Ownership:** Wealthra AI Team
