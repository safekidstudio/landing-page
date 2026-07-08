import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import {
  CheckCircle,
  Clock,
  Lock,
  MapPin,
  MessageSquare,
  Play,
  Shield,
  Smartphone
} from "lucide-react";

export type HeroProps = {
  slice: Content.HeroSlice;
};

export default function Hero({ slice }: HeroProps) {
  const { primary, items } = slice;

  // Icon resolver for key benefits row
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <Shield className="h-4.5 w-4.5 text-[#006B3F]" />;
      case "phone":
        return <Smartphone className="h-4.5 w-4.5 text-[#006B3F]" />;
      case "lock":
        return <Lock className="h-4.5 w-4.5 text-[#006B3F]" />;
      case "clock":
        return <Clock className="h-4.5 w-4.5 text-[#006B3F]" />;
      case "map-pin":
        return <MapPin className="h-4.5 w-4.5 text-[#006B3F]" />;
      case "check":
      default:
        return <CheckCircle className="h-4.5 w-4.5 text-[#006B3F]" />;
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#FAF8F5] overflow-hidden text-center px-4 md:px-6">
      {/* Subtle background warm radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-emerald-50/40 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        {isFilled.keyText(primary.badge_text) && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F5EE] border border-[#CDECE0] text-[#006B3F] text-xs font-semibold uppercase tracking-wider mb-6">
            <CheckCircle className="h-3.5 w-3.5 fill-[#006B3F] text-[#E6F5EE]" />
            {primary.badge_link && isFilled.link(primary.badge_link) ? (
              <PrismicNextLink
                field={primary.badge_link}
                className="hover:underline"
              >
                {primary.badge_text}
              </PrismicNextLink>
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#1F2937] max-w-4xl leading-[1.12]">
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
          {isFilled.keyText(primary.primary_button_label) &&
            isFilled.link(primary.primary_button_link) && (
              <PrismicNextLink
                field={primary.primary_button_link}
                className="inline-flex items-center justify-center bg-[#006B3F] hover:bg-[#005732] text-white px-8 py-3.5 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {primary.primary_button_label}
              </PrismicNextLink>
            )}

          {/* Secondary Button */}
          {isFilled.keyText(primary.secondary_button_label) &&
            isFilled.link(primary.secondary_button_link) && (
              <PrismicNextLink
                field={primary.secondary_button_link}
                className="inline-flex items-center justify-center bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#374151] px-8 py-3.5 rounded-full font-medium transition-all duration-200 shadow-sm"
              >
                {primary.secondary_button_label}
              </PrismicNextLink>
            )}

          {/* Tertiary Button */}
          {isFilled.keyText(primary.tertiary_button_label) &&
            isFilled.link(primary.tertiary_button_link) && (
              <PrismicNextLink
                field={primary.tertiary_button_link}
                className="inline-flex items-center gap-2 text-[#374151] hover:text-[#006B3F] font-semibold px-4 py-3.5 transition-colors duration-200"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                {primary.tertiary_button_label}
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
        {isFilled.image(primary.media_image) && (
          <div className="relative w-full max-w-5xl mt-16 group">
            {/* Green glowing backdrops */}
            <div className="absolute inset-0 bg-[#10B981]/25 blur-3xl -z-10 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />

            {/* Main Mockup Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-[#F9FAFB] aspect-video">
              <PrismicNextImage
                field={primary.media_image}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all duration-300">
                {primary.video_link && isFilled.link(primary.video_link) ? (
                  <PrismicNextLink
                    field={primary.video_link}
                    className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg text-[#006B3F] hover:scale-110 transition-transform duration-200 transform scale-100"
                    aria-label="Play Demo Video"
                  >
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </PrismicNextLink>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg text-[#006B3F] group-hover:scale-110 transition-transform duration-200">
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </div>
                )}
              </div>
            </div>

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
