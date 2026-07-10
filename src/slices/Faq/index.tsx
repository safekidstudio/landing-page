"use client";

import { useState } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type FaqProps = {
  slice: Content.FaqSlice;
};

export default function Faq({ slice }: FaqProps) {
  const { primary } = slice;
  const faqList = primary.faq_list;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#F3F4F6] py-20 md:py-28 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <ScrollAnimatedContainer
          type="slide"
          direction="up"
          className="w-full flex flex-col items-center"
        >
          {/* Heading */}
          {isFilled.richText(primary.heading) && (
            <PrismicRichText
              field={primary.heading}
              components={{
                heading2: ({ children }) => (
                  <Heading className="mb-16">{children}</Heading>
                ),
              }}
            />
          )}

          {/* FAQ Accordion List */}
          {faqList && faqList.length > 0 && (
            <div className="max-w-3xl mx-auto w-full space-y-4">
              {faqList.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className="bg-card border border-border/70 rounded-2xl overflow-hidden transition-all duration-300 hover:border-border"
                  >
                    {/* Question Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleIndex(idx)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-sm sm:text-base text-foreground hover:text-brand transition-colors duration-200 cursor-pointer focus:outline-none"
                    >
                      {isFilled.keyText(item.question) && (
                        <span className="pr-4">{item.question}</span>
                      )}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-brand transition-transform duration-300 flex-shrink-0",
                          isOpen
                            ? "transform rotate-180"
                            : "transform rotate-0",
                        )}
                      />
                    </button>

                    {/* Answer Content Wrapper with Smooth Height Transition */}
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        {isFilled.richText(item.answer) && (
                          <div className="px-6 pb-6 text-sm sm:text-base text-muted-foreground/90 leading-relaxed border-t border-border/40 pt-4">
                            <PrismicRichText field={item.answer} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollAnimatedContainer>
      </div>
    </section>
  );
}
