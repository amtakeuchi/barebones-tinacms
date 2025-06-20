'use client'

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Using Formspree (you'll need to replace YOUR_FORM_ID with actual form ID)
      // Alternative: Use Netlify Forms, EmailJS, or your own API endpoint
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ textAlign: "center" as const, marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#333" }}>
          Get In Touch
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          Have a question, project idea, or just want to say hello? 
          I'd love to hear from you and will get back to you as soon as possible.
        </p>
        <div style={{
          width: "60px",
          height: "4px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          margin: "2rem auto 0"
        }}></div>
      </header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        alignItems: "start"
      }}>
        {/* Contact Form */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          border: "1px solid #e9ecef"
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "#333" }}>
            Send a Message
          </h2>
          
          {status === 'success' && (
            <div style={{
              background: "#d4edda",
              color: "#155724",
              padding: "1rem",
              borderRadius: "6px",
              marginBottom: "1.5rem",
              border: "1px solid #c3e6cb"
            }}>
              Thank you! Your message has been sent successfully. I'll get back to you soon.
            </div>
          )}
          
          {status === 'error' && (
            <div style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "6px",
              marginBottom: "1.5rem",
              border: "1px solid #f5c6cb"
            }}>
              Oops! Something went wrong. Please try again or email me directly.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="name" style={labelStyle}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Your full name"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="email" style={labelStyle}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="your.email@example.com"
              />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label htmlFor="message" style={labelStyle}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical" as const,
                  minHeight: "120px"
                }}
                placeholder="Tell me about your project, question, or just say hello..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                ...buttonStyle,
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer'
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div style={{
            background: "#f8f9fa",
            padding: "2rem",
            borderRadius: "12px",
            marginBottom: "2rem"
          }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "#333" }}>
              Other Ways to Connect
            </h3>
            
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "#667eea", marginBottom: "0.5rem" }}>Email</h4>
              <p style={{ color: "#555", margin: 0 }}>
                <a href="mailto:your.email@example.com" style={{ color: "#667eea", textDecoration: "none" }}>
                  your.email@example.com
                </a>
              </p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "#667eea", marginBottom: "0.5rem" }}>Response Time</h4>
              <p style={{ color: "#555", margin: 0 }}>
                I typically respond within 24-48 hours during weekdays.
              </p>
            </div>

            <div>
              <h4 style={{ color: "#667eea", marginBottom: "0.5rem" }}>Social Media</h4>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href="#" style={socialLinkStyle}>GitHub</a>
                <a href="#" style={socialLinkStyle}>LinkedIn</a>
                <a href="#" style={socialLinkStyle}>Twitter</a>
              </div>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "2rem",
            borderRadius: "12px"
          }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Let's Build Something Great
            </h3>
            <p style={{ opacity: 0.9, lineHeight: "1.6" }}>
              Whether you're looking for a development partner, have a technical question, 
              or want to discuss an exciting project, I'm here to help bring your ideas to life.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section style={{
        marginTop: "4rem",
        padding: "2rem",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" as const, color: "#333" }}>
          Frequently Asked Questions
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem"
        }}>
          <div>
            <h3 style={{ color: "#667eea", marginBottom: "0.5rem" }}>
              What type of projects do you work on?
            </h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              I work on web applications, websites, and digital experiences using modern technologies 
              like React, Next.js, and Node.js.
            </p>
          </div>
          
          <div>
            <h3 style={{ color: "#667eea", marginBottom: "0.5rem" }}>
              Do you offer consulting services?
            </h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Yes! I provide technical consulting, code reviews, and architectural guidance 
              for development teams and individual projects.
            </p>
          </div>
          
          <div>
            <h3 style={{ color: "#667eea", marginBottom: "0.5rem" }}>
              What's your typical project timeline?
            </h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Project timelines vary based on scope and complexity. I'll provide a detailed 
              timeline after our initial discussion about your requirements.
            </p>
          </div>
          
          <div>
            <h3 style={{ color: "#667eea", marginBottom: "0.5rem" }}>
              Do you work with remote teams?
            </h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Absolutely! I'm experienced in remote collaboration and use modern tools 
              to ensure smooth communication and project delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "600" as const,
  color: "#333"
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "2px solid #e9ecef",
  borderRadius: "6px",
  fontSize: "1rem",
  transition: "border-color 0.2s",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "0.75rem 2rem",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "600" as const,
  transition: "all 0.2s"
};

const socialLinkStyle = {
  color: "#667eea",
  textDecoration: "none",
  fontWeight: "500" as const,
  transition: "color 0.2s"
};