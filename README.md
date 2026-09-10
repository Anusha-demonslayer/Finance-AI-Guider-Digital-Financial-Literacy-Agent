# Finance AI Guider — Digital Financial Literacy Agent

An AI-powered **Digital Financial Literacy Agent** designed to help users understand everyday financial topics such as UPI payments, online scams, interest rates, budgeting, mutual funds, and digital financial safety.

The application combines a modern web interface with a **Node.js backend** and **IBM watsonx.ai Granite** to provide conversational financial-literacy guidance.

> **AICTE Problem Statement:** AI Agent for Digital Financial Literacy
> **Technology:** IBM watsonx.ai + IBM Granite
> **Application Type:** Full-stack web application
> **Backend:** Node.js
> **Frontend:** HTML, CSS, JavaScript

---

## 🚀 Features

### 💬 AI Financial Assistant

Users can ask questions about:

* UPI and digital payments
* Online banking
* Financial scams
* OTP and PIN safety
* Interest rates
* Loans and EMI concepts
* Budgeting
* Savings
* Mutual funds
* Cryptocurrency awareness
* Personal financial planning

The backend sends suitable financial context to **IBM Granite** to generate a conversational response.

### 🛡️ Scam & Risk Awareness

The application provides guidance for potentially risky situations, including:

* Fake bank calls
* OTP requests
* Phishing links
* Fake investment schemes
* Suspicious payment requests
* Fraudulent customer-care numbers
* Digital-payment scams

For serious cyber-fraud situations, users are directed toward appropriate official reporting channels such as **1930** and the Government of India's cybercrime reporting portal.

### 📊 Financial Calculators

The application includes interactive tools such as:

* EMI Calculator
* Budget Calculator
* SIP Calculator

These tools help users understand basic financial calculations without requiring specialist knowledge.

### 🌐 Multilingual Support

The interface supports multilingual financial-literacy interactions, helping make financial concepts easier to understand for a wider range of users.

### 🧠 Context-Based Financial Guidance

The backend contains a structured financial knowledge base covering major topics including:

* UPI
* Scams
* Interest Rates
* Budgeting
* Mutual Funds
* Cryptocurrency

Relevant context is selected according to the user's question before generating the AI response.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────────┐
                    │        User / Browser    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       index.html         │
                    │  HTML + CSS + JavaScript │
                    └────────────┬─────────────┘
                                 │
                         HTTP / REST API
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       Node.js Server     │
                    │        server.js         │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┴────────────────┐
                 │                                │
                 ▼                                ▼
       ┌───────────────────┐           ┌──────────────────┐
       │ Context Retrieval │           │   IBM IAM        │
       │ Financial KB      │           │ Authentication   │
       └─────────┬─────────┘           └────────┬─────────┘
                 │                              │
                 └──────────────┬───────────────┘
                                ▼
                     ┌────────────────────────┐
                     │     IBM watsonx.ai     │
                     │     Granite Model      │
                     │  ibm/granite-4-h-small │
                     └────────────┬───────────┘
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │ Financial AI Response  │
                     └────────────┬───────────┘
                                  │
                                  ▼
                         User / Browser UI
```

---

# 📁 Project Structure

```text
Finance-AI-Guider-Digital-Financial-Literacy-Agent/
│
├── index.html
│
├── server.js
│
├── package.json
│
├── README.md
│
├── static/
│   └── style.css
│
├── .vscode/
│   └── settings.json
│
└── .gitignore
```

### File Description

| File                    | Purpose                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `index.html`            | Main frontend application and user interface                            |
| `server.js`             | Node.js backend, API routes, IBM authentication and Granite integration |
| `package.json`          | Node.js project configuration and dependencies                          |
| `static/style.css`      | Additional application styling                                          |
| `.vscode/settings.json` | Local VS Code development configuration                                 |
| `.gitignore`            | Prevents sensitive/local files from being committed                     |
| `README.md`             | Project documentation                                                   |

---

# ⚙️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Responsive UI
* Interactive financial calculators
* Chat interface

## Backend

* Node.js
* Built-in HTTP/HTTPS modules
* REST API
* JSON-based communication
* CORS support

## IBM Cloud / AI

* IBM watsonx.ai
* IBM Granite
* IBM IAM authentication
* Granite model: `ibm/granite-4-h-small`

---

# 🔌 API Endpoints

## POST `/api/chat`

Processes a user's financial question.

### Example request

```json
{
  "message": "How do I safely send money using UPI?"
}
```

### Processing flow

```text
User Question
      ↓
Node.js /api/chat
      ↓
Financial Context Retrieval
      ↓
Prompt Construction
      ↓
IBM IAM Authentication
      ↓
IBM watsonx.ai
      ↓
Granite
      ↓
AI Financial Guidance
      ↓
