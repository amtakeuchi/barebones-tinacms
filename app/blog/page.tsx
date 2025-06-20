import Link from "next/link";
import { client } from "../../tina/__generated__/client";

export default async function BlogPage() {
  let posts: any[] = [];
  
  try {
    const postsResponse = await client.queries.postConnection();
    posts = (postsResponse.data.postConnection.edges ?? [])
      .filter((edge): edge is NonNullable<typeof edge> => edge !== null && edge.node !== null)
      .map((edge) => edge.node);
  } catch (error) {
    console.log("TinaCMS not available during build, showing empty blog");
  }

  return (
    <div className="section">
      <div className="section-header">
        <h1 className="section-title">Blog</h1>
        <p>Thoughts, tutorials, and insights from my journey in development and cybersecurity.</p>
      </div>
      
      <div className="grid grid-2">
        {posts.map((post) => {
          if (!post) return null;
          return (
            <article key={post.id} className="blog-card">
              <div className="card-body">
                <div className="blog-meta">
                  {post.date && new Date(post.date).toLocaleDateString()}
                  {post.author && ` • ${post.author}`}
                </div>
                <h3>
                  <Link href={`/blog/${post._sys.filename}`}>
                    {post.title}
                  </Link>
                </h3>
                <p>
                  {post.excerpt || "Click to read more..."}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center p-4">
          <p>No blog posts yet. Start writing your first post!</p>
        </div>
      )}
    </div>
  );
} 