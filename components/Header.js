'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe, Menu, X, Code } from 'lucide-react';
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

  // Handle scroll detection for glassmorphism and active nav section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section observer logic
      const sections = navItems.map(item => document.getElementById(item));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentLanguageLabel = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية'
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white group"
        >
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-accent group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Code size={20} />
          </div>
          <span>
            Yassine<span className="text-accent font-light">.H</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                activeSection === item 
                  ? 'text-accent' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t(`nav.${item}`)}
              {activeSection === item && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Language Switcher & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 hover:border-gray-700 bg-dark-card/50 text-sm font-medium transition-all duration-300">
              <Globe size={16} className="text-accent" />
              <span>{currentLanguageLabel[locale]}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-dark-card border border-gray-800 p-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 shadow-2xl">
              {['en', 'fr', 'ar'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    locale === lang 
                      ? 'bg-primary/20 text-accent font-medium' 
                      : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                  }`}
                  style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}
                >
                  {currentLanguageLabel[lang]}
                </button>
              ))}
            </div>
          </div>

          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-5 py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.5)] hover:scale-[1.02]"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Quick Language Toggle */}
          <div className="relative">
            <button 
              onClick={() => {
                const nexts = { en: 'fr', fr: 'ar', ar: 'en' };
                handleLanguageChange(nexts[locale]);
              }}
              className="p-2 rounded-lg border border-gray-800 bg-dark-card text-gray-400 hover:text-white"
            >
              <Globe size={18} />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-gray-800 bg-dark-card text-gray-400 hover:text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-800/80 mt-4 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-base font-medium py-1 transition-colors ${
                    activeSection === item ? 'text-accent' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
              
              <div className="h-px bg-gray-800 my-2" />
              
              {/* Language selections inside drawer */}
              <div className="flex gap-3">
                {['en', 'fr', 'ar'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      handleLanguageChange(lang);
                      setIsOpen(false);
                    }}
                    className={`flex-1 py-2 text-center rounded-lg border border-gray-800 text-sm transition-all duration-200 ${
                      locale === lang 
                        ? 'bg-primary/20 border-primary/50 text-accent font-medium' 
                        : 'bg-dark-card/50 text-gray-400 hover:bg-gray-800/30'
                    }`}
                  >
                    {currentLanguageLabel[lang]}
                  </button>
                ))}
              </div>

              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full text-center py-3 rounded-xl bg-primary text-white font-medium shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
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
