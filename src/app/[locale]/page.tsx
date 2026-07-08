import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";


export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return <SliceZone slices={page.data.slices} components={components} />;
}