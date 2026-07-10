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
 * Item in *App Settings → Navigation Items*
 */
export interface AppSettingsDocumentDataNavigationItemsItem {
	/**
	 * Label field in *App Settings → Navigation Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Features
	 * - **API ID Path**: app_settings.navigation_items[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *App Settings → Navigation Items*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.navigation_items[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *App Settings → Social Links*
 */
export interface AppSettingsDocumentDataSocialLinksItem {
	/**
	 * Platform field in *App Settings → Social Links*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: facebook
	 * - **API ID Path**: app_settings.social_links[].platform
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	platform: prismic.SelectField<"facebook" | "twitter" | "linkedin" | "youtube" | "github" | "briefcase" | "instagram", "filled">;
	
	/**
	 * Link field in *App Settings → Social Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.social_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *App Settings → Footer Navigation Links*
 */
export interface AppSettingsDocumentDataFooterNavigationLinksItem {
	/**
	 * Column Title (e.g. PRODUCT) field in *App Settings → Footer Navigation Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: PRODUCT
	 * - **API ID Path**: app_settings.footer_navigation_links[].column_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	column_title: prismic.KeyTextField;
	
	/**
	 * Links field in *App Settings → Footer Navigation Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.footer_navigation_links[].links
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	links: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, never>>;
}

/**
 * Item in *App Settings → Copy Right Texts*
 */
export interface AppSettingsDocumentDataCopyRightTextsItem {
	/**
	 * Label field in *App Settings → Copy Right Texts*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.copy_right_texts[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Content for App Settings documents
 */
interface AppSettingsDocumentData {
	/**
	 * Logo Image field in *App Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.logo_image
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo_image: prismic.ImageField<never>;
	
	/**
	 * Navigation Items field in *App Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.navigation_items[]
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	navigation_items: prismic.GroupField<Simplify<AppSettingsDocumentDataNavigationItemsItem>>;
	
	/**
	 * Login Button field in *App Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.login_button
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	login_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * CTA Button field in *App Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.cta_button
	 * - **Tab**: Header
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;/**
	 * Footer Logo Image field in *App Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.footer_logo_image
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	footer_logo_image: prismic.ImageField<never>;
	
	/**
	 * Footer Description field in *App Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Privacy-first parental control application powered by on-device AI. Protect your children's digital world while keeping family data 100% private, secure, and under your control.
	 * - **API ID Path**: app_settings.footer_description
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	footer_description: prismic.RichTextField;
	
	/**
	 * Social Links field in *App Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.social_links[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	social_links: prismic.GroupField<Simplify<AppSettingsDocumentDataSocialLinksItem>>;
	
	/**
	 * Footer Navigation Links field in *App Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.footer_navigation_links[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_navigation_links: prismic.GroupField<Simplify<AppSettingsDocumentDataFooterNavigationLinksItem>>;
	
	/**
	 * Copy Right Texts field in *App Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: app_settings.copy_right_texts[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	copy_right_texts: prismic.GroupField<Simplify<AppSettingsDocumentDataCopyRightTextsItem>>;
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

type BlogPageDocumentDataSlicesSlice = BlogShowcaseSlice | HeroSlice

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

type HomePageDocumentDataSlicesSlice = StatsShowcaseSlice | DataFlowsSlice | PrivacyComparisonSlice | HeroSlice | FeaturesGridSlice | TestimonialsSlice | FeatureShowcaseSlice | CallToActionSlice | BlogShowcaseSlice | FaqSlice | PrinciplesSlice

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

type PageDocumentDataSlicesSlice = StatsShowcaseSlice | DataFlowsSlice | PrivacyComparisonSlice | HeroSlice | FeaturesGridSlice | TestimonialsSlice | FeatureShowcaseSlice | CallToActionSlice | BlogShowcaseSlice | FaqSlice | PrinciplesSlice

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
 * Primary content in *BlogShowcase → Default → Primary*
 */
export interface BlogShowcaseSliceDefaultPrimary {
	/**
	 * Heading field in *BlogShowcase → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Latest from Our Blog
	 * - **API ID Path**: blog_showcase.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *BlogShowcase → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Stay updated with our latest insights and announcements
	 * - **API ID Path**: blog_showcase.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * View All field in *BlogShowcase → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_showcase.default.primary.view_all
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	view_all: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for BlogShowcase Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BlogShowcaseSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BlogShowcaseSliceDefaultPrimary>, never>;

/**
 * Slice variation for *BlogShowcase*
 */
type BlogShowcaseSliceVariation = BlogShowcaseSliceDefault

/**
 * BlogShowcase Shared Slice
 *
 * - **API ID**: `blog_showcase`
 * - **Description**: A dynamic blog section displaying the latest 3 blog post documents.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BlogShowcaseSlice = prismic.SharedSlice<"blog_showcase", BlogShowcaseSliceVariation>;

/**
 * Item in *CallToAction → Default → Primary → Benefits checklist*
 */
export interface CallToActionSliceDefaultPrimaryBenefitsItem {
	/**
	 * Text field in *CallToAction → Default → Primary → Benefits checklist*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 14-day free trial
	 * - **API ID Path**: call_to_action.default.primary.benefits[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * Primary content in *CallToAction → Default → Primary*
 */
export interface CallToActionSliceDefaultPrimary {
	/**
	 * Heading field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Ready to build a safer internet for your children?
	 * - **API ID Path**: call_to_action.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Free 30-day trial for all waitlist members upon official App Store release.
	 * - **API ID Path**: call_to_action.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Button field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.default.primary.button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Benefits checklist field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.default.primary.benefits[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	benefits: prismic.GroupField<Simplify<CallToActionSliceDefaultPrimaryBenefitsItem>>;
}

/**
 * Default variation for CallToAction Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CallToActionSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CallToActionSliceDefaultPrimary>, never>;

/**
 * Primary content in *CallToAction → Centered → Primary*
 */
export interface CallToActionSliceCenteredPrimary {
	/**
	 * Heading field in *CallToAction → Centered → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Experience True Privacy Today
	 * - **API ID Path**: call_to_action.centered.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *CallToAction → Centered → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Download Meetily and experience meeting AI...
	 * - **API ID Path**: call_to_action.centered.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Primary Button field in *CallToAction → Centered → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.centered.primary.primary_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	primary_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Secondary Button field in *CallToAction → Centered → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.centered.primary.secondary_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	secondary_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Centered variation for CallToAction Slice
 *
 * - **API ID**: `centered`
 * - **Description**: Centered call to action section with heading, description, and two side-by-side action buttons.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CallToActionSliceCentered = prismic.SharedSliceVariation<"centered", Simplify<CallToActionSliceCenteredPrimary>, never>;

/**
 * Slice variation for *CallToAction*
 */
type CallToActionSliceVariation = CallToActionSliceDefault | CallToActionSliceCentered

/**
 * CallToAction Shared Slice
 *
 * - **API ID**: `call_to_action`
 * - **Description**: Call to action section with heading, description, CTA button, and benefit checklist items.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CallToActionSlice = prismic.SharedSlice<"call_to_action", CallToActionSliceVariation>;

/**
 * Item in *DataFlows → Default → Primary → Flows*
 */
export interface DataFlowsSliceDefaultPrimaryFlowsItem {
	/**
	 * Icon field in *DataFlows → Default → Primary → Flows*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: shield
	 * - **API ID Path**: data_flows.default.primary.flows[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"shield" | "lock" | "trending-up" | "database" | "key" | "info" | "mail", "filled">;
	
	/**
	 * Title field in *DataFlows → Default → Primary → Flows*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: License status check (Trial Journey Hub)
	 * - **API ID Path**: data_flows.default.primary.flows[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Content field in *DataFlows → Default → Primary → Flows*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: When you visit your trial dashboard...
	 * - **API ID Path**: data_flows.default.primary.flows[].content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Primary content in *DataFlows → Default → Primary*
 */
export interface DataFlowsSliceDefaultPrimary {
	/**
	 * Heading field in *DataFlows → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Trial Journey & Website Data Flows
	 * - **API ID Path**: data_flows.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *DataFlows → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Transparent disclosure of the three new data flows introduced with the Trial Journey Hub
	 * - **API ID Path**: data_flows.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Flows field in *DataFlows → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: data_flows.default.primary.flows[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	flows: prismic.GroupField<Simplify<DataFlowsSliceDefaultPrimaryFlowsItem>>;
}

/**
 * Default variation for DataFlows Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DataFlowsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<DataFlowsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *DataFlows*
 */
type DataFlowsSliceVariation = DataFlowsSliceDefault

/**
 * DataFlows Shared Slice
 *
 * - **API ID**: `data_flows`
 * - **Description**: A vertical stack of details cards for displaying data flows and descriptions.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DataFlowsSlice = prismic.SharedSlice<"data_flows", DataFlowsSliceVariation>;

/**
 * Item in *Faq → Default → Primary → FAQ List*
 */
export interface FaqSliceDefaultPrimaryFaqListItem {
	/**
	 * Question field in *Faq → Default → Primary → FAQ List*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Is Kibal currently available for download?
	 * - **API ID Path**: faq.default.primary.faq_list[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Answer field in *Faq → Default → Primary → FAQ List*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Yes, Kibal is available on both Android and iOS...
	 * - **API ID Path**: faq.default.primary.faq_list[].answer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	answer: prismic.RichTextField;
}

/**
 * Primary content in *Faq → Default → Primary*
 */
export interface FaqSliceDefaultPrimary {
	/**
	 * Heading field in *Faq → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Frequently Asked Questions
	 * - **API ID Path**: faq.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * FAQ List field in *Faq → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq.default.primary.faq_list[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq_list: prismic.GroupField<Simplify<FaqSliceDefaultPrimaryFaqListItem>>;
}

/**
 * Default variation for Faq Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FaqSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FaqSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Faq*
 */
type FaqSliceVariation = FaqSliceDefault

/**
 * Faq Shared Slice
 *
 * - **API ID**: `faq`
 * - **Description**: Frequently Asked Questions section using an interactive accordion display.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FaqSlice = prismic.SharedSlice<"faq", FaqSliceVariation>;

/**
 * Item in *FeatureShowcase → Default → Primary → Core Features (Top)*
 */
export interface FeatureShowcaseSliceDefaultPrimaryCoreFeaturesItem {
	/**
	 * Icon field in *FeatureShowcase → Default → Primary → Core Features (Top)*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_showcase.default.primary.core_features[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"star" | "shield" | "share" | "lock" | "activity" | "clock" | "key">;
	
	/**
	 * Title field in *FeatureShowcase → Default → Primary → Core Features (Top)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Intelligent Web & App Filter
	 * - **API ID Path**: feature_showcase.default.primary.core_features[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Checklist Items field in *FeatureShowcase → Default → Primary → Core Features (Top)*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Add bullet points for checklist...
	 * - **API ID Path**: feature_showcase.default.primary.core_features[].checklist
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	checklist: prismic.RichTextField;
}

/**
 * Item in *FeatureShowcase → Default → Primary → Highlight Features (Bottom)*
 */
export interface FeatureShowcaseSliceDefaultPrimaryHighlightFeaturesItem {
	/**
	 * Icon field in *FeatureShowcase → Default → Primary → Highlight Features (Bottom)*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_showcase.default.primary.highlight_features[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"lock" | "activity" | "grid" | "zap" | "user" | "file" | "smartphone" | "shield">;
	
	/**
	 * Title field in *FeatureShowcase → Default → Primary → Highlight Features (Bottom)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 100% ON-DEVICE AI
	 * - **API ID Path**: feature_showcase.default.primary.highlight_features[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *FeatureShowcase → Default → Primary → Highlight Features (Bottom)*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: All analysis happens on your child's phone...
	 * - **API ID Path**: feature_showcase.default.primary.highlight_features[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Primary content in *FeatureShowcase → Default → Primary*
 */
export interface FeatureShowcaseSliceDefaultPrimary {
	/**
	 * Badge Text field in *FeatureShowcase → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: OPEN SOURCE & PRIVACY-FIRST
	 * - **API ID Path**: feature_showcase.default.primary.badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
	
	/**
	 * Heading field in *FeatureShowcase → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Take Control of Your Family's Digital Well-being
	 * - **API ID Path**: feature_showcase.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *FeatureShowcase → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: AI-Powered Meeting Transcriptions - 100% Private, 100% Local, Open Source
	 * - **API ID Path**: feature_showcase.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Core Features (Top) field in *FeatureShowcase → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_showcase.default.primary.core_features[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	core_features: prismic.GroupField<Simplify<FeatureShowcaseSliceDefaultPrimaryCoreFeaturesItem>>;
	
	/**
	 * Highlight Features (Bottom) field in *FeatureShowcase → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_showcase.default.primary.highlight_features[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	highlight_features: prismic.GroupField<Simplify<FeatureShowcaseSliceDefaultPrimaryHighlightFeaturesItem>>;
}

/**
 * Default variation for FeatureShowcase Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeatureShowcaseSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FeatureShowcaseSliceDefaultPrimary>, never>;

/**
 * Slice variation for *FeatureShowcase*
 */
type FeatureShowcaseSliceVariation = FeatureShowcaseSliceDefault

/**
 * FeatureShowcase Shared Slice
 *
 * - **API ID**: `feature_showcase`
 * - **Description**: Premium feature showcase containing 3 top core features and 6 bottom highlight features.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeatureShowcaseSlice = prismic.SharedSlice<"feature_showcase", FeatureShowcaseSliceVariation>;

/**
 * Item in *FeaturesGrid → Default → Primary → Items*
 */
export interface FeaturesGridSliceDefaultPrimaryItemsItem {
	/**
	 * Icon field in *FeaturesGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: features_grid.default.primary.items[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"box" | "bolt" | "cpu" | "clock" | "key" | "shield" | "smartphone" | "lock" | "activity" | "share">;
	
	/**
	 * Title field in *FeaturesGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: features_grid.default.primary.items[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Descriptioin field in *FeaturesGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: features_grid.default.primary.items[].descriptioin
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	descriptioin: prismic.RichTextField;
}

/**
 * Primary content in *FeaturesGrid → Default → Primary*
 */
export interface FeaturesGridSliceDefaultPrimary {
	/**
	 * Heading field in *FeaturesGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Everything You Need to Raise Tech-Healthy Kids
	 * - **API ID Path**: features_grid.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *FeaturesGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: From smart blocks to instant messaging alerts...
	 * - **API ID Path**: features_grid.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Items field in *FeaturesGrid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: features_grid.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<FeaturesGridSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for FeaturesGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturesGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FeaturesGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *FeaturesGrid*
 */
type FeaturesGridSliceVariation = FeaturesGridSliceDefault

/**
 * FeaturesGrid Shared Slice
 *
 * - **API ID**: `features_grid`
 * - **Description**: A responsive grid displaying product features with customizable icons, titles, and descriptions.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturesGridSlice = prismic.SharedSlice<"features_grid", FeaturesGridSliceVariation>;

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
	icon: prismic.SelectField<"shield" | "phone" | "lock" | "clock" | "map-pin" | "check">;
	
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
	 * Badge Style field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: brand-dot
	 * - **API ID Path**: hero.default.primary.badge_style
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	badge_style: prismic.SelectField<"brand-dot" | "gray", "filled">;
	
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
	 * Primary Button Variant field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: brand
	 * - **API ID Path**: hero.default.primary.primary_button_variant
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	primary_button_variant: prismic.SelectField<"default" | "brand" | "secondary" | "outline", "filled">;
	
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
	 * Secondary Button Variant field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: secondary
	 * - **API ID Path**: hero.default.primary.secondary_button_variant
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	secondary_button_variant: prismic.SelectField<"default" | "brand" | "secondary" | "outline", "filled">;
	
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
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Primary content in *Hero → Blog Hero → Primary*
 */
export interface HeroSliceBlogPrimary {
	/**
	 * Heading field in *Hero → Blog Hero → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Kibal Blogs
	 * - **API ID Path**: hero.blog.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *Hero → Blog Hero → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Nurturing digital well-being...
	 * - **API ID Path**: hero.blog.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Breadcrumb Label field in *Hero → Blog Hero → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Blogs
	 * - **API ID Path**: hero.blog.primary.breadcrumb_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	breadcrumb_label: prismic.KeyTextField;
	
	/**
	 * Metadata Suffix field in *Hero → Blog Hero → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Curated Weekly
	 * - **API ID Path**: hero.blog.primary.meta_suffix
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_suffix: prismic.KeyTextField;
}

/**
 * Blog Hero variation for Hero Slice
 *
 * - **API ID**: `blog`
 * - **Description**: Hero section designed for blog page with breadcrumbs and post count metadata.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceBlog = prismic.SharedSliceVariation<"blog", Simplify<HeroSliceBlogPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault | HeroSliceBlog

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero section with top badge, title, subtitle, CTA actions, feature benefits, and media player mockup.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *Principles → Default → Primary → Principles List*
 */
export interface PrinciplesSliceDefaultPrimaryPrinciplesListItem {
	/**
	 * Icon field in *Principles → Default → Primary → Principles List*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: principles.default.primary.principles_list[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"shield" | "users" | "globe" | "heart" | "star" | "lock">;
	
	/**
	 * Title field in *Principles → Default → Primary → Principles List*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Absolute Privacy
	 * - **API ID Path**: principles.default.primary.principles_list[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Principles → Default → Primary → Principles List*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: We believe family data should remain strictly confidential...
	 * - **API ID Path**: principles.default.primary.principles_list[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Primary content in *Principles → Default → Primary*
 */
export interface PrinciplesSliceDefaultPrimary {
	/**
	 * Heading field in *Principles → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: What We Stand For
	 * - **API ID Path**: principles.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *Principles → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: The principles that guide everything we build
	 * - **API ID Path**: principles.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Primary Button field in *Principles → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: principles.default.primary.primary_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	primary_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Secondary Button field in *Principles → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: principles.default.primary.secondary_button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	secondary_button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Principles List field in *Principles → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: principles.default.primary.principles_list[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	principles_list: prismic.GroupField<Simplify<PrinciplesSliceDefaultPrimaryPrinciplesListItem>>;
}

/**
 * Default variation for Principles Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrinciplesSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PrinciplesSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Principles*
 */
type PrinciplesSliceVariation = PrinciplesSliceDefault

/**
 * Principles Shared Slice
 *
 * - **API ID**: `principles`
 * - **Description**: Section representing the core company principles or values with a grid of cards and CTA action buttons.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrinciplesSlice = prismic.SharedSlice<"principles", PrinciplesSliceVariation>;

/**
 * Item in *PrivacyComparison → Default → Primary → Left Card Items*
 */
export interface PrivacyComparisonSliceDefaultPrimaryLeftCardItemsItem {
	/**
	 * Text field in *PrivacyComparison → Default → Primary → Left Card Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Meeting audio or video content (always stays local)
	 * - **API ID Path**: privacy_comparison.default.primary.left_card_items[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
	
	/**
	 * Status field in *PrivacyComparison → Default → Primary → Left Card Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: cross
	 * - **API ID Path**: privacy_comparison.default.primary.left_card_items[].status
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	status: prismic.SelectField<"cross" | "check", "filled">;
}

/**
 * Item in *PrivacyComparison → Default → Primary → Right Card Items*
 */
export interface PrivacyComparisonSliceDefaultPrimaryRightCardItemsItem {
	/**
	 * Text field in *PrivacyComparison → Default → Primary → Right Card Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Meeting audio or video content (always stays local)
	 * - **API ID Path**: privacy_comparison.default.primary.right_card_items[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
	
	/**
	 * Status field in *PrivacyComparison → Default → Primary → Right Card Items*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: check
	 * - **API ID Path**: privacy_comparison.default.primary.right_card_items[].status
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	status: prismic.SelectField<"cross" | "check", "filled">;
}

/**
 * Item in *PrivacyComparison → With Links → Primary → Left Card Links*
 */
export interface PrivacyComparisonSliceWithLinksPrimaryLeftCardLinksItem {
	/**
	 * Link Target field in *PrivacyComparison → With Links → Primary → Left Card Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.withLinks.primary.left_card_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *PrivacyComparison → With Links → Primary → Right Card Links*
 */
export interface PrivacyComparisonSliceWithLinksPrimaryRightCardLinksItem {
	/**
	 * Link Target field in *PrivacyComparison → With Links → Primary → Right Card Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.withLinks.primary.right_card_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *PrivacyComparison → Default → Primary*
 */
export interface PrivacyComparisonSliceDefaultPrimary {
	/**
	 * Heading field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Data Collection & Usage
	 * - **API ID Path**: privacy_comparison.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Complete transparency about what we do and don't collect
	 * - **API ID Path**: privacy_comparison.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Left Card Icon field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: database
	 * - **API ID Path**: privacy_comparison.default.primary.left_card_icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	left_card_icon: prismic.SelectField<"database" | "shield" | "lock" | "info", "filled">;
	
	/**
	 * Left Card Title field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: What We DON'T Collect
	 * - **API ID Path**: privacy_comparison.default.primary.left_card_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	left_card_title: prismic.KeyTextField;
	
	/**
	 * Left Card Footer field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.default.primary.left_card_footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	left_card_footer: prismic.RichTextField;
	
	/**
	 * Left Card Items field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.default.primary.left_card_items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	left_card_items: prismic.GroupField<Simplify<PrivacyComparisonSliceDefaultPrimaryLeftCardItemsItem>>;
	
	/**
	 * Right Card Icon field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: shield
	 * - **API ID Path**: privacy_comparison.default.primary.right_card_icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	right_card_icon: prismic.SelectField<"database" | "shield" | "lock" | "info", "filled">;
	
	/**
	 * Right Card Title field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: What We DO Collect (Optional)
	 * - **API ID Path**: privacy_comparison.default.primary.right_card_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	right_card_title: prismic.KeyTextField;
	
	/**
	 * Right Card Footer field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.default.primary.right_card_footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	right_card_footer: prismic.RichTextField;
	
	/**
	 * Right Card Items field in *PrivacyComparison → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.default.primary.right_card_items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	right_card_items: prismic.GroupField<Simplify<PrivacyComparisonSliceDefaultPrimaryRightCardItemsItem>>;
}

/**
 * Default variation for PrivacyComparison Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrivacyComparisonSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PrivacyComparisonSliceDefaultPrimary>, never>;

/**
 * Primary content in *PrivacyComparison → With Links → Primary*
 */
export interface PrivacyComparisonSliceWithLinksPrimary {
	/**
	 * Heading field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Data Collection & Usage
	 * - **API ID Path**: privacy_comparison.withLinks.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Complete transparency about what we do and don't collect
	 * - **API ID Path**: privacy_comparison.withLinks.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Left Card Title field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Open Source (Community Edition)
	 * - **API ID Path**: privacy_comparison.withLinks.primary.left_card_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	left_card_title: prismic.KeyTextField;
	
	/**
	 * Left Card Description field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Meetily Community Edition is open source...
	 * - **API ID Path**: privacy_comparison.withLinks.primary.left_card_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	left_card_description: prismic.RichTextField;
	
	/**
	 * Left Card Links field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.withLinks.primary.left_card_links[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	left_card_links: prismic.GroupField<Simplify<PrivacyComparisonSliceWithLinksPrimaryLeftCardLinksItem>>;
	
	/**
	 * Left Card Footer field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.withLinks.primary.left_card_footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	left_card_footer: prismic.RichTextField;
	
	/**
	 * Right Card Title field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Pro Edition (Self-Hosted)
	 * - **API ID Path**: privacy_comparison.withLinks.primary.right_card_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	right_card_title: prismic.KeyTextField;
	
	/**
	 * Right Card Description field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Meetily Pro includes...
	 * - **API ID Path**: privacy_comparison.withLinks.primary.right_card_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	right_card_description: prismic.RichTextField;
	
	/**
	 * Right Card Links field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.withLinks.primary.right_card_links[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	right_card_links: prismic.GroupField<Simplify<PrivacyComparisonSliceWithLinksPrimaryRightCardLinksItem>>;
	
	/**
	 * Right Card Footer field in *PrivacyComparison → With Links → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_comparison.withLinks.primary.right_card_footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	right_card_footer: prismic.RichTextField;
}

/**
 * With Links variation for PrivacyComparison Slice
 *
 * - **API ID**: `withLinks`
 * - **Description**: Variation containing text descriptions and redirect links inside side-by-side cards
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrivacyComparisonSliceWithLinks = prismic.SharedSliceVariation<"withLinks", Simplify<PrivacyComparisonSliceWithLinksPrimary>, never>;

/**
 * Slice variation for *PrivacyComparison*
 */
type PrivacyComparisonSliceVariation = PrivacyComparisonSliceDefault | PrivacyComparisonSliceWithLinks

/**
 * PrivacyComparison Shared Slice
 *
 * - **API ID**: `privacy_comparison`
 * - **Description**: A side-by-side card grid showing data collection comparisons, with custom list statuses.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrivacyComparisonSlice = prismic.SharedSlice<"privacy_comparison", PrivacyComparisonSliceVariation>;

/**
 * Item in *StatsShowcase → Default → Primary → Stats*
 */
export interface StatsShowcaseSliceDefaultPrimaryStatsItem {
	/**
	 * Value field in *StatsShowcase → Default → Primary → Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 100%
	 * - **API ID Path**: stats_showcase.default.primary.stats[].value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	value: prismic.KeyTextField;
	
	/**
	 * Label field in *StatsShowcase → Default → Primary → Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Local Transcription
	 * - **API ID Path**: stats_showcase.default.primary.stats[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *StatsShowcase → Default → Primary*
 */
export interface StatsShowcaseSliceDefaultPrimary {
	/**
	 * Heading field in *StatsShowcase → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Trusted by Privacy-Conscious Organizations
	 * - **API ID Path**: stats_showcase.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *StatsShowcase → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Join thousands who prioritize data privacy and security
	 * - **API ID Path**: stats_showcase.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Stats field in *StatsShowcase → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats_showcase.default.primary.stats[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	stats: prismic.GroupField<Simplify<StatsShowcaseSliceDefaultPrimaryStatsItem>>;
}

/**
 * Default variation for StatsShowcase Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsShowcaseSliceDefault = prismic.SharedSliceVariation<"default", Simplify<StatsShowcaseSliceDefaultPrimary>, never>;

/**
 * Slice variation for *StatsShowcase*
 */
type StatsShowcaseSliceVariation = StatsShowcaseSliceDefault

/**
 * StatsShowcase Shared Slice
 *
 * - **API ID**: `stats_showcase`
 * - **Description**: A horizontal grid of statistics cards.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsShowcaseSlice = prismic.SharedSlice<"stats_showcase", StatsShowcaseSliceVariation>;

/**
 * Item in *Testimonials → Default → Primary → Stats List*
 */
export interface TestimonialsSliceDefaultPrimaryStatsListItem {
	/**
	 * Number field in *Testimonials → Default → Primary → Stats List*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 2,500+
	 * - **API ID Path**: testimonials.default.primary.stats_list[].number
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	number: prismic.KeyTextField;
	
	/**
	 * Label field in *Testimonials → Default → Primary → Stats List*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: BETA USERS
	 * - **API ID Path**: testimonials.default.primary.stats_list[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Item in *Testimonials → Default → Primary → Reviews*
 */
export interface TestimonialsSliceDefaultPrimaryReviewsItem {
	/**
	 * Icon field in *Testimonials → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.reviews[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"pencil" | "file-text" | "user" | "globe" | "quote">;
	
	/**
	 * Author field in *Testimonials → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: u/selfhosted
	 * - **API ID Path**: testimonials.default.primary.reviews[].author
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	author: prismic.KeyTextField;
	
	/**
	 * Quote field in *Testimonials → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: I've been testing the Kibal beta...
	 * - **API ID Path**: testimonials.default.primary.reviews[].quote
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	quote: prismic.RichTextField;
	
	/**
	 * Link field in *Testimonials → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.reviews[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *Testimonials → Default → Primary*
 */
export interface TestimonialsSliceDefaultPrimary {
	/**
	 * Badge Text field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Loved by early testers
	 * - **API ID Path**: testimonials.default.primary.badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
	
	/**
	 * Heading field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: What Our Beta Testers & Tech Reviewers Are Saying
	 * - **API ID Path**: testimonials.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Stats List field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.stats_list[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	stats_list: prismic.GroupField<Simplify<TestimonialsSliceDefaultPrimaryStatsListItem>>;
	
	/**
	 * Reviews field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.reviews[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	reviews: prismic.GroupField<Simplify<TestimonialsSliceDefaultPrimaryReviewsItem>>;
}

/**
 * Default variation for Testimonials Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TestimonialsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TestimonialsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Testimonials*
 */
type TestimonialsSliceVariation = TestimonialsSliceDefault

/**
 * Testimonials Shared Slice
 *
 * - **API ID**: `testimonials`
 * - **Description**: Reviews and Testimonials section with numerical stats and detailed cards representing user opinions.
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TestimonialsSlice = prismic.SharedSlice<"testimonials", TestimonialsSliceVariation>;

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
			AppSettingsDocumentDataNavigationItemsItem,
			AppSettingsDocumentDataSocialLinksItem,
			AppSettingsDocumentDataFooterNavigationLinksItem,
			AppSettingsDocumentDataCopyRightTextsItem,
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
			BlogShowcaseSlice,
			BlogShowcaseSliceDefaultPrimary,
			BlogShowcaseSliceVariation,
			BlogShowcaseSliceDefault,
			CallToActionSlice,
			CallToActionSliceDefaultPrimaryBenefitsItem,
			CallToActionSliceDefaultPrimary,
			CallToActionSliceCenteredPrimary,
			CallToActionSliceVariation,
			CallToActionSliceDefault,
			CallToActionSliceCentered,
			DataFlowsSlice,
			DataFlowsSliceDefaultPrimaryFlowsItem,
			DataFlowsSliceDefaultPrimary,
			DataFlowsSliceVariation,
			DataFlowsSliceDefault,
			FaqSlice,
			FaqSliceDefaultPrimaryFaqListItem,
			FaqSliceDefaultPrimary,
			FaqSliceVariation,
			FaqSliceDefault,
			FeatureShowcaseSlice,
			FeatureShowcaseSliceDefaultPrimaryCoreFeaturesItem,
			FeatureShowcaseSliceDefaultPrimaryHighlightFeaturesItem,
			FeatureShowcaseSliceDefaultPrimary,
			FeatureShowcaseSliceVariation,
			FeatureShowcaseSliceDefault,
			FeaturesGridSlice,
			FeaturesGridSliceDefaultPrimaryItemsItem,
			FeaturesGridSliceDefaultPrimary,
			FeaturesGridSliceVariation,
			FeaturesGridSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimaryStatsListItem,
			HeroSliceDefaultPrimary,
			HeroSliceBlogPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			HeroSliceBlog,
			PrinciplesSlice,
			PrinciplesSliceDefaultPrimaryPrinciplesListItem,
			PrinciplesSliceDefaultPrimary,
			PrinciplesSliceVariation,
			PrinciplesSliceDefault,
			PrivacyComparisonSlice,
			PrivacyComparisonSliceDefaultPrimaryLeftCardItemsItem,
			PrivacyComparisonSliceDefaultPrimaryRightCardItemsItem,
			PrivacyComparisonSliceDefaultPrimary,
			PrivacyComparisonSliceWithLinksPrimaryLeftCardLinksItem,
			PrivacyComparisonSliceWithLinksPrimaryRightCardLinksItem,
			PrivacyComparisonSliceWithLinksPrimary,
			PrivacyComparisonSliceVariation,
			PrivacyComparisonSliceDefault,
			PrivacyComparisonSliceWithLinks,
			StatsShowcaseSlice,
			StatsShowcaseSliceDefaultPrimaryStatsItem,
			StatsShowcaseSliceDefaultPrimary,
			StatsShowcaseSliceVariation,
			StatsShowcaseSliceDefault,
			TestimonialsSlice,
			TestimonialsSliceDefaultPrimaryStatsListItem,
			TestimonialsSliceDefaultPrimaryReviewsItem,
			TestimonialsSliceDefaultPrimary,
			TestimonialsSliceVariation,
			TestimonialsSliceDefault
		}
	}
}