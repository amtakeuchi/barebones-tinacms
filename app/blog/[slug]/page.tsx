import type { Metadata } from "next";
import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const res = await client.queries.postConnection();
    const edges = res.data.postConnection.edges ?? [];
    return edges
      .filter((edge): edge is NonNullable<typeof edge> => edge?.node != null)
      .map((edge) => ({ slug: edge.node!._sys.filename }));
  } catch {
    return [];
  }
}

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const res = await client.queries.post({ relativePath: `${params.slug}.mdx` });
    const post = res.data.post;
    const metadata: Metadata = {
      title: `${post.title} · securi-tee`,
      description: post.excerpt ?? undefined,
    };
    if (post.featuredImage) {
      metadata.openGraph = {
        title: post.title,
        description: post.excerpt ?? undefined,
        images: [{ url: post.featuredImage }],
      };
    }
    return metadata;
  } catch {
    return { title: "securi-tee" };
  }
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  try {
    const res = await client.queries.post({ relativePath: `${params.slug}.mdx` });
    post = res.data.post;
  } catch (_err) {
    return notFound();
  }
  if (!post) return notFound();

  const author = post.author && post.author !== "Adam" ? post.author : null;

  return (
    <article className="page">
      <div className="wrap prose-wrap">
        <p className="article-back">
          <Link href="/blog">&larr; blog</Link>
        </p>

        <header className="article-head">
          <p className="article-meta">
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            {author && <> &middot; {author}</>}
          </p>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="article-excerpt">{post.excerpt}</p>}
        </header>

        {post.featuredImage && (
          <Image
            className="article-img"
            src={post.featuredImage}
            alt={post.title}
            width={1200}
            height={630}
            quality={90}
            sizes="(max-width: 768px) 100vw, 44rem"
            priority
          />
        )}

        <div className="prose">
          {post.body ? (
            <TinaMarkdown content={post.body} />
          ) : (
            <p>write-up in progress.</p>
          )}
        </div>

        <div className="article-links">
          <Link className="text-link" href="/blog">
            more write-ups <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
