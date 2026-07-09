import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { Shield, Users, Globe, Heart, Star, Lock } from "lucide-react";

export type PrinciplesProps = {
  slice: Content.PrinciplesSlice;
};

export default function Principles({ slice }: PrinciplesProps) {
  const { primary } = slice;
  const principlesList = primary.principles_list;

  // Icon resolver for core principles
  const getPrincipleIcon = (iconName: string) => {
    const iconClass = "h-6 w-6 text-brand";
    switch (iconName) {
      case "shield":
        return <Shield className={iconClass} />;
      case "users":
        return <Users className={iconClass} />;
      case "globe":
        return <Globe className={iconClass} />;
      case "heart":
        return <Heart className={iconClass} />;
      case "star":
        return <Star className={iconClass} />;
      case "lock":
        return <Lock className={iconClass} />;
      default:
        return <Shield className={iconClass} />;
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-background py-20 md:py-28 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Heading */}
        {isFilled.richText(primary.heading) && (
          <PrismicRichText
            field={primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-foreground text-center max-w-3xl leading-tight mb-4">
                  {children}
                </h2>
              ),
            }}
          />
        )}

        {/* Subtitle/Description */}
        {isFilled.richText(primary.description) && (
          <div className="text-sm sm:text-base text-muted-foreground/80 text-center max-w-2xl leading-relaxed mb-16">
            <PrismicRichText field={primary.description} />
          </div>
        )}

        {/* Principles Card Grid */}
        {principlesList && principlesList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto mb-16">
            {principlesList.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-[#F3F4F6] dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40 rounded-3xl p-8 items-start justify-start hover:shadow-md transition-all duration-300"
              >
                {/* Icon Box */}
                <div className="rounded-2xl mb-4 flex items-center justify-center">
                  {getPrincipleIcon(card.icon || "shield")}
                </div>

                {/* Title */}
                {isFilled.keyText(card.title) && (
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-3 font-serif">
                    {card.title}
                  </h3>
                )}

                {/* Description */}
                {isFilled.richText(card.description) && (
                  <div className="text-sm text-muted-foreground/90 leading-relaxed">
                    <PrismicRichText field={card.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full mt-4">
          {/* Primary Button */}
          {isFilled.keyText(primary.primary_button.text) && (
            <PrismicNextLink
              field={primary.primary_button}
              className="bg-[#18181B] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-6 py-3.5 h-auto text-sm font-semibold rounded-xl transition-colors duration-200"
            >
              {primary.primary_button.text}
            </PrismicNextLink>
          )}

          {/* Secondary Button */}
          {isFilled.keyText(primary.secondary_button.text) && (
            <PrismicNextLink
              field={primary.secondary_button}
              className="border border-border bg-background hover:bg-neutral-50 dark:hover:bg-neutral-800 text-foreground px-6 py-3.5 h-auto text-sm font-semibold rounded-xl transition-colors duration-200"
            >
              {primary.secondary_button.text}
            </PrismicNextLink>
          )}
        </div>
      </div>
    </section>
  );
}
