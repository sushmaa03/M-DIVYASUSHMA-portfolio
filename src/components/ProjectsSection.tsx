import { Code2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GITHUB_URL, PROJECTS, type ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="projects" className="border-t border-slate-800/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">03. Projects</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl [text-wrap:balance]">
              Hands-on learning builds
            </h2>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-blue-400 whitespace-nowrap shrink-0 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
          >
            View GitHub Profile
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROJECTS.map((project, idx) => {
            const isInProgress = project.status === 'In Progress';
            const imgFailed = failedImages[project.id];

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass-surface glass-surface-hover flex flex-col overflow-hidden rounded-2xl"
              >
                {/* Project Artwork */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-800/80 bg-[#091126]">
                  {!imgFailed ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B1633] to-[#1A1336] p-6">
                      <p className="font-display text-sm font-medium text-slate-300">
                        {project.title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    {/* Quiet unboxed metadata line */}
                    <p className="text-xs font-medium text-slate-400">
                      <span>{project.context}</span>
                      <span aria-hidden="true" className="mx-2 text-slate-600">
                        ·
                      </span>
                      <span className={isInProgress ? 'text-violet-300' : 'text-blue-300'}>
                        Status: {project.status}
                      </span>
                    </p>

                    <h3 className="mt-2.5 font-display text-2xl font-semibold text-slate-50">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {project.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-slate-800/70 pt-4 text-sm text-slate-400">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 rounded-full bg-violet-400 shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-5">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-all hover:from-blue-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <Code2 className="h-4 w-4" aria-hidden="true" />
                      Interactive Demo &amp; Code
                    </button>

                    <span className="text-xs text-slate-500">
                      {isInProgress ? 'Active Development' : 'Learning Archive'}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
