import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type StatsShowcaseProps = {
  slice: Content.StatsShowcaseSlice;
};

export default function StatsShowcase({ slice }: StatsShowcaseProps) {
  const { primary } = slice;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#FAF8F5]/30 py-20 md:py-28 border-b border-border/40"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Section */}
        <ScrollAnimatedContainer
          type="slide"
          direction="up"
          className="w-full text-center max-w-3xl mx-auto space-y-4"
        >
          {isFilled.richText(primary.heading) && (
            <PrismicRichText
              field={primary.heading}
              components={{
                heading2: ({ children }) => <Heading>{children}</Heading>,
              }}
            />
          )}
          {isFilled.richText(primary.description) && (
            <PrismicRichText
              field={primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
                    {children}
                  </p>
                ),
              }}
            />
          )}
        </ScrollAnimatedContainer>

        {/* Stats Grid */}
        {isFilled.group(primary.stats) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mt-16 items-stretch">
            {primary.stats.map((stat, index) => (
              <ScrollAnimatedContainer
                key={index}
                type="slide"
                direction="up"
                delay={index * 0.08}
                className="w-full flex"
              >
                <div className="bg-white border border-neutral-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 w-full flex flex-col items-center justify-center text-center">
                  {isFilled.keyText(stat.value) && (
                    <div className="text-3xl sm:text-[40px] font-bold text-foreground leading-none tracking-tight mb-2.5">
                      {stat.value}
                    </div>
                  )}
                  {isFilled.keyText(stat.label) && (
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground/80 leading-normal">
                      {stat.label}
                    </div>
                  )}
                </div>
              </ScrollAnimatedContainer>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
