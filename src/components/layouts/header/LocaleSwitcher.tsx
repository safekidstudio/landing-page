"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
];

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params?.locale as string) || "en";

  const handleSwitch = (locale: string) => {
    if (locale === currentLocale) return;
    router.replace(pathname, { locale });
  };

  return (
    <div className="flex items-center gap-1 text-xs font-semibold tracking-wide select-none">
      {LOCALES.map((locale, idx) => (
        <span key={locale.code} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwitch(locale.code)}
            className={cn(
              "transition-colors duration-150 hover:text-foreground px-0.5",
              currentLocale === locale.code
                ? "text-foreground font-bold"
                : "text-muted-foreground/60 hover:text-muted-foreground cursor-pointer",
            )}
          >
            {locale.label}
          </button>
          {idx < LOCALES.length - 1 && (
            <span className="text-neutral-300 dark:text-neutral-700 font-normal">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
