import React from "react";
import type { PageRoute } from "./Header";
import { SOLUTIONS, PRODUCT_AVAILABILITY_NOTE } from "../data/endloopsData";
import {
  ArrowRight,
  CheckCircle2,
  FileInput,
  Scale,
  FileSpreadsheet,
  UserCheck,
} from "lucide-react";

interface SolutionsPageProps {
  onNavigate: (route: PageRoute, query?: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  const processSteps = [
    {
      step: "01",
      title: "Documents in",
      description: "Upload engagement folders, statements, and ledgers in bulk.",
      icon: <FileInput className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
    {
      step: "02",
      title: "Checked against rules",
      description: "Figures are cast and tested against audit or budget rules.",
      icon: <Scale className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
    {
      step: "03",
      title: "Draft prepared",
      description: "Working papers and exception schedules are assembled.",
      icon: <FileSpreadsheet className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
    {
      step: "04",
      title: "Professional signs off",
      description: "The practitioner inspects the draft and makes the final call.",
      icon: <UserCheck className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
  ];

  return (
    <div className="bg-slate-50">
      {/* Unified Solutions Page Container (merged small section divs with uniform bg-slate-50) */}
      <section className="pt-10 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 1 & 2. Merged Page Intro + Five Solution Cards */}
          <div>
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-slate-500">End-to-end solutions</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display [text-wrap:balance]">
                Complete workflows run from start to finish
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                An <strong>end-to-end solution</strong> runs a complete process—from raw files and rule checks to a structured working pack ready for sign-off. {PRODUCT_AVAILABILITY_NOTE}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                Five end-to-end solutions
              </h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SOLUTIONS.map((solution, index) => (
                  <article
                    key={solution.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          Solution 0{index + 1}
                        </span>
                        {solution.status && (
                          <span className="text-[11px] font-mono text-slate-600">
                            {solution.status}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1.5 text-lg font-bold text-slate-900 font-display">
                        {solution.name}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        {solution.outcome}
                      </p>

                      <div className="mt-4 pt-3.5 border-t border-slate-100">
                        <p className="text-[11px] font-semibold text-slate-900">
                          What it prepares for you:
                        </p>
                        <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                          {solution.preparesForYou.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-brand-700 mt-0.5 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100">
                      <a
                        href={`/contact?interest=${solution.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate("contact", `interest=${solution.slug}`);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 active:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-all cursor-pointer"
                      >
                        <span>Discuss this solution</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Shared Process Strip */}
          <div>
            <p className="text-xs font-medium text-slate-500">Shared workflow</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
              How every end-to-end solution runs
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl bg-white border border-slate-200 p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900 font-display">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4 & 5. Merged "Solution or tool?" Helper + Closing CTA */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xs">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-slate-500">Solution or tool?</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Need a single focused task instead of a full engagement flow?
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Choose an <strong>end-to-end solution</strong> for complete audit or budget workflows, or pick a <strong>standalone tool</strong> to automate one task like reconciliation or PO extraction on its own.
                </p>
              </div>

              <a
                href="/tools"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("tools");
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-900 text-slate-900 text-xs font-bold hover:bg-slate-900 hover:text-white active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Compare standalone tools</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-2xl band text-white p-6 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display">
                  Walk through an end-to-end solution with our team
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  Tell us which engagement or property budget workflow you want to prepare faster.
                </p>
              </div>
              <a
                href="/contact?interest=solution"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("contact", "interest=solution");
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
