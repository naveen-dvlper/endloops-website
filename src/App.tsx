import { useState, useEffect, useCallback } from "react";
import { GlobalHeader, type PageRoute } from "./components/Header";
import { GlobalFooter } from "./components/GlobalFooter";
import { HomePage } from "./components/HomePage";
import { SolutionsPage } from "./components/SolutionsPage";
import { ToolsPage } from "./components/ToolsPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage, NotFoundPage } from "./components/ContactPage";

const PAGE_METADATA: Record<
  PageRoute,
  { title: string; description: string; path: string }
> = {
  home: {
    title: "Endloops — Automation for Financial Professionals",
    description:
      "Automation that prepares the work. You make the call. Endloops builds end-to-end solutions and standalone tools for accountants, auditors, finance teams, and property management companies.",
    path: "/",
  },
  solutions: {
    title: "End-to-End Solutions — Endloops",
    description:
      "Complete financial, audit, and budget workflows run from start to finish: Budget review, Escrow audit, Financial audit, Interim audit, and Budget preparation for property management companies.",
    path: "/solutions",
  },
  tools: {
    title: "Standalone Tools — Endloops",
    description:
      "Focused tools that solve one document need on their own: Purchase-order extraction, Vouching automation, Expense working automation, Financial report review, Tender verification, and Reconciliation.",
    path: "/tools",
  },
  about: {
    title: "About Endloops — An Alkazim Technology Company",
    description:
      "Born inside Alkazim, an accounting and audit firm in Dubai. Learn how Endloops builds reviewable automation for financial professionals across the GCC.",
    path: "/about",
  },
  contact: {
    title: "Contact — Endloops",
    description:
      "Talk to Endloops in Dubai about an end-to-end solution or a standalone tool for your accounting, audit, finance, or property management team.",
    path: "/contact",
  },
  "404": {
    title: "Page Not Found — Endloops",
    description: "The requested page could not be found on Endloops.",
    path: "/404",
  },
};

function parseLocationToRoute(pathname: string, search: string): {
  route: PageRoute;
  interest: string;
} {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const params = new URLSearchParams(search);
  const interest = params.get("interest") || "";

  if (cleanPath === "/" || cleanPath === "/home") {
    return { route: "home", interest };
  }
  if (cleanPath === "/solutions") {
    return { route: "solutions", interest };
  }
  if (cleanPath === "/tools") {
    return { route: "tools", interest };
  }
  if (cleanPath === "/about") {
    return { route: "about", interest };
  }
  if (cleanPath === "/contact") {
    return { route: "contact", interest };
  }
  return { route: "404", interest };
}

export default function App() {
  const initial = parseLocationToRoute(
    window.location.pathname,
    window.location.search
  );
  const [currentPage, setCurrentPage] = useState<PageRoute>(initial.route);
  const [interestParam, setInterestParam] = useState<string>(initial.interest);

  const handleNavigate = useCallback((route: PageRoute, query?: string) => {
    const meta = PAGE_METADATA[route] || PAGE_METADATA["404"];
    const nextUrl = query ? `${meta.path}?${query}` : meta.path;

    window.history.pushState({}, "", nextUrl);
    const parsed = parseLocationToRoute(
       meta.path,
      query ? `?${query}` : ""
    );
    setCurrentPage(parsed.route);
    setInterestParam(parsed.interest);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Listen to browser Back/Forward buttons
  useEffect(() => {
    const onPopState = () => {
      const parsed = parseLocationToRoute(
        window.location.pathname,
        window.location.search
      );
      setCurrentPage(parsed.route);
      setInterestParam(parsed.interest);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Update <title> and <meta name="description"> per page
  useEffect(() => {
    const meta = PAGE_METADATA[currentPage] || PAGE_METADATA["404"];
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute("content", meta.description);
    }
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute("content", meta.title);
    }
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) {
      ogDescEl.setAttribute("content", meta.description);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Skip-to-content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-slate-900 focus:text-white focus:text-sm focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      <GlobalHeader
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "solutions" && (
          <SolutionsPage onNavigate={handleNavigate} />
        )}
        {currentPage === "tools" && <ToolsPage onNavigate={handleNavigate} />}
        {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === "contact" && (
          <ContactPage
            initialInterest={interestParam}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "404" && <NotFoundPage onNavigate={handleNavigate} />}
      </main>

      {/* Global Footer */}
      <GlobalFooter currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}
