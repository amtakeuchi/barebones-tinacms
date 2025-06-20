import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to My Portfolio</h1>
        <p>
          Full-stack developer passionate about creating meaningful digital experiences. 
          I write about technology, build projects, and share my journey.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/about" className="btn btn-primary">
            Learn About Me
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <h2>About Me</h2>
        <p>
          I&apos;m a passionate developer who loves building things that make a difference. 
          When I&apos;m not coding, you&apos;ll find me exploring new technologies, writing about 
          what I learn, and contributing to open source projects.
        </p>
        <Link href="/about" className="btn btn-ghost">
          Read More About Me →
        </Link>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="card text-center">
          <div className="card-body">
            <h2>Let&apos;s Connect</h2>
            <p>
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            </p>
            <p>
              <strong>Email:</strong> your.email@example.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}