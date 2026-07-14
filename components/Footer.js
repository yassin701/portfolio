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

  const socials = [
    { icon: <GithubIcon size={16} />, href: 'https://github.com/yassin701', label: 'GitHub' },
    { icon: <LinkedinIcon size={16} />, href: 'https://www.linkedin.com/in/yassine-hamdoune-143526226/', label: 'LinkedIn' },
    { icon: <Mail size={16} />, href: 'mailto:yassinehamdoune55@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/6 bg-[#0B0F19]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left: Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-black text-[10px]">Y</span>
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                Yassine<span className="text-blue-400 font-light">.H</span>
              </span>
            </div>
            <p className="text-xs text-gray-600 font-medium">{t('tagline')}</p>
          </div>

          {/* Center: Language switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/4 border border-white/6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeLocale === lang.code
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Right: Socials + Copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="p-2 rounded-lg border border-white/6 bg-white/3 text-gray-500 hover:text-white hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <span className="text-[11px] text-gray-600 font-medium">
              © {currentYear} Yassine Hamdoune · {t('rights')}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
