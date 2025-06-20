import Link from "next/link";
import { client } from "../../tina/__generated__/client";

export default async function BlogPage() {
  const postsResponse = await client.queries.postConnection({
    sort: "date"
  });
  
  const posts = postsResponse.data.postConnection.edges;

  return (
    <div>
      <header style={{ textAlign: "center" as const, marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#333" }}>
          Blog
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          Thoughts, tutorials, and insights from my journey as a developer and creator.
        </p>
        <div style={{
          width: "60px",
          height: "4px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          margin: "2rem auto 0"
        }}></div>
      </header>

      {posts.length > 0 ? (
        <div style={{
          display: "grid",
          gap: "2rem",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          {posts.map((post, index) => (
            <article key={post.node.id} style={{
              ...cardStyle,
              animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
            }}>
              <div style={{ marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
                  <Link 
                    href={`/posts/${post.node._sys.filename}`}
                    style={{ 
                      textDecoration: "none", 
                      color: "#333",
                      transition: "color 0.2s"
                    }}
                  >
                    {post.node.title}
                  </Link>
                </h2>
                <div style={{ 
                  display: "flex", 
                  gap: "1rem", 
                  alignItems: "center",
                  color: "#666",
                  fontSize: "0.9rem"
                }}>
                  <time dateTime={post.node.date}>
                    {new Date(post.node.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.node.tags && (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {post.node.tags.map((tag: string) => (
                        <span key={tag} style={tagStyle}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <p style={{ 
                color: "#555", 
                lineHeight: "1.6",
                marginBottom: "1.5rem"
              }}>
                {post.node.excerpt || "Click to read this post..."}
              </p>
              
              <Link 
                href={`/posts/${post.node._sys.filename}`}
                style={readMoreStyle}
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: "center" as const,
          padding: "4rem 2rem",
          background: "#f8f9fa",
          borderRadius: "12px",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
            No Posts Yet
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
            This is where your blog posts will appear. Start writing your first post to see it here!
          </p>
          <p style={{ fontSize: "1rem", color: "#888" }}>
            You can create new posts using the TinaCMS admin interface at <code>/admin</code>
          </p>
        </div>
      )}

      {/* Blog Categories/Tags Section */}
      {posts.length > 0 && (
        <section style={{
          marginTop: "4rem",
          padding: "2rem",
          background: "#f8f9fa",
          borderRadius: "12px",
          textAlign: "center" as const
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#333" }}>
            Explore Topics
          </h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            Browse posts by category or tag to find exactly what you're looking for.
          </p>
          {/* You can add tag filtering functionality here later */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
            {/* Extract unique tags from posts */}
            {Array.from(new Set(
              posts.flatMap(post => post.node.tags || [])
            )).map((tag: string) => (
              <span key={tag} style={{
                ...tagStyle,
                cursor: "pointer",
                transition: "all 0.2s"
              }}>
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "1px solid #e9ecef",
  transition: "transform 0.2s, box-shadow 0.2s"
};

const tagStyle = {
  background: "#e3f2fd",
  color: "#1976d2",
  padding: "0.25rem 0.75rem",
  borderRadius: "20px",
  fontSize: "0.8rem",
  fontWeight: "500" as const
};

const readMoreStyle = {
  color: "#667eea",
  textDecoration: "none",
  fontWeight: "600" as const,
  fontSize: "1rem",
  transition: "color 0.2s"
};