import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { notFound } from "next/navigation";

export default async function Page() {
  const client = createClient();
  try {
    const page = await client.getSingle("home_page");
    return <SliceZone slices={page.data.slices} components={components} />;
  } catch (error) {
    notFound();
  }
}
