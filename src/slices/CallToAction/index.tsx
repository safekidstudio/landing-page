import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@/prismicio";
import { ArrowRight, Check } from "lucide-react";

import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type CallToActionProps = {
  slice: Content.CallToActionSlice;
};

export default function CallToAction({ slice }: CallToActionProps) {
  const { primary } = slice;
  const benefits = primary.benefits;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-background py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimatedContainer type="slide" direction="up" className="w-full">
          <div className="bg-[#F3F4F6] dark:bg-neutral-900 rounded-3xl p-8 md:p-16 text-left flex flex-col items-start justify-center border border-neutral-200/40 dark:border-neutral-800/40">
            {/* Heading */}
            {isFilled.richText(primary.heading) && (
              <PrismicRichText
                field={primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <Heading className="text-left max-w-2xl lg:text-[44px]">
                      {children}
                    </Heading>
                  ),
                }}
              />
            )}

            {/* Subtitle/Description */}
            {isFilled.richText(primary.description) && (
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground/90 max-w-xl mb-8 leading-relaxed">
                <PrismicRichText field={primary.description} />
              </div>
            )}

            {/* Button Link */}
            {isFilled.keyText(primary.button.text) && (
              <PrismicNextLink
                field={primary.button}
                className="bg-[#18181B] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 rounded-full px-8 py-4 h-auto text-sm md:text-base font-semibold inline-flex items-center gap-2 transition-colors duration-200 mb-8"
              >
                <span>
                  {primary.button.text || "Secure Your Early Access Spot"}
                </span>
                <ArrowRight className="h-4.5 w-4.5" />
              </PrismicNextLink>
            )}

            {/* Benefits checklist */}
            {benefits && benefits.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs md:text-sm text-muted-foreground/80 font-medium">
                {benefits.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand flex-shrink-0" />
                    {isFilled.keyText(item.text) && <span>{item.text}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimatedContainer>
      </div>
    </section>
  );
}
