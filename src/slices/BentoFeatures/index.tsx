import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@/prismicio";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";
import { BarChart3, Bell, Shield, MapPin, ArrowRight } from "lucide-react";

export type BentoFeaturesProps = {
  slice: Content.BentoFeaturesSlice;
};

const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case "bell":
      return <Bell className={className} />;
    case "shield":
      return <Shield className={className} />;
    case "map-pin":
      return <MapPin className={className} />;
    case "activity":
    default:
      return <BarChart3 className={className} />;
  }
};

export default function BentoFeatures({ slice }: BentoFeaturesProps) {
  const { primary } = slice;
  const features = primary.features || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#FAF8F5]/30 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with decorative horizontal line wings */}
        {isFilled.richText(primary.heading) && (
          <div className="flex items-center gap-4 md:gap-8 w-full mb-16">
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 flex-grow" />
            <ScrollAnimatedContainer type="slide" direction="up">
              <PrismicRichText
                field={primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <Heading className="italic font-serif font-medium text-3xl sm:text-4xl text-foreground text-center shrink-0 max-w-none">
                      {children}
                    </Heading>
                  ),
                }}
              />
            </ScrollAnimatedContainer>
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 flex-grow" />
          </div>
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const style = item.card_style || "wide-light";
            const isWide = style === "wide-light" || style === "wide-progress";

            // Card variant rendering
            return (
              <ScrollAnimatedContainer
                key={index}
                type="slide"
                direction="up"
                delay={index * 0.15}
                className={`${isWide ? "md:col-span-2" : "md:col-span-1"} flex`}
              >
                {style === "wide-light" && (
                  <div className="relative overflow-hidden w-full bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
                    {/* Top Section */}
                    <div>
                      {/* Tagline / Subtitle */}
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-semibold text-sm mb-4">
                        {getIcon(item.icon || "activity", "h-4 w-4")}
                        <span>{item.subtitle}</span>
                      </div>

                      {/* Title */}
                      {isFilled.keyText(item.title) && (
                        <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-4 max-w-md">
                          {item.title}
                        </h3>
                      )}

                      {/* Description */}
                      {isFilled.keyText(item.description) && (
                        <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-lg mb-8">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Section: Tags */}
                    {isFilled.keyText(item.tags) && (
                      <div className="flex flex-wrap gap-2.5 z-10">
                        {item.tags.split(",").map((tag, tIdx, arr) => {
                          const isLast = tIdx === arr.length - 1;
                          return (
                            <span
                              key={tIdx}
                              className={`text-xs px-4 py-2 rounded-full font-semibold ${
                                isLast
                                  ? "bg-brand/10 text-brand border border-brand/20"
                                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                              }`}
                            >
                              {tag.trim()}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Watermark Graphic */}
                    <svg
                      className="absolute bottom-0 right-0 h-48 w-48 text-neutral-900/[0.02] dark:text-white/[0.015] pointer-events-none translate-x-10 translate-y-10"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                    >
                      <rect x="20" y="55" width="14" height="35" rx="3" />
                      <rect x="43" y="35" width="14" height="55" rx="3" />
                      <rect x="66" y="15" width="14" height="75" rx="3" />
                    </svg>
                  </div>
                )}

                {style === "narrow-dark" && (
                  <div className="relative overflow-hidden w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between shadow-xs text-white">
                    {/* Top Section */}
                    <div>
                      {/* Tagline / Subtitle */}
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-4">
                        {getIcon(item.icon || "bell", "h-4 w-4")}
                        <span>{item.subtitle}</span>
                      </div>

                      {/* Title */}
                      {isFilled.keyText(item.title) && (
                        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white mb-4">
                          {item.title}
                        </h3>
                      )}

                      {/* Description */}
                      {isFilled.keyText(item.description) && (
                        <p className="text-sm text-neutral-400 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Watermark Graphic */}
                    <svg
                      className="absolute bottom-0 right-0 h-36 w-36 text-white/[0.015] pointer-events-none translate-x-8 translate-y-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                )}

                {style === "narrow-green" && (
                  <div className="relative overflow-hidden w-full bg-[#047857] dark:bg-emerald-900 border border-emerald-800 rounded-3xl p-8 flex flex-col justify-between shadow-xs text-white">
                    <div>
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
                        {getIcon(item.icon || "shield", "h-5 w-5")}
                      </div>

                      {/* Title */}
                      {isFilled.keyText(item.title) && (
                        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white mb-3">
                          {item.title}
                        </h3>
                      )}

                      {/* Description */}
                      {isFilled.keyText(item.description) && (
                        <p className="text-sm text-emerald-100/80 leading-relaxed mb-8">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Link */}
                    {isFilled.link(item.link) && (
                      <PrismicNextLink
                        field={item.link}
                        className="inline-flex items-center gap-2 text-sm text-white font-semibold hover:underline mt-auto"
                      >
                        <span>{item.link_text || "Learn more"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </PrismicNextLink>
                    )}
                  </div>
                )}

                {style === "wide-progress" && (
                  <div className="relative overflow-hidden w-full bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
                    <div>
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/60 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mb-6">
                        {getIcon(item.icon || "map-pin", "h-5 w-5")}
                      </div>

                      {/* Title */}
                      {isFilled.keyText(item.title) && (
                        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground mb-3">
                          {item.title}
                        </h3>
                      )}

                      {/* Description */}
                      {isFilled.keyText(item.description) && (
                        <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-xl mb-8">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Tracking Progress Bar */}
                    <div className="flex items-center gap-6 w-full mt-auto pt-4">
                      <div className="h-2 bg-emerald-800 dark:bg-emerald-600 rounded-full flex-grow" />
                      <span className="text-emerald-800 dark:text-emerald-400 font-semibold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap shrink-0">
                        Live Protection
                      </span>
                    </div>
                  </div>
                )}
              </ScrollAnimatedContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
