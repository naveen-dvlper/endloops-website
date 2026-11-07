import React, { useState } from "react";
import type { PageRoute } from "./Header";
import { TOOLS, PRODUCT_AVAILABILITY_NOTE } from "../data/endloopsData";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  FileOutput,
} from "lucide-react";

interface ToolsPageProps {
  onNavigate: (route: PageRoute, query?: string) => void;
}

interface IllustrativeRecord {
  id: string;
  ref: string;
  counterparty: string;
  sourceDoc: string;
  ledgerOrExpected: string;
  extractedOrActual: string;
  status: "matched" | "flagged";
  note: string;
}

const RECONCILIATION_EXAMPLE_ROWS: IllustrativeRecord[] = [
  {
    id: "rec-1",
    ref: "TXN-88410",
    counterparty: "Gulf Mechanical Services",
    sourceDoc: "Bank Stmt p.4",
    ledgerOrExpected: "AED 42,500",
    extractedOrActual: "AED 42,500",
    status: "matched",
    note: "Exact match on amount and date.",
  },
  {
    id: "rec-2",
    ref: "TXN-88419",
    counterparty: "Al Noor Facilities Mgmt",
    sourceDoc: "Bank Stmt p.5",
    ledgerOrExpected: "AED 18,200",
    extractedOrActual: "AED 18,020",
    status: "flagged",
    note: "AED 180 transposition difference flagged.",
  },
  {
    id: "rec-3",
    ref: "TXN-88435",
    counterparty: "Unrecorded Bank Charge",
    sourceDoc: "Bank Stmt p.6",
    ledgerOrExpected: "Not in GL",
    extractedOrActual: "AED 315",
    status: "flagged",
    note: "Unrecorded fee + VAT requiring draft entry.",
  },
];

const PO_EXTRACTION_EXAMPLE_ROWS: IllustrativeRecord[] = [
  {
    id: "po-1",
    ref: "PO-2026-0412",
    counterparty: "Delta Elevator Maint.",
    sourceDoc: "PO_0412.pdf",
    ledgerOrExpected: "AED 4,800",
    extractedOrActual: "AED 4,800",
    status: "matched",
    note: "Line items, TRN, and 5% VAT verified.",
  },
  {
    id: "po-2",
    ref: "PO-2026-0415",
    counterparty: "Crescent Security",
    sourceDoc: "PO_0415.pdf",
    ledgerOrExpected: "AED 1,250/unit",
    extractedOrActual: "AED 1,400/unit",
    status: "flagged",
    note: "Unit price exceeds contract rate.",
  },
  {
    id: "po-3",
    ref: "PO-2026-0419",
    counterparty: "Horizon Landscaping",
    sourceDoc: "PO_0419.pdf",
    ledgerOrExpected: "Delivery ref req.",
    extractedOrActual: "Missing ref",
    status: "flagged",
    note: "Missing signed delivery note attachment.",
  },
];

