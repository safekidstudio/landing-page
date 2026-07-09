import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Item in *App Settings → Header → Navigation Items*
 */
export interface AppSettingsDocumentDataNavigationItemsItem {
	/**
	 * Label field in *App Settings → Header → Navigation Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Features
	 * - **API ID Path**: app_settings.navigation_items[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;

	/**
	 * Link field in *App Settings → Header → Navigation Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.navigation_items[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;

	/**
	 * Badge Text field in *App Settings → Header → Navigation Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: New
	 * - **API ID Path**: app_settings.navigation_items[].badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
}

/**
 * Item in *App Settings → Footer → Social Links*
 */
export interface AppSettingsDocumentDataSocialLinksItem {
	/**
	 * Platform field in *App Settings → Footer → Social Links*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.social_links[].platform
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	platform: prismic.SelectField<"facebook" | "twitter" | "linkedin" | "youtube" | "github" | "briefcase" | "instagram">;

	/**
	 * Link field in *App Settings → Footer → Social Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.social_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *App Settings → Footer → Footer Navigation Links*
 */
export interface AppSettingsDocumentDataFooterNavigationLinksItem {
	/**
	 * Column Title field in *App Settings → Footer → Footer Navigation Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: PRODUCT
	 * - **API ID Path**: app_settings.footer_navigation_links[].column_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	column_title: prismic.KeyTextField;

	/**
	 * Link Label field in *App Settings → Footer → Footer Navigation Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Download
	 * - **API ID Path**: app_settings.footer_navigation_links[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;

	/**
	 * Link field in *App Settings → Footer → Footer Navigation Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.footer_navigation_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *App Settings → Footer → Bottom Links*
 */
export interface AppSettingsDocumentDataBottomLinksItem {
	/**
	 * Label field in *App Settings → Footer → Bottom Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Privacy Policy
	 * - **API ID Path**: app_settings.bottom_links[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;

	/**
	 * Link field in *App Settings → Footer → Bottom Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.bottom_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

interface AppSettingsDocumentData {
	/**
	 * Logo Text field in *App Settings → Header*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Kibal
	 * - **API ID Path**: app_settings.logo_text
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	logo_text: prismic.KeyTextField;

	/**
	 * Logo Image field in *App Settings → Header*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.logo_image
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo_image: prismic.ImageField<never>;

	/**
	 * Navigation Items field in *App Settings → Header*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.navigation_items[]
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	navigation_items: prismic.GroupField<Simplify<AppSettingsDocumentDataNavigationItemsItem>>;

	/**
	 * Login Button Label field in *App Settings → Header*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Login
	 * - **API ID Path**: app_settings.login_button_label
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	login_button_label: prismic.KeyTextField;

	/**
	 * Login Button Link field in *App Settings → Header*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.login_button_link
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	login_button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;

	/**
	 * CTA Button Label field in *App Settings → Header*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Get Started
	 * - **API ID Path**: app_settings.cta_button_label
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_button_label: prismic.KeyTextField;

	/**
	 * CTA Button Link field in *App Settings → Header*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.cta_button_link
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;

	/**
	 * Footer Logo Text field in *App Settings → Footer*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Kibal
	 * - **API ID Path**: app_settings.footer_logo_text
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_logo_text: prismic.KeyTextField;

	/**
	 * Footer Logo Image field in *App Settings → Footer*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.footer_logo_image
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	footer_logo_image: prismic.ImageField<never>;

	/**
	 * Footer Description field in *App Settings → Footer*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Privacy-first parental control application...
	 * - **API ID Path**: app_settings.footer_description
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	footer_description: prismic.RichTextField;

	/**
	 * Social Links field in *App Settings → Footer*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.social_links[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	social_links: prismic.GroupField<Simplify<AppSettingsDocumentDataSocialLinksItem>>;

	/**
	 * Footer Navigation Links field in *App Settings → Footer*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.footer_navigation_links[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_navigation_links: prismic.GroupField<Simplify<AppSettingsDocumentDataFooterNavigationLinksItem>>;

	/**
	 * Copyright Text field in *App Settings → Footer*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: © 2026 Kibal. All rights reserved.
	 * - **API ID Path**: app_settings.copyright_text
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	copyright_text: prismic.KeyTextField;

	/**
	 * Bottom Links field in *App Settings → Footer*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.bottom_links[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	bottom_links: prismic.GroupField<Simplify<AppSettingsDocumentDataBottomLinksItem>>;
}

/**
 * App Settings document from Prismic
 *
 * - **API ID**: `app_settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AppSettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<AppSettingsDocumentData>, "app_settings", Lang>;

type BlogPageDocumentDataSlicesSlice = never

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
	slices: prismic.SliceZone<BlogPageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Blog Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: blog_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
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
export type BlogPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<BlogPageDocumentData>, "blog_page", Lang>;

type BlogPostDocumentDataSlicesSlice = never

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
	slices: prismic.SliceZone<BlogPostDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: blog_post.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
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
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;

type HomePageDocumentDataSlicesSlice = HeroSlice

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
	slices: prismic.SliceZone<HomePageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Home Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: home_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
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
export type HomePageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomePageDocumentData>, "home_page", Lang>;

type PageDocumentDataSlicesSlice = HeroSlice

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
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
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
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

export type AllDocumentTypes = AppSettingsDocument | BlogPageDocument | BlogPostDocument | HomePageDocument | PageDocument;

/**
 * Item in *Hero → Default → Primary → Stats List*
 */
export interface HeroSliceDefaultPrimaryStatsListItem {
	/**
	 * Icon field in *Hero → Default → Primary → Stats List*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.stats_list[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"security" | "phone" | "filter" | "timer" | "location">;
	
	/**
	 * Label field in *Hero → Default → Primary → Stats List*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.stats_list[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Badge Text field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: LAUNCHING SOON ON ANDROID
	 * - **API ID Path**: hero.default.primary.badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
	
	/**
	 * Heading field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: The Privacy-First Parental Control App...
	 * - **API ID Path**: hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Kibal helps parents set healthy screen time limits...
	 * - **API ID Path**: hero.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Primary Button field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.primary_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	primary_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Secondary_Button field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: Start Free Trial
	 * - **API ID Path**: hero.default.primary.secondary_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	secondary_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Tertiary Button field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.tertiary_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	tertiary_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Stats List field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.stats_list[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	stats_list: prismic.GroupField<Simplify<HeroSliceDefaultPrimaryStatsListItem>>;
	
	/**
	 * Media field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.media
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	media: prismic.EmbedField
	
	/**
	 * Media Caption field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Interactive Demo • Click tabs to explore...
	 * - **API ID Path**: hero.default.primary.media_caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	media_caption: prismic.KeyTextField;
}

/**
 * Primary content in *Hero → Items*
 */
export interface HeroSliceDefaultItem {
	/**
	 * Feature Text field in *Hero → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: PRIVACY-FIRST CORE
	 * - **API ID Path**: hero.items[].feature_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	feature_text: prismic.KeyTextField;
	
	/**
	 * Feature Icon field in *Hero → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: shield
	 * - **API ID Path**: hero.items[].feature_icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	feature_icon: prismic.SelectField<"shield" | "phone" | "lock" | "clock" | "map-pin" | "check", "filled">;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, Simplify<HeroSliceDefaultItem>>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero section with top badge, title, subtitle, CTA actions, feature benefits, and media player mockup.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
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
			HeroSliceDefaultPrimaryStatsListItem,
			HeroSliceDefaultPrimary,
			HeroSliceDefaultItem,
			HeroSliceVariation,
			HeroSliceDefault
		}
	}
}