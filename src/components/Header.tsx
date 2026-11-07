import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export type PageRoute = "home" | "solutions" | "tools" | "about" | "contact" | "404";

export interface NavItem {
  label: string;
  route: PageRoute;
  href: string;
}

export interface HeaderProps {
  currentPage?: PageRoute;
  onNavigate?: (route: PageRoute, query?: string) => void;
  logoSrc?: string;
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Solutions", route: "solutions", href: "/solutions" },
  { label: "Tools", route: "tools", href: "/tools" },
  { label: "About", route: "about", href: "/about" },
  { label: "Contact", route: "contact", href: "/contact" },
];

export const GlobalHeader: React.FC<HeaderProps> = ({
  currentPage = "home",
  onNavigate,
  logoSrc = "/logo.png",
}) => {
  const [expanded, setExpanded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // close the mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) {
        setExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expanded]);

  const handleLinkClick = (e: React.MouseEvent, route: PageRoute) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(route);
      setExpanded(false);
    }
  };

  return (
    <header className="border-b border-slate-200/80 bg-slate-50/95 backdrop-blur-md sticky top-0 z-40">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-14 flex items-center justify-between gap-8">
          <div className="flex-shrink-0 flex items-center">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "home")}
              className="inline-flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 active:scale-[0.99] transition-transform whitespace-nowrap shrink-0"
            >
              {!logoError ? (
                <img
                  className="h-7 w-auto object-contain"
                  src={logoSrc}
                  alt="Endloops — Home"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-lg font-bold tracking-tight text-slate-900 font-display">
                  Endloops
                </span>
              )}
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-slate-900 rounded-lg hover:bg-slate-200/60 active:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-colors cursor-pointer"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls="mobile-navigation-menu"
              aria-label={expanded ? "Close navigation menu" : "Open navigation menu"}
            >
              {expanded ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex lg:items-center lg:justify-center lg:gap-7"
          >
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "home")}
              aria-current={currentPage === "home" ? "page" : undefined}
              className={`text-[13px] font-medium py-1 px-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4 rounded-xs active:opacity-80 ${
                currentPage === "home"
                  ? "border-slate-900 text-slate-900 font-semibold"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              Home
            </a>
            {DEFAULT_NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <a
                  key={item.route}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.route)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-[13px] font-medium py-1 px-0.5 border-b-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4 rounded-xs active:opacity-80 ${
                    isActive
                      ? "border-slate-900 text-slate-900 font-semibold"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex lg:items-center shrink-0">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, "contact")}
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-700 active:bg-slate-950 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request a demo
            </a>
          </div>
        </div>

        {expanded && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-slate-200 py-3"
          >
            <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Menu</span>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Close (Esc)</span>
              </button>
            </div>
            <div className="grid gap-y-1">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, "home")}
                aria-current={currentPage === "home" ? "page" : undefined}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  currentPage === "home"
                    ? "bg-slate-900 text-white font-semibold"
                    : "text-slate-900 hover:bg-slate-100 active:bg-slate-200"
                }`}
              >
                Home
              </a>
              {DEFAULT_NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.route;
                return (
                  <a
                    key={item.route}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.route)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      isActive
                        ? "bg-slate-900 text-white font-semibold"
                        : "text-slate-900 hover:bg-slate-100 active:bg-slate-200"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                className="mt-1.5 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-700 active:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 transition-colors"
              >
                Request a demo
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
