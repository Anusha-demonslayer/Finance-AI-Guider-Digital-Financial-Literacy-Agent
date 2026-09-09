# 💰 Finance AI Guider — Digital Financial Literacy Agent

> **AI-powered digital financial literacy assistant for safer, smarter and more informed financial decisions.**

Finance AI Guider is an intelligent financial-literacy platform designed to help users understand everyday financial concepts, identify potential digital-financial scams, manage personal finances, and access trustworthy financial guidance through a conversational AI interface.

The system combines **IBM watsonx.ai, IBM Granite, Retrieval-Augmented Generation (RAG), financial knowledge sources, risk detection and a modern web interface** to provide grounded and user-friendly financial guidance.

---

## 🎯 Problem Statement

Millions of users interact with digital financial services without having sufficient knowledge about:

* Digital payments and UPI
* Online banking safety
* Financial fraud and scams
* Loans and interest rates
* Personal budgeting
* Savings and investments
* Insurance
* Responsible financial decision-making

Generic AI assistants may also generate inaccurate or unsupported financial information.

**Finance AI Guider addresses this problem by combining conversational AI with trusted financial knowledge and safety-oriented guardrails.**

---

## 💡 Solution

Finance AI Guider acts as a **Digital Financial Literacy Agent** that can:

### 🤖 AI Financial Assistant

Users can ask questions in natural language and receive simple, contextual explanations.

Examples:

> "How do I safely send money using UPI?"

> "What should I do if someone asks for my OTP?"

> "Explain compound interest."

> "How can I create a monthly budget?"

### 🛡️ Scam & Risk Awareness

The system identifies potentially dangerous financial situations and provides preventive guidance.

It can detect topics such as:

* OTP/PIN requests
* Fake bank calls
* Phishing links
* Fake investment schemes
* UPI fraud
* Account takeover attempts
* Suspicious payment requests
* Impersonation scams

For high-risk situations, the system prioritizes **safety instructions and official reporting channels** rather than speculative financial advice.

### 📚 RAG-Based Financial Knowledge

Instead of relying only on the model's internal knowledge, the application retrieves relevant information from a curated financial knowledge base before generating an answer.

This helps improve:

* Accuracy
* Relevance
* Explainability
* Source grounding
* Financial safety

### 💰 Financial Education

The platform can explain:

* Budgeting
* Saving
* Interest rates
* Loans
* Credit
* Insurance
* Investments
* Digital payments
* Financial fraud prevention

### 🌐 Multilingual Experience

The architecture is designed to support financial-literacy content in multiple Indian languages, making financial education more accessible.

---

# 🏗️ System Architecture

```text
                         ┌───────────────────────────────┐
                         │           USER                │
                         │                               │
                         │  Web Browser / Mobile Browser │
                         └───────────────┬───────────────┘
                                         │
                                         │ HTTPS / REST API
                                         ▼
              ┌──────────────────────────────────────────────┐
              │              FRONTEND                         │
              │                                               │
              │  • Financial Chat Interface                  │
              │  • Scam Alert                                │
              │  • Financial Education                       │
              │  • Budgeting                                  │
              │  • Risk Indicators                            │
              │  • Multilingual UI                            │
              └──────────────────────┬───────────────────────┘
                                     │
                                     │ API Request
                                     ▼
              ┌──────────────────────────────────────────────┐
              │             BACKEND / API                    │
              │                                               │
              │                 FastAPI                       │
              │                                               │
              │  • Request Validation                        │
              │  • Session Management                         │
              │  • Risk Analysis                              │
              │  • RAG Orchestration                          │
              │  • AI Response Generation                     │
              └──────────────┬─────────────────┬─────────────┘
                             │                 │
                ┌────────────┘                 └────────────┐
                ▼                                           ▼
       ┌─────────────────────┐                  ┌─────────────────────┐
       │   SAFETY ENGINE     │                  │     RAG ENGINE      │
       │                     │                  │                     │
       │ • Scam Detection    │                  │ • Query Processing  │
       │ • Risk Rules        │                  │ • Retrieval         │
       │ • Prompt Guard      │                  │ • Ranking           │
       │ • Safety Response   │                  │ • Context Building  │
       └──────────┬──────────┘                  └──────────┬──────────┘
                  │                                        │
                  │                                        ▼
                  │                              ┌─────────────────────┐
                  │                              │   KNOWLEDGE BASE    │
                  │                              │                     │
                  │                              │ • Financial Guides  │
                  │                              │ • CSV Dataset       │
                  │                              │ • Trusted Sources   │
                  │                              │ • Educational Data  │
                  │                              └──────────┬──────────┘
                  │                                         │
                  │                                         ▼
                  │                              ┌─────────────────────┐
                  │                              │   VECTOR INDEX      │
                  │                              │                     │
                  │                              │ Embeddings +        │
                  │                              │ Similarity Search   │
                  │                              └──────────┬──────────┘
                  │                                         │
                  └────────────────┬────────────────────────┘
                                   ▼
                     ┌───────────────────────────────┐
                     │        IBM watsonx.ai         │
                     │                               │
                     │       IBM Granite Model       │
                     │                               │
                     │ • Context-aware generation   │
                     │ • Financial explanations     │
                     │ • Grounded responses         │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │      RESPONSE VALIDATION      │
                     │                               │
                     │ • Safety checks               │
                     │ • Hallucination reduction    │
                     │ • Financial disclaimer       │
                     │ • Source/context validation  │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                              ┌───────────────┐
                              │ USER RESPONSE │
                              └───────────────┘
```

