import Link from "next/link";
import { client } from "../../tina/__generated__/client";

export default async function ProjectsPage() {
  // Get posts that are tagged as projects or have "project" in categories
  const postsResponse = await client.queries.postConnection({
    sort: "date"
  });
  
  // Filter for project posts - you can adjust this logic based on how you categorize projects
  const projectPosts = postsResponse.data.postConnection.edges.filter(post => {
    const tags = post.node.tags || [];
    const categories = post.node.categories || [];
    return tags.some(tag => tag.toLowerCase().includes('project')) ||
           categories.some(cat => cat.toLowerCase().includes('project')) ||
           post.node.title.toLowerCase().includes('project');
  });

  return (
    <div>
      <header style={{ textAlign: "center" as const, marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#333" }}>
          Projects
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "700px", margin: "0 auto" }}>
          A showcase of my work, experiments, and creative endeavors. 
          Each project represents a step in my journey as a developer.
        </p>
        <div style={{
          width: "60px",
          height: "4px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          margin: "2rem auto 0"
        }}></div>
      </header>

      {projectPosts.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {projectPosts.map((project, index) => (
            <article key={project.node.id} style={{
              ...projectCardStyle,
              animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
            }}>
              {/* Project Image Placeholder */}
              <div style={{
                height: "200px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "3rem",
                fontWeight: "bold"
              }}>
                📁
              </div>
              
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  <Link 
                    href={`/posts/${project.node._sys.filename}`}
                    style={{ 
                      textDecoration: "none", 
                      color: "#333",
                      transition: "color 0.2s"
                    }}
                  >
                    {project.node.title}
                  </Link>
                </h2>
                
                <div style={{ 
                  display: "flex", 
                  gap: "1rem", 
                  alignItems: "center",
                  color: "#666",
                  fontSize: "0.9rem",
                  marginBottom: "1rem"
                }}>
                  <time dateTime={project.node.date}>
                    {new Date(project.node.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </time>
                  {project.node.tags && (
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {project.node.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} style={tagStyle}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <p style={{ 
                  color: "#555", 
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                  fontSize: "0.95rem"
                }}>
                  {project.node.excerpt || "Click to learn more about this project..."}
                </p>
                
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Link 
                    href={`/posts/${project.node._sys.filename}`}
                    style={primaryButtonStyle}
                  >
                    View Details
                  </Link>
                  {/* You can add demo/github links here if they're in your post frontmatter */}
                </div>
              </div>
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
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚀</div>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
            Projects Coming Soon
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
            I'm working on some exciting projects that I can't wait to share with you. 
            Check back soon to see what I've been building!
          </p>
          <p style={{ fontSize: "1rem", color: "#888" }}>
            To add projects, create blog posts and tag them with "project" or include "project" in the title.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <section style={{
        marginTop: "4rem",
        padding: "3rem 2rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        textAlign: "center" as const,
        color: "white"
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Have a Project Idea?
        </h2>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: "2rem" }}>
          I'm always interested in collaborating on interesting projects. 
          Let's discuss how we can work together!
        </p>
        <Link href="/contact" style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          background: "white",
          color: "#667eea",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "600",
          transition: "transform 0.2s"
        }}>
          Start a Conversation
        </Link>
      </section>
    </div>
  );
}

const projectCardStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "1px solid #e9ecef",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer"
};

const tagStyle = {
  background: "#e8f5e8",
  color: "#2e7d32",
  padding: "0.25rem 0.75rem",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: "500" as const
};

const primaryButtonStyle = {
  background: "#667eea",
  color: "white",
  padding: "0.5rem 1.5rem",
  textDecoration: "none",
  borderRadius: "6px",
  fontSize: "0.9rem",
  fontWeight: "600" as const,
  transition: "background 0.2s"
};