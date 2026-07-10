import { type Content, isFilled, filter } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import {
  createClient,
  LOCALE_MAP,
  getBlogLink,
  PrismicNextLink,
} from "@/prismicio";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type BlogShowcaseProps = {
  slice: Content.BlogShowcaseSlice;
  context?: { locale?: string; excludeUid?: string };
};

export default async function BlogShowcase({
  slice,
  context,
}: BlogShowcaseProps) {
  const { primary } = slice;
  const locale = context?.locale || "en";
  const excludeUid = context?.excludeUid;

  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  // Query the latest 3 blog posts for the current locale
  // - On detail page: excludeUid filters out the current post server-side
  // - On CMS page: no filter, just latest 3
  const posts = await client
    .getByType("blog_post", {
      lang: prismicLocale,
      pageSize: 3,
      orderings: [
        {
          field: "document.first_publication_date",
          direction: "desc",
        },
      ],
      filters: excludeUid
        ? [filter.not("my.blog_post.uid", excludeUid)]
        : [],
    })
    .then((res) => res.results)
    .catch(() => []);

  // Format date helper based on current locale
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-background py-20 md:py-28 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Block with Alignment - Animates first */}
        <ScrollAnimatedContainer type="slide" direction="up" className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 w-full max-w-7xl mx-auto">
            <div className="text-left space-y-3">
              {isFilled.richText(primary.heading) && (
                <PrismicRichText
                  field={primary.heading}
                  components={{
                    heading2: ({ children }) => (
                      <Heading className="text-left max-w-none mb-0">
                        {children}
                      </Heading>
                    ),
                  }}
                />
              )}
              {isFilled.richText(primary.description) && (
                <div className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
                  <PrismicRichText field={primary.description} />
                </div>
              )}
            </div>
            {isFilled.keyText(primary.view_all.text) && (
              <PrismicNextLink
                field={primary.view_all}
                className="text-brand hover:underline font-bold text-sm inline-flex items-center gap-1.5 flex-shrink-0"
              >
                <span>{primary.view_all.text || "View All Posts"}</span>
                <span>&rarr;</span>
              </PrismicNextLink>
            )}
          </div>
        </ScrollAnimatedContainer>

        {/* Dynamic Blog Posts Grid - Animated sequentially */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
            {posts.map((post, index) => {
              const dateStr = post.first_publication_date;
              const title = post.data.meta_title;
              const description = post.data.meta_description;
              const thumbnail =
                (post.data as any).featured_image || post.data.meta_image;
              const detailLink = getBlogLink(locale, post.uid);

              return (
                <ScrollAnimatedContainer
                  key={post.id}
                  type="slide"
                  direction="up"
                  delay={index * 0.1}
                  className="h-full flex"
                >
                  <div className="flex flex-col items-start group w-full">
                    {/* Thumbnail Image Container */}
                    <PrismicNextLink href={detailLink} className="w-full">
                      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden mb-6 bg-muted border border-border/40">
                        {isFilled.image(thumbnail) ? (
                          <PrismicNextImage
                            field={thumbnail}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="transition-transform duration-300 group-hover:scale-105 object-cover"
                          />
                        ) : (
                          <img
                            src="/images/thumbnail.jpg"
                            alt="Blog Thumbnail Fallback"
                            className="transition-transform duration-300 group-hover:scale-105 object-cover w-full h-full"
                          />
                        )}
                      </div>
                    </PrismicNextLink>

                    {/* Date */}
                    {dateStr && (
                      <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-muted-foreground/80 uppercase mb-3">
                        {formatDate(dateStr)}
                      </span>
                    )}

                    {/* Title */}
                    {title && (
                      <PrismicNextLink href={detailLink} className="w-full">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-brand transition-colors duration-200 line-clamp-2 mb-3 leading-tight font-serif">
                          {title}
                        </h3>
                      </PrismicNextLink>
                    )}

                    {/* Excerpt */}
                    {description && (
                      <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-3 mb-6">
                        {description}
                      </p>
                    )}

                    {/* Read Article Action */}
                    <PrismicNextLink
                      href={detailLink}
                      className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1 mt-auto"
                    >
                      <span>
                        {locale === "vi" ? "Đọc bài viết" : "Read Article"}
                      </span>
                      <span>&rarr;</span>
                    </PrismicNextLink>
                  </div>
                </ScrollAnimatedContainer>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground/80">
            {locale === "vi"
              ? "Không tìm thấy bài viết nào."
              : "No posts found."}
          </div>
        )}
      </div>
    </section>
  );
}
