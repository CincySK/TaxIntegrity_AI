export const APP_NAME = "TaxIntegrity AI";

// Simulated content from the user's GitHub website to be used as Context for the AI
export const TAX_INTEGRITY_KNOWLEDGE_BASE = `
# TaxIntegrity: Core Principles and Auditing Standards

## Mission
TaxIntegrity is dedicated to modernizing tax compliance through transparency, accuracy, and technological integration. Our goal is to reduce audit friction and ensure fair reporting across all jurisdictions.

## 1. Income Verification Standards
- **Source Documentation**: All income streams must be verified against original bank statements (Form 1099, W-2, or direct deposit logs).
- **Crypto Assets**: Cryptocurrency gains must be reported based on the fair market value at the time of the transaction. Use FIFO or Specific ID methods consistently.
- **Foreign Income**: Income exceeding $10,000 equivalent in foreign accounts must be reported via FBAR.

## 2. Expense Substantiation
- **Receipts**: Digital or physical receipts are required for any business expense over $75.
- **Travel**: Mileage logs must include date, destination, and business purpose. The standard rate for 2024 is 67 cents per mile.
- **Home Office**: Exclusive use rule applies. Calculate based on square footage percentage relative to the total property.

## 3. Risk Assessment Factors (AI-Driven)
- **High Risk**: Cash-based businesses, consistent losses for >3 years (Hobby Loss Rules), high travel/meal expenses relative to income.
- **Medium Risk**: Inconsistent reporting year-over-year, large charitable contributions without appraisal.
- **Low Risk**: W-2 only income, standard deductions, consistent historical reporting.

## 4. Audit Workflow (AI-Assisted)
1. **Data Ingestion**: Upload financial records (CSV, PDF).
2. **Preliminary Scan**: AI checks for arithmetic errors and missing fields.
3. **Compliance Check**: Cross-reference against current tax year statutes.
4. **Flagging**: Anomalies (e.g., duplicate expenses, round numbers) are flagged for human review.
5. **Report Generation**: A draft audit defense summary is created.

## 5. Penalties & Integrity
- **Accuracy Penalty**: 20% of the underpayment due to negligence or disregard of rules.
- **Fraud Penalty**: 75% of the underpayment if fraud is proven.
- **Voluntary Disclosure**: Encouraged to mitigate criminal prosecution risks.

--- NEW WEBSITE CONTENT: TAX AUDITS ---
**How AI speeds up tax audits**
In real life, audits take time because returns must be selected, reviewed, and validated. Responsible AI can speed up the early steps by prioritizing cases, auto-organizing documents, and surfacing explainable “risk signals” for human reviewers.
- **Triage faster**: score & route cases to the right team.
- **Document assist**: extract key fields and flag missing items.
- **Explainable drivers**: show why a case is prioritized.

**IRS AI Usage (Public Sources)**
The IRS says it is using AI and advanced analytics to help select complex partnerships for audits (IRA Strategic Operating Plan update, Apr 2024).
GAO notes AI models are already used for audit sampling and for identifying returns more likely to have errors and owe additional tax (GAO blog, Jun 2024).

**Baseline Stats (FY 2024)**
- Audits closed: 505,514
- Recommended additional tax: $29.0B
- Exam rate (individual, TY 2014–2022): 0.40%

**Projected Impact of AI**
Illustrative scenarios suggest AI can increase audit closure throughput by ~20% and recommended additional tax yield by ~10% through faster triage and better selection.

--- NEW WEBSITE CONTENT: EVASION ---
**The Tax Gap**
The IRS estimates the gross “tax gap” (tax owed but not paid on time) for Tax Year 2022 is $696B. After late payments and enforcement, the net tax gap is projected at $606B.
The largest component is **Underreporting**, accounting for ≈77% of the gross gap.

**AI for Evasion Detection**
1. **Anomaly detection** on filings and third‑party data.
2. **Pattern discovery** across related entities (graph analysis).
3. **Explainable risk scoring** for investigators.
4. **Human‑in‑the‑loop review** before any enforcement action.

--- NEW WEBSITE CONTENT: PROGRESS ---
**Real-world IRS AI Progress**
In a 2024 TIGTA evaluation, the IRS reported an inventory of 68 AI projects:
- 30 Operational / Implemented.
- 38 In development / Initiation.

## Contact & Support
For specialized cases involving multi-state nexus or international treaties, refer to the Advanced Support module or contact the Senior Audit Team at support@taxintegrity.org.
`;

export const MOCK_AUDITS = [
  { id: 'AUD-2024-001', entityName: 'Apex Logistics LLC', status: 'Compliant', riskScore: 12, lastReview: '2024-03-10' },
  { id: 'AUD-2024-002', entityName: 'Quantum Softworks', status: 'Flagged', riskScore: 78, lastReview: '2024-03-12' },
  { id: 'AUD-2024-003', entityName: 'Smith & Co. Retail', status: 'Pending', riskScore: 45, lastReview: '2024-03-14' },
  { id: 'AUD-2024-004', entityName: 'Global Ventures Inc.', status: 'Compliant', riskScore: 5, lastReview: '2024-03-15' },
];