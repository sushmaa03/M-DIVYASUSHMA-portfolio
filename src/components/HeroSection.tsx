import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GITHUB_URL } from '../data/portfolioData';

export function HeroSection() {
  const [imageError, setImageError] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Typographic Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <p className="text-sm font-medium tracking-wide text-blue-400">
                Aspiring AI Engineer <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span> First-Year B.Tech Computer Science
              </p>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl [text-wrap:balance]">
                DIVYA SUSHMA
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Building a strong foundation in Python, software logic, and web development while
                exploring Artificial Intelligence and Machine Learning from the ground up.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-all hover:from-blue-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B18]"
                >
                  Explore Projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900/60 px-5 py-3 text-sm font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors hover:border-blue-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  GitHub Profile
                  <ExternalLink className="h-4 w-4 text-slate-400" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-800/80 pt-6">
              <p className="text-sm text-slate-400">
                Currently focused on first-year Computer Science coursework, Python programming
                practice, and foundational Generative AI concepts.
              </p>
            </div>
          </motion.div>

          {/* Right Visual Showcase Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-surface relative h-full overflow-hidden rounded-2xl p-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#091126] lg:h-full lg:min-h-[340px]">
                {!imageError ? (
                  <img
                    src="/src/assets/images/hero_ai_prism_1794826013141.jpg"
                    alt="Architectural translucent dark navy glass geometry with subtle electric blue and violet edge refraction"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0B1530] via-[#0E1738] to-[#1A1336] p-6 text-center">
                    <div className="h-20 w-20 rounded-xl border border-blue-400/30 bg-blue-500/10" />
                    <p className="mt-4 font-display text-sm font-medium text-slate-300">
                      AI &amp; Computer Science Foundations
                    </p>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060B18]/70 via-transparent to-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Academic Status Strip */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-slate-800/80 rounded-2xl glass-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-400">Academic Status</p>
            <p className="mt-1.5 font-display text-base font-semibold text-slate-100">
              First-Year B.Tech CSE
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-400">Learning Focus</p>
            <p className="mt-1.5 font-display text-base font-semibold text-slate-100">
              Python · Machine Learning · GenAI
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-400">Developer Profile</p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1.5 font-display text-base font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              github.com/malla-divyasushma
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
