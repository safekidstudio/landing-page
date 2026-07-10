import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type SetupStepsProps = {
  slice: Content.SetupStepsSlice;
};

export default function SetupSteps({ slice }: SetupStepsProps) {
  const { primary } = slice;
  const steps = primary.steps || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#FAF8F5]/30 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollAnimatedContainer type="slide" direction="up">
            {isFilled.richText(primary.heading) && (
              <PrismicRichText
                field={primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <Heading className="text-center text-3xl sm:text-4xl font-serif font-medium italic tracking-tight mb-4 max-w-none">
                      {children}
                    </Heading>
                  ),
                }}
              />
            )}

            {isFilled.richText(primary.description) && (
              <div className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed">
                <PrismicRichText field={primary.description} />
              </div>
            )}
          </ScrollAnimatedContainer>
        </div>

        {/* Steps Grid Container */}
        <div className="relative w-full">
          {/* Connector Line behind circles (desktop only) */}
          {steps.length > 1 && (
            <div className="absolute top-8 left-[16.6%] right-[16.6%] h-[1px] bg-neutral-200 dark:bg-neutral-800/80 -translate-y-1/2 -z-10 hidden md:block" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
            {steps.map((item, index) => (
              <ScrollAnimatedContainer
                key={index}
                type="slide"
                direction="up"
                delay={index * 0.15}
                className="flex flex-col items-center"
              >
                {/* Step Circle */}
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-center relative z-10 shadow-xs">
                  <span className="text-sm font-semibold text-brand">
                    {item.step_number || `0${index + 1}`}
                  </span>
                </div>

                {/* Step Title */}
                {isFilled.keyText(item.title) && (
                  <Heading
                    as="h3"
                    className="text-xl lg:text-2xl font-serif font-medium text-center mt-6 mb-2"
                  >
                    {item.title}
                  </Heading>
                )}

                {/* Step Description */}
                {isFilled.keyText(item.description) && (
                  <p className="text-sm sm:text-base text-muted-foreground/80 text-center max-w-xs mx-auto mb-8 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Step Preview Image */}
                {isFilled.image(item.image) && (
                  <div className="w-full rounded-2xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 aspect-[16/10] relative shadow-sm hover:shadow-md transition-shadow duration-300">
                    <PrismicNextImage
                      field={item.image}
                      className="w-full h-full object-cover"
                      fallback={
                        <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground/30 text-xs">
                          Preview Mockup
                        </div>
                      }
                    />
                  </div>
                )}
              </ScrollAnimatedContainer>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
