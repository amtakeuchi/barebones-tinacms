import Link from "next/link";
import { client } from "../../tina/__generated__/client";

export default async function ProjectsPage() {
  const projectsResponse = await client.queries.projectConnection();
  const projects = (projectsResponse.data.projectConnection.edges ?? [])
    .filter((edge): edge is NonNullable<typeof edge> => edge !== null && edge.node !== null)
    .map((edge) => edge.node);

  return (
    <div className="section">
      <div className="section-header">
        <h1 className="section-title">Projects</h1>
        <p>A collection of my work and side projects.</p>
      </div>
      
      <div className="grid grid-3">
        {projects.map((project) => (
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
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center p-4">
          <p>No projects yet. Start adding your first project!</p>
        </div>
      )}
    </div>
  );
} 