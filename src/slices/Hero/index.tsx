import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Content, isFilled } from "@prismicio/client";
import { createClient, LOCALE_MAP, PrismicNextLink } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import {
  CheckCircle,
  Clock,
  Lock,
  MapPin,
  MessageSquare,
  Shield,
  Smartphone,
  Home,
  ChevronRight,
} from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { MediaEmbed } from "./MediaEmbed";
import { AnimatedComponent } from "@/components/animated";

export type HeroProps = {
  slice: Content.HeroSlice;
  context?: { locale?: string };
};

export default async function Hero({ slice, context }: HeroProps) {
  if (slice.variation === "blog") {
    const locale = context?.locale || "en";
    const prismicLocale = LOCALE_MAP[locale] || "en-us";

    const client = createClient();
    const posts = await client
      .getAllByType("blog_post", { lang: prismicLocale })
      .catch(() => []);
    const postCount = posts.length;

    const dispatchLabel = locale === "vi" ? "Bài viết" : "Dispatches";
    const defaultMetaSuffix =
      locale === "vi" ? "Được tuyển chọn hàng tuần" : "Curated Weekly";

    const breadcrumbLabel = (slice.primary as any).breadcrumb_label;
    const metaSuffix = (slice.primary as any).meta_suffix;

    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="w-full bg-[#FAF8F5]/30 pt-24 pb-8 md:pt-32 border-b border-border/40 text-left animate-in fade-in duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedComponent
            type="slide"
            direction="up"
            className="w-full flex flex-col items-start"
          >
            {/* 1. Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-500 font-medium mb-8">
              <PrismicNextLink
                href="/"
                className="hover:text-foreground transition-colors flex items-center justify-center"
              >
                <Home className="h-4 w-4" />
              </PrismicNextLink>
              <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
              <span className="text-foreground font-semibold">
                {breadcrumbLabel || (locale === "vi" ? "Bài viết" : "Blogs")}
              </span>
            </div>

            {/* 2. Heading */}
            {isFilled.richText(slice.primary.heading) ? (
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  heading1: ({ children }) => (
                    <Heading
                      as="h1"
                      className="text-left text-4xl sm:text-5xl lg:text-[56px] text-foreground font-serif font-medium tracking-tight mb-5 leading-tight max-w-none"
                    >
                      {children}
                    </Heading>
                  ),
                }}
              />
            ) : (
              <Heading
                as="h1"
                className="text-left text-4xl sm:text-5xl lg:text-[56px] text-foreground font-serif font-medium tracking-tight mb-5 leading-tight max-w-none"
              >
                {locale === "vi" ? "Kibal Blogs" : "Kibal Blogs"}
              </Heading>
            )}

            {/* 3. Description */}
            {isFilled.richText(slice.primary.description) && (
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-3xl mb-12">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}

            {/* 4. Bottom Metadata Row */}
            <div className="w-full pt-6 border-t border-border/40 flex items-center text-xs sm:text-sm text-neutral-500 font-medium gap-1.5">
              <span>{postCount}</span>
              <span>{dispatchLabel}</span>
              <span className="mx-2 text-neutral-300">•</span>
              <span>{metaSuffix || defaultMetaSuffix}</span>
            </div>
          </AnimatedComponent>
        </div>
      </section>
    );
  }
  if (slice.variation === "simple") {
    const simplePrimary = slice.primary as any;

    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="w-full bg-[#FAF8F5]/30 pt-24 pb-12 md:pt-32 md:pb-16 text-left"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedComponent
            type="slide"
            direction="up"
            className="w-full flex flex-col items-start"
          >
            {/* 1. Badge Pill */}
            {isFilled.keyText(simplePrimary.badge_text) && (
              <span className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand mb-8">
                {simplePrimary.badge_text}
              </span>
            )}

            {/* 2. Heading */}
            {isFilled.richText(slice.primary.heading) && (
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  heading1: ({ children }) => (
                    <Heading
                      as="h1"
                      className="text-left text-4xl sm:text-5xl lg:text-[56px] text-foreground font-serif font-medium tracking-tight mb-6 leading-tight max-w-3xl"
                    >
                      {children}
                    </Heading>
                  ),
                }}
              />
            )}

            {/* 3. Description */}
            {isFilled.richText(slice.primary.description) && (
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-3xl">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
          </AnimatedComponent>
        </div>
      </section>
    );
  }

  const primary = slice.primary as any;
  const items = slice.items as any;
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
    <section className="relative w-full py-16 md:py-24 bg-[#FAF8F5] overflow-hidden text-center px-4 md:px-6 flex flex-col items-center">
      {/* Subtle background warm radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-linear-to-b from-emerald-50/40 to-transparent rounded-full blur-3xl -z-10" />

      {/* 1. Pill Badge - Fade In */}
      {isFilled.keyText(primary.badge_text) && (
        <AnimatedComponent
          type="fade"
          duration={0.5}
          delay={0.1}
          className="inline-flex justify-center"
        >
          <div
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6",
              (primary.badge_style as any) === "gray"
                ? "bg-zinc-100 border border-zinc-300 text-muted-foreground"
                : "bg-brand/10 border border-brand/20 text-brand",
            )}
          >
            {(primary.badge_style as any) !== "gray" && (
              <CheckCircle className="h-3.5 w-3.5 fill-brand text-brand/10" />
            )}
            <span>{primary.badge_text}</span>
          </div>
        </AnimatedComponent>
      )}

      {/* 2. Heading - Slide Up */}
      <AnimatedComponent
        type="slide"
        direction="up"
        duration={0.6}
        delay={0.2}
        className="w-full flex justify-center"
      >
        <div className="max-w-4xl">
          <PrismicRichText
            field={primary.heading}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as="h1"
                  className="text-4xl md:text-5xl lg:text-6xl text-[#1F2937] leading-[1.12] mb-0 max-w-4xl"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        </div>
      </AnimatedComponent>

      {/* 3. Subheading / Description - Slide Up */}
      <AnimatedComponent
        type="slide"
        direction="up"
        duration={0.6}
        delay={0.35}
        className="w-full flex justify-center mt-5"
      >
        <div className="max-w-2xl">
          <PrismicRichText
            field={primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      </AnimatedComponent>

      {/* 4. Action Buttons Row - Slide Up */}
      {(isFilled.keyText(primary.primary_button.text) ||
        isFilled.keyText(primary.secondary_button.text) ||
        isFilled.keyText(primary.tertiary_button.text)) && (
        <AnimatedComponent
          type="slide"
          direction="up"
          duration={0.6}
          delay={0.5}
          className="w-full flex justify-center mt-9"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Primary Button */}
            {isFilled.keyText(primary.primary_button.text) && (
              <PrismicNextLink
                field={primary.primary_button}
                className={cn(
                  buttonVariants({
                    variant: (primary.primary_button_variant as any) || "brand",
                  }),
                  "rounded-full px-8 py-3.5 h-auto text-base font-medium",
                )}
              >
                {primary.primary_button.text}
              </PrismicNextLink>
            )}

            {/* Secondary Button */}
            {isFilled.keyText(primary.secondary_button.text) && (
              <PrismicNextLink
                field={primary.secondary_button}
                className={cn(
                  buttonVariants({
                    variant:
                      (primary.secondary_button_variant as any) || "secondary",
                    size: "lg",
                  }),
                  "rounded-full px-8 py-3.5 h-auto text-base font-medium",
                )}
              >
                {primary.secondary_button.text}
              </PrismicNextLink>
            )}

            {/* Tertiary Button */}
            {isFilled.keyText(primary.tertiary_button.text) && (
              <PrismicNextLink
                field={primary.tertiary_button}
                className="inline-flex items-center gap-2 text-[#374151] hover:text-brand font-semibold px-4 py-3.5 transition-colors duration-200"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                {primary.tertiary_button.text}
              </PrismicNextLink>
            )}
          </div>
        </AnimatedComponent>
      )}

      {/* 5. Key Benefits row - Fade In */}
      {isFilled.group(primary.stats_list) && (
        <AnimatedComponent
          type="fade"
          duration={0.7}
          delay={0.65}
          className="w-full flex justify-center mt-12"
        >
          <div className="flex flex-wrap items-center justify-center border-y border-border gap-x-8 gap-y-4 text-xs md:text-[13px] font-medium tracking-wider text-muted-foreground/80 uppercase">
            {primary.stats_list.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2 px-3 py-4">
                {getBenefitIcon(item.icon || "shield")}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </AnimatedComponent>
      )}

      {/* 6. Media Asset Showcase Container - Zoom In */}
      {isFilled.embed(primary.media) && (
        <AnimatedComponent
          type="slide"
          direction="up"
          duration={0.8}
          delay={0.8}
          className="w-full flex justify-center mt-16"
        >
          <div className="relative w-full max-w-5xl group">
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
        </AnimatedComponent>
      )}
    </section>
  );
}
