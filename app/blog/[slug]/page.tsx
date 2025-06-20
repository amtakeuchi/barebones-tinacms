import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface BlogPostPageProps {
  params: { slug: string };
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
    <div className="section">
      <article className="prose mx-auto">
        <h1>{postContent.title}</h1>
        <div className="blog-meta mb-4">
          {postContent.date && new Date(postContent.date).toLocaleDateString()}
          {postContent.author && ` • ${postContent.author}`}
        </div>
        {postContent.featuredImage && (
          <img src={postContent.featuredImage} alt={postContent.title} className="mb-6 rounded-lg" />
        )}
        <TinaMarkdown content={postContent.body} />
      </article>
    </div>
  );
} 