---

# 🔄 AI + RAG Workflow

```text
User Question
      │
      ▼
Query Validation
      │
      ▼
Risk / Scam Detection
      │
      ├──────────── High Risk ────────────► Safety Response
      │
      ▼
Query Understanding
      │
      ▼
Knowledge Retrieval
      │
      ▼
Vector Similarity Search
      │
      ▼
Relevant Financial Context
      │
      ▼
IBM Granite
      │
      ▼
Grounded Response Generation
      │
      ▼
Safety & Response Validation
      │
      ▼
User-Friendly Answer
```

---

# 🧠 IBM Granite Integration

The project uses **IBM Granite through watsonx.ai** as the core generative AI layer.

Granite is responsible for:

* Understanding user questions
* Processing retrieved financial context
* Generating natural-language explanations
* Simplifying complex financial concepts
* Producing context-aware responses
* Supporting multilingual financial education

The application architecture separates **retrieval, safety and generation**, allowing the AI model to operate within controlled boundaries.

---

# 📚 Retrieval-Augmented Generation (RAG)

The RAG pipeline follows:

```text
Financial Documents / CSV
          │
          ▼
       Chunking
          │
          ▼
      Embeddings
          │
          ▼
      Vector Index
          │
          ▼
     User Question
          │
          ▼
   Similarity Retrieval
          │
          ▼
   Relevant Context
          │
          ▼
     IBM Granite
          │
          ▼
    Grounded Answer
```

### Why RAG?

RAG helps prevent the AI from answering financial questions solely from its pretrained knowledge.

Instead, relevant information is retrieved from the project's curated knowledge base and supplied as context to the model.

---

# 🛡️ AI Safety & Guardrails

Financial applications require additional safety controls.

Finance AI Guider implements multiple layers of protection.

### Input Safety

The application checks for:

* Prompt injection attempts
* Malicious instructions
* Suspicious financial requests
* Scam-related keywords
* Sensitive-information requests

### Financial Safety

The assistant avoids:

* Guaranteed-return claims
* Unqualified investment recommendations
* Requests for passwords, OTPs or PINs
* Fabricated financial regulations
* Unsupported claims about banks or financial institutions

### Scam Safety

For potentially fraudulent situations, the system prioritizes:

1. Stop the transaction
2. Do not share OTP/PIN/password
3. Contact the relevant bank/payment provider
4. Preserve evidence
5. Report the incident through official channels

---

# 🧩 Core Components

| Component                 | Responsibility                           |
| ------------------------- | ---------------------------------------- |
| Frontend                  | User interaction and financial dashboard |
| FastAPI Backend           | API and application orchestration        |
| RAG Engine                | Knowledge retrieval                      |
| Vector Index              | Semantic document search                 |
| IBM Granite               | AI response generation                   |
| Safety Engine             | Scam and financial risk detection        |
| Knowledge Base            | Trusted financial information            |
| Cloud Object Storage      | Dataset/document storage                 |
| Environment Configuration | Secure credential management             |

---

# 📁 Project Structure

```text
Finance-AI-Guider-Digital-Financial-Literacy-Agent/
│
├── index.html
├── package.json
├── server.js
├── README.md
│
├── backend/
│   ├── app.py
│   ├── granite_client.py
│   ├── rag_engine.py
│   ├── safety_engine.py
│   └── requirements.txt
│
├── data/
│   ├── financial_knowledge.csv
│   └── documents/
│
├── frontend/
│   ├── assets/
│   └── components/
│
├── .env.example
├── .gitignore
└── start.bat
```

> The exact directory structure can vary depending on the deployment configuration.

---

# ☁️ IBM Cloud Architecture

