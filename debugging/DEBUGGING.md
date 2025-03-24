# Debugging Analysis

## Scenario 1: Checking Environment Variables

**Objective**: Make sure `.env` is working and that my app isn’t hard-coding sensitive info.

1. **Breakpoint**: line 14 in `app.ts`.
2. **What I Saw**:  
  - In VS Code, I expanded `process.env` and saw my variables:
  - `PORT=3000`
  - `FIREBASE_PROJECT_ID="assignment-03-8e32c"`
  - `FIREBASE_PRIVATE_KEY=...`
  - `FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@assignment-03-8e32c.iam.gserviceaccount.com"`
- This matches the contents of my `.env`.
3. **Why It Matters**:  
  - Confirms that environment variables are loaded early and securely.
  - Ensures no secrets are accidentally pushed to version control.

---

## Scenario 2: Verifying Helmet’s Security Headers

**Objective**: Prove Helmet is adding the right security headers.

1. **Breakpoint**: line 56 in `branchRoutes.ts`.
2. **What I Saw**:  
  - In VS Code’s debugger, I inspected `res.getHeaders()` and saw:
  - `x-frame-options`
  - `x-dns-prefetch-control`
  - `strict-transport-security`
- In Postman, after sending `GET /api/v1/branches`, I saw those same headers in the response.

3. **Why It Matters**:  
   - Shows Helmet is actively protecting the app by setting headers that reduce common security risks.

