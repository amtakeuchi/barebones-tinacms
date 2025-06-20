import Link from "next/link";
import Image from "next/image";
import { client } from "../../tina/__generated__/client";

export default async function BlogPage() {
  let posts: any[] = [];
  
  try {
    const postsResponse = await client.queries.postConnection();
    const allPosts = (postsResponse.data.postConnection.edges ?? [])
      .filter((edge): edge is NonNullable<typeof edge> => edge !== null && edge.node !== null)
      .map((edge) => edge.node)
      .filter((post) => post && post.date) as Array<{ date: string; [key: string]: any }>;
    
    posts = allPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Sort by date, newest first
    });
  } catch (error) {
    console.log("TinaCMS not available during build, showing empty blog");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Blog</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Thoughts, tutorials, and insights from my journey in cybersecurity and IT. 
          From threat hunting to cloud security, I share what I learn along the way.
        </p>
      </section>
      
      {/* Blog Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-8">
          {posts.map((post) => {
            if (!post) return null;
            return (
              <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                {post.featuredImage && (
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {post.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    <Link 
                      href={`/blog/${post._sys.filename}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  <Link 
                    href={`/blog/${post._sys.filename}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No blog posts yet</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I&apos;m working on some great content about cybersecurity, threat hunting, and IT insights. 
              Check back soon for my first post!
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Coming soon:</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Threat hunting techniques and tools</li>
                <li>• Cloud security best practices</li>
                <li>• SOC analyst insights and tips</li>
                <li>• Career advice for cybersecurity professionals</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 