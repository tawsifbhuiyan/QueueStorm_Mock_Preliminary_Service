Here's a complete professional README.md for your GitHub repository. I'll include all the necessary sections for the judges and other developers:

---

# QueueStorm Mock Preliminary Service

> A ticket classification service for the SUST CSE Carnival 2026 - Codex Community Hackathon Mock Preliminary Round

## 📋 Overview

This service automatically classifies customer support tickets for a digital finance company. It analyzes customer messages and determines:
- **Case Type** - What kind of problem it is
- **Severity** - How serious the issue is
- **Department** - Which team should handle it
- **Agent Summary** - A quick one-sentence summary
- **Human Review Flag** - Whether a human needs to review it

## 🚀 Live Demo

**Base URL:** https://mock-preli-submission.onrender.com

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check endpoint |
| `/sort-ticket` | POST | Classify a customer ticket |

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Deployment:** Render
- **Language:** JavaScript

## 🏗️ Project Structure

```
preli_mock/
├── index.js          # Main application file
├── package.json      # Dependencies and scripts
├── README.md         # Project documentation
└── .gitignore        # Git ignore file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-repo-name.git](https://github.com/tawsifbhuiyan/QueueStorm_Mock_Preliminary_Service
cd https://github.com/yourusername/your-repo-name.git](https://github.com/tawsifbhuiyan/QueueStorm_Mock_Preliminary_Service
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the server**
```bash
node index.js
```

4. **Test locally**
```bash
# Health check
curl http://localhost:3000/health

# Classify a ticket
curl -X POST http://localhost:3000/sort-ticket \
  -H "Content-Type: application/json" \
  -d '{"ticket_id":"T-001","message":"I sent 5000 taka to a wrong number"}'
```

The server will start on `http://localhost:3000`

## 📡 API Documentation

### GET /health
Returns the service health status.

**Response:**
```json
{
  "status": "Service is healthy"
}
```

