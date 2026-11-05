import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPages, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageView } from "@/components/PageView";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPages()
    .filter((p) => p.path !== "/")
    .map((p) => ({ slug: p.path.split("/").filter(Boolean) }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(`/${slug.join("/")}`);
  return page ? pageMetadata(page) : {};
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = getPage(`/${slug.join("/")}`);
  if (!page) notFound();
  return <PageView page={page} />;
}
