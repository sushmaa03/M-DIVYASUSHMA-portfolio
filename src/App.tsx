/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import {
  DEFAULT_PROFILE,
  type EditableProfile,
  type ProjectItem,
} from './data/portfolioData';

const PROFILE_STORAGE_KEY = 'divya_sushma_portfolio_profile_v1';
const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [profile, setProfile] = useState<EditableProfile>(() => {
    try {
      const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
      }
    } catch {
      // Fallback safely to default honest placeholders
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-35% 0px -50% 0px',
          threshold: 0.01,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleSaveProfile = (updated: EditableProfile) => {
    setProfile(updated);
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060B18] text-slate-100">
      {/* Subtle Ambient Navy-Blue-Violet Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-48 left-1/2 h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/14 via-indigo-600/10 to-violet-600/14 blur-3xl" />
      </div>

      <Navbar activeSection={activeSection} />

      <main>
        <HeroSection />
        <AboutSection profile={profile} onOpenEditor={() => setIsEditorOpen(true)} />
        <SkillsSection />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <AchievementsSection profile={profile} onOpenEditor={() => setIsEditorOpen(true)} />
        <ContactSection profile={profile} onOpenEditor={() => setIsEditorOpen(true)} />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ProfileEditorModal
        isOpen={isEditorOpen}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
}
