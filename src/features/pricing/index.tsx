"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore, BillingCycle } from "@/store/use_app_store";
import { Check, X } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";

export default function PricingFeature() {
  const t = useTranslations("common");
  const tPrice = useTranslations("pricing");

  const { billingCycle, setBillingCycle } = useAppStore();

  const getPrice = (base: number) => {
    if (billingCycle === "yearly") {
      // 20% discount
      return Math.round((base * 12 * 0.8) / 1000) * 1000;
    }
    return base;
  };

  const formatCurrency = (val: number) => {
    if (val === 0) return "0đ";
    return val.toLocaleString("vi-VN") + "đ";
  };

  const plans = [
    {
      id: "free",
      title: tPrice("free_title"),
      desc: tPrice("free_desc"),
      price: 0,
      featured: false,
      features: [
        { name: tPrice("limit_1_device"), included: true },
        { name: tPrice("realtime_tracking"), included: true },
        { name: tPrice("basic_report"), included: true },
        { name: tPrice("app_blocking"), included: false },
        { name: tPrice("ai_filter"), included: false },
        { name: tPrice("gps_tracking"), included: false },
      ],
    },
    {
      id: "pro",
      title: tPrice("pro_title"),
      desc: tPrice("pro_desc"),
      price: 49000, // Monthly base in VND
      featured: true,
      features: [
        { name: tPrice("limit_3_devices"), included: true },
        { name: tPrice("realtime_tracking"), included: true },
        { name: tPrice("adv_report"), included: true },
        { name: tPrice("app_blocking"), included: true },
        { name: tPrice("ai_filter"), included: true },
        { name: tPrice("gps_tracking"), included: false },
      ],
    },
    {
      id: "family",
      title: tPrice("family_title"),
      desc: tPrice("family_desc"),
      price: 89000, // Monthly base in VND
      featured: false,
      features: [
        { name: tPrice("limit_5_devices"), included: true },
        { name: tPrice("realtime_tracking"), included: true },
        { name: tPrice("adv_report"), included: true },
        { name: tPrice("app_blocking"), included: true },
        { name: tPrice("ai_filter"), included: true },
        { name: tPrice("gps_tracking"), included: true },
        { name: tPrice("support_247"), included: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Title */}
      <section className="text-center flex flex-col items-center gap-6">
        <span className="inline-flex items-center rounded-full border border-hairline bg-surface-1 px-3 py-1 text-xs font-semibold text-accent-blue shadow-sm">
          {t("pricing")}
        </span>
        <h1 className="display-lg text-ink tracking-tight leading-none">
          {tPrice("title")}
        </h1>
        <p className="text-base text-ink-muted max-w-xl">
          {tPrice("subtitle")}
        </p>

        {/* Monthly / Yearly Switch */}
        <div className="flex items-center gap-2 mt-4 bg-surface-1/50 border border-hairline p-1.5 rounded-full relative">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`relative py-2 px-5 text-sm font-semibold rounded-full transition-colors duration-250 cursor-pointer ${
              billingCycle === "monthly" ? "text-ink" : "text-ink-muted"
            }`}
          >
            {billingCycle === "monthly" && (
              <motion.div
                layoutId="active-billing"
                className="absolute inset-0 bg-surface-2 border border-hairline rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tPrice("bill_monthly")}</span>
          </button>

          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className={`relative py-2 px-5 text-sm font-semibold rounded-full transition-colors duration-250 cursor-pointer ${
              billingCycle === "yearly" ? "text-ink" : "text-ink-muted"
            }`}
          >
            {billingCycle === "yearly" && (
              <motion.div
                layoutId="active-billing"
                className="absolute inset-0 bg-surface-2 border border-hairline rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tPrice("bill_yearly")}
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] py-0.5 px-2 rounded-full font-bold">
                -20%
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div key={plan.id} className="group relative flex flex-col h-full">
            <Card
              variant={plan.featured ? "violet" : "charcoal"}
              className="p-6 md:p-8 flex flex-col justify-between h-full"
              hoverEffect
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-gradient-magenta/80 px-4 py-1 text-xs font-bold text-white shadow-md uppercase tracking-wider">
                  {tPrice("popular")}
                </span>
              )}

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold text-ink">{plan.title}</h3>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 py-2 border-b border-hairline-soft">
                  <span className="text-4xl font-extrabold text-ink">
                    {formatCurrency(getPrice(plan.price))}
                  </span>
                  <span className="text-sm text-ink-muted">
                    /{billingCycle === "yearly" ? t("yearly") : t("monthly")}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                    {tPrice("features_included")}
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feat, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        {feat.included ? (
                          <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4.5 w-4.5 text-ink-muted/30 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            feat.included ? "text-ink" : "text-ink-muted/50"
                          }
                        >
                          {feat.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant={plan.featured ? "primary" : "secondary"}
                  className="w-full justify-center"
                >
                  {plan.price === 0 ? "Bắt đầu ngay" : "Chọn gói bảo vệ"}
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </section>

      {/* Comparison table */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-ink text-center">
          So sánh chi tiết tính năng
        </h2>
        <div className="overflow-x-auto rounded-xl border border-hairline bg-surface-1/30">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-hairline bg-surface-1/80">
                <th className="py-4 px-6 font-semibold text-ink">Tính năng</th>
                <th className="py-4 px-6 font-semibold text-ink text-center">
                  Cơ bản
                </th>
                <th className="py-4 px-6 font-semibold text-ink text-center">
                  Pro
                </th>
                <th className="py-4 px-6 font-semibold text-ink text-center">
                  Gia đình
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-soft">
              <tr>
                <td className="py-4 px-6 font-medium text-ink">Số thiết bị hỗ trợ</td>
                <td className="py-4 px-6 text-center text-ink-muted">1</td>
                <td className="py-4 px-6 text-center text-ink-muted">Tối đa 3</td>
                <td className="py-4 px-6 text-center text-ink-muted">Tối đa 5</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-ink">Báo cáo hoạt động</td>
                <td className="py-4 px-6 text-center text-ink-muted">Hàng tuần</td>
                <td className="py-4 px-6 text-center text-ink-muted">Hàng ngày (AI)</td>
                <td className="py-4 px-6 text-center text-ink-muted">Thời gian thực + AI</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-ink">Khóa ứng dụng từ xa</td>
                <td className="py-4 px-6 text-center">
                  <X className="h-4 w-4 mx-auto text-ink-muted/30" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="h-4 w-4 mx-auto text-emerald-500" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="h-4 w-4 mx-auto text-emerald-500" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-ink">Lọc web độc hại (AI)</td>
                <td className="py-4 px-6 text-center">
                  <X className="h-4 w-4 mx-auto text-ink-muted/30" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="h-4 w-4 mx-auto text-emerald-500" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="h-4 w-4 mx-auto text-emerald-500" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-ink">Định vị & Vùng an toàn</td>
                <td className="py-4 px-6 text-center">
                  <X className="h-4 w-4 mx-auto text-ink-muted/30" />
                </td>
                <td className="py-4 px-6 text-center">
                  <X className="h-4 w-4 mx-auto text-ink-muted/30" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="h-4 w-4 mx-auto text-emerald-500" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-ink">Hỗ trợ khách hàng</td>
                <td className="py-4 px-6 text-center text-ink-muted">Email</td>
                <td className="py-4 px-6 text-center text-ink-muted">Ưu tiên qua chat</td>
                <td className="py-4 px-6 text-center text-ink-muted">24/7 Hotline + VIP Chat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Billing FAQ Section */}
      <section className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-ink text-center">
          {tPrice("billing_faq_title")}
        </h2>
        <div className="bg-surface-1 border border-hairline rounded-xl p-6 md:p-8 shadow-md">
          <Accordion
            items={[
              {
                id: "bill-faq-1",
                title: tPrice("billing_faq_q1"),
                content: tPrice("billing_faq_a1"),
              },
              {
                id: "bill-faq-2",
                title: tPrice("billing_faq_q2"),
                content: tPrice("billing_faq_a2"),
              },
              {
                id: "bill-faq-3",
                title: tPrice("billing_faq_q3"),
                content: tPrice("billing_faq_a3"),
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
