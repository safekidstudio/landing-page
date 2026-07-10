import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Database, Shield, Lock, Info, X, Check } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type PrivacyComparisonProps = {
  slice: Content.PrivacyComparisonSlice;
};

export default function PrivacyComparison({ slice }: PrivacyComparisonProps) {
  const { primary } = slice;

  // Icon resolver for card headers
  const getCardIcon = (iconName: string) => {
    const iconClass = "h-6 w-6 text-neutral-600";
    switch (iconName) {
      case "database":
        return <Database className={iconClass} />;
      case "shield":
        return <Shield className={iconClass} />;
      case "lock":
        return <Lock className={iconClass} />;
      case "info":
      default:
        return <Info className={iconClass} />;
    }
  };

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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-16 items-stretch">
          {/* Left Card - What We DON'T Collect */}
          <ScrollAnimatedContainer
            type="slide"
            direction="up"
            delay={0.1}
            className="flex h-full w-full"
          >
            <div className="bg-white border border-neutral-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 w-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3.5 bg-neutral-200 rounded-xl flex items-center justify-center">
                  {getCardIcon(primary.left_card_icon || "database")}
                </div>
                <h3 className="text-lg font-serif italic font-medium text-foreground">
                  {primary.left_card_title || "What We DON'T Collect"}
                </h3>
              </div>

              {/* Items List */}
              {isFilled.group(primary.left_card_items) && (
                <ul className="space-y-5 flex-1 mb-8">
                  {primary.left_card_items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm sm:text-base text-neutral-600 leading-relaxed"
                    >
                      {item.status === "check" ? (
                        <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Footer */}
              {isFilled.richText(primary.left_card_footer) && (
                <div className="text-xs sm:text-[13px] text-muted-foreground/75 leading-relaxed mt-auto pt-4 border-t border-dashed border-neutral-100">
                  <PrismicRichText field={primary.left_card_footer} />
                </div>
              )}
            </div>
          </ScrollAnimatedContainer>

          {/* Right Card - What We DO Collect */}
          <ScrollAnimatedContainer
            type="slide"
            direction="up"
            delay={0.2}
            className="flex h-full w-full"
          >
            <div className="bg-white border border-neutral-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 w-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3.5 bg-neutral-200 rounded-xl flex items-center justify-center">
                  {getCardIcon(primary.right_card_icon || "shield")}
                </div>
                <h3 className="text-lg font-serif italic font-medium text-foreground">
                  {primary.right_card_title || "What We DO Collect (Optional)"}
                </h3>
              </div>

              {/* Items List */}
              {isFilled.group(primary.right_card_items) && (
                <ul className="space-y-5 flex-1 mb-8">
                  {primary.right_card_items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm sm:text-base text-neutral-600 leading-relaxed"
                    >
                      {item.status === "cross" ? (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Footer */}
              {isFilled.richText(primary.right_card_footer) && (
                <div className="text-xs sm:text-[13px] text-muted-foreground/75 leading-relaxed mt-auto pt-4 border-t border-dashed border-neutral-100">
                  <PrismicRichText field={primary.right_card_footer} />
                </div>
              )}
            </div>
          </ScrollAnimatedContainer>
        </div>
      </div>
    </section>
  );
}
