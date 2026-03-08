import Link from "next/link";
import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ProjectFullscreenImage } from "./ProjectFullscreenImage";

export async function generateStaticParams() {
  try {
    const projectsResponse = await client.queries.projectConnection();
    const edges = projectsResponse.data.projectConnection.edges ?? [];
    return edges
      .filter((edge): edge is NonNullable<typeof edge> => edge?.node != null)
      .map((edge) => ({ slug: edge.node!._sys.filename }));
  } catch {
    return [];
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let project: any = null;
  let error = null;

  try {
    const result = await client.queries.project({
      relativePath: `${slug}.md`,
    });
    project = result.data.project;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error = err.message;
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
              <ProjectFullscreenImage 
                src={project.thumbnail} 
                alt={project.title}
              />
            </div>
          )}

          {/* Project Details - Full Width */}
          <div className="project-content">
            <div className="card">
              <div className="card-body">
                <h2>Project Overview</h2>
                {project.description && (
                  <p className="project-description mb-4">{project.description}</p>
                )}
                {project.body && (
                  <div className="project-body prose">
                    <TinaMarkdown content={project.body} />
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