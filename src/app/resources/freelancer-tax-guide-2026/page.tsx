import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Freelancer Tax Guide 2026 (U.S. Edition) - CompanyVerse",
  description:
    "Understand how U.S. freelancers are taxed — Self-Employment, Federal, and State — with examples, visuals, and checklists.",
};

export default function FreelancerTaxGuide2026Page() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-gray-800 leading-relaxed">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Freelancer Tax Guide 2026 (U.S. Edition)
        </h1>
        <p className="text-center text-gray-600 italic mb-12">
          — A startup-style, visual, and practical guide for self-employed developers —
        </p>

        {/* Purpose */}
        <p className="text-lg mb-4">💡 <strong>Purpose</strong></p>
        <p>
          Understand the basics of how U.S. freelancers are taxed — Self-Employment,
          Federal, and State — with examples and checklists.
        </p>
        <p className="mt-4">
          🇺🇸 <strong>2026 figures are projected</strong>; always verify on{" "}
          <a
            href="https://www.irs.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            irs.gov
          </a>{" "}
          before filing. [1][2]
        </p>

        <p className="text-center text-blue-300 my-8">🩵 ───────────────────────────────</p>

        {/* Preface */}
        <h2 className="text-2xl font-semibold mb-4">Preface</h2>
        <p><em>Dear Freelancer,</em></p>
        <p className="mt-3">
          Understanding U.S. taxes as a freelancer can be confusing.
          This guide simplifies it into three layers:{" "}
          <strong>Self-Employment Tax</strong>,{" "}
          <strong>Federal Income Tax</strong>, and{" "}
          <strong>(optional) State Income Tax</strong> — explained clearly and visually.
        </p>

        <p className="mt-6 text-red-600 font-semibold">⚠️ Disclaimer</p>
        <p>
          This guide is for <strong>educational purposes only</strong>, not professional
          tax advice.
        </p>
        <p>
          Sources: IRS Pub. 334, 505, 463; Forms 1040, Schedule C &amp; SE;
          Section 199A (QBI). [1][2][3][4]
        </p>
        <p className="mt-4 italic">— Oğuz Can Gökçe · 2026 Edition</p>

        <p className="text-center text-gray-300 my-8">🩶───────────────────────────────</p>

        {/* 1️⃣ Overview */}
        <h2 className="text-2xl font-semibold mb-4">
          1️⃣ U.S. Freelancer Tax System Overview
        </h2>
        <p>
          Freelancers are classified as <strong>self-employed</strong> under SECA
          and usually file the following:
        </p>

        <p className="mt-4 font-semibold">📄 Required IRS Forms</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Form 1040 — Main income tax return [1]</li>
          <li>Schedule C — Profit or Loss from Business [1]</li>
          <li>Schedule SE — Self-Employment Tax [1]</li>
          <li>Form 1040-ES — Quarterly estimated payments [2]</li>
        </ul>

        <p className="mt-4">
          <strong>Key principle:</strong> You pay tax on{" "}
          <strong>net profit</strong>, not gross revenue — meaning only after
          “ordinary &amp; necessary” expenses are deducted. [1]
        </p>

        <p className="mt-3">
          💡 <strong>Tip:</strong> By default, you’re a sole proprietor unless
          you have registered an LLC or corporation.
        </p>

        <p className="text-center text-gray-300 my-8">🩶───────────────────────────────</p>

        {/* 2️⃣ Core Components */}
        <h2 className="text-2xl font-semibold mb-4">2️⃣ Core Components (2026)</h2>
        <table className="w-full text-left border-collapse mb-6">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-2">Tax Type</th>
              <th className="p-2">2026 Rate / Range</th>
              <th className="p-2">Notes</th>
            </tr>
          </thead>
          <tbody className="border border-gray-200 text-gray-700">
            <tr>
              <td className="p-2 font-semibold">Self-Employment Tax (SE)</td>
              <td className="p-2">15.3 %</td>
              <td className="p-2">
                12.4 % Social Security + 2.9 % Medicare on 92.35 % of net SE income;
                50 % deductible on Form 1040. [1]
              </td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Federal Income Tax</td>
              <td className="p-2">Progressive (10 % – 37 %)</td>
              <td className="p-2">
                Brackets continue in 2026; thresholds inflation-adjusted (projected). [2]
              </td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">State Income Tax</td>
              <td className="p-2">0 % – 13 %</td>
              <td className="p-2">Varies by state; some have none.</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4">💡 <strong>Standard deduction (projected 2026):</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Single ≈ $16 100</li>
          <li>Married Filing Jointly ≈ $32 200</li>
          <li>Head of Household ≈ $24 150</li>
        </ul>
        <p className="mt-2">Confirm final figures on IRS release. [2]</p>

        <p className="text-center text-gray-300 my-8">🩶───────────────────────────────</p>

        {/* 3️⃣ Deduction Examples */}
        <h2 className="text-2xl font-semibold mb-4">
          3️⃣ Deduction Examples (Common for Developers)
        </h2>
        <table className="w-full text-left border-collapse mb-6">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-2">Category</th>
              <th className="p-2">Example</th>
              <th className="p-2">Rule of Thumb</th>
            </tr>
          </thead>
          <tbody className="border border-gray-200 text-gray-700">
            <tr><td className="p-2">Hardware</td><td className="p-2">Laptop, monitor</td><td className="p-2">Expense or depreciate if ordinary & necessary. [1]</td></tr>
            <tr><td className="p-2">Software</td><td className="p-2">IDE, SaaS tools</td><td className="p-2">Subscriptions are deductible.</td></tr>
            <tr><td className="p-2">Connectivity</td><td className="p-2">Internet, phone</td><td className="p-2">Deduct only business-use percentage.</td></tr>
            <tr><td className="p-2">Workspace</td><td className="p-2">Home office</td><td className="p-2">Must be exclusive and regular use.</td></tr>
            <tr><td className="p-2">Travel</td><td className="p-2">Client meetings</td><td className="p-2">Keep receipts & mileage (Pub. 463). [4]</td></tr>
          </tbody>
        </table>

        <p className="mt-4 text-red-600 font-semibold">⚠️ Documentation</p>
        <p>Always keep receipts, invoices, and mileage logs. A simple spreadsheet or app helps justify deductions.</p>

        <p className="text-center text-gray-300 my-8">🩶───────────────────────────────</p>

        {/* 4️⃣ Tax Flow */}
        <h2 className="text-2xl font-semibold mb-4">4️⃣ Tax Flow — How Money Moves</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Revenue (from clients or 1099-NEC forms) [1]</li>
          <li>Minus expenses → Net Self-Employment Income (Schedule C) [1]</li>
          <li>SE Tax = 15.3 % × (net × 0.9235) (Schedule SE) [1]</li>
          <li>Deductions = ½ SE tax + Standard / Itemized [1][2]</li>
          <li>Apply Federal Tax (progressive) [2]</li>
          <li>Apply State Tax (if applicable)</li>
          <li>✅ Take-Home Pay</li>
        </ol>

        <p className="mt-4">💡 <strong>Visual Tip</strong></p>
        <Image
          src="/images/Taxation_US.drawio.png"
          alt="Freelancer Tax Flow Diagram"
          width={720}
          height={380}
          className="my-6 rounded-lg shadow-md"
        />
        <p className="font-semibold">💼 Figure 1 — Freelancer Tax Flow (Q1 Example)</p>
        <p className="mt-2">
          📊 Visualizes how a freelancer’s income moves through each taxation layer —
          from <strong>Revenue → Expenses → SE Tax → Federal Tax → State Tax → Take-Home Pay</strong>.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>🟩 Deductions reduce taxable income.</li>
          <li>🟨 SE Tax covers Social Security + Medicare.</li>
          <li>🟦 Federal Tax is progressive; 🟧 State Tax applies only in taxed states.</li>
        </ul>
        <p className="mt-3 italic text-gray-600">
          🗂 2026 figures projected — confirm final rates on irs.gov.
        </p>

        <p className="text-center text-gray-300 my-8">🩶───────────────────────────────</p>

        {/* 5️⃣ Example Case */}
        <h2 className="text-2xl font-semibold mb-4">5️⃣ Example Case (Projected 2026)</h2>
        <p><strong>Profile:</strong> Single filer · No state income tax</p>
        <p><strong>Revenue:</strong> $80 000 • <strong>Expenses:</strong> $16 000 → <strong>Net:</strong> $64 000</p>
        <p><strong>SE Tax (approx):</strong> 15.3 % × (64 000 × 0.9235) ≈ $9 070 [1]</p>
        <p><strong>½ SE Deductible:</strong> ≈ $4 535</p>
        <p><strong>AGI (approx):</strong> 64 000 − 4 535 ≈ $59 465</p>
        <p><strong>Standard Deduction (Single, 2026 projected):</strong> ≈ $16 100 [2]</p>
        <p><strong>Taxable Income (rough):</strong> ≈ $43 365</p>

        <p className="mt-4">💡 <strong>QBI (Section 199A)</strong></p>
        <p>Up to 20 % deduction of qualified business income if eligible and under income thresholds. [3]</p>

        <p className="mt-4 text-red-600 font-semibold">⚠️ Projected Data Notice</p>
        <p>Final 2026 brackets and deduction amounts may change. Always confirm on irs.gov before filing. [2]</p>

        <p className="mt-4">
          📈 This example shows how annual freelancer income ($80 000 revenue – $16 000
          expenses) flows through deductions and taxes. After applying
          <strong> SE Tax (15.3 %)</strong>, the <strong>half SE deduction</strong>, and
          the <strong>standard deduction</strong>, taxable income is ≈ $43 000,
          leading to a federal tax of around $5 100 and a take-home pay of ≈ $49 800.
        </p>

        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>🟩 Deduction steps lower the tax base.</li>
          <li>🟨 SE Tax funds Social Security + Medicare.</li>
          <li>🟦 Federal Tax is progressive; 🟧 State Tax applies only if relevant.</li>
        </ul>

        <p className="mt-3 italic text-gray-600">
          🗂 2026 figures are projections — verify final values on irs.gov.
        </p>

        <p className="text-center text-gray-300 my-8">🩶───────────────────────────────</p>

        {/* 6️⃣ Quarterly Payments */}
        <h2 className="text-2xl font-semibold mb-4">
          6️⃣ Quarterly Estimated Payments (Form 1040-ES)
        </h2>
        <table className="w-full text-left border-collapse mb-6">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-2">Quarter</th>
              <th className="p-2">Covers Income Earned</th>
              <th className="p-2">Typical Due Date</th>
            </tr>
          </thead>
          <tbody className="border border-gray-200 text-gray-700">
            <tr><td className="p-2">Q1</td><td className="p-2">Jan 1 – Mar 31</td><td className="p-2">Apr 15</td></tr>
            <tr><td className="p-2">Q2</td><td className="p-2">Apr 1 – May 31</td><td className="p-2">Jun 15</td></tr>
            <tr><td className="p-2">Q3</td><td className="p-2">Jun 1 – Aug 31</td><td className="p-2">Sep 15</td></tr>
            <tr><td className="p-2">Q4</td><td className="p-2">Sep 1 – Dec 31</td><td className="p-2">Jan 15 (next year)</td></tr>
          </tbody>
        </table>

        <p className="mt-4 italic text-gray-600">
          🗂 Reference: IRS Publication 505 — Tax Withholding & Estimated Tax (2026 projections). [2]
        </p>

        <p className="text-center text-gray-300 my-8">🩶───────────────────────────────</p>

        {/* 7️⃣ Filing Checklist */}
        <h2 className="text-2xl font-semibold mb-4">7️⃣ Filing Checklist</h2>
        <ul className="list-none space-y-2">
          <li>☐ 1099-NEC and other income records [1]</li>
          <li>☐ Categorized deductible expenses + receipts [1][4]</li>
          <li>☐ Estimated SE Tax (15.3 %) [1]</li>
          <li>☐ Quarterly payments tracked (Form 1040-ES) [2]</li>
          <li>☐ Standard vs Itemized decision [2]</li>
          <li>☐ QBI deduction eligibility (Section 199A) [3]</li>
          <li>☐ State-specific rules verified</li>
        </ul>

        <p className="text-center text-blue-300 my-8">🩵 ───────────────────────────────</p>

        {/* References */}
        <h2 className="text-2xl font-semibold mb-4">References</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>IRS Publication 334 — Tax Guide for Small Business (Sole Proprietorship)</li>
          <li>IRS Publication 505 — Tax Withholding and Estimated Tax (+ Form 1040-ES)</li>
          <li>Section 199A — Qualified Business Income (QBI) Deduction (IRS guidance)</li>
          <li>IRS Publication 463 — Travel, Gift, and Car Expenses</li>
        </ul>
        <p className="mt-4">
          Forms: 1040, Schedule C, Schedule SE, 1040-ES (see{" "}
          <a
            href="https://www.irs.gov/forms-instructions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            irs.gov/forms-instructions
          </a>
          )
        </p>

        <p className="mt-6 italic text-gray-600">
          Note: 2026 dollar amounts are <strong>projected</strong> — confirm once IRS posts final figures.
        </p>

        <p className="text-center text-blue-300 my-10">
          🩵──────────────────────────────────────
        </p>

        <p className="text-center text-sm text-gray-500">
          © 2026 Oğuz Can Gökçe · CompanyVerse / U.S. Freelancer Tax Guide Edition
        </p>
      </div>
    </div>
  );
}