export const ToolsPage: React.FC<ToolsPageProps> = ({ onNavigate }) => {
  const [demoMode, setDemoMode] = useState<"reconciliation" | "po">("reconciliation");
  const [demoFilter, setDemoFilter] = useState<"all" | "matched" | "flagged">("all");

  const activeRows =
    demoMode === "reconciliation" ? RECONCILIATION_EXAMPLE_ROWS : PO_EXTRACTION_EXAMPLE_ROWS;
  const filteredRows = activeRows.filter(
    (row) => demoFilter === "all" || row.status === demoFilter
  );

  return (
    <div className="bg-slate-50">
      {/* Unified Tools Page Container (merged small section divs with uniform bg-slate-50) */}
      <section className="pt-10 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 1 & 2. Merged Page Intro + Six Tool Cards */}
          <div>
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-slate-500">Standalone tools</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display [text-wrap:balance]">
                Focused tools that solve one need on their own
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                A <strong>standalone tool</strong> handles one specific document or verification task independently, and our range keeps growing. {PRODUCT_AVAILABILITY_NOTE}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                Six standalone tools
              </h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {TOOLS.map((tool, index) => (
                  <article
                    key={tool.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          Tool 0{index + 1}
                        </span>
                        {tool.status && (
                          <span className="text-[11px] font-mono text-slate-600">
                            {tool.status}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 text-base font-bold text-slate-900 font-display">
                        {tool.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-700 font-medium leading-relaxed">
                        {tool.job}
                      </p>

                      <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2.5 text-xs">
                        <div className="flex items-start gap-2">
                          <FileSearch
                            className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-semibold text-slate-900">Reads: </span>
                            <span className="text-slate-600">{tool.reads}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <FileOutput
                            className="w-3.5 h-3.5 text-brand-700 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-semibold text-slate-900">Produces & flags: </span>
                            <span className="text-slate-600">{tool.flagsOrProduces}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <a
                        href={`/contact?interest=${tool.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate("contact", `interest=${tool.slug}`);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-600 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded transition-colors cursor-pointer"
                      >
                        <span>Discuss this tool</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Featured Interactive Demo (Labelled "Illustrative example") */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-slate-500">
                  Illustrative example
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  Interactive tool preview
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setDemoMode("reconciliation");
                    setDemoFilter("all");
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    demoMode === "reconciliation"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Reconciliation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDemoMode("po");
                    setDemoFilter("all");
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    demoMode === "po"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  PO extraction
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="px-5 py-3 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" aria-hidden="true"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" aria-hidden="true"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" aria-hidden="true"></span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-brand-400">
                      Illustrative example
                    </span>
                    <h3 className="text-sm font-bold font-display">
                      {demoMode === "reconciliation"
                        ? "Bank-to-GL Reconciliation Schedule"
                        : "Purchase Order Extraction Table"}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg w-fit">
                  {(
                    [
                      { id: "all", label: "All" },
                      { id: "matched", label: "Matched" },
                      { id: "flagged", label: "Flagged" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDemoFilter(tab.id)}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        demoFilter === tab.id
                          ? "bg-white text-slate-900 font-semibold"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500">
                      <th className="py-2.5 px-4">Ref</th>
                      <th className="py-2.5 px-4">Counterparty</th>
                      <th className="py-2.5 px-4">Source</th>
                      <th className="py-2.5 px-4">Expected</th>
                      <th className="py-2.5 px-4">Actual</th>
                      <th className="py-2.5 px-4">Reviewer Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {filteredRows.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                          {row.ref}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {row.counterparty}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                          {row.sourceDoc}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                          {row.ledgerOrExpected}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums font-semibold text-slate-900 whitespace-nowrap">
                          {row.extractedOrActual}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            {row.status === "matched" ? (
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-brand-700 shrink-0"
                                aria-hidden="true"
                              />
                            ) : (
                              <AlertTriangle
                                className="w-3.5 h-3.5 text-amber-700 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            <span className="text-slate-700">{row.note}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 4, 5 & 6. Merged Comparison Table + "Don't see your need?" + Closing CTA */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                End-to-end solutions vs. standalone tools
              </h2>

              <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-900">
                      <th className="py-3.5 px-5 w-1/4">Dimension</th>
                      <th className="py-3.5 px-5 w-3/8">End-to-end solutions</th>
                      <th className="py-3.5 px-5 w-3/8">Standalone tools</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <th className="py-3.5 px-5 font-semibold text-slate-900 bg-slate-50/50">
                        Scope
                      </th>
                      <td className="py-3.5 px-5">
                        Complete multi-step workflow from raw files to final working paper pack.
                      </td>
                      <td className="py-3.5 px-5">
                        One focused extraction, matching, or verification task run on demand.
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 px-5 font-semibold text-slate-900 bg-slate-50/50">
                        How you start
                      </th>
                      <td className="py-3.5 px-5">
                        Configured around your engagement templates and portfolio rules.
                      </td>
                      <td className="py-3.5 px-5">
                        Upload a document batch and export the structured schedule right away.
                      </td>
                    </tr>
                    <tr>
                      <th className="py-3.5 px-5 font-semibold text-slate-900 bg-slate-50/50">
                        Who it fits
                      </th>
                      <td className="py-3.5 px-5">
                        Audit practices and property management teams running full cycles.
                      </td>
                      <td className="py-3.5 px-5">
                        Teams removing a specific weekly or month-end document bottleneck.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Don’t see your need?
                </h3>
                <p className="mt-0.5 text-xs text-slate-600">
                  Tell us what document bottleneck slows your team down and we’ll discuss how we can help.
                </p>
              </div>
              <a
                href="/contact?interest=tool"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("contact", "interest=tool");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 active:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Tell us about your need</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-2xl band text-white p-6 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display">
                  Put a standalone tool to work on your files
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Request a walkthrough with our team in Dubai.
                </p>
              </div>
              <a
                href="/contact?interest=tool"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("contact", "interest=tool");
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Talk to us</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
