"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore, AgeGroup, DeviceType } from "@/store/use_app_store";
import {
  Smartphone,
  Tablet as TabletIcon,
  Laptop,
  Clock,
  AlertTriangle,
  Lock,
  Eye,
  Shield,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function HomeFeature() {
  const t = useTranslations("common");
  const tHero = useTranslations("hero");
  const tSim = useTranslations("simulator");
  const tFeatures = useTranslations("features");

  const { ageGroup, deviceType, setAgeGroup, setDeviceType } = useAppStore();

  const getRecommendedHours = (age: AgeGroup): string => {
    switch (age) {
      case "t2_5":
        return "< 1";
      case "t6_12":
        return "1.5 - 2";
      case "t13_18":
        return "2 - 3";
      default:
        return "2";
    }
  };

  const getRiskLevel = (
    age: AgeGroup,
    device: DeviceType
  ): { label: string; color: string; bg: string } => {
    // Simulated risk levels
    if (age === "t2_5") {
      if (device === "phone")
        return {
          label: tSim("risk_high"),
          color: "text-red-500",
          bg: "bg-red-500/10 border-red-500/20",
        };
      return {
        label: tSim("risk_medium"),
        color: "text-amber-500",
        bg: "bg-amber-500/10 border-amber-500/20",
      };
    }
    if (age === "t6_12") {
      if (device === "phone")
        return {
          label: tSim("risk_medium"),
          color: "text-amber-500",
          bg: "bg-amber-500/10 border-amber-500/20",
        };
      return {
        label: tSim("risk_low"),
        color: "text-emerald-500",
        bg: "bg-emerald-500/10 border-emerald-500/20",
      };
    }
    return {
      label: tSim("risk_low"),
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    };
  };

  const risk = getRiskLevel(ageGroup, deviceType);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
        {/* Glow atmosphere in background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-violet/15 rounded-full blur-[120px] pointer-events-none z-0" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-1 px-3 py-1 text-xs font-semibold text-accent-blue shadow-sm">
            {tHero("eyebrow")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="display-xl md:display-xxl text-ink max-w-4xl tracking-tighter"
        >
          {tHero("title_part1")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gradient-violet via-gradient-magenta to-gradient-orange">
            {tHero("title_part2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-ink-muted text-base md:text-xl max-w-2xl leading-relaxed"
        >
          {tHero("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 relative z-10"
        >
          <Link href="/pricing">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              {t("get_started")}
            </Button>
          </Link>
          <Link href="/helps">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              {t("watch_demo")}
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs text-ink-muted mt-2"
        >
          {tHero("active_users")}
        </motion.p>
      </section>

      {/* 2. Interactive Screen Time Simulator (Interactive Dashboard) */}
      <section className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="group"
        >
          <Card variant="violet" className="p-6 md:p-10" hoverEffect>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Controls */}
              <div className="flex flex-col gap-8 justify-center">
                <div>
                  <h2 className="display-md text-ink tracking-tight mb-2">
                    {tSim("title")}
                  </h2>
                  <p className="text-sm text-ink-muted">{tSim("subtitle")}</p>
                </div>

                {/* Age selector */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                    {tSim("label_age")}
                  </span>
                  <div className="grid grid-cols-3 gap-2 bg-surface-1/50 border border-hairline p-1 rounded-full">
                    {(["t2_5", "t6_12", "t13_18"] as AgeGroup[]).map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeGroup(age)}
                        className={`py-2 px-3 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                          ageGroup === age
                            ? "bg-surface-2 text-ink shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                            : "text-ink-muted hover:text-ink"
                        }`}
                      >
                        {age === "t2_5"
                          ? "2 - 5"
                          : age === "t6_12"
                          ? "6 - 12"
                          : "13 - 18"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Device Selector */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                    {tSim("label_device")}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["phone", "tablet", "computer"] as DeviceType[]).map(
                      (device) => {
                        const Icon =
                          device === "phone"
                            ? Smartphone
                            : device === "tablet"
                            ? TabletIcon
                            : Laptop;
                        return (
                          <button
                            key={device}
                            type="button"
                            onClick={() => setDeviceType(device)}
                            className={`flex flex-col items-center gap-2 py-3 px-4 rounded-xl border transition-all cursor-pointer ${
                              deviceType === device
                                ? "bg-surface-2 border-accent-blue/50 text-ink"
                                : "bg-surface-1/40 border-hairline text-ink-muted hover:text-ink hover:bg-surface-1/80"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-medium">
                              {tSim(device)}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* Display Result Panel */}
              <div className="flex flex-col justify-between bg-surface-1/90 border border-hairline p-6 md:p-8 rounded-xl shadow-inner relative overflow-hidden">
                {/* Simulated ambient ring behind risk indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col gap-6 relative z-10">
                  {/* Recommended Limit Display */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        {tSim("recommended_limit")}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-ink">
                          {getRecommendedHours(ageGroup)}
                        </span>
                        <span className="text-sm text-ink-muted">
                          {tSim("hours")}/{tSim("hour")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Level Indicator */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-ink-muted">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        {tSim("risk_level")}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-lg font-bold ${risk.color} px-2.5 py-0.5 rounded-full border ${risk.bg}`}
                        >
                          {risk.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Parenting advice block */}
                <div className="mt-8 pt-6 border-t border-hairline-soft relative z-10">
                  <h4 className="text-sm font-semibold text-ink mb-1.5 flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-accent-blue" />
                    {tSim("tip_title")}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {tSim(`tips.${ageGroup}`)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* 3. Core Features Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <h2 className="display-lg text-ink tracking-tight">
            {tFeatures("title")}
          </h2>
          <p className="text-base text-ink-muted">{tFeatures("subtitle")}</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Real-time tracking */}
          <motion.div variants={itemVariants} className="group h-full">
            <Card variant="charcoal" className="p-6 flex flex-col gap-4 h-full" hoverEffect>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">
                {tFeatures("f1_title")}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {tFeatures("f1_desc")}
              </p>
            </Card>
          </motion.div>

          {/* Card 2: App blocking */}
          <motion.div variants={itemVariants} className="group h-full">
            <Card variant="charcoal" className="p-6 flex flex-col gap-4 h-full" hoverEffect>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-2 text-ink">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">
                {tFeatures("f2_title")}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {tFeatures("f2_desc")}
              </p>
            </Card>
          </motion.div>

          {/* Card 3: AI content filter (Gradient spotlight - Purple ground!) */}
          <motion.div variants={itemVariants} className="group h-full col-span-1 lg:col-span-1">
            <Card variant="violet" className="p-6 flex flex-col gap-4 h-full" hoverEffect>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-on-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">
                {tFeatures("f3_title")}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {tFeatures("f3_desc")}
              </p>
            </Card>
          </motion.div>

          {/* Card 4: GPS Tracking */}
          <motion.div variants={itemVariants} className="group h-full">
            <Card variant="charcoal" className="p-6 flex flex-col gap-4 h-full" hoverEffect>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink">
                {tFeatures("f4_title")}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {tFeatures("f4_desc")}
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* 3b. How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <h2 className="display-lg text-ink tracking-tight">
            {tFeatures("how_it_works_title")}
          </h2>
          <p className="text-base text-ink-muted">
            {tFeatures("how_it_works_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="charcoal" className="p-6 flex flex-col gap-4 text-center items-center" hoverEffect>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-ink">{tFeatures("step1_title")}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{tFeatures("step1_desc")}</p>
          </Card>

          <Card variant="charcoal" className="p-6 flex flex-col gap-4 text-center items-center" hoverEffect>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-ink">{tFeatures("step2_title")}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{tFeatures("step2_desc")}</p>
          </Card>

          <Card variant="charcoal" className="p-6 flex flex-col gap-4 text-center items-center" hoverEffect>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-ink">{tFeatures("step3_title")}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{tFeatures("step3_desc")}</p>
          </Card>
        </div>
      </section>

      {/* 3c. Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <h2 className="display-lg text-ink tracking-tight">
            {tFeatures("testimonials_title")}
          </h2>
          <p className="text-base text-ink-muted">
            {tFeatures("testimonials_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="charcoal" className="p-6 flex flex-col justify-between gap-6" hoverEffect>
            <p className="text-sm text-ink-muted italic leading-relaxed">
              "{tFeatures("t1_quote")}"
            </p>
            <div className="border-t border-hairline-soft pt-4">
              <h4 className="text-sm font-bold text-ink">{tFeatures("t1_user")}</h4>
              <p className="text-xs text-accent-blue">{tFeatures("t1_role")}</p>
            </div>
          </Card>

          <Card variant="charcoal" className="p-6 flex flex-col justify-between gap-6" hoverEffect>
            <p className="text-sm text-ink-muted italic leading-relaxed">
              "{tFeatures("t2_quote")}"
            </p>
            <div className="border-t border-hairline-soft pt-4">
              <h4 className="text-sm font-bold text-ink">{tFeatures("t2_user")}</h4>
              <p className="text-xs text-accent-blue">{tFeatures("t2_role")}</p>
            </div>
          </Card>

          <Card variant="charcoal" className="p-6 flex flex-col justify-between gap-6" hoverEffect>
            <p className="text-sm text-ink-muted italic leading-relaxed">
              "{tFeatures("t3_quote")}"
            </p>
            <div className="border-t border-hairline-soft pt-4">
              <h4 className="text-sm font-bold text-ink">{tFeatures("t3_user")}</h4>
              <p className="text-xs text-accent-blue">{tFeatures("t3_role")}</p>
            </div>
          </Card>
        </div>
      </section>

      {/* 4. Bottom Call To Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group"
        >
          <Card
            variant="magenta"
            className="p-8 md:p-14 text-center flex flex-col items-center gap-6"
            hoverEffect
          >
            <h2 className="display-md md:display-lg text-ink max-w-2xl tracking-tight leading-none">
              Bảo vệ con yêu của bạn ngay hôm nay cùng Kibal
            </h2>
            <p className="text-sm md:text-base text-ink/80 max-w-md">
              Đăng ký và dùng thử miễn phí đầy đủ các tính năng trong vòng 14 ngày. Không cần thẻ tín dụng.
            </p>
            <Link href="/pricing" className="mt-2">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-black hover:bg-zinc-100 flex items-center gap-2 font-semibold shadow-lg"
              >
                {t("get_started")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
