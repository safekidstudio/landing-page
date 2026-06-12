import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HomeFeature from "@/features/home";

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
      ? "Kibal - Nền tảng quản lý thời gian sử dụng thiết bị của trẻ em"
      : "Kibal - Screen Time & Child Safety Platform",
    description: isVi
      ? "Kibal giúp cha mẹ theo dõi, quản lý thời gian sử dụng và bảo vệ con trẻ trước những nội dung không lành mạnh."
      : "Kibal helps parents track, manage device usage, and protect kids from inappropriate online content.",
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeFeature />;
}
