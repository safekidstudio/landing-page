"use client";

import * as React from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe, Menu, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: tNav("about") },
    { href: "/pricing", label: tNav("pricing") },
    { href: "/helps", label: tNav("helps") },
    { href: "/privacy", label: tNav("privacy") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline-soft bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <ShieldAlert className="h-6 w-6 text-accent-blue" />
          <span className="text-xl tracking-tight font-extrabold">Kibal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                pathname === link.href
                  ? "text-ink font-semibold"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <Button
            variant="icon"
            size="icon"
            onClick={toggleLanguage}
            title={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            className="h-9 w-9 text-ink-muted hover:text-ink cursor-pointer"
          >
            <Globe className="h-4.5 w-4.5" />
            <span className="sr-only">Language</span>
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="icon"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 text-ink-muted hover:text-ink cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* CTAs */}
          <Link href="/pricing">
            <Button variant="secondary" size="sm" className="h-9 cursor-pointer">
              {t("sign_in")}
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="primary" size="sm" className="h-9 cursor-pointer">
              {t("get_started")}
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Button
              variant="icon"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 text-ink-muted hover:text-ink cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </Button>
          )}

          <Button
            variant="icon"
            size="icon"
            onClick={toggleLanguage}
            className="h-9 w-9 text-ink-muted cursor-pointer"
          >
            <Globe className="h-4.5 w-4.5" />
          </Button>

          <Button
            variant="icon"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 text-ink cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-b border-hairline-soft bg-canvas px-4 pb-6 pt-2"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-1 transition-colors ${
                    pathname === link.href ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-hairline-soft">
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full justify-center">
                    {t("sign_in")}
                  </Button>
                </Link>
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">
                    {t("get_started")}
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
