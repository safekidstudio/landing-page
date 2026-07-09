import { SliceZone } from "@prismicio/react";
import { createClient, LOCALE_MAP } from "@/prismicio";
import { components } from "@/slices";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { defaultMetadata } from "@/config/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  try {
    const page = await client.getSingle("home_page", {
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  try {
    const page = await client.getSingle("home_page", {
      lang: prismicLocale,
    });
    return <SliceZone slices={page.data.slices} components={components} context={{ locale }} />;
  } catch (error) {
    notFound();
  }
}
