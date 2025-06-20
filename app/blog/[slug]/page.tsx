import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back to Blog Link */}
      <div className="mb-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="prose prose-lg max-w-none dark:prose-invert">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {postContent.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <time dateTime={postContent.date}>
              {new Date(postContent.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {postContent.author && (
              <>
                <span className="mx-2">•</span>
                <span>{postContent.author}</span>
              </>
            )}
          </div>

          {postContent.excerpt && (
            <p className="text-lg text-gray-700 dark:text-gray-300 italic border-l-4 border-blue-500 pl-4 mb-6">
              {postContent.excerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {postContent.featuredImage && (
          <div className="mb-8">
            <img 
              src={postContent.featuredImage} 
              alt={postContent.title} 
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <TinaMarkdown content={postContent.body} />
        </div>
      </article>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Written by {postContent.author || 'Adam'}
          </div>
        </div>
      </footer>
    </div>
  );
} 