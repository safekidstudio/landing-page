import { SliceZone } from "@prismicio/react";
import { createClient, LOCALE_MAP } from "@/prismicio";
import { components } from "@/slices";
import Hero from "@/slices/Hero";
import BlogShowcase from "@/slices/BlogShowcase";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { defaultMetadata } from "@/config/metadata";

type Props = {
  params: Promise<{ locale: string; uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, uid } = await params;
  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  try {
    const page = await client.getByUID("blog_post", uid, {
      lang: prismicLocale,
    });

    return {
      title: page.data.meta_title || defaultMetadata.title,
      description: page.data.meta_description || defaultMetadata.description,
      openGraph: {
        images: page.data.meta_image?.url
          ? [{ url: page.data.meta_image.url }]
          : defaultMetadata.openGraph?.images,
      },
      twitter: {
        card: "summary_large_image",
        images: page.data.meta_image?.url
          ? [page.data.meta_image.url]
          : defaultMetadata.twitter?.images,
      },
    };
  } catch (error) {
    return defaultMetadata;
  }
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { locale, uid } = await params;
  setRequestLocale(locale);

  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  try {
    const page = await client.getByUID("blog_post", uid, {
      lang: prismicLocale,
    });

    const mockHeroSlice: any = {
      id: "auto-blog-hero",
      slice_type: "hero",
      variation: "post",
      primary: { breadcrumbs: [] },
    };

    const mockShowcaseSlice: any = {
      id: "auto-blog-showcase",
      slice_type: "blog_showcase",
      variation: "default",
      primary: {
        heading: [
          {
            type: "heading2",
            text: locale === "vi" ? "Bài viết mới nhất" : "Recently Article",
            spans: [],
          },
        ],
        description: [],
        view_all: {
          link_type: "Web",
          url: `/${locale}/blog`,
          text: locale === "vi" ? "Xem tất cả" : "View All",
        },
      },
    };

    return (
      <article className="min-h-screen bg-background">
        <Hero slice={mockHeroSlice} context={{ post: page, locale }} />
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{ post: page, locale }}
        />
        <BlogShowcase
          slice={mockShowcaseSlice}
          context={{ locale, excludeUid: uid }}
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
