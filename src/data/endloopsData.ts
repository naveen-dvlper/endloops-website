/**
 * Endloops Content & Product Data
 *
 * NOTE ON PRODUCT STATUS:
 * Some products are in use today and others are in development.
 * Individual items have `status: null` by default so none are inaccurately tagged as "Live".
 *
 * NOTE ON CONTACT EMAIL:
 * `CONTACT_EMAIL` is a placeholder ("hello@endloops.com"). Replace with your live inbox when ready.
 */

export type ProductStatus = "In use today" | "In development" | null;

export interface AudienceItem {
  id: string;
  title: string;
  painPoint: string;
  outcome: string;
}

export interface PipelineStep {
  stepNumber: number;
  id: string;
  title: string;
  summary: string;
  detail: string;
  inputArtifact: string;
  outputArtifact: string;
  ruleChecked: string;
}

export interface SolutionItem {
  id: string;
  slug: string;
  name: string;
  outcome: string;
  preparesForYou: [string, string, string];
  status: ProductStatus;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  job: string;
  reads: string;
  flagsOrProduces: string;
  status: ProductStatus;
}

export const CONTACT_EMAIL = "hello@endloops.com"; // Placeholder email
export const COMPANY_LOCATION = "Dubai, UAE";

export const PRODUCT_AVAILABILITY_NOTE =
  "Some are in use today; others are in development.";

export const AUDIENCES: AudienceItem[] = [
  {
    id: "accountants",
    title: "Accountants",
    painPoint: "Hours spent keying invoices and tying period-end schedules by hand.",
    outcome: "Structured, cross-checked working papers ready for final sign-off.",
  },
  {
    id: "auditors",
    title: "Auditors",
    painPoint: "Sampling and vouching across hundreds of files slows fieldwork.",
    outcome: "Rule-checked populations with every exception linked to its source page.",
  },
  {
    id: "finance-teams",
    title: "Finance teams",
    painPoint: "Manual reconciliations and PO checks bottleneck month-end close.",
    outcome: "Discrepancies caught early and clean schedules delivered on time.",
  },
  {
    id: "property-management",
    title: "Property management companies",
    painPoint: "Service-charge budgets and escrow files are fragmented across buildings.",
    outcome: "Consistent, rule-verified property budgets and escrow schedules.",
  },
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    stepNumber: 1,
    id: "upload",
    title: "Upload",
    summary: "Drop source files in their original format.",
    detail: "Upload PDFs, scans, bank statements, and ledgers in bulk—no template reformatting needed.",
    inputArtifact: "Invoices, bank statements, GL exports (PDF, XLSX, CSV)",
    outputArtifact: "Indexed batch with page-level tracking",
    ruleChecked: "File completeness & document structure",
  },
  {
    stepNumber: 2,
    id: "read-and-match",
    title: "Read and match",
    summary: "Extract figures and link supporting records.",
    detail: "Reads dates, counterparties, and totals, then links ledger lines to supporting vouchers.",
    inputArtifact: "Indexed document batch + ledger rows",
    outputArtifact: "Matched transaction pairs & unmatched list",
    ruleChecked: "Counterparty, date window & amount match",
  },
  {
    stepNumber: 3,
    id: "check-against-rules",
    title: "Check against rules",
    summary: "Test items against audit or budget criteria.",
    detail: "Verifies mathematical totals, policy thresholds, cut-off dates, and required approvals.",
    inputArtifact: "Matched transaction sets & schedules",
    outputArtifact: "Rule verification log with flagged items",
    ruleChecked: "Arithmetic casting, thresholds & cut-off rules",
  },
  {
    stepNumber: 4,
    id: "draft",
    title: "Draft",
    summary: "Assemble clean working papers and schedules.",
    detail: "Prepares structured drafts and exception tables with every number linked to its source page.",
    inputArtifact: "Verified records & exception log",
    outputArtifact: "Draft working paper or reconciliation pack",
    ruleChecked: "Cross-schedule tie-out & source citations",
  },
  {
    stepNumber: 5,
    id: "review-and-sign-off",
    title: "Review and sign off",
    summary: "Inspect the prepared work and make the call.",
    detail: "Review flagged exceptions, apply professional judgement, and sign off with a clear audit trail.",
    inputArtifact: "Prepared draft + linked source files",
    outputArtifact: "Signed-off professional deliverable",
    ruleChecked: "Practitioner review & sign-off confirmation",
  },
];

