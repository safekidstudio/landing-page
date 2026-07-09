import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@/prismicio";
import { Pencil, FileText, User, Globe, Quote } from "lucide-react";
import { ScrollAnimatedContainer } from "@/components/animated";

export type TestimonialsProps = {
  slice: Content.TestimonialsSlice;
};

export default function Testimonials({ slice }: TestimonialsProps) {
  const { primary } = slice;
  const reviewsList = primary.reviews;

  // Icon resolver mapping for reviews cards
  const getAuthorIcon = (iconName: string) => {
    const iconClass = "h-4 w-4 text-neutral-500";
    switch (iconName) {
      case "pencil":
        return <Pencil className={iconClass} />;
      case "file-text":
        return <FileText className={iconClass} />;
      case "user":
        return <User className={iconClass} />;
      case "globe":
        return <Globe className={iconClass} />;
      case "quote":
        return <Quote className={iconClass} />;
      default:
        return <User className={iconClass} />;
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#F3F4F6] py-20 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Block - Animates first */}
        <ScrollAnimatedContainer
          type="slide"
          direction="up"
          className="w-full flex flex-col items-center"
        >
          {/* Badge Text */}
          {isFilled.keyText(primary.badge_text) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand/5 text-brand border border-brand/20 mb-6">
              {primary.badge_text}
            </span>
          )}

          {/* Heading */}
          {isFilled.richText(primary.heading) && (
            <PrismicRichText
              field={primary.heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-foreground text-center max-w-3xl leading-tight mb-12">
                    {children}
                  </h2>
                ),
              }}
            />
          )}
        </ScrollAnimatedContainer>

        {/* Numeric Stats Row - Animates second */}
        {primary.stats_list && primary.stats_list.length > 0 && (
          <ScrollAnimatedContainer
            type="fade"
            duration={0.6}
            delay={0.15}
            className="w-full"
          >
            <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 mb-16 text-center">
              {primary.stats_list.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {isFilled.keyText(stat.number) && (
                    <span className="text-3xl sm:text-4xl font-bold text-brand tracking-tight">
                      {stat.number}
                    </span>
                  )}
                  {isFilled.keyText(stat.label) && (
                    <span className="text-[10px] sm:text-xs font-medium tracking-widest text-muted-foreground/80 mt-1 uppercase">
                      {stat.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollAnimatedContainer>
        )}

        {/* Testimonials Cards Grid - Animated sequentially */}
        {reviewsList && reviewsList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {reviewsList.map((item, index) => (
              <ScrollAnimatedContainer
                key={index}
                type="slide"
                direction="up"
                delay={index * 0.08}
                className="h-full flex"
              >
                <div className="flex flex-col bg-card border border-border/70 rounded-2xl p-6 justify-between hover:shadow-lg transition-all duration-300 w-full">
                  <div>
                    {/* Card Header (Icon and Username) */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center justify-center">
                        {getAuthorIcon(item.icon || "user")}
                      </div>
                      {isFilled.keyText(item.author) && (
                        <span className="font-bold text-foreground">
                          {item.author}
                        </span>
                      )}
                    </div>

                    {/* Quote Text */}
                    {isFilled.richText(item.quote) && (
                      <div className="text-muted-foreground/90 leading-relaxed italic mb-6">
                        <PrismicRichText field={item.quote} />
                      </div>
                    )}
                  </div>

                  {/* Read More Link */}
                  {isFilled.keyText(item.link.text) && (
                    <PrismicNextLink
                      field={item.link}
                      className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1 mt-auto"
                    >
                      <span>{item.link.text || "Read more"}</span>
                      <span>&rarr;</span>
                    </PrismicNextLink>
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
