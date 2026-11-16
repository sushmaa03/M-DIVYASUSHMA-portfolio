import { Pencil } from 'lucide-react';
import { motion } from 'motion/react';
import type { EditableProfile } from '../data/portfolioData';

interface AboutSectionProps {
  profile: EditableProfile;
  onOpenEditor: () => void;
}

export function AboutSection({ profile, onOpenEditor }: AboutSectionProps) {
  return (
    <section id="about" className="border-t border-slate-800/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium text-blue-400">01. About Me</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl [text-wrap:balance]">
            First-year engineering foundations with a clear path toward AI
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Narrative Column */}
            <div className="space-y-5 text-base leading-relaxed text-slate-300 lg:col-span-7">
              <p>
                I am <strong className="font-semibold text-slate-100">DIVYA SUSHMA</strong>, a
                first-year B.Tech Computer Science student committed to mastering how software and
                intelligent systems are designed from the fundamentals upward.
              </p>
              <p>
                My primary technical curiosity centers on{' '}
                <strong className="font-semibold text-slate-100">Python programming</strong>,{' '}
                <strong className="font-semibold text-slate-100">
                  Artificial Intelligence and Machine Learning
                </strong>
                , and{' '}
                <strong className="font-semibold text-slate-100">modern web development</strong>. I
                enjoy breaking complex concepts into clean, testable code and documenting each step
                of my learning curve honestly.
              </p>
              <p>
                My goal is to transition from foundational scripting and semantic web interfaces to
                building reliable machine learning workflows and practical Generative AI applications
                as I progress through my undergraduate degree.
              </p>
            </div>

            {/* Academic Summary Card with Editable Placeholders */}
            <div className="glass-surface rounded-2xl p-6 sm:p-7 lg:col-span-5">
              <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <h3 className="font-display text-lg font-semibold text-slate-100">
                  Academic Profile
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

              <dl className="mt-5 divide-y divide-slate-800/70 text-sm">
                <div className="flex flex-col gap-1 py-3 first:pt-0">
                  <dt className="text-xs font-medium text-slate-400">Degree Program</dt>
                  <dd className="font-medium text-slate-100">
                    B.Tech in Computer Science
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-3">
                  <dt className="text-xs font-medium text-slate-400">Academic Year</dt>
                  <dd className="font-medium text-slate-100">First Year (Year 1)</dd>
                </div>
                <div className="flex flex-col gap-1 py-3">
                  <dt className="text-xs font-medium text-slate-400">Institution</dt>
                  <dd className="font-mono text-xs text-blue-300 sm:text-sm">
                    {profile.collegeName}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-3 last:pb-0">
                  <dt className="text-xs font-medium text-slate-400">Registration Number</dt>
                  <dd className="font-mono text-xs text-blue-300 sm:text-sm tabular-nums">
                    {profile.registrationNumber}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
