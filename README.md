A ticket classification service for the SUST CSE Carnival 2026 - Codex Community Hackathon Mock Preliminary Round

📋 Overview
This service automatically classifies customer support tickets for a digital finance company. It analyzes customer messages and determines:

Case Type - What kind of problem it is

Severity - How serious the issue is

Department - Which team should handle it

Agent Summary - A quick one-sentence summary

Human Review Flag - Whether a human needs to review it

🚀 Live Demo
Base URL: https://mock-preli-submission.onrender.com

Endpoint	Method	Description
/health	GET	Health check endpoint
/sort-ticket	POST	Classify a customer ticket
📦 Tech Stack
Runtime: Node.js

Framework: Express.js

Deployment: Render

Language: JavaScript

🏗️ Project Structure
text
preli_mock/
├── index.js          # Main application file
├── package.json      # Dependencies and scripts
├── README.md         # Project documentation
└── .gitignore        # Git ignore file
🔧 Installation & Setup
Prerequisites
Node.js (v14 or higher)

npm (v6 or higher)

Local Development
Clone the repository

bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install dependencies

bash
npm install
Run the server

bash
node index.js
Test locally

bash
# Health check
curl http://localhost:3000/health

# Classify a ticket
curl -X POST http://localhost:3000/sort-ticket \
  -H "Content-Type: application/json" \
  -d '{"ticket_id":"T-001","message":"I sent 5000 taka to a wrong number"}'
The server will start on http://localhost:3000

📡 API Documentation
GET /health
Returns the service health status.

Response:

json
{
  "status": "Service is healthy"
}
POST /sort-ticket
Classifies a customer support ticket.

Request Body:

Field	Type	Required	Description
ticket_id	string	Yes	Unique ticket identifier
message	string	Yes	Customer's complaint message
channel	string	No	Communication channel (app, sms, etc.)
locale	string	No	Language (bn, en, mixed)
Example Request:

json
{
  "ticket_id": "T-001",
  "message": "I sent 5000 taka to a wrong number this morning"
}
Response:

json
{
  "ticket_id": "T-001",
  "case_type": "wrong_transfer",
  "severity": "high",
  "department": "dispute_resolution",
  "agent_summary": "Customer reports sending funds to an incorrect recipient and requests recovery assistance.",
  "human_review_required": false,
  "confidence": 0.85
}
Response Fields
Field	Type	Description
ticket_id	string	Original ticket ID from request
case_type	enum	One of: wrong_transfer, payment_failed, refund_request, phishing_or_social_engineering, other
severity	enum	One of: low, medium, high, critical
department	enum	One of: customer_support, dispute_resolution, payments_ops, fraud_risk
agent_summary	string	One or two sentence neutral summary
human_review_required	boolean	True for critical severity or phishing cases
confidence	number	Float between 0 and 1
🧪 Testing
Test All Endpoints
bash
# Using the built-in test script (Windows PowerShell)
.\test-api.ps1

# Or using curl (Linux/Mac/Git Bash)
./test.sh
Sample Test Cases
#	Message	Expected Case Type	Severity
1	"I sent 3000 to wrong number"	wrong_transfer	high
2	"Payment failed but balance deducted"	payment_failed	high
3	"Someone called asking my OTP"	phishing_or_social_engineering	critical
4	"Please refund my last transaction"	refund_request	medium
5	"App crashed when I opened it"	other	low
Manual Testing with PowerShell
powershell
# Health check
Invoke-RestMethod -Uri https://mock-preli-submission.onrender.com/health -Method Get

# Classify a ticket
Invoke-RestMethod -Uri https://mock-preli-submission.onrender.com/sort-ticket `
  -Method Post `
  -Body '{"ticket_id":"T-001","message":"I sent 5000 to wrong number"}' `
  -ContentType "application/json"
🚀 Deployment
Deploy to Render
Push your code to GitHub

Go to render.com

Click "New +" → "Web Service"

Connect your GitHub repository

Configure:

Environment: Node

Build Command: npm install

Start Command: node index.js

Click "Create Web Service"

📊 Classification Logic
Case Types
Case Type	Keywords	Department	Severity
wrong_transfer	"wrong number", "wrong recipient", "sent to wrong"	dispute_resolution	high
payment_failed	"payment failed", "transaction failed", "balance deducted"	payments_ops	high
refund_request	"refund", "return my money"	dispute_resolution	medium
phishing_or_social_engineering	"otp", "pin", "password", "phishing", "scammer"	fraud_risk	critical
other	Anything else	customer_support	low
Safety Rules
Agent summaries never ask for PIN, OTP, password, or card numbers

Phishing and critical cases always require human review

All responses are neutral and professional

🔒 Security
No secrets hardcoded in the code

Uses environment variables for configuration

HTTPS enforced in production

Input validation on all endpoints

🤝 Contributing
This project was created for the SUST CSE Carnival 2026 Hackathon. For questions or issues, please contact the team.

📝 License
This project is for educational/hackathon purposes.

👥 Team
[Black_Caps] - SUST CSE Carnival 2026
