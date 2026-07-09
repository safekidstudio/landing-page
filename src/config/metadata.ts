import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://kibal.app"),
  title: "Kibal: Ultimate Parental Control App for Kid's Online Safety",
  description:
    "Protect your children online with Kibal. Block harmful content, track real-time location, and monitor screen time effortlessly. Download Kibal today!",
  openGraph: {
    images: [
      {
        url: "/images/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Kibal: Ultimate Parental Control App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/thumbnail.jpg"],
  },
};
