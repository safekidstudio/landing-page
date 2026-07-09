import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import {
  CheckCircle,
  Clock,
  Lock,
  MapPin,
  MessageSquare,
  Shield,
  Smartphone
} from "lucide-react";
import { MediaEmbed } from "./MediaEmbed";

export type HeroProps = {
  slice: Content.HeroSlice;
};

export default function Hero({ slice }: HeroProps) {
  const { primary, items } = slice;

  // Icon resolver for key benefits row
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <Shield className="h-4.5 w-4.5 text-brand" />;
      case "phone":
        return <Smartphone className="h-4.5 w-4.5 text-brand" />;
      case "lock":
        return <Lock className="h-4.5 w-4.5 text-brand" />;
      case "clock":
        return <Clock className="h-4.5 w-4.5 text-brand" />;
      case "map-pin":
        return <MapPin className="h-4.5 w-4.5 text-brand" />;
      case "check":
      default:
        return <CheckCircle className="h-4.5 w-4.5 text-brand" />;
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#FAF8F5] overflow-hidden text-center px-4 md:px-6">
      {/* Subtle background warm radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-emerald-50/40 to-transparent rounded-full blur-3xl -z-10" />

      <div className="mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        {isFilled.keyText(primary.badge_text) && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider mb-6">
            <CheckCircle className="h-3.5 w-3.5 fill-brand text-brand/10" />
            {primary.badge_text ? (
              <span>
                {primary.badge_text}
              </span>
            ) : (
              <span>{primary.badge_text}</span>
            )}
          </div>
        )}

        {/* Heading */}
        <PrismicRichText
          field={primary.heading}
          components={{
            heading1: ({ children }) => (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#1F2937] leading-[1.12]">
                {children}
              </h1>
            ),
          }}
        />

        {/* Subheading / Description */}
        <PrismicRichText
          field={primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mt-5 leading-relaxed">
                {children}
              </p>
            ),
          }}
        />

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
          {/* Primary Button */}
          {isFilled.keyText(primary.primary_button.text) &&
            (
              <PrismicNextLink
                field={primary.primary_button}
                className={cn(buttonVariants({ variant: "brand" }), "rounded-full px-8 py-3.5 h-auto text-base font-medium")}
              >
                {primary.primary_button.text}
              </PrismicNextLink>
            )}

          {/* Secondary Button */}
          {isFilled.keyText(primary.secondary_button.text) &&
            (
              <PrismicNextLink
                field={primary.secondary_button}
                className={cn(buttonVariants({
                  variant: 'secondary',
                  size: 'lg',
                }), "")}
              >
                {primary.secondary_button.text}
              </PrismicNextLink>
            )}

          {/* Tertiary Button */}
          {isFilled.keyText(primary.tertiary_button.text) &&
            (
              <PrismicNextLink
                field={primary.tertiary_button}
                className="inline-flex items-center gap-2 text-[#374151] hover:text-brand font-semibold px-4 py-3.5 transition-colors duration-200"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                {primary.tertiary_button.text}
              </PrismicNextLink>
            )}
        </div>

        {/* Key Benefits row */}
        {items && items.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-12 text-xs md:text-sm font-semibold tracking-wider text-muted-foreground/80 uppercase">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-lg border border-[#F3F4F6]"
              >
                {getBenefitIcon(item.feature_icon || "shield")}
                <span>{item.feature_text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Media Asset Showcase Container with Glow */}
        {isFilled.embed(primary.media) && (
          <div className="relative w-full max-w-5xl mt-16 group">
            {/* Green glowing backdrops */}
            <div className="absolute inset-0 bg-brand/25 blur-3xl -z-10 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />

            {/* Main Mockup Frame */}
            <MediaEmbed media={primary.media} />

            {/* Media Caption */}
            {isFilled.keyText(primary.media_caption) && (
              <p className="text-xs md:text-sm text-center text-muted-foreground/60 mt-4 font-medium tracking-wide">
                {primary.media_caption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