Browser
```

---

## GET `/api/topics`

Returns the available financial education topics supported by the application.

---

# 🧠 Financial Knowledge Retrieval

The current implementation uses a structured local financial knowledge base inside the Node.js backend.

The knowledge categories include:

```text
UPI
Scams
Interest Rates
Budgeting
Mutual Funds
Cryptocurrency
```

The user's question is analyzed to identify relevant financial context.

That context is then supplied to IBM Granite so that the generated answer is grounded in the application's financial-literacy information.

### Important

The current repository implements **context-based/keyword retrieval** rather than claiming a live IBM watsonx Vector Index integration.

This README intentionally describes the implementation that is actually present in the repository.

---

# 🔐 Security

IBM credentials must **never be committed to GitHub**.

Use environment variables for credentials.

Example:

```env
IBM_API_KEY=your_ibm_api_key
IBM_PROJECT_ID=your_watsonx_project_id
IBM_REGION=us-south
```

Add `.env` to `.gitignore`:

```gitignore
.env
node_modules/
venv/
__pycache__/
*.pyc
```

### ⚠️ Important

If an IBM API key has previously been committed to a public GitHub repository, treat that key as compromised.

**Revoke/rotate the exposed key in IBM Cloud before deploying the application.**

Never place a real API key in:

* `server.js`
* `index.html`
* `README.md`
* GitHub commits
* screenshots
* presentations

---

# 💻 Local Installation

## 1. Clone the repository

```bash
git clone https://github.com/Anusha-demonslayer/Finance-AI-Guider-Digital-Financial-Literacy-Agent.git
```

## 2. Enter the project

```bash
cd Finance-AI-Guider-Digital-Financial-Literacy-Agent
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure IBM credentials

Create a local `.env` file containing your IBM Cloud credentials.

Do not upload this file to GitHub.

## 5. Start the application

```bash
npm start
```

The server runs locally on:

```text
http://localhost:3000
```

Open the address in a browser.

---

# ☁️ IBM Cloud Deployment

The application is designed so that the Node.js server can serve the frontend and API from the same application.

A typical deployment architecture is:

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │   IBM Code      │
              │    Engine       │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Node.js App   │
              │   server.js     │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ IBM watsonx.ai  │
              │ Granite         │
              └─────────────────┘
```

For cloud deployment, the application should listen on the port supplied by the hosting platform.

The server should therefore use an environment-defined port:

```javascript
const PORT = process.env.PORT || 3000;
```

This allows local development on port `3000` while allowing IBM Code Engine to provide its own runtime port.

---

# 🎯 Target Users

The application is intended for users who want simple explanations of financial concepts, particularly:

* Students
* Young adults
* First-time digital-payment users
* New investors
* Users learning personal finance
* People seeking basic online-safety guidance

The application is designed for **financial education and awareness**, not personalized professional financial advice.

---

# 🛡️ Responsible AI

The application follows a financial-literacy-first approach.

The AI should:

* Explain financial concepts in simple language.
* Avoid guaranteeing investment returns.
* Warn users about financial scams.
* Encourage users to verify suspicious requests.
* Avoid requesting OTPs, passwords, PINs, or banking credentials.
* Encourage users to use official banking and government channels.
* Clearly distinguish educational information from professional financial advice.

---

# 📚 Example Questions

Users can ask:

```text
How do I send money safely using UPI?

Someone is asking me for my OTP. What should I do?

What is an interest rate?

How can I create a monthly budget?

What is an EMI?

What is a mutual fund?

How can I identify an online investment scam?

What should I do if I transferred money to a scammer?
```

---

# 🔄 Example AI Flow

```text
User:
"Someone called me saying they are from my bank
and asked for my OTP."

                    ↓

        Financial topic detection

                    ↓

             Scam context

                    ↓

         Safety-oriented prompt

                    ↓

             IBM Granite

                    ↓

AI response explaining that OTPs should never be
shared and recommending appropriate official
fraud-reporting channels.
```

---

# 🏆 Project Objective

The objective of **Finance AI Guider** is to make digital financial literacy more accessible through an AI-powered conversational assistant.

The project focuses on:

1. Digital payment awareness
2. Financial scam prevention
3. Personal finance education
4. Basic investment awareness
5. Budgeting and financial planning
6. Multilingual accessibility
7. Responsible use of generative AI

---

# 📌 AICTE Problem Statement Alignment

The project addresses the requirements of an AI agent for digital financial literacy by providing:

| Requirement                   | Implementation |
| ----------------------------- | -------------- |
| UPI guidance                  | ✅              |
| Online scam awareness         | ✅              |
| Interest-rate education       | ✅              |
| Budgeting                     | ✅              |
| Personal finance guidance     | ✅              |
| Multilingual interaction      | ✅              |
| AI conversational interface   | ✅              |
| IBM Granite                   | ✅              |
| IBM watsonx.ai                | ✅              |
| Financial knowledge retrieval | ✅              |
| Interactive calculators       | ✅              |
| Risk/scam awareness           | ✅              |

---

# 🚧 Future Enhancements

Potential future improvements include:

* IBM watsonx Vector Index integration
* PDF/CSV knowledge ingestion
* Embedding-based semantic retrieval
* Government-source document synchronization
* More Indian-language support
* Voice-based financial assistance
* Personalized budgeting
* Advanced financial-risk classification
* IBM Cloud production deployment
* Authentication and user profiles
* Conversation history

---

# ⚠️ Disclaimer

Finance AI Guider is an educational financial-literacy application.

The information provided by the application should not be considered professional financial, investment, legal, tax, or banking advice.

Users should verify important financial decisions through official institutions and qualified professionals.

---

# 👩‍💻 Project

**Finance AI Guider — Digital Financial Literacy Agent**

Built using:

**IBM watsonx.ai + IBM Granite + Node.js + HTML/CSS/JavaScript**

GitHub Repository:

`https://github.com/Anusha-demonslayer/Finance-AI-Guider-Digital-Financial-Literacy-Agent`
