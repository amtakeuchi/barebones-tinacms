'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // For now, we'll just simulate a successful submission
      // You can later connect this to an email service or API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Header */}
      <section className="hero">
        <h1>Get In Touch</h1>
        <p>
          Have a cybersecurity question, want to collaborate on a project, or just want to chat about security? 
          I&apos;d love to hear from you!
        </p>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="card">
          <div className="card-body">
            <h2>Send Me a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="alert alert-success">
                <p>Thank you for your message! I&apos;ll get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="alert alert-error">
                <p>Sorry, there was an error sending your message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Tell me about your project, question, or just say hello!"
                  rows={6}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section">
        <div className="card">
          <div className="card-body">
            <h2>Other Ways to Connect</h2>
            <p>
              While I prefer messages through this form, you can also find me on:
            </p>
            <ul>
              <li><strong>LinkedIn:</strong> Connect with me professionally</li>
              <li><strong>GitHub:</strong> Check out my open source contributions</li>
              <li><strong>Blog:</strong> Read my latest thoughts on cybersecurity</li>
            </ul>
            <p>
              <em>Note: I typically respond to messages within 24-48 hours.</em>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 