import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HelpsFeature from "@/features/helps";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Trung tâm trợ giúp Kibal - Các câu hỏi thường gặp"
      : "Kibal Help Center - FAQs & Support",
    description: isVi
      ? "Tìm kiếm giải pháp và câu trả lời cho các thắc mắc về cách thiết lập và vận hành ứng dụng Kibal."
      : "Find guides and answers to FAQs about setting up and using Kibal.",
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HelpsFeature />;
}
