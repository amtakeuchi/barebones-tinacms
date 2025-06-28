import Link from "next/link";
import Image from "next/image";
import { client } from "../../tina/__generated__/client";

export default async function ProjectsPage() {
  let projects: any[] = [];
  let error = null;

  try {
    const result = await client.queries.projectConnection();
    projects = result.data.projectConnection.edges
      ?.map(edge => edge?.node)
      .filter((project): project is any => project !== null && project !== undefined) || [];
  } catch (err) {
    // Failed to fetch projects
    projects = [];
  }

  return (
    <div>
      {/* Header */}
      <section className="hero">
        <h1>My Projects</h1>
        <p>
          A collection of cybersecurity projects, tools, and research I&apos;ve worked on. 
          From threat analysis to defensive strategies, these projects represent my journey in digital security.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="section">
        {error ? (
          <div className="card">
            <div className="card-body">
              <h2>Unable to Load Projects</h2>
              <p>There was an error loading the projects. Please try again later.</p>
              <p><small>Error: {error}</small></p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="card">
            <div className="card-body text-center">
              <h2>No Projects Yet</h2>
              <p>I haven&apos;t added any projects yet. Check back soon!</p>
              <Link href="/admin" className="btn btn-primary">
                Add Your First Project
              </Link>
            </div>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project: any) => (
              <Link 
                key={project.id} 
                href={`/projects/${project._sys.filename}`}
                className="card project-card"
              >
                <div className="card-body">
                  {project.thumbnail && (
                    <div className="project-thumbnail">
                      <Image 
                        src={project.thumbnail} 
                        alt={project.title}
                        width={400}
                        height={200}
                        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </div>
                  )}
                  <h3>{project.title}</h3>
                  {project.category && (
                    <span className="project-category">{project.category}</span>
                  )}
                  {project.description && (
                    <div className="project-description line-clamp-3">
                      {typeof project.description === 'string' 
                        ? project.description 
                        : 'Project description available'
                      }
                    </div>
                  )}
                  <div className="project-links">
                    <span className="btn btn-primary btn-sm">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="card text-center">
          <div className="card-body">
            <h2>Have a Project in Mind?</h2>
            <p>
              Interested in collaborating on a cybersecurity project or discussing security challenges? 
              I&apos;m always open to new opportunities and interesting problems to solve.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 