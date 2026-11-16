import { ExternalLink } from 'lucide-react';
import { GITHUB_URL } from '../data/portfolioData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-[#050914] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-slate-200">DIVYA SUSHMA</p>
          <p className="mt-1 text-xs text-slate-500">
            © {currentYear} Divya Sushma · Aspiring AI Engineer &amp; B.Tech CS Student
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
          <a href="#home" className="transition-colors hover:text-slate-200">
            Home
          </a>
          <a href="#about" className="transition-colors hover:text-slate-200">
            About
          </a>
          <a href="#projects" className="transition-colors hover:text-slate-200">
            Projects
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 transition-colors hover:text-blue-300"
          >
            GitHub
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
