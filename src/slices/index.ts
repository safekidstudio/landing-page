import dynamic from "next/dynamic";

export const components = {
  features_grid: dynamic(() => import("./FeaturesGrid")),
  hero: dynamic(() => import("./Hero")),
};
