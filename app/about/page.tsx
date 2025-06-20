import { client } from "../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default async function AboutPage() {
  // Try to fetch about page content from TinaCMS
  let aboutContent = null;
  try {
    const aboutResponse = await client.queries.page({ relativePath: "about.md" });
    aboutContent = aboutResponse.data.page;
  } catch (error) {
    // If no about.md exists in content, we'll show default content
    console.log("No about.md found, showing default content");
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ textAlign: "center" as const, marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#333" }}>
          About Me
        </h1>
        <div style={{
          width: "60px",
          height: "4px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          margin: "0 auto"
        }}></div>
      </header>

      {aboutContent ? (
        // If we have content from TinaCMS, render it
        <div style={{ lineHeight: "1.7", fontSize: "1.1rem" }}>
          <TinaMarkdown content={aboutContent.body} />
        </div>
      ) : (
        // Default content if no TinaCMS content exists yet
        <div>
          <section style={{ marginBottom: "3rem" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "3rem",
              alignItems: "center",
              marginBottom: "3rem"
            }}>
              <div style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "4rem",
                fontWeight: "bold"
              }}>
                YN
              </div>
              <div>
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
                  Hello, I'm [Your Name]
                </h2>
                <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#666" }}>
                  A passionate developer and content creator who loves building digital experiences 
                  and sharing knowledge with the community.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#333" }}>My Journey</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#555", marginBottom: "1.5rem" }}>
              I started my journey in web development with a curiosity about how websites work. 
              What began as a hobby quickly grew into a passion for creating meaningful digital experiences. 
              I love the problem-solving aspect of development and the creative process of bringing ideas to life.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#555", marginBottom: "1.5rem" }}>
              When I'm not coding, you'll find me writing about my experiences, exploring new technologies, 
              or working on side projects that challenge me to grow as a developer.
            </p>
          </section>

          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#333" }}>Skills & Technologies</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem"
            }}>
              <div style={skillCardStyle}>
                <h3 style={{ color: "#667eea", marginBottom: "1rem" }}>Frontend</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={skillItemStyle}>React & Next.js</li>
                  <li style={skillItemStyle}>TypeScript</li>
                  <li style={skillItemStyle}>HTML/CSS</li>
                  <li style={skillItemStyle}>Tailwind CSS</li>
                </ul>
              </div>
              <div style={skillCardStyle}>
                <h3 style={{ color: "#667eea", marginBottom: "1rem" }}>Backend</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={skillItemStyle}>Node.js</li>
                  <li style={skillItemStyle}>API Development</li>
                  <li style={skillItemStyle}>Database Design</li>
                  <li style={skillItemStyle}>Authentication</li>
                </ul>
              </div>
              <div style={skillCardStyle}>
                <h3 style={{ color: "#667eea", marginBottom: "1rem" }}>Tools</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={skillItemStyle}>Git & GitHub</li>
                  <li style={skillItemStyle}>VS Code</li>
                  <li style={skillItemStyle}>TinaCMS</li>
                  <li style={skillItemStyle}>Vercel/Netlify</li>
                </ul>
              </div>
            </div>
          </section>

          <section style={{
            background: "#f8f9fa",
            padding: "2rem",
            borderRadius: "12px",
            textAlign: "center" as const
          }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>Let's Work Together</h2>
            <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
              I'm always interested in new opportunities and collaborations. 
              Whether you have a project in mind or just want to connect, I'd love to hear from you.
            </p>
            <a href="/contact" style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "600"
            }}>
              Get In Touch
            </a>
          </section>
        </div>
      )}
    </div>
  );
}

const skillCardStyle = {
  background: "white",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  border: "1px solid #e9ecef"
};

const skillItemStyle = {
  padding: "0.5rem 0",
  color: "#555",
  borderBottom: "1px solid #f0f0f0"
};