export const SOLUTIONS: SolutionItem[] = [
  {
    id: "budget-review",
    slug: "budget-review",
    name: "Budget review",
    outcome:
      "Checks submitted budgets against prior actuals, contracts, and calculation rules so reviewers focus on key variances.",
    preparesForYou: [
      "Proposed vs. prior-period variance schedule",
      "Contract cost tie-out to vendor agreements",
      "Flagged report of missing support or formula errors",
    ],
    status: null,
  },
  {
    id: "escrow-audit",
    slug: "escrow-audit",
    name: "Escrow audit",
    outcome:
      "Cross-checks project escrow inflows, disbursements, and engineer certificates from start to finish.",
    preparesForYou: [
      "Inflow and outflow schedules matched to bank statements",
      "Disbursement matrix linking requests, certificates, and invoices",
      "Exception list of unmatched transfers or missing approvals",
    ],
    status: null,
  },
  {
    id: "financial-audit",
    slug: "financial-audit",
    name: "Financial audit",
    outcome:
      "Runs document testing, lead-schedule preparation, and tie-outs across full-year audit engagements.",
    preparesForYou: [
      "Lead schedules mapped directly to draft financial statements",
      "Vouched test sheets with exact source-page citations",
      "Summary of casting checks and items needing auditor judgement",
    ],
    status: null,
  },
  {
    id: "interim-audit",
    slug: "interim-audit",
    name: "Interim audit",
    outcome:
      "Prepares mid-year review schedules, cut-off checks, and variance tables so year-end fieldwork starts ahead.",
    preparesForYou: [
      "Period-to-date movement and analytical variance tables",
      "Interim sample packs for payables, receivables, and bank",
      "Early-warning list of cut-off or documentation gaps",
    ],
    status: null,
  },
  {
    id: "budget-preparation-pmc",
    slug: "budget-preparation-property-management",
    name: "Budget preparation for property management companies",
    outcome:
      "Assembles building service-charge budgets from vendor quotes, utility histories, and allocation rules.",
    preparesForYou: [
      "Draft budgets structured by building and service schedule",
      "Cost sheets linked to maintenance contracts and utility bills",
      "Unit allocation summary ready for manager sign-off",
    ],
    status: null,
  },
];

export const TOOLS: ToolItem[] = [
  {
    id: "po-extraction",
    slug: "purchase-order-extraction",
    name: "Purchase-order extraction",
    job: "Converts batches of purchase orders into structured line-item tables.",
    reads: "PDF/scanned POs, vendor quotes, and delivery notes.",
    flagsOrProduces:
      "Clean import table; flags missing PO numbers, price mismatches, and tax gaps.",
    status: null,
  },
  {
    id: "vouching-automation",
    slug: "vouching-automation",
    name: "Vouching automation",
    job: "Matches ledger entries against supporting invoices, receipts, and payment proofs.",
    reads: "General ledger exports plus invoice and receipt folders.",
    flagsOrProduces:
      "Cross-referenced vouching schedule; flags missing docs and amount variances.",
    status: null,
  },
  {
    id: "expense-working",
    slug: "expense-working-automation",
    name: "Expense working automation",
    job: "Builds expense schedules and prepayment/accrual workings from bills.",
    reads: "Supplier invoices, utility bills, contracts, and expense ledgers.",
    flagsOrProduces:
      "Period-allocated schedules; flags overlapping dates and duplicate billings.",
    status: null,
  },
  {
    id: "financial-report-review",
    slug: "financial-report-review",
    name: "Financial report review",
    job: "Checks draft financial statements for casting accuracy and note tie-outs.",
    reads: "Draft financial reports (PDF, Word, Excel) and notes.",
    flagsOrProduces:
      "Review checklist; flags footing errors, mismatched notes, and prior-year diffs.",
    status: null,
  },
  {
    id: "tender-verification",
    slug: "tender-verification",
    name: "Tender verification",
    job: "Compares supplier bids line by line against BOQs and scope rules.",
    reads: "Vendor bid sheets, PDF proposals, and master tender files.",
    flagsOrProduces:
      "Side-by-side bid comparison; flags arithmetic errors and outlier unit rates.",
    status: null,
  },
  {
    id: "reconciliation",
    slug: "reconciliation",
    name: "Reconciliation",
    job: "Matches transactions across bank statements, sub-ledgers, and vendor statements.",
    reads: "Bank statements, GL accounts, and supplier statements.",
    flagsOrProduces:
      "Reconciliation statement; flags unmatched items, timing diffs, and duplicates.",
    status: null,
  },
];

export const CAPABILITIES = [
  {
    id: "reads-documents",
    title: "Reads documents",
    description: "Extracts tables, dates, and totals from PDFs, scans, and sheets.",
  },
  {
    id: "compares-matches",
    title: "Compares and matches",
    description: "Links ledger rows to invoices, bank lines, and certificates.",
  },
  {
    id: "checks-rules",
    title: "Checks against rules",
    description: "Verifies casting, policy thresholds, and period cut-offs.",
  },
  {
    id: "prepares-drafts",
    title: "Prepares drafts",
    description: "Assembles clean working papers and exception schedules.",
  },
  {
    id: "handles-bulk",
    title: "Handles bulk work",
    description: "Processes hundreds of files consistently in one batch.",
  },
];
