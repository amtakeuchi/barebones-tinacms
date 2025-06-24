import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero text-center">
        <h1>Welcome to Securi-Tee</h1>
        <p className="mt-2">
          Project portfolio & personal blog. This is my digital workspace, where I document cybersecurity projects, share insights about emerging threats, 
          and explore solutions to real-world IT challenges.
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-4">
          <Link href="/projects" className="btn btn-primary">
            See What I&apos;ve Been Working On
          </Link>
        </div>
      </section>

      {/* About Me Preview */}
      <section className="section">
        <h2>About Me</h2>
        <p>
          I&apos;m a cybersecurity professional passionate about threat analysis, incident response, and offensive and defensive security. 
          I created this site to share my findings, document things I find interesting, and explore evolving challenges in digital security.
        </p>
        <Link href="/about" className="btn btn-ghost mt-2">
          Learn More About Me →
        </Link>
      </section>

      {/* Blog Preview */}
      <section className="section">
        <h2>Blog Posts</h2>
        <p>
          Here I share my inner thoughts, insights, and solutions on everything! Be it emerging cybersecurity threats, vulnerability breakdowns, SOC workflows, or real-world defensive strategies. 
          It&apos;s a growing collection of notes, reflections, and lessons I&apos;m learning or have learned on the road to becoming a stronger security analyst.
        </p>
        <Link href="/blog" className="btn btn-ghost mt-2">
          Read my Blog →
        </Link>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="card text-center">
          <div className="card-body">
            <h2>Let&apos;s Connect</h2>
            <p className="mt-2">
              Want to connect, collaborate, or chat about security challenges? I&apos;d love to hear from you.
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
