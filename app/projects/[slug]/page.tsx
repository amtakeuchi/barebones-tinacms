import Link from "next/link";
import Image from "next/image";
import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export async function generateStaticParams() {
  try {
    const res = await client.queries.projectConnection();
    const edges = res.data.projectConnection.edges ?? [];
    return edges
      .filter((edge): edge is NonNullable<typeof edge> => edge?.node != null)
      .map((edge) => ({ slug: edge.node!._sys.filename }));
  } catch {
    return [];
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let project: any = null;
  try {
    const res = await client.queries.project({ relativePath: `${params.slug}.md` });
    project = res.data.project;
  } catch (_err) {
    return notFound();
  }
  if (!project) return notFound();

  return (
    <article className="page">
      <div className="wrap prose-wrap">
        <p className="article-back">
          <Link href="/projects">&larr; projects</Link>
        </p>

        <header className="article-head">
          {project.category && <p className="article-meta">{project.category}</p>}
          <h1>{project.title}</h1>
          {project.description && (
            <p className="article-excerpt">{project.description}</p>
          )}
        </header>

        {project.thumbnail && (
          <Image
            className="article-img"
            src={project.thumbnail}
            alt={project.title}
            width={1200}
            height={630}
            quality={90}
            sizes="(max-width: 768px) 100vw, 44rem"
            priority
          />
        )}

        {project.body && (
          <div className="prose">
            <TinaMarkdown content={project.body} />
          </div>
        )}

        <div className="article-links">
          {project.repoLink && (
            <a
              className="text-link"
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              source <span className="arrow" aria-hidden="true">&rarr;</span>
            </a>
          )}
          {project.liveLink && (
            <a
              className="text-link"
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              live <span className="arrow" aria-hidden="true">&rarr;</span>
            </a>
          )}
          <Link className="text-link" href="/projects">
            all projects <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
