import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))

from fastapi.testclient import TestClient
from app.main import app
from app.seed import seed_database

client = TestClient(app)

def run_all_tests():
    print("=========================================")
    print(" Running LeadDesk Mini API Test Suite   ")
    print("=========================================")

    # 1. Seed Database
    seed_database()

    # 2. Test Admin Login (Success)
    login_res = client.post("/api/auth/login", json={
        "email": "admin@leaddesk.com",
        "password": "admin123"
    })
    assert login_res.status_code == 200, f"Login failed: {login_res.text}"
    token_data = login_res.json()
    token = token_data["access_token"]
    print("[PASS] Admin Login Test Passed. JWT token acquired.")

    # 3. Test Admin Login (Invalid Password)
    bad_login_res = client.post("/api/auth/login", json={
        "email": "admin@leaddesk.com",
        "password": "wrongpassword"
    })
    assert bad_login_res.status_code == 401
    print("[PASS] Invalid Credentials Test Passed (401 Unauthorized).")

    # 4. Test Public Lead Submission (Valid)
    lead_payload = {
        "name": "Sarah Connor",
        "email": "sarah@cyberdyne.org",
        "budget": "$1000-$5000",
        "message": "We need a secure website to monitor defense systems."
    }
    lead_res = client.post("/api/leads", json=lead_payload)
    assert lead_res.status_code == 201, f"Lead submit failed: {lead_res.text}"
    created_lead = lead_res.json()
    assert created_lead["name"] == "Sarah Connor"
    assert created_lead["status"] == "New"
    lead_id = created_lead["id"]
    print(f"[PASS] Public Lead Submission Test Passed. Created Lead #{lead_id}.")

    # 5. Test Lead Submission (Invalid Email & Empty Name)
    bad_lead_res = client.post("/api/leads", json={
        "name": "   ",
        "email": "invalid-email-format",
        "budget": "Invalid Budget",
        "message": ""
    })
    assert bad_lead_res.status_code == 422, f"Expected validation error, got {bad_lead_res.status_code}"
    print("[PASS] Server-side Input Validation Test Passed (422 Unprocessable Entity).")

    # 6. Test GET Leads without Auth Token
    unauth_get = client.get("/api/leads")
    assert unauth_get.status_code == 401
    print("[PASS] Protected Route Security Test Passed (401 without Token).")

    # 7. Test GET Leads with Auth Token
    headers = {"Authorization": f"Bearer {token}"}
    auth_get = client.get("/api/leads", headers=headers)
    assert auth_get.status_code == 200
    leads_list = auth_get.json()
    assert len(leads_list) >= 1
    print(f"[PASS] GET Protected Leads Test Passed. Retrieved {len(leads_list)} leads.")

    # 8. Test Update Lead Status (New -> Contacted)
    update_res = client.put(
        f"/api/leads/{lead_id}/status",
        headers=headers,
        json={"status": "Contacted"}
    )
    assert update_res.status_code == 200
    assert update_res.json()["status"] == "Contacted"
    print(f"[PASS] Lead Status Toggle Test Passed. Lead #{lead_id} updated to 'Contacted'.")

    # 9. Test Lead Search API
    search_res = client.get(f"/api/leads/search?q=Sarah", headers=headers)
    assert search_res.status_code == 200
    search_results = search_res.json()
    assert len(search_results) >= 1
    assert search_results[0]["name"] == "Sarah Connor"
    print(f"[PASS] Real-time Search API Test Passed. Found matching record for 'Sarah'.")

    print("\nALL BACKEND API TESTS PASSED SUCCESSFULLY!\n")

if __name__ == "__main__":
    run_all_tests()
