import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type PickContentRelationshipFieldData<
  TRelationship extends
    | prismic.CustomTypeModelFetchCustomTypeLevel1
    | prismic.CustomTypeModelFetchCustomTypeLevel2
    | prismic.CustomTypeModelFetchGroupLevel1
    | prismic.CustomTypeModelFetchGroupLevel2,
  TData extends Record<
    string,
    | prismic.AnyRegularField
    | prismic.GroupField
    | prismic.NestedGroupField
    | prismic.SliceZone
  >,
  TLang extends string,
> = { // Content relationship fields
  [TSubRelationship in Extract<
    TRelationship["fields"][number],
    prismic.CustomTypeModelFetchContentRelationshipLevel1
  > as TSubRelationship["id"]]: ContentRelationshipFieldWithData<
    TSubRelationship["customtypes"],
    TLang
  >;
} & { // Group
  [TGroup in Extract<
    TRelationship["fields"][number],
    | prismic.CustomTypeModelFetchGroupLevel1
    | prismic.CustomTypeModelFetchGroupLevel2
  > as TGroup["id"]]: TData[TGroup["id"]] extends prismic.GroupField<
    infer TGroupData
  >
    ? prismic.GroupField<
        PickContentRelationshipFieldData<TGroup, TGroupData, TLang>
      >
    : never;
} & { // Other fields
  [TFieldKey in Extract<
    TRelationship["fields"][number],
    string
  >]: TFieldKey extends keyof TData ? TData[TFieldKey] : never;
};

type ContentRelationshipFieldWithData<
  TCustomType extends
    | readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[]
    | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
  TLang extends string = string,
> = {
  [ID in Exclude<
    TCustomType[number],
    string
  >["id"]]: prismic.ContentRelationshipField<
    ID,
    TLang,
    PickContentRelationshipFieldData<
      Extract<TCustomType[number], { id: ID }>,
      Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
      TLang
    >
  >;
}[Exclude<TCustomType[number], string>["id"]];

interface AppSettingsDocumentData {}

/**
 * App Settings document from Prismic
 *
 * - **API ID**: `app_settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AppSettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<AppSettingsDocumentData>,
    "app_settings",
    Lang
  >;

type BlogPageDocumentDataSlicesSlice = never;

/**
 * Content for Blog Page documents
 */
interface BlogPageDocumentData {
  /**
   * Slice Zone field in *Blog Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/slices
   */
  slices: prismic.SliceZone<BlogPageDocumentDataSlicesSlice> /**
   * Meta Title field in *Blog Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: blog_page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Blog Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: blog_page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Blog Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Blog Page document from Prismic
 *
 * - **API ID**: `blog_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<BlogPageDocumentData>,
    "blog_page",
    Lang
  >;

type BlogPostDocumentDataSlicesSlice = never;

/**
 * Content for Blog Post documents
 */
interface BlogPostDocumentData {
  /**
   * Slice Zone field in *Blog Post*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/slices
   */
  slices: prismic.SliceZone<BlogPostDocumentDataSlicesSlice> /**
   * Meta Title field in *Blog Post*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: blog_post.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Blog Post*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: blog_post.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Blog Post*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: blog_post.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Blog Post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<BlogPostDocumentData>,
    "blog_post",
    Lang
  >;

/**
 * Primary content in Hero => Primary fields
 */
export interface HeroSliceDefaultPrimary {
  /**
   * Badge Text field
   */
  badge_text: prismic.KeyTextField;

  /**
   * Badge Link field
   */
  badge_link: prismic.LinkField;

  /**
   * Heading field
   */
  heading: prismic.RichTextField;

  /**
   * Description field
   */
  description: prismic.RichTextField;

  /**
   * Primary Button Label field
   */
  primary_button_label: prismic.KeyTextField;

  /**
   * Primary Button Link field
   */
  primary_button_link: prismic.LinkField;

  /**
   * Secondary Button Label field
   */
  secondary_button_label: prismic.KeyTextField;

  /**
   * Secondary Button Link field
   */
  secondary_button_link: prismic.LinkField;

  /**
   * Tertiary Button Label field
   */
  tertiary_button_label: prismic.KeyTextField;

  /**
   * Tertiary Button Link field
   */
  tertiary_button_link: prismic.LinkField;

  /**
   * Media Showcase Image field
   */
  media_image: prismic.ImageField<never>;

  /**
   * Media Caption field
   */
  media_caption: prismic.KeyTextField;

  /**
   * Video Link field
   */
  video_link: prismic.LinkField;
}

/**
 * Item in Hero => Repeatable fields
 */
export interface HeroSliceDefaultItem {
  /**
   * Feature Text field
   */
  feature_text: prismic.KeyTextField;

  /**
   * Feature Icon field
   */
  feature_icon: prismic.SelectField<"shield" | "phone" | "lock" | "clock" | "map-pin" | "check">;
}

/**
 * Default variation for Hero slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSliceDefaultPrimary>,
  Simplify<HeroSliceDefaultItem>
>;

/**
 * Slice variation for Hero slice
 */
export type HeroSliceVariation = HeroSliceDefault;

/**
 * SharedSlice type for Hero
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

type HomePageDocumentDataSlicesSlice = HeroSlice;

/**
 * Content for Home Page documents
 */
interface HomePageDocumentData {
  /**
   * Slice Zone field in *Home Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home_page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/slices
   */
  slices: prismic.SliceZone<HomePageDocumentDataSlicesSlice> /**
   * Meta Title field in *Home Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home_page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Home Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home_page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Home Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home_page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Home Page document from Prismic
 *
 * - **API ID**: `home_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomePageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomePageDocumentData>,
    "home_page",
    Lang
  >;

type PageDocumentDataSlicesSlice = never;

/**
 * Content for Page documents
 */
interface PageDocumentData {
  /**
   * Slice Zone field in *Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/slices
   */
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
   * Meta Title field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

export type AllDocumentTypes =
  | AppSettingsDocument
  | BlogPageDocument
  | BlogPostDocument
  | HomePageDocument
  | PageDocument;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      AppSettingsDocument,
      AppSettingsDocumentData,
      BlogPageDocument,
      BlogPageDocumentData,
      BlogPageDocumentDataSlicesSlice,
      BlogPostDocument,
      BlogPostDocumentData,
      BlogPostDocumentDataSlicesSlice,
      HomePageDocument,
      HomePageDocumentData,
      HomePageDocumentDataSlicesSlice,
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      AllDocumentTypes,
      HeroSlice,
      HeroSliceDefaultPrimary,
      HeroSliceDefaultItem,
      HeroSliceDefault,
      HeroSliceVariation,
    };
  }
}
