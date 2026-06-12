"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { ShieldCheck, EyeOff, LockKeyhole, Cookie, Scale, UserCheck } from "lucide-react";

export default function PrivacyFeature() {
  const tPrivacy = useTranslations("privacy");

  const rules = [
    {
      icon: EyeOff,
      title: tPrivacy("p1_title"),
      desc: tPrivacy("p1_desc"),
    },
    {
      icon: LockKeyhole,
      title: tPrivacy("p2_title"),
      desc: tPrivacy("p2_desc"),
    },
    {
      icon: ShieldCheck,
      title: tPrivacy("p3_title"),
      desc: tPrivacy("p3_desc"),
    },
    {
      icon: Cookie,
      title: tPrivacy("p4_title"),
      desc: tPrivacy("p4_desc"),
    },
    {
      icon: UserCheck,
      title: tPrivacy("p5_title"),
      desc: tPrivacy("p5_desc"),
    },
    {
      icon: Scale,
      title: tPrivacy("p6_title"),
      desc: tPrivacy("p6_desc"),
    },
  ];

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Header */}
      <section className="text-center flex flex-col items-center gap-6">
        <span className="inline-flex items-center rounded-full border border-hairline bg-surface-1 px-3 py-1 text-xs font-semibold text-accent-blue shadow-sm">
          Quy định pháp lý
        </span>
        <h1 className="display-lg text-ink tracking-tight leading-none">
          {tPrivacy("title")}
        </h1>
        <p className="text-base text-ink-muted max-w-xl">
          {tPrivacy("subtitle")}
        </p>
      </section>

      {/* Rules list */}
      <section className="flex flex-col gap-6">
        {rules.map((rule, i) => {
          const Icon = rule.icon;
          return (
            <Card
              key={i}
              variant="charcoal"
              className="p-6 md:p-8 flex gap-6 items-start"
              hoverEffect
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue shrink-0">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-ink">{rule.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
