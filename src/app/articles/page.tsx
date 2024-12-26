import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../sanity/live";
import { isAuthenticated } from "../firebase/firebase";

const ARTICLES_QUERY = defineQuery(`*[
  _type == "article"
  && defined(slug.current)
]{title, slug}|order(publishDate desc)`);

export default async function IndexPage() {

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    console.log("you are logged in");
  }

  const { data: article } = await sanityFetch({ query: ARTICLES_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Articles</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {article.map((article) => (
          <li className="bg-white p-4 rounded-lg" key={article.title}>
            <Link
              className="hover:underline"
              href={`/articles/${article?.slug.current}`}
            >
              <h2 className="text-xl font-semibold">{article?.title}</h2>
              {article?.publishDate && (
                <p className="text-gray-500">
                  {new Date(article.publishDate).toLocaleDateString()}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}