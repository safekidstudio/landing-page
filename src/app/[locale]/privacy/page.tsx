import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PrivacyFeature from "@/features/privacy";

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
      ? "Chính sách bảo mật dữ liệu Kibal"
      : "Kibal Data Privacy Policy",
    description: isVi
      ? "Cam kết của Kibal trong việc bảo vệ dữ liệu trẻ em và mã hóa thông tin gia đình."
      : "Learn about Kibal's high standards of data protection and E2EE encryption for kids.",
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyFeature />;
}
