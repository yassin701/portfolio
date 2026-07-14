'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['home', 'about', 'skills', 'services', 'projects', 'contact'];

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map(item => document.getElementById(item));
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  const currentLanguageLabel = { en: 'English', fr: 'Français', ar: 'العربية' };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'border-b border-white/6 bg-[#0B0F19]/90 backdrop-blur-xl py-4'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <span className="text-white font-black text-sm">Y</span>
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            Yassine<span className="text-blue-400 font-light">.H</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeSection === item
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {t(`nav.${item}`)}
              {activeSection === item && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-white/8 -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Globe language switcher — original style */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 bg-white/4 backdrop-blur-sm text-sm font-medium text-gray-300 hover:text-white hover:border-white/15 transition-all duration-300 cursor-pointer">
              <Globe size={15} className="text-blue-400" />
              <span>{currentLanguageLabel[locale]}</span>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-36 rounded-2xl border border-white/8 bg-[#161B22]/95 backdrop-blur-xl p-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 shadow-2xl shadow-black/50">
              {['en', 'fr', 'ar'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    locale === lang
                      ? 'bg-blue-600/20 text-blue-400 font-semibold'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                >
                  {currentLanguageLabel[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_35px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 cursor-pointer"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile: globe + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Quick language cycle */}
          <button
            onClick={() => {
              const nexts = { en: 'fr', fr: 'ar', ar: 'en' };
              handleLanguageChange(nexts[locale]);
            }}
            className="p-2 rounded-xl border border-white/8 bg-white/4 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Globe size={17} className="text-blue-400" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-white/8 bg-white/4 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/6 bg-[#0B0F19]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 cursor-pointer ${
                    activeSection === item
                      ? 'text-white bg-white/8'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(`nav.${item}`)}
                </a>
              ))}

              <div className="h-px bg-white/6 my-2" />

              {/* Language buttons in drawer */}
              <div className="flex gap-2">
                {['en', 'fr', 'ar'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { handleLanguageChange(lang); setIsOpen(false); }}
                    className={`flex-1 py-2.5 text-center rounded-2xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      locale === lang
                        ? 'bg-blue-600/20 border-blue-600/40 text-blue-400'
                        : 'border-white/8 bg-white/4 text-gray-400 hover:text-white'
                    }`}
                  >
                    {currentLanguageLabel[lang]}
                  </button>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="text-center py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                {t('cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
