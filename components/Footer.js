'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const t = useTranslations('Footer');
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (lang) => {
    router.replace(pathname, { locale: lang });
  };

  const currentYear = new Date().getFullYear();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' }
  ];

  return (
    <footer className="border-t border-gray-900 bg-dark-bg/60 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <span className="text-base font-bold text-white tracking-wide">
            Yassine<span className="text-accent">.H</span>
          </span>
          <p className="text-xs text-gray-500 font-normal">
            {t('tagline')}
          </p>
        </div>

        {/* Center: Language Switcher Text Links */}
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          {languages.map((lang, idx) => (
            <div key={lang.code} className="flex items-center gap-4">
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className={`hover:text-white transition-colors duration-200 ${
                  activeLocale === lang.code ? 'text-accent font-bold' : ''
                }`}
              >
                {lang.label}
              </button>
              {idx < languages.length - 1 && <span className="text-gray-800">|</span>}
            </div>
          ))}
        </div>

        {/* Right: Socials & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
          <div className="flex gap-4 text-gray-500">
            <a 
              href="https://github.com/yassin701" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              <GithubIcon size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              <LinkedinIcon size={18} />
            </a>
            <a 
              href="mailto:yassine.hamdoune@example.com" 
              className="hover:text-white transition-colors duration-200"
            >
              <Mail size={18} />
            </a>
          </div>
          <span className="text-[10px] text-gray-600 font-medium">
            &copy; {currentYear} Yassine Hamdoune. {t('rights')}
          </span>
        </div>

      </div>
    </footer>
  );
}
