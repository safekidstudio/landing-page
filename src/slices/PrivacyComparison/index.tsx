import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import {
  Database,
  Shield,
  Lock,
  Info,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import { PrismicNextLink } from "@/prismicio";
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

  if (slice.variation === "withLinks") {
    const leftTitle =
      primary.left_card_title || "Open Source (Community Edition)";
    const leftDescription = (primary as any).left_card_description;
    const leftLinks = (primary as any).left_card_links;
    const leftFooter = primary.left_card_footer;

    const rightTitle = primary.right_card_title || "Pro Edition (Self-Hosted)";
    const rightDescription = (primary as any).right_card_description;
    const rightLinks = (primary as any).right_card_links;
    const rightFooter = primary.right_card_footer;

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
            {/* Left Card - Open Source */}
            <ScrollAnimatedContainer
              type="slide"
              direction="up"
              delay={0.1}
              className="flex h-full w-full"
            >
              <div className="bg-white border border-neutral-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 w-full flex flex-col">
                <h3 className="text-lg font-serif italic font-medium text-foreground mb-6">
                  {leftTitle}
                </h3>
                {isFilled.richText(leftDescription) && (
                  <div className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed mb-6">
                    <PrismicRichText field={leftDescription} />
                  </div>
                )}
                {isFilled.group(leftLinks) && (
                  <div className="flex flex-col gap-4 flex-1 mb-8">
                    {leftLinks.map((item: any, idx: number) => (
                      <PrismicNextLink
                        key={idx}
                        field={item.link}
                        className="flex items-center gap-2 text-sm sm:text-[15px] text-neutral-600 hover:text-brand transition-colors duration-150 w-fit"
                      >
                        <ArrowRight className="h-4 w-4 text-neutral-400 shrink-0" />
                        <span>{item.link?.text}</span>
                      </PrismicNextLink>
                    ))}
                  </div>
                )}
                {isFilled.richText(leftFooter) && (
                  <div className="text-xs sm:text-[13px] text-muted-foreground/75 leading-relaxed mt-auto pt-4 border-t border-dashed border-neutral-100">
                    <PrismicRichText field={leftFooter} />
                  </div>
                )}
              </div>
            </ScrollAnimatedContainer>

            {/* Right Card - Pro Edition */}
            <ScrollAnimatedContainer
              type="slide"
              direction="up"
              delay={0.2}
              className="flex h-full w-full"
            >
              <div className="bg-white border border-neutral-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 w-full flex flex-col">
                <h3 className="text-lg font-serif italic font-medium text-foreground mb-6">
                  {rightTitle}
                </h3>
                {isFilled.richText(rightDescription) && (
                  <div className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed mb-6">
                    <PrismicRichText field={rightDescription} />
                  </div>
                )}
                {isFilled.group(rightLinks) && (
                  <div className="flex flex-col gap-4 flex-1 mb-8">
                    {rightLinks.map((item: any, idx: number) => (
                      <PrismicNextLink
                        key={idx}
                        field={item.link}
                        className="flex items-center gap-2 text-sm sm:text-[15px] text-neutral-600 hover:text-brand transition-colors duration-150 w-fit"
                      >
                        <ArrowRight className="h-4 w-4 text-neutral-400 shrink-0" />
                        <span>{item.link?.text}</span>
                      </PrismicNextLink>
                    ))}
                  </div>
                )}
                {isFilled.richText(rightFooter) && (
                  <div className="text-xs sm:text-[13px] text-muted-foreground/75 leading-relaxed mt-auto pt-4 border-t border-dashed border-neutral-100">
                    <PrismicRichText field={rightFooter} />
                  </div>
                )}
              </div>
            </ScrollAnimatedContainer>
          </div>
        </div>
      </section>
    );
  }

  // Cast to any to satisfy TS union types for the default variation
  const defaultPrimary = primary as any;

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
          {isFilled.richText(defaultPrimary.heading) && (
            <PrismicRichText
              field={defaultPrimary.heading}
              components={{
                heading2: ({ children }) => <Heading>{children}</Heading>,
              }}
            />
          )}
          {isFilled.richText(defaultPrimary.description) && (
            <PrismicRichText
              field={defaultPrimary.description}
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
                  {getCardIcon(defaultPrimary.left_card_icon || "database")}
                </div>
                <h3 className="text-lg font-serif italic font-medium text-foreground">
                  {defaultPrimary.left_card_title || "What We DON'T Collect"}
                </h3>
              </div>

              {/* Items List */}
              {isFilled.group(defaultPrimary.left_card_items) && (
                <ul className="space-y-5 flex-1 mb-8">
                  {defaultPrimary.left_card_items.map(
                    (item: any, index: number) => (
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
                    ),
                  )}
                </ul>
              )}

              {/* Footer */}
              {isFilled.richText(defaultPrimary.left_card_footer) && (
                <div className="text-xs sm:text-[13px] text-muted-foreground/75 leading-relaxed mt-auto pt-4 border-t border-dashed border-neutral-100">
                  <PrismicRichText field={defaultPrimary.left_card_footer} />
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
                  {getCardIcon(defaultPrimary.right_card_icon || "shield")}
                </div>
                <h3 className="text-lg font-serif italic font-medium text-foreground">
                  {defaultPrimary.right_card_title ||
                    "What We DO Collect (Optional)"}
                </h3>
              </div>

              {/* Items List */}
              {isFilled.group(defaultPrimary.right_card_items) && (
                <ul className="space-y-5 flex-1 mb-8">
                  {defaultPrimary.right_card_items.map(
                    (item: any, index: number) => (
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
                    ),
                  )}
                </ul>
              )}

              {/* Footer */}
              {isFilled.richText(defaultPrimary.right_card_footer) && (
                <div className="text-xs sm:text-[13px] text-muted-foreground/75 leading-relaxed mt-auto pt-4 border-t border-dashed border-neutral-100">
                  <PrismicRichText field={defaultPrimary.right_card_footer} />
                </div>
              )}
            </div>
          </ScrollAnimatedContainer>
        </div>
      </div>
    </section>
  );
}
