import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import {
  Star,
  Shield,
  Share2,
  Lock,
  Activity,
  Clock,
  Key,
  Grid,
  Zap,
  User,
  FileText,
  Smartphone,
  Check,
} from "lucide-react";

export type FeatureShowcaseProps = {
  slice: Content.FeatureShowcaseSlice;
};

export default function FeatureShowcase({ slice }: FeatureShowcaseProps) {
  const { primary } = slice;
  const coreFeatures = primary.core_features;
  const highlightFeatures = primary.highlight_features;

  // Icon resolver for core features (top)
  const getCoreFeatureIcon = (iconName: string) => {
    const iconClass = "h-6 w-6 text-brand";
    switch (iconName) {
      case "star":
        return <Star className={iconClass} />;
      case "shield":
        return <Shield className={iconClass} />;
      case "share":
        return <Share2 className={iconClass} />;
      case "lock":
        return <Lock className={iconClass} />;
      case "activity":
        return <Activity className={iconClass} />;
      case "clock":
        return <Clock className={iconClass} />;
      case "key":
        return <Key className={iconClass} />;
      default:
        return <Shield className={iconClass} />;
    }
  };

  // Icon resolver for highlight features (bottom)
  const getHighlightFeatureIcon = (iconName: string) => {
    const iconClass = "h-6 w-6 text-brand";
    switch (iconName) {
      case "lock":
        return <Lock className={iconClass} />;
      case "activity":
        return <Activity className={iconClass} />;
      case "grid":
        return <Grid className={iconClass} />;
      case "zap":
        return <Zap className={iconClass} />;
      case "user":
        return <User className={iconClass} />;
      case "file":
        return <FileText className={iconClass} />;
      case "smartphone":
        return <Smartphone className={iconClass} />;
      case "shield":
        return <Shield className={iconClass} />;
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
        {/* Badge Text */}
        {isFilled.keyText(primary.badge_text) && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand/5 text-brand border border-brand/20 mb-6 uppercase tracking-wider">
            {primary.badge_text}
          </span>
        )}

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

        {/* Upper Grid: 3 Core Features (Dark Cards) */}
        {coreFeatures && coreFeatures.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full mb-16">
            {coreFeatures.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-[#18181B] text-white rounded-3xl p-8 border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
              >
                {/* Icon Box */}
                <div className="p-3 bg-brand/10 border border-brand/20 rounded-2xl w-fit mb-6 flex items-center justify-center">
                  {getCoreFeatureIcon(card.icon || "shield")}
                </div>

                {/* Title */}
                {isFilled.keyText(card.title) && (
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
                    {card.title}
                  </h3>
                )}

                {/* Checklist list */}
                {isFilled.richText(card.checklist) && (
                  <div className="mt-2">
                    <PrismicRichText
                      field={card.checklist}
                      components={{
                        list: ({ children }) => (
                          <ul className="space-y-4 text-left">{children}</ul>
                        ),
                        listItem: ({ children }) => (
                          <li className="flex items-start gap-3 text-sm text-neutral-300/90 leading-relaxed">
                            <span className="flex-shrink-0 mt-0.5 flex items-center justify-center p-0.5 rounded-full bg-brand/10 text-brand border border-brand/20">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span>{children}</span>
                          </li>
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lower Grid: 6 Highlight Features (Light Cards) */}
        {highlightFeatures && highlightFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
            {highlightFeatures.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-[#F3F4F6] dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-8 hover:shadow-md transition-all duration-300"
              >
                {/* Icon wrapper */}
                <div className="mb-4 text-brand flex items-center justify-start">
                  {getHighlightFeatureIcon(card.icon || "lock")}
                </div>

                {/* Title */}
                {isFilled.keyText(card.title) && (
                  <h4 className="text-xs sm:text-sm font-bold tracking-wider text-neutral-900 dark:text-white uppercase mb-3">
                    {card.title}
                  </h4>
                )}

                {/* Description */}
                {isFilled.richText(card.description) && (
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <PrismicRichText field={card.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
