import React from "react";
import {
  ArrowRight,
  ArrowDown,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { GlobalHeader, type HeaderProps } from "./Header";

interface HeroSectionProps extends HeaderProps {
  includeHeader?: boolean;
  onSeeHowItWorks?: () => void;
}

export const Hero: React.FC<HeroSectionProps> = ({
  currentPage = "home",
  onNavigate,
  logoSrc = "/logo.png",
  includeHeader = true,
  onSeeHowItWorks,
}) => {
  const handleRequestDemo = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate("contact");
    }
  };

  const handleSeeHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSeeHowItWorks) {
      onSeeHowItWorks();
      return;
    }
    const target = document.getElementById("how-it-works");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-x-hidden bg-slate-50">
      {includeHeader && (
        <GlobalHeader
          currentPage={currentPage}
          onNavigate={onNavigate}
          logoSrc={logoSrc}
        />
      )}

      <section className="pt-10 pb-12 sm:pt-14 bg-slate-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Automation for financial professionals · An Alkazim technology company
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[54px] lg:leading-[1.12] font-display [text-wrap:balance]">
              Automation that prepares the work.{" "}
              <span className="relative inline-flex">
                <span
                  aria-hidden="true"
                  className="bg-gradient-to-r from-brand-600 via-accent-blue to-accent-purple blur-lg filter opacity-25 absolute inset-0"
                ></span>
                <span className="relative">You make the call.</span>
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Repetitive document work handled for accountants, auditors, finance teams, and property managers—so your time goes to judgement and clients.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
              <a
                href="/contact"
                onClick={handleRequestDemo}
                className="inline-flex items-center justify-center w-full px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-xl sm:w-auto hover:bg-slate-700 active:bg-slate-950 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              >
                Request a demo
                <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </a>

              <a
                href="#how-it-works"
                onClick={handleSeeHowItWorks}
                className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl sm:w-auto hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ArrowDown className="w-4 h-4 mr-1.5" aria-hidden="true" />
                See how it works
              </a>
            </div>
          </div>

          <div className="mt-10 mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-slate-300 text-xs font-mono border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300">
                    Document-to-Draft Pipeline
                  </span>
                </div>
                <span className="text-brand-400">
                  Ready for sign-off
                </span>
              </div>

              <div
                className="p-5 sm:p-7 bg-slate-50"
                style={{
                  backgroundImage: "radial-gradient(#cbd5e1 1.25px, transparent 1.25px)",
                  backgroundSize: "18px 18px",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                  <div className="md:col-span-5 rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-[11px] font-mono font-semibold text-slate-500">
                        01. DOCUMENTS IN
                      </span>
                      <span className="text-[11px] text-slate-400">Batch uploaded</span>
                    </div>

                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <FileText className="w-4 h-4 text-slate-700 shrink-0" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            Invoices_And_Receipts.pdf
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            Line items, dates & totals read
                          </p>
                        </div>
                      </li>
                      <li className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <Layers className="w-4 h-4 text-slate-700 shrink-0" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            Bank_And_GL_Schedule.xlsx
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            Matched against supporting records
                          </p>
                        </div>
                      </li>
                      <li className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            Engagement_Rules.json
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            Casting, cut-off & approval checks
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="md:col-span-1 flex justify-center">
                    <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-mono text-center shadow-xs">
                      →
                    </div>
                  </div>

                  <div className="md:col-span-5 rounded-xl bg-white border border-slate-900/20 p-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-[11px] font-mono font-semibold text-brand-700">
                        02. PREPARED DRAFT
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        Traceable
                      </span>
                    </div>

                    <div className="mt-3 space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-brand-50/70 border border-brand-200/80 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-slate-900">
                            Verified & Tied Schedule
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            Matched entries linked directly to source page citations.
                          </p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-slate-900">
                            Exceptions Isolated
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            Variances and missing support flagged for review.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <FileCheck className="w-3.5 h-3.5 text-slate-900" aria-hidden="true" />
                        Professional signs off
                      </span>
                      <span className="font-mono font-semibold text-slate-900">
                        You make the call
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
