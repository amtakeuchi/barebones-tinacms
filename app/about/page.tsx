import { client } from "../../tina/__generated__/client";

export default async function AboutPage() {
  let aboutContent;
  
  try {
    const aboutResponse = await client.queries.page({ relativePath: "about.mdx" });
    aboutContent = aboutResponse.data.page;
  } catch (error) {
    console.log("No about.mdx found, showing default content");
    aboutContent = null;
  }

  if (!aboutContent) {
    return (
      <div className="section">
        <h1>About Me</h1>
        <p>I&apos;m a passionate developer who loves building things that make a difference.</p>
        
        <div className="card">
          <div className="card-body">
            <h2>My Journey</h2>
            <p>I started my journey in software development with a curiosity about how things work. Over the years, I&apos;ve worked on various projects ranging from web applications to mobile apps, always focusing on creating user-friendly and efficient solutions.</p>
            
            <h2>What I Do</h2>
            <p>I specialize in full-stack development, with expertise in:</p>
            <ul>
              <li>React and Next.js</li>
              <li>Node.js and TypeScript</li>
              <li>Database design and optimization</li>
              <li>API development and integration</li>
              <li>Cloud deployment and DevOps</li>
            </ul>
            
            <h2>Beyond Code</h2>
            <p>When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source projects, or sharing knowledge through writing and speaking.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div dangerouslySetInnerHTML={{ __html: aboutContent.body }} />
    </div>
  );
} 