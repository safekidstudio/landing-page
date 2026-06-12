import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AboutFeature from "@/features/about";

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
      ? "Giới thiệu về Kibal - Sứ mệnh bảo vệ trẻ em"
      : "About Kibal - Our Child Safety Mission",
    description: isVi
      ? "Tìm hiểu về câu chuyện và sứ mệnh phát triển thói quen số lành mạnh cho trẻ em của Kibal."
      : "Discover Kibal's story and mission to cultivate healthy digital habits for kids.",
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutFeature />;
}
