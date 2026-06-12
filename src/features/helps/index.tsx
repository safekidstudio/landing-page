"use client";

import { useTranslations } from "next-intl";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, PhoneCall } from "lucide-react";

export default function HelpsFeature() {
  const tHelps = useTranslations("helps");

  const faqItems = [
    {
      id: "faq-1",
      title: tHelps("faq_q1"),
      content: tHelps("faq_a1"),
    },
    {
      id: "faq-2",
      title: tHelps("faq_q2"),
      content: tHelps("faq_a2"),
    },
    {
      id: "faq-3",
      title: tHelps("faq_q3"),
      content: tHelps("faq_a3"),
    },
    {
      id: "faq-4",
      title: tHelps("faq_q4"),
      content: tHelps("faq_a4"),
    },
    {
      id: "faq-5",
      title: tHelps("faq_q5"),
      content: tHelps("faq_a5"),
    },
    {
      id: "faq-6",
      title: tHelps("faq_q6"),
      content: tHelps("faq_a6"),
    },
    {
      id: "faq-7",
      title: tHelps("faq_q7"),
      content: tHelps("faq_a7"),
    },
    {
      id: "faq-8",
      title: tHelps("faq_q8"),
      content: tHelps("faq_a8"),
    },
  ];

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Chat trực tuyến",
      desc: "Trò chuyện trực tiếp với đội ngũ hỗ trợ của chúng tôi 24/7.",
    },
    {
      icon: Mail,
      title: "Gửi Email",
      desc: "Gửi câu hỏi của bạn tới support@kibal.vn, phản hồi trong 2 giờ.",
    },
    {
      icon: PhoneCall,
      title: "Hotline hỗ trợ",
      desc: "Gọi điện trực tiếp tới số 1900-KIBAL để gặp điện thoại viên.",
    },
  ];

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Title */}
      <section className="text-center flex flex-col items-center gap-6">
        <span className="inline-flex items-center rounded-full border border-hairline bg-surface-1 px-3 py-1 text-xs font-semibold text-accent-blue shadow-sm">
          {tHelps("title")}
        </span>
        <h1 className="display-lg text-ink tracking-tight leading-none">
          {tHelps("title")}
        </h1>
        <p className="text-base text-ink-muted max-w-xl">
          {tHelps("subtitle")}
        </p>
      </section>

      {/* Accordion FAQs */}
      <section className="bg-surface-1 border border-hairline rounded-xl p-6 md:p-8 shadow-md">
        <Accordion items={faqItems} />
      </section>

      {/* Contact Section */}
      <section className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-ink text-center">
          Vẫn cần trợ giúp? Liên hệ với chúng tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <Card
                key={i}
                variant="charcoal"
                className="p-6 flex flex-col gap-4 text-center items-center"
                hoverEffect
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-ink">{method.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {method.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
