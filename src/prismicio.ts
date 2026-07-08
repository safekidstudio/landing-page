import {
  createClient as baseCreateClient,
  type ClientConfig,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import prismicConfig from "../prismic.config.json";

/**
 * Maps next-intl locales to Prismic locales.
 */
export const LOCALE_MAP: Record<string, string> = {
  en: "en-us",
  vi: "vi-vn",
};

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismicConfig.repositoryName;

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes: prismicConfig.routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};

/**
 * Helper to generate dynamic blog post URLs.
 */
export function getBlogLink(locale: string, uid: string) {
  return `/${locale}/blog/${uid}`;
}
