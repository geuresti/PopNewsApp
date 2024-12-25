import { client } from "../../sanity/client";
import { sanityFetch } from "../../sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const ARTICLES_QUERY = defineQuery(`*[ 
    _type == "article" && 
    slug.current == $slug ]
    [0]{title, details, publishDate, author, image, tags}`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: article } = await sanityFetch({
    query: ARTICLES_QUERY,
    params: { slug: (await params).slug },
  });
  
  if (!article) {
    notFound();
  }
  const {
    title,
    publishDate,
    author,
    image,
    details,
    tags,
  } = article;
  
  //console.log("QUERY RESULTS:", article)

  const articleImageUrl = image
    ? urlFor(image)?.width(550).height(310).url()
    : null;

 // const articleDate = new Date(publishDate).toDateString();

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div>{title}</div>
      <div className="mb-4">
        <Link href="/">← Back to Home</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={articleImageUrl || "https://placehold.co/550x310/png"}
          alt={title || "Event"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {title ? (
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 capitalize">
                <p> hehh? </p>
              </div>
            ) : null}
            {title ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">
                {title}
              </h1>
            ) : null}
            {author?.title ? (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                <dd className="font-semibold">Artist</dd>
                <dt>{author?.title}</dt>
              </dl>
            ) : null}
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
              <dd className="font-semibold">Date</dd>
              <div>
                <p> {publishDate} </p>
              </div>
            </dl>
          </div>
          {details && details.length > 0 && (
            <div className="prose max-w-none">
              <PortableText value={details} />
            </div>
          )}
          <p> {tags} </p>

        </div>
      </div>
    </main>
  );
}