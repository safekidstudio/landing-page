import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { ScrollAnimatedContainer } from "@/components/animated";

export type BlogDepartmentsProps = {
  slice: Content.BlogDepartmentsSlice;
};

export default function BlogDepartments({ slice }: BlogDepartmentsProps) {
  const { primary } = slice;
  const departments = primary.departments || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#FAF8F5]/30 py-12 md:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/80 pb-4 mb-10">
          <span className="text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
            {primary.tagline || "THE STANDING SECTIONS"}
          </span>
          <span className="text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
            {primary.heading || "DEPARTMENTS"}
          </span>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map((item, index) => {
            const hasLink = isFilled.link(item.link);
            const Wrapper = hasLink ? PrismicNextLink : "div";

            return (
              <ScrollAnimatedContainer
                key={index}
                type="slide"
                direction="up"
                delay={index * 0.1}
                className="flex"
              >
                <Wrapper
                  field={hasLink ? item.link : undefined}
                  className={`w-full flex flex-col bg-[#EFEEEA] dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40 rounded-3xl p-6 md:p-8 justify-between hover:shadow-md transition-all duration-300 group ${
                    hasLink ? "cursor-pointer" : ""
                  }`}
                >
                  <div>
                    {/* Prefix Number */}
                    {isFilled.keyText(item.prefix) && (
                      <span className="block text-xs font-semibold text-brand/80 uppercase tracking-wider mb-2">
                        {item.prefix}
                      </span>
                    )}

                    {/* Department Name */}
                    {isFilled.keyText(item.name) && (
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-brand transition-colors duration-200 mb-3 font-serif">
                        {item.name}
                      </h3>
                    )}

                    {/* Description */}
                    {isFilled.keyText(item.description) && (
                      <p className="text-sm text-muted-foreground/80 leading-relaxed mb-8">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Article Count */}
                  {isFilled.keyText(item.article_count) && (
                    <span className="block text-[10px] sm:text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-auto select-none">
                      {item.article_count}
                    </span>
                  )}
                </Wrapper>
              </ScrollAnimatedContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
