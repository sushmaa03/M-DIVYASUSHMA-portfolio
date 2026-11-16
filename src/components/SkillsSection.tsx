import { motion } from 'motion/react';
import { useState } from 'react';
import { SKILLS, type SkillCategory } from '../data/portfolioData';

const CATEGORIES: SkillCategory[] = ['All', 'Programming', 'Web', 'AI Concepts'];

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="border-t border-slate-800/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">02. Technical Skills</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl [text-wrap:balance]">
              Core toolkit in active practice
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-800/90 bg-slate-900/60 p-1"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isSelected}
                  className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredSkills.map((skill, idx) => (
            <motion.article
              key={skill.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="glass-surface glass-surface-hover rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-800/80 pb-4">
                <h3 className="font-display text-xl font-semibold text-slate-50">
                  {skill.name}
                </h3>
                <p className="text-xs font-medium text-blue-300 whitespace-nowrap shrink-0">
                  {skill.level}
                  <span aria-hidden="true" className="mx-1.5 text-slate-600">
                    ·
                  </span>
                  <span className="text-slate-400">{skill.category}</span>
                </p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">{skill.summary}</p>

              <ul className="mt-5 space-y-2 border-t border-slate-800/60 pt-4 text-sm text-slate-400">
                {skill.focusAreas.map((area) => (
                  <li key={area} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-blue-400 shrink-0"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