```text
                   IBM Cloud
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   ┌──────────────┐         ┌─────────────────┐
   │  watsonx.ai  │         │ Cloud Object    │
   │              │         │ Storage         │
   │ IBM Granite  │         │                 │
   └──────┬───────┘         │ CSV / Documents │
          │                 └────────┬────────┘
          │                          │
          ▼                          ▼
   ┌─────────────────────────────────────┐
   │            RAG Pipeline             │
   │                                     │
   │ Retrieval → Context → Granite       │
   └──────────────────┬──────────────────┘
                      │
                      ▼
              ┌──────────────┐
              │ FastAPI      │
              │ Backend      │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ Web Frontend │
              └──────┬───────┘
                     │
                     ▼
                    User
```

---

# 🔐 Environment Variables

Credentials should never be hard-coded in source code.

Create a `.env` file locally:

```env
IBM_CLOUD_API_KEY=your_api_key
WATSONX_PROJECT_ID=your_project_id
WATSONX_URL=https://ap-south-1.aws.wxai.ibm.com

COS_API_KEY=your_cos_api_key
COS_RESOURCE_INSTANCE_ID=your_resource_instance_id
COS_BUCKET=your_bucket_name
COS_ENDPOINT=your_cos_endpoint
```

### Security

Never commit:

```text
.env
```

to GitHub.

Use:

```text
.env.example
```

for sharing the required variable names without exposing secrets.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/Anusha-demonslayer/Finance-AI-Guider-Digital-Financial-Literacy-Agent.git
```

```bash
cd Finance-AI-Guider-Digital-Financial-Literacy-Agent
```

## 2. Create a Python environment

```bash
python -m venv venv
```

### Windows

```powershell
venv\Scripts\activate
```

## 3. Install dependencies

```bash
pip install -r backend/requirements.txt
```

## 4. Configure environment variables

Create:

```text
.env
```

and add your IBM Cloud and watsonx credentials.

## 5. Start the backend

```bash
uvicorn backend.app:app --reload --port 8000
```

## 6. Open the application

```text
http://localhost:8000
```

---

# 🔌 API Architecture

### Chat

```http
POST /api/chat
```

Example:

```json
{
  "message": "How can I identify a UPI scam?"
}
```

### Risk Analysis

```http
POST /api/risk
```

Example:

```json
{
  "message": "Someone called me and asked for my OTP."
}
```

### Health Check

```http
GET /api/health
```

Used to verify backend availability.

---

# 📊 Key Features

* 🤖 IBM Granite-powered conversational AI
* 📚 Retrieval-Augmented Generation
* 🛡️ Financial scam detection
* 🔐 Safety guardrails
* 💳 Digital payment education
* 💰 Budgeting guidance
* 📈 Financial concept explanations
* 🌐 Multilingual-ready architecture
* ☁️ IBM Cloud integration
* 📦 Cloud Object Storage support
* 🔎 Vector-based knowledge retrieval
* ⚡ FastAPI backend
* 🎨 Modern responsive web interface

---

# 🏆 Innovation

Finance AI Guider is designed around the principle:

> **"Educate first. Protect always."**

Instead of functioning as a generic chatbot, the system combines:

```text
Financial Education
        +
Trusted Knowledge
        +
RAG
        +
IBM Granite
        +
Risk Detection
        +
Safety Guardrails
        =
Responsible Financial AI
```

This architecture makes the system more appropriate for real-world financial-literacy scenarios where **accuracy, trust and safety are more important than simply generating an answer.**

---

# 🎯 Target Users

The platform can support:

* Students
* First-time digital-payment users
* Rural and semi-urban users
* Senior citizens
* New banking customers
* Small-business users
* Users learning personal finance
* Users who want to identify suspicious financial activity

---

# 🌱 Future Enhancements

Potential future improvements include:

* Voice-based financial assistant
* More Indian-language support
* OCR for suspicious transaction screenshots
* Document/evidence analysis
* Personalized financial-literacy journeys
* Advanced scam classification
* Real-time official-source verification
* Financial-literacy quizzes
* Personalized budgeting dashboards
* Explainable AI responses
* Mobile application
* Analytics dashboard for administrators

---

# ⚠️ Disclaimer

Finance AI Guider is an **educational financial-literacy tool**.

It does not replace professional financial, legal, tax or investment advice.

Users should verify important financial decisions with their bank, regulated financial institution, government authority or qualified professional.

The application should never request or store:

* OTPs
* PINs
* Passwords
* CVV
* Banking credentials
* Private authentication codes

---

# 👥 Project

**Project:** Finance AI Guider — Digital Financial Literacy Agent

**Technology:** IBM watsonx.ai + IBM Granite + RAG + FastAPI + Web Technologies

**Platform:** IBM Cloud

**Repository:** Finance-AI-Guider-Digital-Financial-Literacy-Agent

---

## ⭐ Vision

> **Make trustworthy financial knowledge accessible to everyone, while helping people recognize and avoid digital financial scams.**

**Finance AI Guider — Learn. Verify. Protect.**
