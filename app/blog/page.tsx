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
  } catch (err) {
    // TinaCMS not available during build, showing empty blog
    posts = [];
  }

  return (
    <div>
      {/* Header Section */}
      <section className="hero">
        <div className="container">
          <h1>Blog</h1>
          <p>
            Thoughts, tutorials, and insights from my journey in cybersecurity and IT. 
            From threat hunting to cloud security, I share what I learn along the way.
          </p>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="projects-grid">
              {posts.map((post) => {
                if (!post) return null;
                return (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post._sys.filename}`}
                    className="card project-card"
                  >
                    <div className="card-body">
                      {post.featuredImage && (
                        <div className="project-thumbnail">
                          <Image 
                            src={post.featuredImage} 
                            alt={post.title}
                            width={400}
                            height={200}
                            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                          />
                        </div>
                      )}
                      <div className="blog-meta">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                        {post.author && (
                          <>
                            <span>•</span>
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                      <h3 className="project-title">{post.title}</h3>
                      {post.excerpt && (
                        <div className="project-description line-clamp-3">
                          {post.excerpt}
                        </div>
                      )}
                      <div className="project-links">
                        <span className="btn btn-primary btn-sm">
                          Read More
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="card text-center">
              <div className="card-body">
                <h2>No blog posts yet</h2>
                <p>
                  I&apos;m working on some great content about cybersecurity, threat hunting, and IT insights. 
                  Check back soon for my first post!
                </p>
                <div className="mt-4">
                  <h3>Coming soon:</h3>
                  <ul className="text-left">
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
      </section>
    </div>
  );
} 