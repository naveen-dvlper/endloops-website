import React from "react";
import type { PageRoute } from "./Header";
import { AUDIENCES } from "../data/endloopsData";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Compass,
  FileCheck,
} from "lucide-react";

interface AboutPageProps {
  onNavigate: (route: PageRoute, query?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const principles = [
    {
      number: "01",
      title: "Reliability and clarity",
      description:
        "Every figure Endloops extracts or compares links clearly to the source page and rule that produced it.",
      icon: <FileCheck className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
    {
      number: "02",
      title: "People stay accountable",
      description:
        "The software prepares the schedule and exception list; the qualified professional reviews and signs off.",
      icon: <UserCheck className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
    {
      number: "03",
      title: "Built with finance practitioners",
      description:
        "Shaped inside an active audit and accounting firm around real engagement files and practical review workflows.",
      icon: <Compass className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
    {
      number: "04",
      title: "Trust with sensitive data",
      description:
        "Role-scoped access, isolated client records, and clear processing trails designed for confidential financial work.",
      icon: <ShieldCheck className="w-4 h-4 text-slate-900" aria-hidden="true" />,
    },
  ];

  return (
    <div className="bg-slate-50">
      {/* Unified About Page Container (merged small section divs with uniform bg-slate-50) */}
      <section className="pt-10 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 1 & 2. Merged Story Intro + Our Approach */}
          <div className="space-y-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-slate-500">About Endloops · An Alkazim technology company</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display [text-wrap:balance]">
                Born inside an accounting and audit firm in Dubai
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                <strong>Alkazim</strong> is an accounting and audit firm in Dubai. Its technology department built internal software to automate repetitive financial work—and that software is now <strong>Endloops</strong>.
              </p>
            </div>

            <div className="rounded-2xl band text-white p-6 sm:p-9 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-mono text-brand-400">Our approach</p>
                <h2 className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight font-display">
                  “The software prepares the work; the professional reviews and decides.”
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                Endloops removes the hours spent reading PDFs and matching rows so practitioners can focus on judgement and sign-off.
              </p>
            </div>
          </div>

          {/* 3. Who we serve */}
          <div>
            <p className="text-xs font-medium text-slate-500">Who we serve</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
              Four groups of financial professionals
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AUDIENCES.map((aud) => (
                <div
                  key={aud.id}
                  className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {aud.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {aud.painPoint}
                    </p>
                  </div>
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-900 font-medium">
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-brand-700 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{aud.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 & 5. Merged Principles + Where we're heading */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-medium text-slate-500">What guides us</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                Our principles
              </h2>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {principles.map((p) => (
                  <div
                    key={p.number}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">
                        {p.number}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                        {p.icon}
                      </div>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-slate-900 font-display">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl band text-white p-6 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-brand-400">Where we’re heading</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold font-display">
                  The trusted automation partner for accounting, audit, and property finance teams in the GCC and beyond
                </h2>
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
        </div>
      </section>
    </div>
  );
};
