import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PricingFeature from "@/features/pricing";

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
      ? "Bảng giá Kibal - Lựa chọn gói bảo vệ phù hợp cho gia đình"
      : "Kibal Pricing - Select the Right Shield for Your Family",
    description: isVi
      ? "Khám phá các gói dịch vụ linh hoạt của Kibal để giám sát thiết bị và bảo vệ con yêu tốt nhất."
      : "Explore Kibal's flexible premium pricing plans for family protection.",
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricingFeature />;
}