### POST /sort-ticket
Classifies a customer support ticket.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ticket_id` | string | Yes | Unique ticket identifier |
| `message` | string | Yes | Customer's complaint message |
| `channel` | string | No | Communication channel (app, sms, etc.) |
| `locale` | string | No | Language (bn, en, mixed) |

**Example Request:**
```json
{
  "ticket_id": "T-001",
  "message": "I sent 5000 taka to a wrong number this morning"
}
```

**Response:**
```json
{
  "ticket_id": "T-001",
  "case_type": "wrong_transfer",
  "severity": "high",
  "department": "dispute_resolution",
  "agent_summary": "Customer reports sending funds to an incorrect recipient and requests recovery assistance.",
  "human_review_required": false,
  "confidence": 0.85
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `ticket_id` | string | Original ticket ID from request |
| `case_type` | enum | One of: wrong_transfer, payment_failed, refund_request, phishing_or_social_engineering, other |
| `severity` | enum | One of: low, medium, high, critical |
| `department` | enum | One of: customer_support, dispute_resolution, payments_ops, fraud_risk |
| `agent_summary` | string | One or two sentence neutral summary |
| `human_review_required` | boolean | True for critical severity or phishing cases |
| `confidence` | number | Float between 0 and 1 |

## 🧪 Testing

### Test All Endpoints
```bash
# Using the built-in test script (Windows PowerShell)
.\test-api.ps1

# Or using curl (Linux/Mac/Git Bash)
./test.sh
```

### Sample Test Cases

| # | Message | Expected Case Type | Severity |
|---|---------|-------------------|----------|
| 1 | "I sent 3000 to wrong number" | wrong_transfer | high |
| 2 | "Payment failed but balance deducted" | payment_failed | high |
| 3 | "Someone called asking my OTP" | phishing_or_social_engineering | critical |
| 4 | "Please refund my last transaction" | refund_request | medium |
| 5 | "App crashed when I opened it" | other | low |

### Manual Testing with PowerShell
```powershell
# Health check
Invoke-RestMethod -Uri https://mock-preli-submission.onrender.com/health -Method Get

# Classify a ticket
Invoke-RestMethod -Uri https://mock-preli-submission.onrender.com/sort-ticket `
  -Method Post `
  -Body '{"ticket_id":"T-001","message":"I sent 5000 to wrong number"}' `
  -ContentType "application/json"
```

## 🚀 Deployment

### Deploy to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
6. Click "Create Web Service"


### Environment Variables (Optional)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |

## 📊 Classification Logic

### Case Types

| Case Type | Keywords | Department | Severity |
|-----------|----------|------------|----------|
| `wrong_transfer` | "wrong number", "wrong recipient", "sent to wrong" | dispute_resolution | high |
| `payment_failed` | "payment failed", "transaction failed", "balance deducted" | payments_ops | high |
| `refund_request` | "refund", "return my money" | dispute_resolution | medium |
| `phishing_or_social_engineering` | "otp", "pin", "password", "phishing", "scammer" | fraud_risk | critical |
| `other` | Anything else | customer_support | low |

### Safety Rules

- Agent summaries **never** ask for PIN, OTP, password, or card numbers
- Phishing and critical cases always require human review
- All responses are neutral and professional

## 🔒 Security

- No secrets hardcoded in the code
- Uses environment variables for configuration
- HTTPS enforced in production
- Input validation on all endpoints

## 🤝 Contributing

This project was created for the SUST CSE Carnival 2026 Hackathon. For questions or issues, please contact the team.

## 📝 License

This project is for educational/hackathon purposes.

## 👥 Team

[Black_Caps] - SUST CSE Carnival 2026

---

### Quick Links

- **Live API:** https://mock-preli-submission.onrender.com
- **Health Check:** https://mock-preli-submission.onrender.com/health
- **Repository:** [https://github.com/tawsifbhuiyan/QueueStorm_Mock_Preliminary_Service]

---

## 🧪 Testing Scripts

### PowerShell Test Script (`test-api.ps1`)

Create this file for quick testing:

```powershell
$baseUrl = "https://mock-preli-submission.onrender.com"

Write-Host "Testing QueueStorm API..." -ForegroundColor Cyan

# Test 1: Health
Write-Host "`n1. Health Check:" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "✅ $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed" -ForegroundColor Red
}

# Test 2: Wrong Transfer
Write-Host "`n2. Wrong Transfer:" -ForegroundColor Yellow
$body = @{ ticket_id = "T-001"; message = "I sent 3000 to wrong number" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/sort-ticket" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ case_type: $($response.case_type)" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed" -ForegroundColor Red
}

# Test 3: Phishing
Write-Host "`n3. Phishing Detection:" -ForegroundColor Yellow
$body = @{ ticket_id = "T-002"; message = "Someone called asking my OTP" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/sort-ticket" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ case_type: $($response.case_type), review: $($response.human_review_required)" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed" -ForegroundColor Red
}
```

### Bash Test Script (`test.sh`)

```bash
#!/bin/bash
BASE_URL="https://mock-preli-submission.onrender.com"

echo "Testing QueueStorm API..."

# Health check
echo -e "\n1. Health Check:"
curl -s "$BASE_URL/health" | jq '.'

# Wrong Transfer
echo -e "\n2. Wrong Transfer:"
curl -s -X POST "$BASE_URL/sort-ticket" \
  -H "Content-Type: application/json" \
  -d '{"ticket_id":"T-001","message":"I sent 3000 to wrong number"}' | jq '.'

# Phishing
echo -e "\n3. Phishing Detection:"
curl -s -X POST "$BASE_URL/sort-ticket" \
  -H "Content-Type: application/json" \
  -d '{"ticket_id":"T-002","message":"Someone called asking my OTP"}' | jq '.'
```

---



---

**Made with ❤️ for SUST CSE Carnival 2026**

---


## **✅ README Checklist**

- [x] Project overview
- [x] Live demo URL
- [x] Installation instructions
- [x] API documentation
- [x] Testing instructions
- [x] Deployment guide
- [x] Classification logic
- [x] Sample test cases
- [x] Security notes
- [x] Team information


