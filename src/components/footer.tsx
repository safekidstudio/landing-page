"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ShieldAlert } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");
  const tFooter = useTranslations("footer");

  return (
    <footer className="w-full bg-canvas border-t border-hairline-soft py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-ink">
              <ShieldAlert className="h-6 w-6 text-accent-blue" />
              <span className="text-xl tracking-tight font-extrabold">Kibal</span>
            </Link>
            <p className="text-sm text-ink-muted max-w-sm leading-relaxed">
              {tFooter("desc")}
            </p>
          </div>

          {/* Quick Links 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
              Sản phẩm
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  Tính năng
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
              Công ty
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/helps"
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {t("helps")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-12 pt-8 border-t border-hairline-soft flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">{tFooter("copyright")}</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              Điều khoản
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              Quyền riêng tư
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
