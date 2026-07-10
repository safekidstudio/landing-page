import dynamic from "next/dynamic";

export const components = {
  blog_showcase: dynamic(() => import("./BlogShowcase")),
  call_to_action: dynamic(() => import("./CallToAction")),
  faq: dynamic(() => import("./Faq")),
  feature_showcase: dynamic(() => import("./FeatureShowcase")),
  features_grid: dynamic(() => import("./FeaturesGrid")),
  hero: dynamic(() => import("./Hero")),
  principles: dynamic(() => import("./Principles")),
  privacy_comparison: dynamic(() => import("./PrivacyComparison")),
  testimonials: dynamic(() => import("./Testimonials")),
};
