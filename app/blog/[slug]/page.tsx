import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
    <div className="max-w-4xl mx-auto px-4 py-12 blog-post-page">
      {/* Article Header */}
      <article className="prose prose-lg max-w-none dark:prose-invert blog-article">
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
          <div className="mb-8 text-center">
            <div className="relative w-full max-w-4xl mx-auto h-80 md:h-96">
              <Image 
                src={postContent.featuredImage} 
                alt={postContent.title} 
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {postContent.body ? (
            <div className="blog-content">
              {postContent.body.split('\n').map((paragraph: string, index: number) => {
                if (paragraph.trim() === '') return <br key={index} />;
                
                // Handle headers
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                
                // Handle lists
                if (paragraph.startsWith('- ')) {
                  return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.startsWith('  - ')) {
                  return <li key={index} className="ml-8">{paragraph.replace('  - ', '')}</li>;
                }
                
                // Handle bold text
                if (paragraph.includes('**')) {
                  const parts = paragraph.split('**');
                  return (
                    <p key={index} className="mb-4">
                      {parts.map((part, partIndex) => 
                        partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                      )}
                    </p>
                  );
                }
                
                // Regular paragraph
                return <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400 text-center py-8">
              <p>Content coming soon...</p>
            </div>
          )}
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
          
          {postContent.author && postContent.author !== 'Adam' && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Written by {postContent.author}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
} 