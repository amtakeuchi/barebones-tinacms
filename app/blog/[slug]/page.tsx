import type { Metadata } from 'next';
import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const postsResponse = await client.queries.postConnection();
    const edges = postsResponse.data.postConnection.edges ?? [];
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
    const postResponse = await client.queries.post({ relativePath: `${params.slug}.mdx` });
    const post = postResponse.data.post;

    const metadata: Metadata = {
      title: `${post.title} | Securi-Tee`,
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
    return { title: 'Securi-Tee' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = params.slug;
  let postContent;

  try {
    const postResponse = await client.queries.post({ relativePath: `${slug}.mdx` });
    postContent = postResponse.data.post;
  } catch (error) {
    return notFound();
  }

  if (!postContent) return notFound();

  return (
    <div className="blog-post-page">
      {/* Article Header */}
      <article className="blog-article">
        <header className="mb-4">
          <h1>{postContent.title}</h1>

          <div className="post-meta">
            <time dateTime={postContent.date}>
              {new Date(postContent.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {postContent.author && (
              <>
                <span className="post-meta-sep">•</span>
                <span>{postContent.author}</span>
              </>
            )}
          </div>

          {postContent.excerpt && (
            <p className="post-excerpt">
              {postContent.excerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {postContent.featuredImage && (
          <div className="post-image-outer">
            <div className="post-image-container">
              <Image
                src={postContent.featuredImage}
                alt={postContent.title}
                width={1200}
                height={600}
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="post-featured-img"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="blog-content">
          {postContent.body ? (
            <TinaMarkdown content={postContent.body} />
          ) : (
            <div className="post-empty">
              <p>Content coming soon...</p>
            </div>
          )}
        </div>
      </article>

      {/* Article Footer */}
      <footer className="post-footer">
        <div className="post-footer-row">
          <Link
            href="/blog"
            className="back-link"
          >
            <svg className="back-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {postContent.author && postContent.author !== 'Adam' && (
            <div className="post-author-credit">
              Written by {postContent.author}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
} 