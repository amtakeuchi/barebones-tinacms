import Link from "next/link";
import { client } from "../tina/__generated__/client";

export default async function HomePage() {
  // Fetch latest blog posts and projects
  const postsResponse = await client.queries.postConnection();
  const projectsResponse = await client.queries.projectConnection();
  
  const latestPosts = (postsResponse.data.postConnection.edges ?? [])
    .filter((edge) => edge && edge.node)
    .slice(0, 3);
  const featuredProjects = (projectsResponse.data.projectConnection.edges ?? [])
    .filter((edge) => edge && edge.node && edge.node.featured)
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to My Portfolio</h1>
        <p>
          Full-stack developer passionate about creating meaningful digital experiences. 
          I write about technology, build projects, and share my journey.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/about" className="btn btn-primary">
            Learn About Me
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            View My Work
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <h2>About Me</h2>
        <p>
          I'm a passionate developer who loves building things that make a difference. 
          When I'm not coding, you'll find me exploring new technologies, writing about 
          what I learn, and contributing to open source projects.
        </p>
        <Link href="/about" className="btn btn-ghost">
          Read More About Me →
        </Link>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <Link href="/projects" className="btn btn-ghost">
              View All Projects →
            </Link>
          </div>
          
          <div className="grid grid-3">
            {featuredProjects.map((projectEdge) => {
              if (!projectEdge || !projectEdge.node) return null;
              const project = projectEdge.node;
              return (
                <article key={project.id} className="project-card">
                  {project.featuredImage && (
                    <img 
                      src={project.featuredImage} 
                      alt={project.title}
                      className="project-image"
                    />
                  )}
                  <div className="project-content">
                    <h3 className="project-title">
                      <Link href={`/projects/${project._sys.filename}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="project-description">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="project-tech">
                        {project.technologies.split(',').map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="project-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Latest Blog Posts</h2>
          <Link href="/blog" className="btn btn-ghost">
            View All Posts →
          </Link>
        </div>
        
        <div className="grid grid-2">
          {latestPosts.map((postEdge) => {
            if (!postEdge || !postEdge.node) return null;
            const post = postEdge.node;
            return (
              <article key={post.id} className="blog-card">
                <div className="card-body">
                  <div className="blog-meta">
                    {post.date && new Date(post.date).toLocaleDateString()}
                    {post.author && ` • ${post.author}`}
                  </div>
                  <h3>
                    <Link href={`/posts/${post._sys.filename}`}>
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

        {latestPosts.length === 0 && (
          <div className="text-center p-4">
            <p>No blog posts yet. Start writing your first post!</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="card text-center">
          <div className="card-body">
            <h2>Let's Connect</h2>
            <p>
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}