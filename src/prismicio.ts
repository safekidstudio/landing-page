import {
  createClient as baseCreateClient,
  type ClientConfig,
  type LinkResolverFunction,
} from "@prismicio/client";
import {
  enableAutoPreviews,
  PrismicNextLink as BasePrismicNextLink,
  type PrismicNextLinkProps,
} from "@prismicio/next";
import React from "react";
import prismicConfig from "../prismic.config.json";

/**
 * Maps next-intl locales to Prismic locales.
 */
export const LOCALE_MAP: Record<string, string> = {
  en: "en-us",
  vi: "vi-vn",
};

/**
 * Custom Link Resolver to resolve Prismic documents to short locale URLs.
 */
export const linkResolver: LinkResolverFunction = (doc) => {
  const langCode = doc.lang ? doc.lang.split("-")[0] : "en";

  if (doc.type === "home_page") {
    return `/${langCode}`;
  }
  if (doc.type === "blog_page") {
    return `/${langCode}/blog`;
  }
  if (doc.type === "blog_post") {
    return `/${langCode}/blog/${doc.uid}`;
  }
  if (doc.type === "page") {
    return `/${langCode}/${doc.uid}`;
  }
  return "/";
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

/**
 * Custom PrismicNextLink that automatically applies the custom linkResolver.
 */
export function PrismicNextLink(props: PrismicNextLinkProps) {
  return React.createElement(BasePrismicNextLink, {
    linkResolver,
    ...props,
  });
}
