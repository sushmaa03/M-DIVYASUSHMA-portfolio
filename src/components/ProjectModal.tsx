import { Check, Copy, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

function evaluatePythonGrade(score: number): string {
  if (score >= 90) return 'A+ (Outstanding)';
  if (score >= 80) return 'A (Excellent)';
  if (score >= 70) return 'B (Good)';
  if (score >= 60) return 'C (Satisfactory)';
  if (score >= 50) return 'D (Pass)';
  return 'F (Needs Improvement)';
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  // Interactive Grade Calculator State
  const [subjectScores, setSubjectScores] = useState<string[]>(['88', '92', '79']);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [gradeOutput, setGradeOutput] = useState<{ average: number; grade: string } | null>({
    average: 86.33,
    grade: 'A (Excellent)',
  });

  // Interactive Basic Calculator State
  const [numA, setNumA] = useState('24');
  const [numB, setNumB] = useState('6');
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/'>('+');
  const [calcOutput, setCalcOutput] = useState<{ result?: string; error?: string }>({
    result: '30',
  });

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleRunGradeCalculator = () => {
    const parsed = subjectScores.map((val) => Number(val));
    if (parsed.some((n) => Number.isNaN(n) || n < 0 || n > 100)) {
      setGradeError('ValueError: All scores must be valid numbers between 0 and 100.');
      setGradeOutput(null);
      return;
    }
    const avg = Number((parsed.reduce((acc, n) => acc + n, 0) / parsed.length).toFixed(2));
    setGradeError(null);
    setGradeOutput({
      average: avg,
      grade: evaluatePythonGrade(avg),
    });
  };

  const handleRunBasicCalculator = () => {
    const a = Number(numA);
    const b = Number(numB);
    if (numA.trim() === '' || numB.trim() === '' || Number.isNaN(a) || Number.isNaN(b)) {
      setCalcOutput({ error: 'ValueError: Please enter two valid numeric values.' });
      return;
    }

    if (operator === '+') {
      setCalcOutput({ result: String(Number((a + b).toFixed(6))) });
    } else if (operator === '-') {
      setCalcOutput({ result: String(Number((a - b).toFixed(6))) });
    } else if (operator === '*') {
      setCalcOutput({ result: String(Number((a * b).toFixed(6))) });
    } else {
      if (b === 0) {
        setCalcOutput({ error: 'ZeroDivisionError: Cannot divide by zero' });
      } else {
        setCalcOutput({ result: String(Number((a / b).toFixed(6))) });
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03060F]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-surface relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <p className="text-xs font-medium text-blue-300">
              {project.context} · {project.status}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1.5 font-display text-2xl font-semibold text-slate-50"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.description}</p>

        {/* Python Code View */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-display text-sm font-semibold text-slate-200">
              Python Logic Reference
            </h4>
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-blue-500/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  Copy Snippet
                </>
              )}
            </button>
          </div>
          <pre className="mt-2.5 overflow-x-auto rounded-xl border border-slate-800 bg-[#050914] p-4 font-mono text-xs leading-relaxed text-slate-200">
            <code>{project.codeSnippet}</code>
          </pre>
        </div>

        {/* Working Interactive Logic Tester */}
        <div className="mt-6 border-t border-slate-800/80 pt-6">
          <h4 className="font-display text-sm font-semibold text-slate-200">
            Interactive Logic Simulator
          </h4>
          <p className="mt-1 text-xs text-slate-400">
            Test the exact conditional and arithmetic behavior implemented in this project.
          </p>

          {project.id === 'student-grade-calculator' ? (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {subjectScores.map((val, idx) => (
                  <label key={idx} className="block">
                    <span className="text-xs font-medium text-slate-400">
                      Subject {idx + 1} (0–100)
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={val}
                      onChange={(e) => {
                        const updated = [...subjectScores];
                        updated[idx] = e.target.value;
                        setSubjectScores(updated);
                      }}
                      className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3 py-2 font-mono text-sm text-slate-100 tabular-nums focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleRunGradeCalculator}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  Calculate Grade
                </button>

                {gradeError && (
                  <p role="alert" className="font-mono text-xs text-rose-400">
                    {gradeError}
                  </p>
                )}

                {gradeOutput && (
                  <div className="flex items-center gap-4 font-mono text-sm tabular-nums">
                    <span className="text-slate-400">
                      Average: <strong className="text-slate-100">{gradeOutput.average}%</strong>
                    </span>
                    <span className="text-slate-400">
                      Grade: <strong className="text-blue-300">{gradeOutput.grade}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="block">
                  <span className="text-xs font-medium text-slate-400">First Number (a)</span>
                  <input
                    type="number"
                    value={numA}
                    onChange={(e) => setNumA(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3 py-2 font-mono text-sm text-slate-100 tabular-nums focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-slate-400">Operation</span>
                  <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value as '+' | '-' | '*' | '/')}
                    className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3 py-2 font-mono text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="+">+ (Add)</option>
                    <option value="-">- (Subtract)</option>
                    <option value="*">* (Multiply)</option>
                    <option value="/">/ (Divide)</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-slate-400">Second Number (b)</span>
                  <input
                    type="number"
                    value={numB}
                    onChange={(e) => setNumB(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3 py-2 font-mono text-sm text-slate-100 tabular-nums focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleRunBasicCalculator}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  Evaluate Expression
                </button>

                {calcOutput.error ? (
                  <p role="alert" className="font-mono text-xs text-rose-400">
                    {calcOutput.error}
                  </p>
                ) : (
                  <p className="font-mono text-sm text-slate-300 tabular-nums">
                    Result: <strong className="text-blue-300">{calcOutput.result}</strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
