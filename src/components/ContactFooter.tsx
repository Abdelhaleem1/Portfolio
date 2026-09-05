import { useState } from 'react';
import type { FormEvent, FC } from 'react';
import emailjs from '@emailjs/browser';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, Copy, Check, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ContactFooter: FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    // Strict Email Format Validation
    const trimmedEmail = senderEmail.trim();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }
    setEmailError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_dobzk68';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_wr2am52';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'BK_spKOKqjQU3iFkb';

    // If EmailJS credentials are not yet configured in .env, gracefully fallback to mailto
    if (!serviceId || !templateId || !publicKey) {
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=Inquiry%20from%20${encodeURIComponent(
        senderName || 'Portfolio Visitor'
      )}&body=${encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: senderName,
          from_name: senderName,
          email: senderEmail,
          from_email: senderEmail,
          reply_to: senderEmail,
          message: message,
          to_name: PERSONAL_INFO.name,
        },
        publicKey
      );

      setStatus('success');
      setStatusMessage('Message delivered directly to inbox! I will get back to you soon.');
      setSenderName('');
      setSenderEmail('');
      setMessage('');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);
    } catch (err: unknown) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setStatusMessage('Delivery failed via EmailJS. Opening your email client...');
      setTimeout(() => {
        const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=Inquiry%20from%20${encodeURIComponent(
          senderName || 'Portfolio Visitor'
        )}&body=${encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
        setStatus('idle');
      }, 1500);
    }
  };

  return (
    <footer id="contact" className="py-20 relative bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-800">
          
          {/* Left Column: Direct Info (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Let's collaborate on AI & ML systems.
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-md">
                Feel free to reach out for machine learning engineer internships, applied computer vision projects, or research discussions.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              
              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono">Email</div>
                    <div className="text-xs sm:text-sm font-medium text-white font-mono">{PERSONAL_INFO.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-md text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono">Phone / WhatsApp</div>
                    <div className="text-xs sm:text-sm font-medium text-white font-mono">{PERSONAL_INFO.phone}</div>
                  </div>
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="px-2.5 py-1 rounded-md text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                >
                  Call
                </a>
              </div>

              {/* Direct Social Links row in contact section */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66Z" />
                  </svg>
                  <span>LinkedIn Profile</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Clean Form (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="minimal-card p-6 sm:p-7 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white">Send a Message</h3>

              <form onSubmit={handleSendMessage} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={senderEmail}
                      onBlur={() => {
                        const trimmed = senderEmail.trim();
                        if (trimmed && !EMAIL_REGEX.test(trimmed)) {
                          setEmailError('Please enter a valid email address.');
                        } else {
                          setEmailError('');
                        }
                      }}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        if (emailError && EMAIL_REGEX.test(e.target.value.trim())) {
                          setEmailError('');
                        }
                      }}
                      className={`w-full bg-zinc-950 border rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                        emailError
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-zinc-800 focus:border-zinc-600'
                      }`}
                    />
                    {emailError && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                        <span>•</span> {emailError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your role or project inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                  />
                </div>

                {status === 'success' && (
                  <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition-colors shadow-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66Z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
