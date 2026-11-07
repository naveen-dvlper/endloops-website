import React, { useState, useEffect, useRef } from "react";
import type { PageRoute } from "./Header";
import {
  SOLUTIONS,
  TOOLS,
  CONTACT_EMAIL,
  COMPANY_LOCATION,
} from "../data/endloopsData";
import {
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

interface ContactPageProps {
  initialInterest?: string;
  onNavigate: (route: PageRoute, query?: string) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  interest?: string;
  message?: string;
}

/**
 * NOTE ON FORM SUBMISSION:
 * There is no backend email relay connected in this preview environment.
 * Submitting this form runs client-side validation, loading state, and displays an
 * aria-live simulated confirmation state without claiming an external email was sent.
 */
export const ContactPage: React.FC<ContactPageProps> = ({
  initialInterest = "",
  onNavigate,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const interestRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!initialInterest) return;
    const normalized = initialInterest.toLowerCase().trim();

    if (normalized === "solution" || normalized === "solutions") {
      setInterest("solution");
      return;
    }
    if (normalized === "tool" || normalized === "tools") {
      setInterest("tool");
      return;
    }
    if (normalized === "not-sure") {
      setInterest("not-sure");
      return;
    }

    const matchedSolution = SOLUTIONS.find((s) => s.slug === normalized || s.id === normalized);
    if (matchedSolution) {
      setInterest(`solution:${matchedSolution.slug}`);
      return;
    }

    const matchedTool = TOOLS.find((t) => t.slug === normalized || t.id === normalized);
    if (matchedTool) {
      setInterest(`tool:${matchedTool.slug}`);
    }
  }, [initialInterest]);

  const validateAndFocusFirstError = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Enter your name.";
    }
    if (!email.trim()) {
      newErrors.email = "Enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email (e.g. name@company.com).";
    }
    if (!company.trim()) {
      newErrors.company = "Enter your company name.";
    }
    if (!role) {
      newErrors.role = "Select your role.";
    }
    if (!interest) {
      newErrors.interest = "Select what you’re interested in.";
    }
    if (!message.trim()) {
      newErrors.message = "Add a short note about your workflow.";
    }

    setErrors(newErrors);

    if (newErrors.name) {
      nameRef.current?.focus();
      return false;
    }
    if (newErrors.email) {
      emailRef.current?.focus();
      return false;
    }
    if (newErrors.company) {
      companyRef.current?.focus();
      return false;
    }
    if (newErrors.role) {
      roleRef.current?.focus();
      return false;
    }
    if (newErrors.interest) {
      interestRef.current?.focus();
      return false;
    }
    if (newErrors.message) {
      messageRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateAndFocusFirstError()) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  return (
    <div>
      <section className="pt-10 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-slate-500">Contact Endloops</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
              Tell us about the work you want to automate
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Share your workflow details below and our Dubai team will follow up to walk through a fitting solution or tool.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div aria-live="polite" aria-atomic="true">
                {isSubmitted ? (
                  <div className="py-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 font-display">
                      Enquiry validated (Simulated preview)
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-600">
                      Thank you, <strong>{name}</strong> ({company}).
                    </p>
                    <p className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                      <strong>Note:</strong> Form submission is simulated locally in this preview (no backend connected yet). Direct email:{" "}
                      <span className="font-mono text-slate-900">{CONTACT_EMAIL}</span> (placeholder).
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setName("");
                          setEmail("");
                          setCompany("");
                          setRole("");
                          setInterest("");
                          setMessage("");
                          setErrors({});
                        }}
                        className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 cursor-pointer"
                      >
                        Reset form
                      </button>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate("home");
                        }}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs font-semibold hover:bg-slate-100"
                      >
                        Back to Home
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>

              {!isSubmitted && (
                <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Enquiry details
                  </h2>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-900 mb-1"
                      >
                        Name
                      </label>
                      <input
                        ref={nameRef}
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "error-contact-name" : undefined}
                        placeholder="Your full name"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          errors.name ? "border-red-600" : "border-slate-300"
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="error-contact-name"
                          className="mt-1 text-xs text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Work email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-900 mb-1"
                      >
                        Work email
                      </label>
                      <input
                        ref={emailRef}
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "error-contact-email" : undefined}
                        placeholder="name@company.ae"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          errors.email ? "border-red-600" : "border-slate-300"
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="error-contact-email"
                          className="mt-1 text-xs text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-slate-900 mb-1"
                      >
                        Company
                      </label>
                      <input
                        ref={companyRef}
                        id="contact-company"
                        name="company"
                        type="text"
                        required
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (errors.company) setErrors({ ...errors, company: undefined });
                        }}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={errors.company ? "error-contact-company" : undefined}
                        placeholder="Firm or company name"
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          errors.company ? "border-red-600" : "border-slate-300"
                        }`}
                      />
                      {errors.company && (
                        <p
                          id="error-contact-company"
                          className="mt-1 text-xs text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <label
                        htmlFor="contact-role"
                        className="block text-xs font-semibold text-slate-900 mb-1"
                      >
                        Role
                      </label>
                      <select
                        ref={roleRef}
                        id="contact-role"
                        name="role"
                        required
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                          if (errors.role) setErrors({ ...errors, role: undefined });
                        }}
                        aria-invalid={Boolean(errors.role)}
                        aria-describedby={errors.role ? "error-contact-role" : undefined}
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          errors.role ? "border-red-600" : "border-slate-300"
                        }`}
                      >
                        <option value="">Select role…</option>
                        <option value="accountant">Accountant</option>
                        <option value="auditor">Auditor</option>
                        <option value="finance-team">Finance team</option>
                        <option value="property-management">Property management</option>
                        <option value="partner-director">Partner / Director</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.role && (
                        <p
                          id="error-contact-role"
                          className="mt-1 text-xs text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.role}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Interest */}
                  <div className="mt-4">
                    <label
                      htmlFor="contact-interest"
                      className="block text-xs font-semibold text-slate-900 mb-1"
                    >
                      What you’re interested in
                    </label>
                    <select
                      ref={interestRef}
                      id="contact-interest"
                      name="interest"
                      required
                      value={interest}
                      onChange={(e) => {
                        setInterest(e.target.value);
                        if (errors.interest) setErrors({ ...errors, interest: undefined });
                      }}
                      aria-invalid={Boolean(errors.interest)}
                      aria-describedby={errors.interest ? "error-contact-interest" : undefined}
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                        errors.interest ? "border-red-600" : "border-slate-300"
                      }`}
                    >
                      <option value="">Select an option…</option>
                      <optgroup label="General">
                        <option value="solution">An end-to-end solution</option>
                        <option value="tool">A standalone tool</option>
                        <option value="not-sure">Not sure yet</option>
                      </optgroup>
                      <optgroup label="End-to-end solutions">
                        {SOLUTIONS.map((s) => (
                          <option key={s.slug} value={`solution:${s.slug}`}>
                            Solution: {s.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Standalone tools">
                        {TOOLS.map((t) => (
                          <option key={t.slug} value={`tool:${t.slug}`}>
                            Tool: {t.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.interest && (
                      <p
                        id="error-contact-interest"
                        className="mt-1 text-xs text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.interest}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mt-4">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-slate-900 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      ref={messageRef}
                      id="contact-message"
                      name="message"
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "error-contact-message" : undefined}
                      placeholder="Briefly describe the documents or workflow you want to prepare faster…"
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                        errors.message ? "border-red-600" : "border-slate-300"
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="error-contact-message"
                        className="mt-1 text-xs text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-500">
                      Simulated preview form (no backend connected yet).
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 active:bg-slate-950 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" aria-hidden="true" />
                          <span>Validating…</span>
                        </>
                      ) : (
                        <span>Submit enquiry</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Side Panel (Merged into a single cohesive card) */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Direct contact
                  </h2>
                  <div className="mt-3 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="font-semibold text-slate-900 hover:underline"
                        >
                          {CONTACT_EMAIL}
                        </a>
                        <p className="text-[11px] text-slate-400">
                          Placeholder email address
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                      <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-slate-900">{COMPANY_LOCATION}</p>
                        <p className="text-[11px] text-slate-500">
                          An Alkazim technology company
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    What to expect
                  </h2>
                  <ol className="mt-3 space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                        01
                      </span>
                      <span>We review your workflow and document types.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                        02
                      </span>
                      <span>We walk through a relevant solution or standalone tool.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                        03
                      </span>
                      <span>We agree on a practical starting scope for your team.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

interface NotFoundPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-mono font-semibold text-slate-500">404 · Page not found</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
          We couldn’t find that page
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          The link you followed may be out of date or mistyped.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </a>
          <a
            href="/solutions"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("solutions");
            }}
            className="inline-flex items-center px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            End-to-end solutions
          </a>
          <a
            href="/tools"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("tools");
            }}
            className="inline-flex items-center px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Standalone tools
          </a>
        </div>
      </div>
    </section>
  );
};
