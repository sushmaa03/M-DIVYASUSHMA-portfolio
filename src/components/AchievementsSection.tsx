import { Pencil } from 'lucide-react';
import { motion } from 'motion/react';
import { LEARNING_MILESTONES, type EditableProfile } from '../data/portfolioData';

interface AchievementsSectionProps {
  profile: EditableProfile;
  onOpenEditor: () => void;
}

export function AchievementsSection({ profile, onOpenEditor }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="border-t border-slate-800/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-blue-400">04. Achievements &amp; Milestones</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl [text-wrap:balance]">
          Honest learning milestones &amp; future credentials
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Documenting steady first-year progress transparently—with dedicated slots reserved for
          verified coursework and certifications as they are earned.
        </p>

        {/* Honest Learning Milestones */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {LEARNING_MILESTONES.map((milestone, idx) => (
            <motion.article
              key={milestone.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="glass-surface rounded-2xl p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-slate-100">
                  {milestone.index}. {milestone.title}
                </h3>
                <span className="text-xs font-medium text-blue-300 whitespace-nowrap shrink-0">
                  {milestone.timeframe}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {milestone.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Future Certificates Placeholder Area */}
        <div className="mt-10 glass-surface rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl font-semibold text-slate-100">
                Future Certificates &amp; Credentials
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Reserved placeholders for upcoming verified certifications and technical workshops.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenEditor}
              className="inline-flex min-h-[38px] items-center gap-1.5 self-start rounded-lg border border-slate-700/80 bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-300 whitespace-nowrap shrink-0 transition-colors hover:border-blue-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:self-auto"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              Update Placeholders
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 p-5">
              <p className="text-xs font-medium text-slate-400">Certificate Slot 01 · Planned</p>
              <p className="mt-2 font-mono text-sm text-blue-300">{profile.certificateNoteOne}</p>
              <p className="mt-2 text-xs text-slate-500">
                Credential ID, issuing platform, and completion date will be added once verified.
              </p>
            </div>

            <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 p-5">
              <p className="text-xs font-medium text-slate-400">Certificate Slot 02 · Planned</p>
              <p className="mt-2 font-mono text-sm text-violet-300">
                {profile.certificateNoteTwo}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Credential ID, issuing platform, and completion date will be added once verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
