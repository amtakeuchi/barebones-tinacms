import Link from "next/link";
import { client } from "../../tina/__generated__/client";

async function count(fn: () => Promise<{ length: number }>) {
  try {
    return await fn();
  } catch (_err) {
    return { length: 0 };
  }
}

export default async function WorkPage() {
  const posts = await count(async () => {
    const res = await client.queries.postConnection();
    return { length: (res.data.postConnection.edges ?? []).length };
  });
  const projects = await count(async () => {
    const res = await client.queries.projectConnection();
    return { length: (res.data.projectConnection.edges ?? []).length };
  });

  return (
    <div className="page">
      <div className="wrap">
        <header className="page-head">
          <p className="page-cmd">
            <span className="ps1">adam@securi-tee:~$</span> ls work/
          </p>
          <h1>work</h1>
          <p className="page-lead">
            two shelves. writeups on what i broke and what i held, and the builds i
            shipped. pick one.
          </p>
        </header>

        <div className="feed">
          <Link className="writeup" data-track="offense" href="/blog">
            <span className="date">
              {posts.length} post{posts.length === 1 ? "" : "s"}
            </span>
            <span>
              <h3>blog</h3>
              <p>
                field notes from the two chairs. breaking things, then writing down
                how they held.
              </p>
            </span>
            <span className="go" aria-hidden="true">&rarr;</span>
          </Link>

          <Link className="writeup" data-track="tooling" href="/projects">
            <span className="date">
              {projects.length} project{projects.length === 1 ? "" : "s"}
            </span>
            <span>
              <h3>projects</h3>
              <p>tools and labs i built to prove i could do the job, not just talk about it.</p>
            </span>
            <span className="go" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
