import dynamic from "next/dynamic";

export const components = {
  call_to_action: dynamic(() => import("./CallToAction")),
  feature_showcase: dynamic(() => import("./FeatureShowcase")),
  features_grid: dynamic(() => import("./FeaturesGrid")),
  hero: dynamic(() => import("./Hero")),
  testimonials: dynamic(() => import("./Testimonials")),
};
