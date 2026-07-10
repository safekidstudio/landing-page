import dynamic from "next/dynamic";

export const components = {
  blog_showcase: dynamic(() => import("./BlogShowcase")),
  call_to_action: dynamic(() => import("./CallToAction")),
  data_flows: dynamic(() => import("./DataFlows")),
  faq: dynamic(() => import("./Faq")),
  feature_showcase: dynamic(() => import("./FeatureShowcase")),
  features_grid: dynamic(() => import("./FeaturesGrid")),
  hero: dynamic(() => import("./Hero")),
  platform_download: dynamic(() => import("./PlatformDownload")),
  principles: dynamic(() => import("./Principles")),
  privacy_comparison: dynamic(() => import("./PrivacyComparison")),
  setup_steps: dynamic(() => import("./SetupSteps")),
  stats_showcase: dynamic(() => import("./StatsShowcase")),
  testimonials: dynamic(() => import("./Testimonials")),
};
