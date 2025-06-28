import { client } from "../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default async function AboutPage() {
  let aboutContent;

  try {
    const aboutResponse = await client.queries.page({ relativePath: "about.mdx" });
    aboutContent = aboutResponse.data.page;
  } catch (error) {
    // Fallback to static content if TinaCMS is not available
    aboutContent = null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 about-section">
      <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
        {aboutContent && aboutContent.body ? (
          <TinaMarkdown content={aboutContent.body} />
        ) : (
          // Fallback content if MDX is not available
          <div>
            <h1>About Me</h1>
            <p>
              Hey! Nice to meet you. My name is Adam, and this is my personal website. I use it to share the projects I&apos;ve been working on, 
              talk about events, trends, and issues in the cybersecurity/IT landscape, and share what&apos;s going on in my mind through blog posts.
            </p>
            
            <h2>What I Actually Do</h2>
            <p>
              I&apos;m an IT professional who specializes in cybersecurity, particularly in the Cloud, SOC, and penetration testing fields. 
              What sets me apart? I bridge gaps. Having worked alongside (and learned from) everyone from developers to executives to janitors, 
              I understand that not all threats are virtual. The soft skills I&apos;ve honed let me translate tech into action, and action into results. 
              Because at the end of the day, cybersecurity isn&apos;t just about systems; it&apos;s about people.
            </p>
            
            <p>
              But the thing is, I didn&apos;t start out dreaming in code. I got into this because I was curious, stubborn, and apparently enjoy 
              mild torture in the form of troubleshooting complex technical problems at 2 AM.
            </p>

            <h2>My Professional Background</h2>
            <p>
              I hold a diploma (Associate&apos;s Degree for anyone viewing this from the US) in Cyber Defence and Cloud Administration from the 
              Manitoba Institute of Trades & Technology, where I graduated with a 3.8 GPA and a 5th place finish in the Skills Manitoba IT Competition.
            </p>
            
            <h3>Certifications</h3>
            <ul>
              <li>CompTIA Security+</li>
              <li>TryHackMe SOC Analyst Level 1</li>
              <li>Amazon Web Services Cloud Essentials</li>
              <li>Fortinet Certified Associate Cybersecurity</li>
            </ul>
            
            <p>
              My experience spans from hands-on client support and security incident response to developing web solutions that drive user engagement. 
              I&apos;ve successfully managed high-volume technical support scenarios, authored comprehensive incident response plans, assisted with 
              forensic investigations, and delivered security solutions that protect client systems while maintaining operational efficiency.
            </p>

            <h2>The Skills I&apos;ve Picked Up Along The Way</h2>
            
            <h3>Security Operations & Analysis</h3>
            <ul>
              <li>SOC analysis (Splunk, Wazuh, ELK Stack)</li>
              <li>Incident response and forensics</li>
              <li>Network analysis (Wireshark, Zeek)</li>
              <li>Threat intelligence and malware analysis</li>
              <li>MITRE ATT&CK framework</li>
            </ul>

            <h3>Infrastructure & Cloud</h3>
            <ul>
              <li>AWS and Microsoft Azure administration</li>
              <li>Windows Server and Active Directory</li>
              <li>VMware vSphere and ESXi</li>
              <li>Cisco networking</li>
              <li>FortiGate firewalls and VPN</li>
            </ul>

            <h3>Development & Automation</h3>
            <ul>
              <li>Python programming</li>
              <li>Web development</li>
              <li>Linux administration</li>
              <li>Network automation</li>
              <li>Data visualization (R, Tableau)</li>
            </ul>

            <h3>Professional Skills</h3>
            <ul>
              <li>Project management</li>
              <li>Technical writing</li>
              <li>Customer service and support</li>
              <li>Crisis management</li>
              <li>Business acumen and risk management</li>
            </ul>

            <h2>Why I Do This</h2>
            <p>
              Money. HAHAHA nah I&apos;m kidding, every field pays well enough if you perform better than everyone else. 
              There are a couple of real reasons why I do this:
            </p>
            <ul>
              <li>Everyone needs it</li>
              <li>Not everyone can do it</li>
              <li>I enjoy the challenge and problem solving aspects of it</li>
            </ul>
            <p>
              Every problem is different, requiring a unique solution, and there&apos;s something really satisfying about taking 
              something not so great and making it work better than before.
            </p>
            <p>
              I&apos;ve learned that creation isn&apos;t about flawless execution; it&apos;s about being willing to try something, holding on 
              and adapting when things inevitably go wrong, and having the resolve to see things through. It&apos;s the same as the gym, 
              it&apos;s the same as learning new skills, it&apos;s the same as romance: do your best, use the best intentions, know that 
              things go wrong and that it&apos;s okay, and what some would consider &quot;failure&quot; is actually a success (failure is only 
              failure when you quit on something that could have been successful).
            </p>

            <h2>What&apos;s Next</h2>
            <p>
              I&apos;m always working on something new, learning something I didn&apos;t know yesterday, and am always up for the next challenge. 
              Whether building a website (like this one), securing a cloud network, or crafting a new tool to crack a system open, I&apos;m here for it.
            </p>
            <p>
              I&apos;m eager to dive into cybersecurity and join the battle against threat actors, whether it&apos;s working with cloud environments, 
              hunting down threats in a SOC team, breaking (then fixing) systems as a pentester, or responding to incidents while under pressure. 
              If your team needs a junior professional who is hungry to learn and even hungrier to improve, let&apos;s talk. Reach out to me on the 
              contact page, or message me directly through my LinkedIn (click the icon at the bottom of the page).
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 