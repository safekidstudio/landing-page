import { SliceZone } from "@prismicio/react";
import { createClient, LOCALE_MAP } from "@/prismicio";
import { components } from "@/slices";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; uid: string }>;
};

export default async function BlogPostDetailPage({ params }: Props) {
  const { locale, uid } = await params;
  setRequestLocale(locale);

  const client = createClient();
  const prismicLocale = LOCALE_MAP[locale] || "en-us";

  try {
    const page = await client.getByUID("blog_post", uid, {
      lang: prismicLocale,
    });
    return <SliceZone slices={page.data.slices} components={components} />;
  } catch (error) {
    notFound();
  }
}
