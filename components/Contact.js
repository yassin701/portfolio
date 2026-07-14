'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } }
};

export default function Contact() {
  const t = useTranslations('Contact');
  const [copiedType, setCopiedType] = useState(null);

  const contactDetails = {
    email: 'yassinehamdoune55@gmail.com',
    phone: '+212 722-138695',
    linkedin: 'https://www.linkedin.com/in/yassine-hamdoune-143526226/',
    github: 'https://github.com/yassin701'
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const cards = [
    {
      id: 'email',
      label: t('email'),
      value: contactDetails.email,
      icon: <Mail size={22} />,
      actionLabel: t('buttons.email'),
      actionUrl: `mailto:${contactDetails.email}`,
      isCopyable: true,
      color: 'blue'
    },
    {
      id: 'phone',
      label: t('phone'),
      value: contactDetails.phone,
      icon: <Phone size={22} />,
      actionLabel: t('buttons.phone'),
      actionUrl: `tel:${contactDetails.phone.replace(/\s+/g, '')}`,
      isCopyable: true,
      color: 'emerald'
    },
    {
      id: 'linkedin',
      label: t('linkedin'),
      value: 'yassine-hamdoune-143526226',
      icon: <LinkedinIcon size={22} />,
      actionLabel: t('buttons.linkedin'),
      actionUrl: contactDetails.linkedin,
      isCopyable: false,
      color: 'blue'
    },
    {
      id: 'github',
      label: t('github'),
      value: 'yassin701',
      icon: <GithubIcon size={22} />,
      actionLabel: t('buttons.github'),
      actionUrl: contactDetails.github,
      isCopyable: false,
      color: 'violet'
    }
  ];

  const colorMap = {
    blue:    { icon: 'text-blue-400 bg-blue-600/10 border-blue-600/20', hover: 'hover:border-blue-600/30 hover:bg-blue-600/8' },
    emerald: { icon: 'text-emerald-400 bg-emerald-600/10 border-emerald-600/20', hover: 'hover:border-emerald-600/30 hover:bg-emerald-600/8' },
    violet:  { icon: 'text-violet-400 bg-violet-600/10 border-violet-600/20', hover: 'hover:border-violet-600/30 hover:bg-violet-600/8' },
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#0d1117]">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-blue-600/4 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <framerMotion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-400 text-xs font-bold tracking-[0.25em] uppercase mb-3">{t('title')}</p>
          <div className="flex items-end gap-6 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] text-white">{t('subtitle')}</h2>
            <div className="h-px flex-1 min-w-[60px] bg-gradient-to-r from-white/10 to-transparent mb-3" />
          </div>
        </framerMotion.div>

        {/* Contact cards — 2×2 grid on desktop */}
        <framerMotion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((card) => {
            const c = colorMap[card.color];
            return (
              <framerMotion.div
                key={card.id}
                variants={fadeUp}
                className={`group relative rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm p-8 flex flex-col gap-5 transition-all duration-500 ${c.hover} hover:-translate-y-1 cursor-default overflow-hidden`}
              >
                {/* Top shine on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl border ${c.icon} transition-all duration-300`}>
                    {card.icon}
                  </div>

                  {card.isCopyable && (
                    <button
                      onClick={() => copyToClipboard(card.value, card.id)}
                      className="p-2 rounded-lg border border-white/8 bg-white/3 text-gray-500 hover:text-white hover:border-white/15 transition-all duration-200 cursor-pointer"
                      title={t('copied')}
                    >
                      <AnimatePresence mode="wait">
                        {copiedType === card.id ? (
                          <framerMotion.span
                            key="check"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            <Check size={14} className="text-emerald-400" />
                          </framerMotion.span>
                        ) : (
                          <framerMotion.span
                            key="copy"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            <Copy size={14} />
                          </framerMotion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                </div>

                {/* Info */}
                <div>
                  <p className="text-[11px] font-bold text-gray-600 tracking-[0.2em] uppercase mb-2">{card.label}</p>
                  <p className="text-white font-semibold text-sm truncate select-all">{card.value}</p>
                </div>

                {/* CTA */}
                <a
                  href={card.actionUrl}
                  target={card.id !== 'email' && card.id !== 'phone' ? '_blank' : undefined}
                  rel={card.id !== 'email' && card.id !== 'phone' ? 'noopener noreferrer' : undefined}
                  className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600/15 hover:border-blue-600/30 text-white text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{card.actionLabel}</span>
                  {card.id !== 'email' && card.id !== 'phone' && <ExternalLink size={12} className="text-gray-500" />}
                </a>

                {/* Copied toast */}
                <AnimatePresence>
                  {copiedType === card.id && (
                    <framerMotion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute bottom-4 left-4 right-4 text-center py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold tracking-wide pointer-events-none"
                    >
                      ✓ {t('copied')}
                    </framerMotion.div>
                  )}
                </AnimatePresence>
              </framerMotion.div>
            );
          })}
        </framerMotion.div>
      </div>
    </section>
  );
}
