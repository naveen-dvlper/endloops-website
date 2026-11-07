import React, { useState, useEffect } from "react";
import { Hero } from "./Hero";
import type { PageRoute } from "./Header";
import {
  AUDIENCES,
  PIPELINE_STEPS,
  CAPABILITIES,
  PRODUCT_AVAILABILITY_NOTE,
} from "../data/endloopsData";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  FileText,
  GitCompare,
  Scale,
  FileSpreadsheet,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (route: PageRoute, query?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showAllStepsStatic, setShowAllStepsStatic] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPaused(true);
      setShowAllStepsStatic(true);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsPaused(true);
        setShowAllStepsStatic(true);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Auto-advance interactive pipeline unless paused or reduced motion is active
  useEffect(() => {
    if (isPaused || prefersReducedMotion || showAllStepsStatic) return;
    const timer = window.setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, showAllStepsStatic]);

  const activeStep = PIPELINE_STEPS[activeStepIndex];

  const getCapabilityIcon = (id: string) => {
    switch (id) {
      case "reads-documents":
        return <FileText className="w-4 h-4 text-slate-900" aria-hidden="true" />;
      case "compares-matches":
        return <GitCompare className="w-4 h-4 text-slate-900" aria-hidden="true" />;
      case "checks-rules":
        return <Scale className="w-4 h-4 text-slate-900" aria-hidden="true" />;
      case "prepares-drafts":
        return <FileSpreadsheet className="w-4 h-4 text-slate-900" aria-hidden="true" />;
      default:
        return <Layers className="w-4 h-4 text-slate-900" aria-hidden="true" />;
    }
  };

  return (
    <div className="bg-slate-50">
      {/* 1. Hero Section */}
      <Hero
        includeHeader={false}
        currentPage="home"
        onNavigate={onNavigate}
        onSeeHowItWorks={() => {
          const el = document.getElementById("how-it-works");
          el?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        }}
      />

      {/* 2 & 3. Merged "Who it's for" + "The problem" in one unified bg-slate-50 section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <div className="max-w-xl">
              <p className="text-xs font-medium text-slate-500">Who it’s for</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
                Built for teams where accuracy and sign-off matter
              </h2>
            </div>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {AUDIENCES.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <span className="text-[11px] font-mono text-slate-400">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900 font-display">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {item.painPoint}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-brand-700">Outcome</p>
                    <p className="mt-0.5 text-xs text-slate-900 font-medium leading-relaxed">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Problem Banner inside the same unified section */}
          <div className="rounded-2xl band text-white p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-brand-400">The problem</p>
              <h2 className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight font-display">
                Repetitive document checking pulls professionals away from judgement and clients
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              Keying invoices, tying statements, and checking schedules by hand is slow and error-prone. Endloops prepares the draft so you focus on decisions.
            </p>
          </div>
        </div>
      </section>

      {/* 4 & 6. Merged "How it works" + "Capabilities" in one unified bg-slate-50 section */}
      <section id="how-it-works" className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">How it works</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
                  Five steps from source files to sign-off
                </h2>
              </div>

              {/* Interactive Controls */}
              <div className="flex flex-wrap items-center gap-1.5">
                {!showAllStepsStatic && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPaused(true);
                        setActiveStepIndex((prev) =>
                          prev === 0 ? PIPELINE_STEPS.length - 1 : prev - 1
                        );
                      }}
                      aria-label="Previous step"
                      className="inline-flex items-center justify-center p-2 rounded-lg border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPaused((prev) => !prev)}
                      aria-pressed={isPaused}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                    >
                      {isPaused ? (
                        <>
                          <Play className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Auto</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsPaused(true);
                        setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
                      }}
                      aria-label="Next step"
                      className="inline-flex items-center justify-center p-2 rounded-lg border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setShowAllStepsStatic((prev) => !prev)}
                  aria-pressed={showAllStepsStatic}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  {showAllStepsStatic ? "Interactive view" : "All steps view"}
                </button>
              </div>
            </div>

            {!showAllStepsStatic ? (
              <div className="mt-6">
                <div
                  role="tablist"
                  aria-label="How Endloops works steps"
                  className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                >
                  {PIPELINE_STEPS.map((step, index) => {
                    const isCurrent = index === activeStepIndex;
                    return (
                      <button
                        key={step.id}
                        role="tab"
                        type="button"
                        id={`tab-${step.id}`}
                        aria-selected={isCurrent}
                        aria-controls={`panel-${step.id}`}
                        onClick={() => {
                          setIsPaused(true);
                          setActiveStepIndex(index);
                        }}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                          isCurrent
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-mono ${
                            isCurrent ? "text-brand-400" : "text-slate-400"
                          }`}
                        >
                          0{step.stepNumber}
                        </span>
                        <p className="mt-0.5 text-xs sm:text-sm font-bold font-display truncate">
                          {step.title}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div
                  role="tabpanel"
                  id={`panel-${activeStep.id}`}
                  aria-labelledby={`tab-${activeStep.id}`}
                  className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xs"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-6">
                      <span className="text-xs font-mono text-slate-500">
                        Step 0{activeStep.stepNumber} · {activeStep.title}
                      </span>
                      <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 font-display">
                        {activeStep.summary}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {activeStep.detail}
                      </p>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5">
                        <p className="text-[11px] font-mono text-slate-500">Input</p>
                        <p className="text-xs font-semibold text-slate-900 mt-1">
                          {activeStep.inputArtifact}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5">
                        <p className="text-[11px] font-mono text-slate-500">Rule check</p>
                        <p className="text-xs font-semibold text-slate-900 mt-1">
                          {activeStep.ruleChecked}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5">
                        <p className="text-[11px] font-mono text-brand-700">Output</p>
                        <p className="text-xs font-semibold text-slate-900 mt-1">
                          {activeStep.outputArtifact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {PIPELINE_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">
                        0{step.stepNumber}
                      </span>
                      <h3 className="mt-1 text-sm font-bold text-slate-900 font-display">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-700">
                      <strong>Output:</strong> {step.outputArtifact}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Capabilities Row inside the same unified bg-slate-50 section */}
          <div>
            <p className="text-xs font-medium text-slate-500">Capabilities</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 font-display">
              What Endloops handles across your files
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getCapabilityIcon(cap.id)}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900 font-display">
                    {cap.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5, 7 & 8. Merged "Two ways to work" + "Trust & principle" + "Closing CTA" in one unified bg-slate-50 section */}
      <section className="py-12 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Two ways to work with Endloops</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
                  End-to-end solutions or standalone tools
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                {PRODUCT_AVAILABILITY_NOTE}
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: End-to-end solutions */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">01 · Complete Workflow</span>
                  <h3 className="mt-1 text-xl font-bold text-slate-900 font-display">
                    End-to-end solutions
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    A complete process run from start to finish—taking source files through rule checks to a full working pack.
                  </p>

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Escrow audit</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Financial & Interim audit</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Budget review</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Property budget prep</span>
                    </li>
                  </ul>

                  <p className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
                    <strong className="text-slate-900">Choose this when…</strong> you want a full engagement or budget cycle prepared from start to finish.
                  </p>
                </div>

                <div className="mt-5">
                  <a
                    href="/solutions"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("solutions");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 active:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-colors"
                  >
                    <span>View end-to-end solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Card 2: Standalone tools */}
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">02 · Focused Utility</span>
                  <h3 className="mt-1 text-xl font-bold text-slate-900 font-display">
                    Standalone tools
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Focused utilities that solve one specific extraction, matching, or verification task on their own.
                  </p>

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Purchase-order extraction</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Vouching & Reconciliation</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Financial report review</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" aria-hidden="true" />
                      <span>Tender & Expense workings</span>
                    </li>
                  </ul>

                  <p className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
                    <strong className="text-slate-900">Choose this when…</strong> you want to remove a single recurring bottleneck right away.
                  </p>
                </div>

                <div className="mt-5">
                  <a
                    href="/tools"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("tools");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-900 text-slate-900 text-xs font-bold hover:bg-slate-900 hover:text-white active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-colors"
                  >
                    <span>View standalone tools</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Principle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-medium text-slate-500">Trust & principle</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
                The professional always signs off.
              </h2>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Born inside <strong>Alkazim</strong>, an accounting and audit firm in Dubai, Endloops was built with GCC practitioners so every prepared schedule stays transparent and reviewable.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-900 shrink-0" aria-hidden="true" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Alkazim & GCC Heritage
                  </h3>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Shaped in Dubai around real audit, escrow, and property management workflows.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-900 shrink-0" aria-hidden="true" />
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Reviewable Work
                  </h3>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Every extracted figure and exception links directly back to its source document.
                </p>
              </div>
            </div>
          </div>

          {/* Closing CTA Band */}
          <div className="rounded-2xl band text-white p-6 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display">
                See how Endloops prepares your workflows
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                Tell us which document-heavy process your team wants to streamline.
              </p>
            </div>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Talk to us</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
