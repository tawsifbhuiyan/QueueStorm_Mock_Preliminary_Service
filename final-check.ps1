$baseUrl = "https://mock-preli-submission.onrender.com"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FINAL DEPLOYMENT CHECK" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Health
Write-Host "Test 1: Health Check" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get -TimeoutSec 10
    if ($response.status -eq "Service is healthy") {
        Write-Host "✅ PASSED" -ForegroundColor Green
    } else {
        Write-Host "❌ FAILED: Unexpected response" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Sort Ticket
Write-Host "`nTest 2: Sort Ticket (Wrong Transfer)" -ForegroundColor Yellow
$body = @{ ticket_id = "FINAL-001"; message = "I sent 3000 to wrong number" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/sort-ticket" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 30
    if ($response.case_type -eq "wrong_transfer" -and $response.severity -eq "high") {
        Write-Host "✅ PASSED: case_type=$($response.case_type), severity=$($response.severity)" -ForegroundColor Green
    } else {
        Write-Host "❌ FAILED: Unexpected classification" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Sort Ticket (Phishing - Critical)
Write-Host "`nTest 3: Sort Ticket (Phishing)" -ForegroundColor Yellow
$body = @{ ticket_id = "FINAL-002"; message = "Someone called asking my OTP" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/sort-ticket" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 30
    if ($response.case_type -eq "phishing_or_social_engineering" -and $response.human_review_required -eq $true) {
        Write-Host "✅ PASSED: case_type=$($response.case_type), human_review=$($response.human_review_required)" -ForegroundColor Green
    } else {
        Write-Host "❌ FAILED: Phishing not detected correctly" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Ready for submission!" -ForegroundColor Green
Write-Host "  URL: $baseUrl" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan