import Link from "next/link";
import { client } from "../tina/__generated__/client";

export default async function HomePage() {
  // Fetch latest blog posts and projects
  const postsResponse = await client.queries.postConnection();
  const latestPosts = postsResponse.data.postConnection.edges.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        textAlign: "center" as const,
        padding: "4rem 0",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        borderRadius: "12px",
        marginBottom: "4rem"
      }}>
        <h1 style={{
          fontSize: "3rem",
          margin: "0 0 1rem 0",
          fontWeight: "bold"
        }}>
          Welcome to My Website
        </h1>
        <p style={{
          fontSize: "1.2rem",
          margin: "0 0 2rem 0",
          opacity: 0.9
        }}>
          Developer, Writer, Creator - Sharing my journey through code and creativity
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/about" style={buttonStyle}>
            Learn About Me
          </Link>
          <Link href="/projects" style={{...buttonStyle, background: "transparent", border: "2px solid white"}}>
            View My Work
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>About Me</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#666", marginBottom: "1.5rem" }}>
          I'm passionate about creating digital experiences and sharing knowledge through writing. 
          When I'm not coding, you'll find me exploring new technologies and working on exciting projects.
        </p>
        <Link href="/about" style={linkButtonStyle}>
          Read More About Me →
        </Link>
      </section>

      {/* Latest Blog Posts */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>Latest Blog Posts</h2>
          <Link href="/blog" style={linkButtonStyle}>
            View All Posts →
          </Link>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          {latestPosts.map((post) => (
            <article key={post.node.id} style={cardStyle}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                <Link href={`/posts/${post.node._sys.filename}`} style={{ textDecoration: "none", color: "#333" }}>
                  {post.node.title}
                </Link>
              </h3>
              <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
                {new Date(post.node.date).toLocaleDateString()}
              </p>
              <p style={{ color: "#555", lineHeight: "1.5" }}>
                {post.node.excerpt || "Click to read more..."}
              </p>
            </article>
          ))}
        </div>

        {latestPosts.length === 0 && (
          <p style={{ textAlign: "center" as const, color: "#666", padding: "2rem" }}>
            No blog posts yet. Start writing your first post!
          </p>
        )}
      </section>

      {/* CTA Section */}
      <section style={{
        background: "#f8f9fa",
        padding: "3rem",
        borderRadius: "12px",
        textAlign: "center" as const
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Let's Connect</h2>
        <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
          Have a project in mind or just want to say hello? I'd love to hear from you.
        </p>
        <Link href="/contact" style={buttonStyle}>
          Get In Touch
        </Link>
      </section>
    </div>
  );
}

const buttonStyle = {
  display: "inline-block",
  padding: "0.75rem 2rem",
  background: "white",
  color: "#667eea",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "600" as const,
  transition: "transform 0.2s"
};

const linkButtonStyle = {
  color: "#667eea",
  textDecoration: "none",
  fontWeight: "600" as const,
  fontSize: "1rem"
};

const cardStyle = {
  background: "white",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  border: "1px solid #e9ecef"
};