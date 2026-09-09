/**
 * FinAI Guider – Backend Server
 * IBM Granite 4 RAG-based Digital Financial Literacy Agent
 * Problem Statement #7 – AI Agent for Digital Financial Literacy
 */

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

// ── CONFIG ──────────────────────────────────────────────────────────────────
const IBM_API_KEY    = 'gKnUU-y1k7RqWdXB62gxiOvOkBCIZCW8dQik0wlkQwvM';
const IBM_PROJECT_ID = '80049b1b-c949-43b5-a85b-1e10d70c36ad';
const IBM_MODEL_ID   = 'ibm/granite-4-h-small';
const IBM_REGION     = 'us-south';
const IBM_ML_URL     = `https://${IBM_REGION}.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`;
const IAM_URL        = 'https://iam.cloud.ibm.com/identity/token';
const PORT           = 3000;

// ── IAM TOKEN CACHE ──────────────────────────────────────────────────────────
let cachedToken = null;
let tokenExpiry  = 0;

async function getIAMToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  return new Promise((resolve, reject) => {
    const body = `grant_type=urn%3Aibm%3Aparams%3Aoauth%3Agrant-type%3Aapikey&apikey=${encodeURIComponent(IBM_API_KEY)}`;
    const opts = {
      method: 'POST',
      hostname: 'iam.cloud.ibm.com',
      path: '/identity/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          cachedToken = j.access_token;
          tokenExpiry = Date.now() + (j.expires_in - 60) * 1000;
          resolve(cachedToken);
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── RAG KNOWLEDGE BASE ────────────────────────────────────────────────────────
// Simulated retrieval from government portals, banking sites & educational platforms
const RAG_KNOWLEDGE = {
  upi: `
UPI (Unified Payments Interface) - NPCI Official Guide:
• UPI is a real-time payment system by NPCI (National Payments Corporation of India)
• How to send money via UPI: Open your UPI app (PhonePe/GPay/Paytm/BHIM) → Enter UPI ID or mobile number → Enter amount → Add note (optional) → Enter 4-6 digit UPI PIN → Payment done
• UPI transaction limit: Rs 1 lakh per transaction (Rs 2 lakh for select categories)
• UPI PIN: Never share your UPI PIN with anyone. Banks never ask for it.
• UPI ID format: username@bankname (e.g., john@sbi, john@okicici)
• BHIM UPI is the official government UPI app - completely free
• Check UPI transaction status: Open app → Transaction history → Check status
• Failed UPI payment: Amount auto-refunded within 3-5 business days
`,
  scams: `
Online Financial Scams - RBI & Cybercrime Portal Guidelines:
• Common scams: Fake KYC update calls, lottery fraud, fake investment schemes, phishing links
• RBI NEVER calls asking for OTP, PIN, card details or account credentials
• Red flags: Urgency/pressure tactics, too-good-to-be-true returns (>20% guaranteed), asking for UPI PIN
• Safe practices: Never click unverified links, always verify website URLs (https://), use official apps only
• KYC fraud: Banks do KYC through their official branches/apps, NOT via WhatsApp or phone calls
• Cybercrime helpline: 1930 (National Cybercrime Reporting Portal - cybercrime.gov.in)
• If scammed: Call 1930 immediately, block your cards, report to local police
• Investment scam: No genuine investment guarantees fixed high returns
• OTP: Never share OTP with anyone - not even bank employees
• Verify: Check RBI registered entity list at rbi.org.in before investing
`,
  interest_rates: `
Interest Rates Guide - RBI & Banking Education:
• Repo Rate (Current RBI): 6.50% - this influences all lending rates
• Safe personal loan interest rate: 10-18% per annum is normal; above 24% is high
• Home loan rates: 8.5-10.5% per annum (floating), check for hidden charges
• Credit card interest: 24-42% per annum - pay full dues monthly to avoid this
• Fixed Deposits: 6-7.5% per annum (varies by bank and tenure)
• PPF (Public Provident Fund): 7.1% per annum - tax-free, government guaranteed
• Savings account: 2.5-4% per annum
• MCLR: Marginal Cost of Lending Rate - benchmark for bank loan rates
• Rule of thumb: If loan interest > 15% per annum for non-home loans, negotiate or compare
• EMI calculation: Principal × Rate × (1+Rate)^months / ((1+Rate)^months - 1)
• Microfinance loan rates: 24-26% (regulated), above this is predatory lending
`,
  budgeting: `
Personal Budgeting & Finance Management - Financial Literacy Guide:
• 50/30/20 Rule: 50% needs (rent, food, bills), 30% wants (entertainment), 20% savings/investments
• Emergency fund: Keep 3-6 months of expenses in a liquid savings account
• Monthly budget steps: Calculate income → List fixed expenses → Track variable expenses → Set savings goal → Review weekly
• Zero-based budgeting: Every rupee has a purpose - income minus expenses = zero
• Savings before spending: Transfer savings amount first day of month (Pay Yourself First)
• Debt snowball: Pay smallest debt first for motivation, then tackle larger ones
• Track expenses: Use free apps like Walnut, Money Manager, or simple spreadsheet
• Insurance: Term life insurance (10x annual salary), health insurance (minimum Rs 5 lakh)
• Investments priority: Emergency fund → EPF/PPF → ELSS for tax saving → Mutual funds → Stocks
• Avoid lifestyle inflation: Don't increase spending every time income increases
`,
  mutual_funds: `
Mutual Funds & Investment Basics:
• SIP (Systematic Investment Plan): Invest fixed amount monthly in mutual funds
• Types: Equity (high risk, high return), Debt (low risk, stable), Hybrid (balanced)
• Index funds: Low-cost funds tracking Nifty/Sensex - ideal for beginners
• NAV: Net Asset Value - price of one mutual fund unit
• ELSS: Tax-saving mutual fund - lock-in 3 years, 80C deduction up to Rs 1.5 lakh
• Expense ratio: Lower is better - index funds have 0.1-0.5%, actively managed 1-2.5%
• KYC: Complete KYC once on KRA portal for all mutual fund investments
• CRISIL/Morningstar ratings help evaluate fund performance
• Past performance ≠ future results - diversify across fund categories
• SEBI regulates all mutual funds - verify fund house on sebi.gov.in
`,
  crypto: `
Cryptocurrency & Digital Assets - SEBI/RBI Guidelines:
• Cryptocurrency is NOT legal tender in India - RBI has not given it legal status
• Crypto gains taxed at 30% + 1% TDS in India (Budget 2022)
• High risk: Crypto markets are highly volatile - never invest more than you can afford to lose
• Avoid: Unregulated crypto exchanges, pump-and-dump schemes, guaranteed return crypto schemes
• If investing: Use only SEBI/FIU registered exchanges (WazirX, CoinDCX)
• NFTs and crypto projects with unrealistic promises are common scam vectors
• Bitcoin, Ethereum are the most established - but still highly speculative
• Never take loans to invest in crypto
• Cold wallets: Hardware wallets are safer than exchange hot wallets
`
};

// Language-specific system prompts for multilingual support
const LANG_PROMPTS = {
  en: 'You are a helpful Digital Financial Literacy AI Agent. Answer questions about UPI payments, avoiding online scams, interest rates, budgeting, and personal finance in simple English.',
  hi: 'आप एक सहायक डिजिटल वित्तीय साक्षरता AI एजेंट हैं। UPI भुगतान, ऑनलाइन धोखाधड़ी से बचाव, ब्याज दरें, बजट और व्यक्तिगत वित्त के बारे में सरल हिंदी में उत्तर दें।',
  ta: 'நீங்கள் ஒரு உதவிகரமான டிஜிட்டல் நிதி கல்வி AI முகவர். UPI பணம், ஆன்லைன் மோசடிகளிலிருந்து தவிர்ப்பு, வட்டி விகிதங்கள் பற்றி எளிய தமிழில் பதிலளிக்கவும்.',
  te: 'మీరు ఒక సహాయక డిజిటల్ ఆర్థిక అక్షరాస్యత AI ఏజెంట్. UPI చెల్లింపులు, ఆన్‌లైన్ మోసాలు నివారణ గురించి తెలుగులో సమాధానం ఇవ్వండి.',
  bn: 'আপনি একটি সহায়ক ডিজিটাল আর্থিক সাক্ষরতা AI এজেন্ট। UPI পেমেন্ট, অনলাইন প্রতারণা এড়ানো, সুদের হার সম্পর্কে সহজ বাংলায় উত্তর দিন।',
  mr: 'तुम्ही एक सहाय्यक डिजिटल आर्थिक साक्षरता AI एजंट आहात. UPI पेमेंट, ऑनलाइन फसवणूक टाळणे याबद्दल सोप्या मराठीत उत्तर द्या।'
};

// Simple keyword-based retrieval (RAG simulation)
function retrieveContext(query) {
  const q = query.toLowerCase();
  let context = '';
  if (q.match(/upi|payment|send money|transfer|bhim|gpay|phonepe|paytm/)) context += RAG_KNOWLEDGE.upi;
  if (q.match(/scam|fraud|fake|phishing|otp|kyc|cheat|hack|cybercrime|safe/)) context += RAG_KNOWLEDGE.scams;
  if (q.match(/interest|rate|loan|emi|home loan|credit|repo|fd|fixed deposit|ppf|mclr/)) context += RAG_KNOWLEDGE.interest_rates;
  if (q.match(/budget|saving|expense|sip|invest|money management|50.30|emergency fund|insurance/)) context += RAG_KNOWLEDGE.budgeting;
  if (q.match(/mutual fund|sip|nav|elss|index fund|nifty|sensex|equity|debt fund/)) context += RAG_KNOWLEDGE.mutual_funds;
  if (q.match(/crypto|bitcoin|ethereum|nft|digital asset|blockchain/)) context += RAG_KNOWLEDGE.crypto;
  // Default: all context if nothing specific matched
  if (!context) {
    context = RAG_KNOWLEDGE.upi + RAG_KNOWLEDGE.scams + RAG_KNOWLEDGE.interest_rates + RAG_KNOWLEDGE.budgeting;
  }
  return context.trim();
}

// ── GRANITE API CALL ──────────────────────────────────────────────────────────
async function queryGranite(userMessage, language = 'en') {
  const token = await getIAMToken();
  const context = retrieveContext(userMessage);
  const systemPrompt = LANG_PROMPTS[language] || LANG_PROMPTS.en;

  const prompt = `${systemPrompt}

## Retrieved Financial Knowledge Base:
${context}

## User Question:
${userMessage}

## Instructions:
- Answer ONLY based on the retrieved knowledge above
- Be concise, practical, and use numbered steps where helpful
- Warn about risks clearly
- If asked about scams, always mention the cybercrime helpline 1930
- Keep response under 200 words
- Do NOT make up facts or figures not in the knowledge base

## Answer:`;

  const payload = JSON.stringify({
    model_id: IBM_MODEL_ID,
    project_id: IBM_PROJECT_ID,
    input: prompt,
    parameters: {
      decoding_method: 'greedy',
      max_new_tokens: 300,
      min_new_tokens: 20,
      stop_sequences: ['##', '\n\n\n'],
      repetition_penalty: 1.1
    }
  });

  return new Promise((resolve, reject) => {
    const urlObj = new URL(IBM_ML_URL);
    const opts = {
      method: 'POST',
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          const text = j?.results?.[0]?.generated_text || 'Sorry, I could not generate a response. Please try again.';
          resolve(text.trim());
        } catch(e) { reject(new Error('Failed to parse IBM response: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ── HTTP SERVER ──────────────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // ── /api/chat ──
  if (pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const { message, language = 'en' } = JSON.parse(body);
        if (!message || !message.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Message is required' }));
        }
        const reply = await queryGranite(message.trim(), language);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply, language }));
      } catch(e) {
        console.error('Chat error:', e.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'AI service error: ' + e.message }));
      }
    });
    return;
  }

  // ── /api/topics ── (pre-built topic cards)
  if (pathname === '/api/topics' && req.method === 'GET') {
    const topics = [
      { id: 'upi',            icon: '📱', title: 'How to Use UPI',         desc: 'Send & receive money safely' },
      { id: 'scams',          icon: '🛡️', title: 'Avoid Online Scams',     desc: 'Protect yourself from fraud' },
      { id: 'interest_rates', icon: '📊', title: 'Understanding Interest',  desc: 'Loans, FDs & safe rates' },
      { id: 'budgeting',      icon: '💰', title: 'Budget Planning',         desc: '50/30/20 rule & savings' },
      { id: 'mutual_funds',   icon: '📈', title: 'Mutual Funds & SIP',      desc: 'Investment basics' },
      { id: 'crypto',         icon: '₿',  title: 'Crypto Awareness',        desc: 'Risks & regulations in India' }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(topics));
  }

  // ── Static files ──
  let filePath = pathname === '/' ? './index.html' : '.' + pathname;
  const ext = path.extname(filePath);
  if (fs.existsSync(filePath)) {
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    return res.end(fs.readFileSync(filePath));
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n🚀 FinAI Guider Backend running on http://localhost:${PORT}`);
  console.log(`📡 IBM Granite Model: ${IBM_MODEL_ID}`);
  console.log(`🌍 Multilingual RAG Agent ready\n`);
});
