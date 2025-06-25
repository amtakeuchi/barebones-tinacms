import Link from "next/link";
import Image from "next/image";
import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  let project: any = null;
  let error = null;

  try {
    const result = await client.queries.project({
      relativePath: `${params.slug}.md`,
    });
    project = result.data.project;
  } catch (err: any) {
    error = err.message;
    console.error("Failed to fetch project:", err);
  }

  if (!project || error) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <section className="hero">
        <div className="container">
          <Link href="/projects" className="btn btn-ghost mb-4">
            ← Back to Projects
          </Link>
          <h1>{project.title}</h1>
          {project.category && (
            <span className="project-category">{project.category}</span>
          )}
        </div>
      </section>

      {/* Project Content */}
      <section className="section">
        <div className="container">
          {/* Project Image - Full Width */}
          {project.thumbnail && (
            <div className="project-hero-image mb-6">
              <Image 
                src={project.thumbnail} 
                alt={project.title}
                width={1200}
                height={600}
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                className="project-image-clickable"
              />
            </div>
          )}

          {/* Project Details - Full Width */}
          <div className="project-content">
            <div className="card">
              <div className="card-body">
                <h2>Project Overview</h2>
                {project.description && (
                  <div className="project-description">
                    {typeof project.description === 'string' 
                      ? project.description 
                      : project.description.children?.map((child: any, index: number) => {
                          if (child.type === 'p') {
                            return (
                              <p key={index} className="mb-4">
                                {child.children?.map((textChild: any, textIndex: number) => (
                                  <span key={textIndex}>{textChild.text}</span>
                                ))}
                              </p>
                            );
                          }
                          return null;
                        }) || 'Project description available'
                    }
                  </div>
                )}
                
                <div className="project-links">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Live Demo
                    </a>
                  )}
                  {project.repoLink && (
                    <a 
                      href={project.repoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Projects */}
      <section className="section">
        <div className="container text-center">
          <Link href="/projects" className="btn btn-ghost">
            ← Back to All Projects
          </Link>
        </div>
      </section>
    </div>
  );
} 