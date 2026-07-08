import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/providers/theme_provider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kibal - Cân bằng cuộc sống số cho con yêu của bạn",
  description:
    "Kibal là nền tảng quản lý thời gian sử dụng thiết bị thông minh và bảo vệ trẻ em trước những nội dung độc hại.",
};

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

  return (
    <html lang={locale} suppressHydrationWarning className="h-full">
      <body
        className={`${geistSans.variable} font-sans min-h-full flex flex-col antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <main className="flex flex-col flex-1">{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
