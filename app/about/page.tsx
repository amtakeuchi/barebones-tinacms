import { client } from "../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default async function AboutPage() {
  let about;
  try {
    const res = await client.queries.page({ relativePath: "about.mdx" });
    about = res.data.page;
  } catch (_err) {
    about = null;
  }

  return (
    <div className="page">
      <div className="wrap prose-wrap">
        <header className="page-head">
          <p className="page-cmd">
            <span className="ps1">adam@securi-tee:~$</span> whoami --long
          </p>
          <h1>about</h1>
        </header>

        <div className="prose">
          {about?.body ? (
            <TinaMarkdown content={about.body} />
          ) : (
            <p>
              adam takeuchi. cybersecurity analyst. self-taught, building full-time,
              betting on myself.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
