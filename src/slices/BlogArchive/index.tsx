import { type Content } from "@prismicio/client";
import { createClient, LOCALE_MAP } from "@/prismicio";
import BlogArchiveClient from "./BlogArchiveClient";

export type BlogArchiveProps = {
  slice: Content.BlogArchiveSlice;
  context?: { locale?: string };
};

export default async function BlogArchive({
  slice,
  context,
}: BlogArchiveProps) {
  const locale = context?.locale || "en";
  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  // Fetch all posts for this locale ordered by publication date descending
  const posts = await client
    .getAllByType("blog_post", {
      lang: prismicLocale,
      orderings: [
        {
          field: "document.first_publication_date",
          direction: "desc",
        },
      ],
    })
    .catch(() => []);

  return <BlogArchiveClient slice={slice} posts={posts} locale={locale} />;
}
