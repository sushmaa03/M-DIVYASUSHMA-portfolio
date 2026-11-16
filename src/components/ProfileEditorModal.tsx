import { RotateCcw, Save, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { DEFAULT_PROFILE, type EditableProfile } from '../data/portfolioData';

interface ProfileEditorModalProps {
  isOpen: boolean;
  profile: EditableProfile;
  onSave: (updated: EditableProfile) => void;
  onReset: () => void;
  onClose: () => void;
}

export function ProfileEditorModal({
  isOpen,
  profile,
  onSave,
  onReset,
  onClose,
}: ProfileEditorModalProps) {
  const [draft, setDraft] = useState<EditableProfile>(profile);

  useEffect(() => {
    setDraft(profile);
  }, [profile, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave({
      collegeName: draft.collegeName.trim() || DEFAULT_PROFILE.collegeName,
      registrationNumber:
        draft.registrationNumber.trim() || DEFAULT_PROFILE.registrationNumber,
      email: draft.email.trim() || DEFAULT_PROFILE.email,
      linkedin: draft.linkedin.trim() || DEFAULT_PROFILE.linkedin,
      certificateNoteOne:
        draft.certificateNoteOne.trim() || DEFAULT_PROFILE.certificateNoteOne,
      certificateNoteTwo:
        draft.certificateNoteTwo.trim() || DEFAULT_PROFILE.certificateNoteTwo,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03060F]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-surface relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h3
              id="profile-editor-title"
              className="font-display text-xl font-semibold text-slate-50"
            >
              Customize Editable Placeholders
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Saved locally in your browser so you can preview your personal details anytime.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close placeholder editor"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-xs font-medium text-slate-300">College / University Name</span>
            <input
              type="text"
              value={draft.collegeName}
              onChange={(e) => setDraft((prev) => ({ ...prev, collegeName: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-slate-300">Registration Number</span>
            <input
              type="text"
              value={draft.registrationNumber}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, registrationNumber: e.target.value }))
              }
              className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-slate-300">Email Address</span>
              <input
                type="text"
                value={draft.email}
                onChange={(e) => setDraft((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-slate-300">LinkedIn Profile URL</span>
              <input
                type="text"
                value={draft.linkedin}
                onChange={(e) => setDraft((prev) => ({ ...prev, linkedin: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-slate-300">Future Certificate Slot 01</span>
            <input
              type="text"
              value={draft.certificateNoteOne}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, certificateNoteOne: e.target.value }))
              }
              className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-slate-300">Future Certificate Slot 02</span>
            <input
              type="text"
              value={draft.certificateNoteTwo}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, certificateNoteTwo: e.target.value }))
              }
              className="mt-1.5 w-full rounded-lg border border-slate-700/80 bg-[#050914] px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/70 px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset Placeholders
            </button>

            <button
              type="submit"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
