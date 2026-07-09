import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/providers/theme_provider";
import { createClient, LOCALE_MAP } from "@/prismicio";
import SiteHeader from "@/components/layouts/header";
import SiteFooter from "@/components/layouts/footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import { defaultMetadata } from "@/config/metadata";

export const metadata: Metadata = defaultMetadata;

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Generate static params for next-intl locales
export async function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }];
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Set request locale for server-side utilities
  setRequestLocale(locale);

  // Load locale messages
  const messages = await getMessages();

  // Fetch App Settings
  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";
  const settings = await client
    .getSingle("app_settings", { lang: prismicLocale })
    .catch(() => null);

  return (
    <html lang={locale} suppressHydrationWarning className="h-full">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <SiteHeader settings={settings} />
              <main className="flex-1">{children}</main>
              <SiteFooter settings={settings} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
