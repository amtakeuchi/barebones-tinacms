import { client } from "../../tina/__generated__/client";
import { notFound } from "next/navigation";

export default async function ContactPage() {
  let contactContent;
  
  try {
    const contactResponse = await client.queries.page({ relativePath: "contact.mdx" });
    contactContent = contactResponse.data.page;
  } catch (error) {
    console.log("No contact.mdx found, showing default content");
    contactContent = null;
  }

  if (!contactContent) {
    return (
      <div className="section">
        <h1>Contact Me</h1>
        <p>Get in touch! I'd love to hear from you about projects, collaborations, or just to say hello.</p>
        
        <div className="card">
          <div className="card-body">
            <h2>Ways to Connect</h2>
            <ul>
              <li><strong>Email</strong>: your.email@example.com</li>
              <li><strong>LinkedIn</strong>: <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">Your LinkedIn Profile</a></li>
              <li><strong>GitHub</strong>: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">Your GitHub</a></li>
              <li><strong>Twitter</strong>: <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">@yourhandle</a></li>
            </ul>
            
            <h2>Let's Work Together</h2>
            <p>I'm always interested in new opportunities and exciting projects. Whether you have a specific project in mind or just want to discuss possibilities, feel free to reach out!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div dangerouslySetInnerHTML={{ __html: contactContent.body }} />
    </div>
  );
} 