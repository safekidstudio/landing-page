"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Shield, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutFeature() {
  const tAbout = useTranslations("about");

  const stats = [
    { value: "5+", label: tAbout("stat_years") },
    { value: "50,000+", label: tAbout("stat_users") },
    { value: "3+", label: tAbout("stat_countries") },
  ];

  const values = [
    {
      icon: Shield,
      title: "An Toàn Tuyệt Đối",
      desc: "Chúng tôi coi an toàn dữ liệu của trẻ em là ưu tiên hàng đầu, áp dụng mã hóa đầu cuối nghiêm ngặt.",
    },
    {
      icon: Users,
      title: "Đồng Hành Nhân Văn",
      desc: "Không theo dõi cực đoan, Kibal khuyến khích thảo luận cởi mở giữa cha mẹ và con cái.",
    },
    {
      icon: Heart,
      title: "Thấu Hiểu Tâm Lý",
      desc: "Tính năng được phát triển dựa trên nghiên cứu tâm lý để tạo thói quen số tích cực cho con.",
    },
  ];

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <section className="text-center flex flex-col items-center gap-6">
        <span className="inline-flex items-center rounded-full border border-hairline bg-surface-1 px-3 py-1 text-xs font-semibold text-accent-blue shadow-sm">
          {tAbout("title")}
        </span>
        <h1 className="display-lg text-ink tracking-tight max-w-3xl leading-none">
          {tAbout("subtitle")}
        </h1>
      </section>

      {/* Story & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink">{tAbout("story_title")}</h2>
          <p className="text-ink-muted leading-relaxed body-default">
            {tAbout("story_p1")}
          </p>
          <p className="text-ink-muted leading-relaxed body-default">
            {tAbout("story_p2")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:pl-10">
          {stats.map((stat, i) => (
            <Card
              key={i}
              variant="charcoal"
              className="p-6 text-center flex flex-col justify-center items-center gap-2"
              hoverEffect
            >
              <span className="text-3xl font-extrabold text-accent-blue">
                {stat.value}
              </span>
              <span className="text-xs text-ink-muted leading-tight font-medium">
                {stat.label}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="flex flex-col gap-12">
        <h2 className="text-2xl font-bold text-ink text-center">
          Giá trị cốt lõi của Kibal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <Card
                key={i}
                variant={i === 1 ? "violet" : "charcoal"}
                className="p-6 flex flex-col gap-4"
                hoverEffect
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-2 text-accent-blue">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-ink">{val.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {val.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="flex flex-col gap-12 max-w-4xl mx-auto w-full">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">{tAbout("timeline_title")}</h2>
          <p className="text-base text-ink-muted">{tAbout("timeline_subtitle")}</p>
        </div>

        <div className="flex flex-col gap-8 relative border-l border-hairline pl-6 ml-4">
          {/* Milestone 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-blue border border-canvas" />
            <span className="text-sm font-bold text-accent-blue">{tAbout("t1_year")}</span>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed">{tAbout("t1_event")}</p>
          </div>

          {/* Milestone 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-blue border border-canvas" />
            <span className="text-sm font-bold text-accent-blue">{tAbout("t2_year")}</span>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed">{tAbout("t2_event")}</p>
          </div>

          {/* Milestone 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-blue border border-canvas" />
            <span className="text-sm font-bold text-accent-blue">{tAbout("t3_year")}</span>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed">{tAbout("t3_event")}</p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-ink">{tAbout("team_title")}</h2>
          <p className="text-base text-ink-muted">{tAbout("team_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="charcoal" className="p-6 flex flex-col gap-4" hoverEffect>
            <div>
              <h3 className="text-lg font-bold text-ink">{tAbout("m1_name")}</h3>
              <p className="text-xs text-accent-blue">{tAbout("m1_role")}</p>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">{tAbout("m1_bio")}</p>
          </Card>

          <Card variant="charcoal" className="p-6 flex flex-col gap-4" hoverEffect>
            <div>
              <h3 className="text-lg font-bold text-ink">{tAbout("m2_name")}</h3>
              <p className="text-xs text-accent-blue">{tAbout("m2_role")}</p>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">{tAbout("m2_bio")}</p>
          </Card>

          <Card variant="charcoal" className="p-6 flex flex-col gap-4" hoverEffect>
            <div>
              <h3 className="text-lg font-bold text-ink">{tAbout("m3_name")}</h3>
              <p className="text-xs text-accent-blue">{tAbout("m3_role")}</p>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">{tAbout("m3_bio")}</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
