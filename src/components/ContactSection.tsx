import { Check, Copy, ExternalLink, Mail, Pencil, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { DEFAULT_PROFILE, GITHUB_URL, type EditableProfile } from '../data/portfolioData';

interface ContactSectionProps {
  profile: EditableProfile;
  onOpenEditor: () => void;
}

export function ContactSection({ profile, onOpenEditor }: ContactSectionProps) {
  const [copiedKey, setCopiedKey] = useState<'github' | 'draft' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [formFeedback, setFormFeedback] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  const hasCustomEmail =
    profile.email.trim() !== '' && profile.email.trim() !== DEFAULT_PROFILE.email;

  const hasCustomLinkedin =
    profile.linkedin.trim() !== '' && profile.linkedin.trim() !== DEFAULT_PROFILE.linkedin;

  const copyText = async (value: string, key: 'github' | 'draft') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      setCopiedKey(null);
    }
  };

  const handleComposeSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !messageText.trim()) {
      setFormFeedback({
        type: 'error',
        text: 'Please fill in your name, email address, and message.',
      });
      return;
    }

    const formattedMessage = `From: ${senderName.trim()} (${senderEmail.trim()})\n\n${messageText.trim()}`;

    if (hasCustomEmail) {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`);
      const body = encodeURIComponent(formattedMessage);
      window.location.href = `mailto:${profile.email.trim()}?subject=${subject}&body=${body}`;
      setFormFeedback({
        type: 'success',
        text: `Opened email draft addressed to ${profile.email.trim()}.`,
      });
    } else {
      void copyText(formattedMessage, 'draft');
      setFormFeedback({
        type: 'success',
        text: 'Email placeholder is not yet replaced—message draft copied to your clipboard so nothing is lost.',
      });
    }
  };

  return (
    <section id="contact" className="border-t border-slate-800/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-blue-400">05. Contact</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl [text-wrap:balance]">
          Connect &amp; collaborate
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Direct Channels & Placeholders */}
          <div className="glass-surface rounded-2xl p-6 sm:p-7 lg:col-span-5">
            <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <h3 className="font-display text-lg font-semibold text-slate-100">
                Developer Channels
              </h3>
              <button
                type="button"
                onClick={onOpenEditor}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300 whitespace-nowrap shrink-0 transition-colors hover:border-blue-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                Edit Placeholders
              </button>
            </div>

            <div className="mt-5 divide-y divide-slate-800/70">
              {/* Real GitHub Profile */}
              <div className="py-4 first:pt-0">
                <p className="text-xs font-medium text-slate-400">GitHub (Verified Profile)</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-blue-400 transition-colors hover:text-blue-300 break-all"
                  >
                    {GITHUB_URL}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => void copyText(GITHUB_URL, 'github')}
                    aria-label="Copy GitHub URL"
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md border border-slate-700/80 bg-slate-900/70 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-blue-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {copiedKey === 'github' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Editable Email Placeholder */}
              <div className="py-4">
                <p className="text-xs font-medium text-slate-400">
                  Email Address {hasCustomEmail ? '' : '(Editable Placeholder)'}
                </p>
                {hasCustomEmail ? (
                  <a
                    href={`mailto:${profile.email.trim()}`}
                    className="mt-1.5 inline-flex items-center gap-2 font-mono text-sm text-slate-100 hover:text-blue-300"
                  >
                    <Mail className="h-4 w-4 text-blue-400" aria-hidden="true" />
                    {profile.email}
                  </a>
                ) : (
                  <p className="mt-1.5 font-mono text-sm text-blue-300">{profile.email}</p>
                )}
              </div>

              {/* Editable LinkedIn Placeholder */}
              <div className="py-4 last:pb-0">
                <p className="text-xs font-medium text-slate-400">
                  LinkedIn Profile {hasCustomLinkedin ? '' : '(Editable Placeholder)'}
                </p>
                {hasCustomLinkedin ? (
                  <a
                    href={
                      profile.linkedin.startsWith('http')
                        ? profile.linkedin
                        : `https://${profile.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-sm text-slate-100 hover:text-blue-300 break-all"
                  >
                    {profile.linkedin}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  <p className="mt-1.5 font-mono text-sm text-violet-300">{profile.linkedin}</p>
                )}
              </div>
            </div>
          </div>

          {/* Message Draft Composer */}
          <form
            onSubmit={handleComposeSubmit}
            className="glass-surface rounded-2xl p-6 sm:p-7 lg:col-span-7"
          >
            <h3 className="font-display text-lg font-semibold text-slate-100">
              Prepare a Message
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {hasCustomEmail
                ? 'Submitting opens your default mail client addressed to the configured email.'
                : 'Formats and copies your message draft locally until a personal email address is configured.'}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-slate-300">Your Name</span>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-slate-300">Your Email</span>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-xs font-medium text-slate-300">Message</span>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Share a study opportunity, collaboration idea, or question..."
                className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-all hover:from-blue-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {hasCustomEmail ? 'Open Email Draft' : 'Copy Formatted Draft'}
              </button>

              {formFeedback && (
                <p
                  role="status"
                  className={`text-xs font-medium ${
                    formFeedback.type === 'error' ? 'text-rose-400' : 'text-blue-300'
                  }`}
                >
                  {formFeedback.text}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
