# 🚀 BizPilot AI — Intelligent Business Operations Platform

[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite%20%2B%20Tailwind-38B2AC)](https://vitejs.dev)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express%205%20%2B%20Prisma-339933)](https://expressjs.com)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%2018%20(Neon)-4169E1)](https://neon.tech)
[![AI](https://img.shields.io/badge/AI-Sarvam%20Saaras%20v4%20%2B%20Groq-10B981)](https://sarvam.ai)
[![Payments](https://img.shields.io/badge/Payments-Razorpay%20%2B%20PayPal-F59E0B)](https://razorpay.com)
[![License](https://img.shields.io/badge/License-DEVRATOR%20Proprietary-red)](./LICENSE)

**BizPilot AI** is a full-stack, AI-powered business management platform built for freelancers, startups, and small enterprises — combining intelligent invoicing, real-time payment tracking, multilingual AI assistance (English/Hindi/Hinglish), client collaboration portals, and financial analytics into a single cohesive product, deployed as three microservices on Render.

---

## 🔗 Live Links

| Service | URL |
|---|---|
| 🌐 **Frontend** | [https://biz-pilot-ai.onrender.com](https://biz-pilot-ai.onrender.com) |
| 🔧 **Backend API** | [https://bizpilot-ai-backend.onrender.com](https://bizpilot-ai-backend.onrender.com) |
| 🤖 **AI Service** | [https://bizpilot-ai-service.onrender.com](https://bizpilot-ai-service.onrender.com) |
| 🎥 **YouTube Demo** | [▶️ Watch Full Project Demo](https://www.youtube.com/watch?v=YOUR_VIDEO_ID) |
| 💻 **GitHub** | [github.com/aryan24cse109-dev/BizPilot-AI](https://github.com/aryan24cse109-dev/BizPilot-AI) |

> [!CAUTION]
> ## ⚠️ Important — Render Free Tier Cold Start
> This project is hosted on **Render's free tier**. Free-tier services **automatically spin down after 15 minutes of inactivity** and take **~30–60 seconds to wake up** on the next request.
>
> **Before using the app:**
> 1. Click 👉 [Backend API](https://bizpilot-ai-backend.onrender.com) — wait for it to respond
> 2. Click 👉 [AI Service](https://bizpilot-ai-service.onrender.com) — wait for it to respond
> 3. Then open 👉 [Frontend](https://biz-pilot-ai.onrender.com)
>
> After the first load, everything runs at full speed!

---

## 🏗️ Project Architecture

```mermaid
flowchart TD
    subgraph Client["🖥️ User's Browser"]
        FE["React 18 SPA\n(Vite + Tailwind)"]
    end

    subgraph Render["☁️ Render Cloud (Free Tier)"]
        BE["⚙️ Backend API\nNode.js + Express 5\nPort 5000"]
        AI["🤖 AI Microservice\nNode.js + Express 5\nPort 5001"]
    end

    subgraph External["🌐 External Services"]
        DB[("🗄️ Neon PostgreSQL 18")]
        Sarvam["🗣️ Sarvam Saaras v4\nSpeech-to-Text"]
        Groq["🧠 Groq LLM\nFallback Inference"]
        RZP["💳 Razorpay\nPayment Gateway"]
        PayPal["💰 PayPal Sandbox"]
        Google["🔐 Google OAuth 2.0"]
        Email["📧 Resend / SMTP"]
    end

    FE -->|"REST + Cookie Session"| BE
    BE -->|"Prisma ORM"| DB
    BE -->|"x-ai-service-secret"| AI
    AI --> Sarvam
    AI --> Groq
    BE --> RZP
    BE --> PayPal
    BE --> Google
    BE --> Email
```

---

## 📦 Repository Structure

```
BizPilot-AI/
├── 🌐 frontend/          # React 18 SPA (Vite + Tailwind)
│   └── README.md         # Frontend docs
├── ⚙️ backend/           # Express 5 REST API + Prisma
│   └── README.md         # Backend docs
├── 🤖 ai-service/        # AI NLP + STT Microservice
│   └── README.md         # AI service docs
├── 🗄️ database/          # DB scripts & seed data
├── 📄 docs/              # Additional documentation
├── .env.example          # Root environment template
└── README.md             # This file
```

---

## 🎯 Key Features

```mermaid
mindmap
  root((BizPilot AI))
    AI Assistant
      Multilingual
        English
        Hindi
        Hinglish
      Voice Input
        Sarvam STT
      Text Commands
      Invoice Creation by Voice
    Invoicing Engine
      Sequential Numbering
      GST Calculation
      PDF Generation
      QR Payment Codes
      Decimal Precision Math
    Payment Processing
      Razorpay UPI/Card/Net
      PayPal Sandbox
      HMAC Webhook Verification
      Idempotency Protection
      Partial Payments
    Financial Intelligence
      KPI Dashboard
      Monthly Collection Charts
      Accounts Receivable Aging
      Cashflow Forecasting
    Multi-Tenant Security
      Workspace Isolation
      Business + Client Dual Mode
      JWT Sessions
      Google OAuth
    Client Collaboration
      Client Portal
      Invitation System
      Messaging
      Notification System
```

---

## 🛠️ Full Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend** | React | 18.3.1 | UI library |
| | Vite | 6.0.7 | Build tool |
| | Tailwind CSS | 3.4.17 | Styling |
| | React Router | 7.1.1 | Routing |
| | TanStack Query | 5.62.8 | Server state |
| | Recharts | 2.15.0 | Data visualization |
| | Axios | 1.7.9 | HTTP client |
| | React Hook Form | 7.54.2 | Forms |
| | Zod | 3.24.2 | Validation |
| **Backend** | Node.js | LTS | Runtime |
| | Express | 5.3.0 | HTTP framework |
| | Prisma | 7.9.1 | ORM |
| | PostgreSQL | 18 (Neon) | Database |
| | JWT | 9.0.3 | Auth tokens |
| | PDFKit | 0.20.2 | PDF generation |
| | Decimal.js | 10.6.0 | Exact arithmetic |
| | Razorpay | HTTP API | Payments |
| | Google Auth | 11.3.3 | OAuth |
| **AI Service** | Sarvam Saaras v4 | API | Speech-to-Text |
| | Groq | API | LLM inference |
| | Zod | 4.6.7 | Schema validation |
| **Database** | Neon PostgreSQL | 18 | Cloud database |
| **Hosting** | Render | Free Tier | Cloud deployment |

---

## 🔄 End-to-End User Flow

```mermaid
flowchart TD
    A["👤 User Opens App"] --> B{Authenticated?}
    B -->|No| C["Login / Register\nor Google OAuth"]
    B -->|Yes| D{Account Type}
    C --> D

    D -->|Business Owner| E["🏢 Business Dashboard"]
    D -->|Client| F["👥 Client Portal"]

    E --> G["📊 View KPIs & Analytics"]
    E --> H["🧾 Create Invoice\n(Manual or AI)"]
    E --> I["💬 Message Clients"]
    E --> J["🤖 AI Assistant\nVoice / Text Command"]

    J --> K{"Language"}
    K -->|Voice| L["🎤 Sarvam STT\nTranscription"]
    K -->|Text| M["📝 Direct NLP"]
    L --> M
    M --> N["AI Intent Parsing\n(Groq Fallback)"]
    N --> O{"Action Type"}
    O -->|Create Invoice| P["Draft Preview + GST\n→ Confirm → DB Save"]
    O -->|Query Data| Q["Fetch & Return Data"]

    H --> R["Invoice with QR Code PDF"]
    P --> R
    R --> S["📧 Email to Client"]
    S --> T["💳 Client Pays\n(Razorpay / PayPal)"]
    T --> U["✅ HMAC Verified\nInvoice Marked PAID"]
    U --> G
```

---

## 🌐 Service Communication Map

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant FE as 🌐 Frontend
    participant BE as ⚙️ Backend
    participant AI as 🤖 AI Service
    participant DB as 🗄️ PostgreSQL
    participant RZP as 💳 Razorpay

    U->>FE: "Create invoice for Rahul ₹15,000"
    FE->>BE: POST /api/assistant/message
    BE->>AI: POST /api/assistant/interpret (secret)
    AI-->>BE: {action: CREATE_INVOICE, params: {...}}
    BE->>BE: Validate + ownership check
    BE->>DB: Insert invoice record
    DB-->>BE: Invoice created
    BE-->>FE: Draft confirmation
    FE->>U: "Confirm invoice for Rahul ₹15,000 + GST?"
    U->>FE: Confirms
    FE->>BE: POST /api/payments/order
    BE->>RZP: Create order
    RZP-->>BE: order_id
    BE-->>FE: Razorpay checkout
    U->>RZP: Pays
    RZP-->>BE: Webhook (HMAC signed)
    BE->>DB: Mark PAID
    BE-->>FE: ✅ Payment confirmed
```

---

## 📊 Feature Comparison Table

| Feature | Business Owner | Client |
|---|---|---|
| Dashboard & KPIs | ✅ Full access | ❌ |
| Create Invoices | ✅ | ❌ |
| View Invoices | ✅ All invoices | ✅ Own invoices only |
| Make Payments | ❌ | ✅ |
| AI Assistant | ✅ | ❌ |
| Analytics | ✅ | ❌ |
| Messaging | ✅ | ✅ |
| Client Management | ✅ | ❌ |
| Settings | ✅ | ✅ |
| Download PDF | ✅ | ✅ |

---

## 🗄️ Database Overview

```mermaid
erDiagram
    USER ||--o{ WORKSPACE : "owns"
    USER ||--o{ SESSION : "has"
    WORKSPACE ||--o{ CLIENT : "has"
    WORKSPACE ||--o{ INVOICE : "generates"
    CLIENT ||--o{ INVOICE : "receives"
    INVOICE ||--o{ INVOICE_ITEM : "contains"
    INVOICE ||--o{ PAYMENT : "paid via"

    USER {
        string id PK
        string email
        string name
        string accountType
    }
    WORKSPACE {
        string id PK
        string name
        string ownerId FK
    }
    INVOICE {
        string id PK
        string number
        string status
        decimal totalAmount
    }
    PAYMENT {
        string id PK
        string gateway
        decimal amount
        string status
    }
```

---

## 💳 Payments — Razorpay Integration

BizPilot AI uses **Razorpay** as its primary payment gateway for processing invoices.

### How it works in the Demo

Since this is a demo/sandbox environment, **no real money is charged**. Use the Razorpay test credentials below to simulate payments:

| Field | Value |
|---|---|
| 💳 **Test Card Number** | `4111 1111 1111 1111` |
| 📅 **Expiry** | Any future date (e.g. `12/26`) |
| 🔐 **CVV** | Any 3 digits (e.g. `123`) |
| 📱 **Test UPI ID** | `success@razorpay` |
| 🏦 **Net Banking** | Select any bank → auto success |

> [!IMPORTANT]
> **This is Razorpay Sandbox mode.** All payments in the demo are simulated — no real transactions occur. The payment flow is 100% functional but uses Razorpay's test environment.

### Razorpay Demo Payment Flow

```mermaid
flowchart LR
    A["🧾 Open Invoice"] --> B["Click Pay Now"]
    B --> C["Razorpay Checkout Popup"]
    C --> D{Choose Method}
    D -->|Card| E["Enter Test Card\n4111 1111 1111 1111"]
    D -->|UPI| F["Enter success@razorpay"]
    D -->|Net Banking| G["Select any bank"]
    E --> H["✅ Payment Simulated"]
    F --> H
    G --> H
    H --> I["Invoice marked PAID\nin database"]
    I --> J["Backend verifies\nHMAC-SHA256 signature"]
```

### Supported Payment Methods (Sandbox)

| Method | Test Value | Result |
|---|---|---|
| Credit/Debit Card | `4111 1111 1111 1111` | ✅ Success |
| UPI | `success@razorpay` | ✅ Success |
| UPI (failure test) | `failure@razorpay` | ❌ Failure |
| Net Banking | Any bank | ✅ Success |
| Wallet | Any wallet | ✅ Success |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL (or Neon account)

### 1. Clone & Install
```bash
git clone https://github.com/aryan24cse109-dev/BizPilot-AI.git
cd BizPilot-AI
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env     # Fill in your keys
npx prisma generate
npx prisma migrate dev
npm run dev              # http://localhost:5000
```

### 3. Setup AI Service
```bash
cd ai-service
npm install
cp .env.example .env     # Set AI_SERVICE_SECRET, SARVAM_API_KEY, GROQ_API_KEY
npm run dev              # http://localhost:5001
```

### 4. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env     # Set VITE_API_URL=http://localhost:5000
npm run dev              # http://localhost:5173
```

---

## 🔐 Demo Test Accounts

| Role | Email | Password | Entity |
|---|---|---|---|
| 🏢 Business Owner | `business@bizpilot.ai` | `Password@123` | TechNova Solutions |
| 👥 Client | `rahul@rahulenterprises.com` | `Password@123` | Rahul Enterprises |

---

## 🧪 Running Tests

```bash
# Backend tests (auth, invoice, payment, AI)
cd backend && npm test

# AI service tests
cd ai-service && npm test && npm run check
```

---

## 📂 Sub-READMEs

Each service has its own detailed documentation:

| Service | README |
|---|---|
| 🌐 Frontend | [frontend/README.md](./frontend/README.md) |
| ⚙️ Backend | [backend/README.md](./backend/README.md) |
| 🤖 AI Service | [ai-service/README.md](./ai-service/README.md) |

---

## ©️ Ownership & License

> **IMPORTANT NOTICE:**
> The right to this project is owned by **DEVRATOR**. All rights reserved.
> Unauthorized reproduction, distribution, or use of this codebase is prohibited.
