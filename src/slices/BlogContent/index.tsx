import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type BlogContentProps = {
  slice: Content.BlogContentSlice;
  context?: {
    post?: any;
    locale?: string;
  };
};

export default function BlogContent({ slice, context }: BlogContentProps) {
  const { primary } = slice;
  const post = context?.post;
  const locale = context?.locale || "en";

  // Format date helper
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

  // Resolve values from post metadata
  const authorName = post?.data?.author_name || "Kibal Official";
  const authorAvatar = post?.data?.author_avatar;
  const dateStr = post?.first_publication_date
    ? formatDate(post.first_publication_date)
    : "";
  const category = post?.data?.category || "";
  const readTime = post?.data?.read_time || "";
  const coverImage = post?.data?.featured_image || post?.data?.meta_image;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#FAF8F5]/30 pb-16 overflow-hidden text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Render author and cover image only if context post is present */}
        {post && (
          <ScrollAnimatedContainer
            type="slide"
            direction="up"
            className="w-full"
          >
            {/* Author Row */}
            <div className="flex items-center gap-4 py-6 border-y border-neutral-200/60 dark:border-neutral-800/60 w-full mb-10 select-none text-left">
              {/* Padded circular avatar */}
              {isFilled.image(authorAvatar) ? (
                <div className="relative w-12 h-12 rounded-full border border-emerald-600 dark:border-emerald-500 p-[3px] shrink-0 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <PrismicNextImage
                      field={authorAvatar}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-12 h-12 rounded-full border border-emerald-600 dark:border-emerald-500 p-[3px] shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-bold">
                    K
                  </div>
                </div>
              )}

              {/* Text stack */}
              <div className="flex flex-col gap-1 justify-center">
                <span className="text-sm sm:text-base font-serif font-bold text-foreground leading-tight">
                  {authorName}
                </span>

                <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider leading-none">
                  {dateStr && <span>{dateStr}</span>}
                  {dateStr && readTime && (
                    <span className="text-neutral-300 dark:text-neutral-700">
                      ·
                    </span>
                  )}
                  {readTime && <span>{readTime}</span>}
                  {readTime && category && (
                    <span className="text-neutral-300 dark:text-neutral-700">
                      ·
                    </span>
                  )}
                  {category && (
                    <span className="text-brand font-bold">{category}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Image Cover */}
            {isFilled.image(coverImage) && (
              <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm mb-12">
                <PrismicNextImage
                  field={coverImage}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}
          </ScrollAnimatedContainer>
        )}

        {/* Post Body Content */}
        {isFilled.richText(primary.content) && (
          <div className="prose prose-neutral dark:prose-invert max-w-none w-full">
            <PrismicRichText
              field={primary.content}
              components={{
                heading2: ({ children }) => (
                  <ScrollAnimatedContainer
                    type="slide"
                    direction="up"
                    margin="0px 0px -30px 0px"
                    className="w-full"
                  >
                    <Heading
                      as="h2"
                      className="text-left tracking-tight leading-snug max-w-none"
                    >
                      {children}
                    </Heading>
                  </ScrollAnimatedContainer>
                ),
                heading3: ({ children }) => (
                  <ScrollAnimatedContainer
                    type="slide"
                    direction="up"
                    margin="0px 0px -30px 0px"
                    className="w-full"
                  >
                    <Heading
                      as="h3"
                      className="text-left font-serif font-semibold text-foreground mt-8 mb-3 tracking-tight leading-snug uppercase text-lg sm:text-xl border-none max-w-none"
                    >
                      {children}
                    </Heading>
                  </ScrollAnimatedContainer>
                ),
                paragraph: ({ children }) => (
                  <ScrollAnimatedContainer
                    type="slide"
                    direction="up"
                    margin="0px 0px -20px 0px"
                    className="w-full"
                  >
                    <p className="text-sm sm:text-base md:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
                      {children}
                    </p>
                  </ScrollAnimatedContainer>
                ),
                list: ({ children }) => (
                  <ScrollAnimatedContainer
                    type="slide"
                    direction="up"
                    margin="0px 0px -20px 0px"
                    className="w-full"
                  >
                    <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base pl-2">
                      {children}
                    </ul>
                  </ScrollAnimatedContainer>
                ),
                oList: ({ children }) => (
                  <ScrollAnimatedContainer
                    type="slide"
                    direction="up"
                    margin="0px 0px -20px 0px"
                    className="w-full"
                  >
                    <ol className="list-decimal list-inside space-y-2 mb-6 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base pl-2">
                      {children}
                    </ol>
                  </ScrollAnimatedContainer>
                ),
                listItem: ({ children }) => (
                  <li className="pl-1 leading-relaxed">{children}</li>
                ),
                oListItem: ({ children }) => (
                  <li className="pl-1 leading-relaxed">{children}</li>
                ),
                hyperlink: ({ children, node }) => {
                  const linkData = node.data as any;
                  return (
                    <a
                      href={linkData.url}
                      target={linkData.target}
                      rel="noopener noreferrer"
                      className="text-brand hover:underline font-medium transition-colors"
                    >
                      {children}
                    </a>
                  );
                },
                em: ({ children }) => <em className="italic">{children}</em>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                image: ({ node }) => (
                  <ScrollAnimatedContainer
                    type="slide"
                    direction="up"
                    margin="0px 0px -30px 0px"
                    className="w-full"
                  >
                    <figure className="my-8">
                      <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs">
                        <img
                          src={node.url}
                          alt={node.alt || ""}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {node.alt && (
                        <figcaption className="text-xs text-center text-muted-foreground/60 mt-3 font-medium tracking-wide">
                          {node.alt}
                        </figcaption>
                      )}
                    </figure>
                  </ScrollAnimatedContainer>
                ),
                embed: ({ node }) => {
                  const embedHtml = (node as any).oembed?.html;
                  if (!embedHtml) return null;
                  return (
                    <ScrollAnimatedContainer
                      type="slide"
                      direction="up"
                      margin="0px 0px -30px 0px"
                      className="w-full"
                    >
                      <div
                        className="my-8 aspect-video rounded-3xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 bg-muted [&_iframe]:w-full [&_iframe]:h-full shadow-xs"
                        dangerouslySetInnerHTML={{ __html: embedHtml }}
                      />
                    </ScrollAnimatedContainer>
                  );
                },
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
