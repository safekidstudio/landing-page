"use client";

import { useState, useRef, useEffect } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { getBlogLink } from "@/prismicio";

export type BlogArchiveClientProps = {
  slice: Content.BlogArchiveSlice;
  posts: any[];
  locale: string;
};

export default function BlogArchiveClient({
  slice,
  posts,
  locale,
}: BlogArchiveClientProps) {
  const { primary } = slice;

  // State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Collect unique categories
  const categories = Array.from(
    new Set(posts.map((p) => p.data?.category).filter(Boolean) as string[]),
  );

  // Filter posts
  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.data?.category === selectedCategory)
    : posts;

  // Slice visible posts
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  // Handle category change
  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    setVisibleCount(3); // Reset visible count on filter
    setIsOpen(false);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#FAF8F5]/30 py-16 md:py-24 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6 mb-12">
          {/* Left Title details */}
          <div className="text-left space-y-2.5 max-w-xl">
            <span className="text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
              {primary.tagline || "THE ARCHIVE"}
            </span>
            {isFilled.richText(primary.heading) && (
              <PrismicRichText
                field={primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <Heading className="text-left max-w-none mb-0 text-3xl sm:text-4xl font-serif font-medium">
                      {children}
                    </Heading>
                  ),
                }}
              />
            )}
          </div>

          {/* Right Dropdown Filter */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>
                {selectedCategory
                  ? `${locale === "vi" ? "Chủ đề: " : "Topic: "}${selectedCategory}`
                  : locale === "vi"
                    ? "Lọc theo chủ đề"
                    : "Filter by Topic"}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 py-2 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => handleSelectCategory(null)}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors ${
                    selectedCategory === null
                      ? "bg-brand/10 text-brand font-semibold"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-foreground/80"
                  }`}
                >
                  {locale === "vi" ? "Tất cả chủ đề" : "All Topics"}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors uppercase ${
                      selectedCategory === cat
                        ? "bg-brand/10 text-brand font-semibold"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-foreground/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Posts List Row */}
        {visiblePosts.length > 0 ? (
          <div className="flex flex-col w-full">
            {visiblePosts.map((post, idx) => {
              const link = getBlogLink(locale, post.uid);
              const title = post.data?.meta_title || "Untitled Dispatch";
              const description = post.data?.meta_description || "";
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
                  delay={idx * 0.1}
                  className="border-b border-neutral-200/60 dark:border-neutral-800/60 py-10 last:border-b-0 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 w-full group"
                >
                  {/* Left Column: Number & Date */}
                  <div className="w-full md:w-36 shrink-0 flex md:flex-col items-baseline md:items-start gap-2.5 md:gap-1.5 text-left select-none">
                    {number && (
                      <span className="text-sm font-bold text-foreground tracking-wide font-serif">{`N°${number}`}</span>
                    )}
                    {date && (
                      <span className="text-[10px] sm:text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                        {date}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <PrismicNextLink
                    href={link}
                    className="shrink-0 w-full md:w-56"
                  >
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-muted border border-neutral-200/60 dark:border-neutral-800/60">
                      {isFilled.image(thumbnail) ? (
                        <PrismicNextImage
                          field={thumbnail}
                          fill
                          sizes="(max-width: 768px) 100vw, 224px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground/30 text-xs">
                          No Thumbnail
                        </div>
                      )}
                    </div>
                  </PrismicNextLink>

                  {/* Middle: Content detail */}
                  <div className="flex-grow flex flex-col items-start gap-2 text-left">
                    <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-semibold text-amber-700 dark:text-amber-500 uppercase tracking-wider">
                      {category && <span>{category}</span>}
                      {category && readTime && (
                        <span className="text-neutral-300 dark:text-neutral-700">
                          •
                        </span>
                      )}
                      {readTime && <span>{readTime}</span>}
                    </div>

                    <PrismicNextLink href={link}>
                      <Heading
                        as="h3"
                        className="text-lg sm:text-xl md:text-2xl font-serif font-medium text-foreground hover:text-brand transition-colors duration-200 leading-tight tracking-tight mb-0.5"
                      >
                        {title}
                      </Heading>
                    </PrismicNextLink>

                    {description && (
                      <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-2xl">
                        {description}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Arrow indicator */}
                  <PrismicNextLink
                    href={link}
                    className="shrink-0 self-start md:self-center ml-auto md:ml-0 text-neutral-400 dark:text-neutral-600 hover:text-brand transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <ArrowUpRight className="h-6 w-6" />
                  </PrismicNextLink>
                </ScrollAnimatedContainer>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground/80 border-t border-neutral-200/60 dark:border-neutral-800/60">
            {locale === "vi"
              ? "Không tìm thấy bài viết nào cho chủ đề này."
              : "No posts found for this topic."}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="bg-[#EFEEEA] hover:bg-[#E5E4E0] dark:bg-neutral-800 dark:hover:bg-neutral-750 text-foreground rounded-full px-8 py-3.5 text-sm font-semibold transition-colors duration-200 shadow-xs"
            >
              {locale === "vi" ? "Tải thêm bài viết" : "Load More Dispatches"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
