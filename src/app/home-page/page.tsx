import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("home_page");

	return <SliceZone slices={page.data.slices} components={components} />;
}