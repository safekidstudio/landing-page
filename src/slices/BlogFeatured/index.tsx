import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { createClient, LOCALE_MAP, getBlogLink } from "@/prismicio";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";
import { ArrowRight } from "lucide-react";

export type BlogFeaturedProps = {
  slice: Content.BlogFeaturedSlice;
  context?: { locale?: string };
};

export default async function BlogFeatured({
  slice,
  context,
}: BlogFeaturedProps) {
  const { primary } = slice;
  const locale = context?.locale || "en";

  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Resolve document IDs from links
  const mainId = isFilled.link(primary.main_post)
    ? (primary.main_post as any).id
    : null;
  const side1Id = isFilled.link(primary.side_post_1)
    ? (primary.side_post_1 as any).id
    : null;
  const side2Id = isFilled.link(primary.side_post_2)
    ? (primary.side_post_2 as any).id
    : null;

  const ids = [mainId, side1Id, side2Id].filter(Boolean) as string[];

  let resolvedPosts: any[] = [];
  if (ids.length > 0) {
    const response = await client
      .getByIDs(ids, { lang: prismicLocale })
      .catch(() => null);
    if (response) {
      resolvedPosts = response.results;
    }
  }

  // Fallback: Query the latest 3 posts if no posts are linked
  if (resolvedPosts.length === 0) {
    const fallbackResponse = await client
      .getAllByType("blog_post", {
        lang: prismicLocale,
        limit: 3,
        orderings: [
          {
            field: "document.first_publication_date",
            direction: "desc",
          },
        ],
      })
      .catch(() => []);
    resolvedPosts = fallbackResponse;
  }

  // Map resolved posts back to their positions
  const mainPost = mainId
    ? resolvedPosts.find((p) => p.id === mainId)
    : resolvedPosts[0];
  const sidePost1 = side1Id
    ? resolvedPosts.find((p) => p.id === side1Id)
    : mainId
      ? resolvedPosts[0]
      : resolvedPosts[1];
  const sidePost2 = side2Id
    ? resolvedPosts.find((p) => p.id === side2Id)
    : mainId
      ? resolvedPosts[1]
      : resolvedPosts[2];

  // Render main post variables
  const mainLink = mainPost ? getBlogLink(locale, mainPost.uid) : "#";
  const mainTitle = mainPost?.data?.meta_title || "Untitled Dispatch";
  const mainDescription = mainPost?.data?.meta_description || "";
  const mainThumbnail =
    mainPost?.data?.featured_image || mainPost?.data?.meta_image;
  const mainDate = mainPost?.first_publication_date
    ? formatDate(mainPost.first_publication_date)
    : "";
  const mainCategory = mainPost?.data?.category || "";
  const mainReadTime = mainPost?.data?.read_time || "";
  const mainNumber = mainPost?.data?.post_number || "";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-8 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/80 pb-4 mb-10">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-600 dark:text-red-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400 animate-pulse" />
            {primary.tagline || "THE COVER STORY"}
          </span>
          <span className="text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
            {primary.featured_label || "FEATURED"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Main Column (2/3 width) */}
          {mainPost && (
            <ScrollAnimatedContainer
              type="slide"
              direction="up"
              margin="0px 0px 0px 0px"
              className="flex flex-col items-start w-full"
            >
              {/* Image Banner */}
              <PrismicNextLink
                href={mainLink}
                className="group block w-full mb-6"
              >
                <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden bg-muted border border-neutral-200/60 dark:border-neutral-800/60">
                  {isFilled.image(mainThumbnail) ? (
                    <PrismicNextImage
                      field={mainThumbnail}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground/30 text-xs">
                      No Image Banner
                    </div>
                  )}
                </div>
              </PrismicNextLink>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold tracking-wide text-neutral-500 mb-3">
                {mainNumber && (
                  <span className="text-foreground font-bold">{`N°${mainNumber}`}</span>
                )}
                {mainCategory && (
                  <>
                    <span className="text-neutral-300 dark:text-neutral-700">
                      •
                    </span>
                    <span className="text-brand uppercase">{mainCategory}</span>
                  </>
                )}
                {(mainDate || mainReadTime) && (
                  <>
                    <span className="text-neutral-300 dark:text-neutral-700">
                      •
                    </span>
                    <span>
                      {mainDate}
                      {mainDate && mainReadTime ? " • " : ""}
                      {mainReadTime}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <PrismicNextLink
                href={mainLink}
                className="hover:text-brand transition-colors duration-200"
              >
                <Heading
                  as="h3"
                  className="text-left text-2xl sm:text-3.5xl lg:text-4xl font-serif font-medium tracking-tight mb-4 max-w-2xl leading-tight"
                >
                  {mainTitle}
                </Heading>
              </PrismicNextLink>

              {/* Excerpt */}
              {mainDescription && (
                <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-xl mb-6">
                  {mainDescription}
                </p>
              )}

              {/* Read Link */}
              <PrismicNextLink
                href={mainLink}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-brand transition-colors uppercase border-b border-foreground hover:border-brand pb-0.5 mt-auto"
              >
                <span>
                  {locale === "vi" ? "Đọc chi tiết" : "Read the dispatch"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </PrismicNextLink>
            </ScrollAnimatedContainer>
          )}

          {/* Side Column (1/3 width) */}
          <div className="flex flex-col gap-10 border-t border-neutral-200/60 dark:border-neutral-800/60 pt-10 lg:border-t-0 lg:pt-0">
            {[sidePost1, sidePost2].map((post, idx) => {
              if (!post) return null;

              const link = getBlogLink(locale, post.uid);
              const title = post.data?.meta_title || "Untitled Dispatch";
              const thumbnail =
                post.data?.featured_image || post.data?.meta_image;
              const date = post.first_publication_date
                ? formatDate(post.first_publication_date)
                : "";
              const category = post.data?.category || "";
              const readTime = post.data?.read_time || "";
              const number = post.data?.post_number || "";

              return (
                <ScrollAnimatedContainer
                  key={post.id}
                  type="slide"
                  direction="up"
                  delay={(idx + 1) * 0.15}
                  className="flex flex-col items-start w-full"
                >
                  {/* Thumbnail */}
                  <PrismicNextLink
                    href={link}
                    className="group block w-full mb-4"
                  >
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted border border-neutral-200/60 dark:border-neutral-800/60">
                      {isFilled.image(thumbnail) ? (
                        <PrismicNextImage
                          field={thumbnail}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground/30 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                  </PrismicNextLink>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wide text-neutral-500 mb-2">
                    {number && (
                      <span className="text-foreground font-bold">{`N°${number}`}</span>
                    )}
                    {category && (
                      <>
                        <span className="text-neutral-300 dark:text-neutral-700">
                          •
                        </span>
                        <span className="text-brand uppercase">{category}</span>
                      </>
                    )}
                    {(date || readTime) && (
                      <>
                        <span className="text-neutral-300 dark:text-neutral-700">
                          •
                        </span>
                        <span>
                          {date}
                          {date && readTime ? " • " : ""}
                          {readTime}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <PrismicNextLink
                    href={link}
                    className="hover:text-brand transition-colors duration-200"
                  >
                    <h4 className="text-lg sm:text-xl font-serif font-medium text-foreground line-clamp-2 leading-tight mb-2">
                      {title}
                    </h4>
                  </PrismicNextLink>

                  {/* Read Time footer */}
                  {readTime && (
                    <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 capitalize">
                      {readTime.toLowerCase()}
                    </span>
                  )}
                </ScrollAnimatedContainer>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
