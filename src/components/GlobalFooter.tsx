import React, { useState } from "react";
import type { PageRoute } from "./Header";
import { CONTACT_EMAIL, COMPANY_LOCATION } from "../data/endloopsData";
import { ArrowRight, Mail, MapPin } from "lucide-react";

interface GlobalFooterProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute, query?: string) => void;
}

export const GlobalFooter: React.FC<GlobalFooterProps> = ({ currentPage, onNavigate }) => {
  const [logoError, setLogoError] = useState(false);

  const handleNav = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  const footerLinks: { label: string; route: PageRoute; href: string }[] = [
    { label: "Home", route: "home", href: "/" },
    { label: "Solutions", route: "solutions", href: "/solutions" },
    { label: "Tools", route: "tools", href: "/tools" },
    { label: "About", route: "about", href: "/about" },
    { label: "Contact", route: "contact", href: "/contact" },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200/70 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => handleNav(e, "home")}
              className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 active:scale-[0.99] transition-transform"
            >
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Endloops — Home"
                  className="h-7 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-lg font-bold text-slate-900 font-display">
                  Endloops
                </span>
              )}
            </a>
            <p className="mt-2.5 text-sm font-medium text-slate-900">
              Automation for financial professionals
            </p>
            <p className="mt-1 text-xs text-slate-500">
              An Alkazim technology company
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-slate-900">Pages</p>
            <ul className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => {
                const isActive = currentPage === link.route;
                return (
                  <li key={link.route}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.route)}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-xs transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 active:opacity-80 ${
                        isActive
                          ? "font-semibold text-slate-900 underline underline-offset-4"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact & Talk to us */}
          <div className="md:col-span-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-slate-900 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
                >
                  {CONTACT_EMAIL}
                </a>
                <span className="text-slate-400">(placeholder)</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <span>{COMPANY_LOCATION}</span>
              </p>
            </div>
            <div className="mt-3">
              <a
                href="/contact"
                onClick={(e) => handleNav(e, "contact")}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-600 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded transition-colors"
              >
                <span>Talk to us</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Endloops · An Alkazim technology company.</p>
          <p>The software prepares the work; the professional reviews and decides.</p>
        </div>
      </div>
    </footer>
  );
};
