import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@/prismicio";
import {
  CheckCircle2,
  Clock,
  Mail,
  Bell,
  Shield,
  Download,
  Smartphone,
} from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

// Simple Android robot SVG icon
function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
    </svg>
  );
}

const getFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "clock":
      return <Clock className="h-4 w-4" />;
    case "mail":
      return <Mail className="h-4 w-4" />;
    case "bell":
      return <Bell className="h-4 w-4" />;
    case "shield":
      return <Shield className="h-4 w-4" />;
    case "check-circle":
    default:
      return <CheckCircle2 className="h-4 w-4" />;
  }
};

export type PlatformDownloadProps = {
  slice: Content.PlatformDownloadSlice;
};

export default function PlatformDownload({ slice }: PlatformDownloadProps) {
  const { primary } = slice;
  const platforms = (primary as any).platform || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#F4F4F0] py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Description */}
          <ScrollAnimatedContainer
            type="slide"
            direction="up"
            className="flex flex-col items-start"
          >
            {isFilled.richText(primary.heading) && (
              <PrismicRichText
                field={primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <Heading className="text-left text-3xl sm:text-4xl font-serif font-medium italic tracking-tight mb-4 max-w-none">
                      {children}
                    </Heading>
                  ),
                }}
              />
            )}

            {isFilled.richText(primary.description) && (
              <div className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed max-w-sm">
                <PrismicRichText field={primary.description} />
              </div>
            )}
          </ScrollAnimatedContainer>

          {/* Right Column: Platform Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {platforms.map((item: any, index: number) => {
              const isDark = item.button_style === "dark";
              const isBrand = item.badge_style === "brand";

              return (
                <ScrollAnimatedContainer
                  key={index}
                  type="slide"
                  direction="up"
                  delay={index * 0.15}
                  className="flex"
                >
                  <div className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl p-6 md:p-8 w-full">
                    {/* Card Header: Icon + Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {item.platform_icon === "android" ? (
                          <AndroidIcon className="h-5 w-5" />
                        ) : (
                          <Smartphone className="h-5 w-5" />
                        )}
                      </div>
                      {isFilled.keyText(item.badge_text) && (
                        <span
                          className={`text-[10px] px-[10px] py-[5px] rounded-full sm:text-xs font-semibold uppercase tracking-wider ${isBrand
                            ? "text-brand bg-brand/10"
                            : "text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800"
                            }`}
                        >
                          {item.badge_text}
                        </span>
                      )}
                    </div>

                    {/* Card Title */}
                    {isFilled.keyText(item.title) && (
                      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                    )}

                    {/* Card Description */}
                    {isFilled.keyText(item.card_description) && (
                      <p className="text-sm lg:text-base text-muted-foreground/70 leading-relaxed mb-5">
                        {item.card_description}
                      </p>
                    )}

                    {/* Features */}
                    {isFilled.richText(item.features) && (
                      <div className="flex flex-col gap-2.5 mb-6">
                        <PrismicRichText
                          field={item.features}
                          components={{
                            list: ({ children }) => (
                              <ul className="flex flex-col gap-2.5">
                                {children}
                              </ul>
                            ),
                            listItem: ({ children }) => (
                              <li className="flex items-center gap-2.5 text-sm text-foreground/80">
                                <span className="text-brand shrink-0">
                                  {getFeatureIcon(
                                    item.feature_icon || "check-circle",
                                  )}
                                </span>
                                <span>{children}</span>
                              </li>
                            ),
                          }}
                        />
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="mt-auto">
                      {isFilled.keyText(item.button?.text) && (
                        <PrismicNextLink
                          field={item.button}
                          className={`w-full inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors duration-200 ${isDark
                            ? "bg-[#18181B] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
                            : "bg-transparent hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 text-foreground"
                            }`}
                        >
                          {isDark ? (
                            <Download className="h-4 w-4" />
                          ) : (
                            <Bell className="h-4 w-4" />
                          )}
                          <span>{item.button.text}</span>
                        </PrismicNextLink>
                      )}
                    </div>
                  </div>
                </ScrollAnimatedContainer>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
