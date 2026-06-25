const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());



const classifyTicket = (message) => {
    const lowerMsg = message.toLowerCase();
    let case_type = 'other';
    let severity = 'low';
    let department = 'customer_support';
    let human_review_required = false;

    
    if (lowerMsg.includes('wrong number') || lowerMsg.includes('wrong recipient') || lowerMsg.includes('sent to wrong')) {
        case_type = 'wrong_transfer';
        severity = 'high';
        department = 'dispute_resolution';
    } else if (lowerMsg.includes('payment failed') || lowerMsg.includes('transaction failed') || lowerMsg.includes('balance deducted')) {
        case_type = 'payment_failed';
        severity = 'high';
        department = 'payments_ops';
    } else if (lowerMsg.includes('refund') || lowerMsg.includes('return my money')) {
        case_type = 'refund_request';
        severity = 'medium'; 
        department = 'dispute_resolution';
    } else if (lowerMsg.includes('otp') || lowerMsg.includes('pin') || lowerMsg.includes('password') || lowerMsg.includes('phishing') || lowerMsg.includes('scammer')) {
        case_type = 'phishing_or_social_engineering';
        severity = 'critical';
        department = 'fraud_risk';
    }

    
    if (severity === 'critical' || case_type === 'phishing_or_social_engineering') {
        human_review_required = true;
    }

    
    let agent_summary = 'Customerr reports an issue.';
    if (case_type === 'wrong_transfer') {
        agent_summary = 'Customer reports sending funds to an incorrect recipient and requests recovery assistance.';
    } else if (case_type === 'payment_failed') {
        agent_summary = 'Customer reports a failed transaction where balance may have been deducted.';
    } else if (case_type === 'refund_request') {
        agent_summary = 'Customer is requesting a refund for a previous transaction.';
    } else if (case_type === 'phishing_or_social_engineering') {
        agent_summary = 'Customer reports a suspicious communication attempting to obtain sensitive information.';
    } else {
        agent_summary = 'Customer reports a general inquiry or issue not covered by other categories.';
    }

    
    let confidence = 0.75; 
    if (case_type !== 'other') confidence = 0.85;

    return {
        case_type,
        severity,
        department,
        agent_summary,
        human_review_required,
        confidence
    };
};


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Service is healthy' });
});


app.post('/sort-ticket', (req, res) => {
    const { ticket_id, message } = req.body;

    
    if (!ticket_id || !message) {
        return res.status(400).json({ error: 'Missing required fields: ticket_id and message are required.' });
    }

    const classification = classifyTicket(message);

    
    const response = {
        ticket_id: ticket_id,
        ...classification,
       
    };

    res.status(200).json(response);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});