import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import {
  Box,
  Zap,
  Cpu,
  Clock,
  Key,
  Shield,
  Smartphone,
  Lock,
  Activity,
  Share2,
} from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type FeaturesGridProps = {
  slice: Content.FeaturesGridSlice;
};

export default function FeaturesGrid({ slice }: FeaturesGridProps) {
  const { primary } = slice;
  const itemsList = primary.items;

  // Icon resolver mapping
  const getFeatureIcon = (iconName: string) => {
    const iconClass = "h-5 w-5 text-neutral-600";
    switch (iconName) {
      case "box":
        return <Box className={iconClass} />;
      case "bolt":
        return <Zap className={iconClass} />;
      case "cpu":
        return <Cpu className={iconClass} />;
      case "clock":
        return <Clock className={iconClass} />;
      case "key":
        return <Key className={iconClass} />;
      case "shield":
        return <Shield className={iconClass} />;
      case "smartphone":
        return <Smartphone className={iconClass} />;
      case "lock":
        return <Lock className={iconClass} />;
      case "activity":
        return <Activity className={iconClass} />;
      case "share":
        return <Share2 className={iconClass} />;
      default:
        return <Shield className={iconClass} />;
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#F3F4F6] py-20 md:py-28 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Section - Animates first */}
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
            <div className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed">
              <PrismicRichText field={primary.description} />
            </div>
          )}
        </ScrollAnimatedContainer>

        {/* Features Grid - Animates items sequentially */}
        {itemsList && itemsList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full mt-16">
            {itemsList.map((item, index) => (
              <ScrollAnimatedContainer
                key={index}
                type="slide"
                direction="up"
                delay={index * 0.08}
                className="h-full flex"
              >
                <div className="flex flex-col items-start bg-card border border-border/70 rounded-2xl p-8 hover:shadow-md hover:border-border transition-all duration-300 w-full">
                  {/* Icon wrapper */}
                  <div className="p-3 bg-neutral-100 rounded-xl mb-6 flex items-center justify-center">
                    {getFeatureIcon(item.icon || "shield")}
                  </div>

                  {/* Title */}
                  {isFilled.keyText(item.title) && (
                    <h3 className="text-sm font-bold tracking-wider text-foreground uppercase mb-3">
                      {item.title}
                    </h3>
                  )}

                  {/* Description */}
                  {isFilled.richText(item.descriptioin) && (
                    <div className="text-sm text-muted-foreground/90 leading-relaxed">
                      <PrismicRichText field={item.descriptioin} />
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
