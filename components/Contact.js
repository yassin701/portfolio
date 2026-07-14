'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const t = useTranslations('Contact');
  const [copiedType, setCopiedType] = useState(null); // 'email', 'phone' or null

  const contactDetails = {
    email: 'yassinehamdoune55@gmail.com',
    phone: '+212 722-138695',
    linkedin: 'https://www.linkedin.com/in/yassine-hamdoune-143526226/',
    github: 'https://github.com/yassin701'
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const cards = [
    {
      id: 'email',
      label: t('email'),
      value: contactDetails.email,
      icon: <Mail className="text-accent" size={28} />,
      actionLabel: t('buttons.email'),
      actionUrl: `mailto:${contactDetails.email}`,
      isCopyable: true
    },
    {
      id: 'phone',
      label: t('phone'),
      value: contactDetails.phone,
      icon: <Phone className="text-accent" size={28} />,
      actionLabel: t('buttons.phone'),
      actionUrl: `tel:${contactDetails.phone.replace(/\s+/g, '')}`,
      isCopyable: true
    },
    {
      id: 'linkedin',
      label: t('linkedin'),
      value: 'yassine-hamdoune-143526226',
      icon: <LinkedinIcon className="text-accent" size={28} />,
      actionLabel: t('buttons.linkedin'),
      actionUrl: contactDetails.linkedin,
      isCopyable: false
    },
    {
      id: 'github',
      label: t('github'),
      value: 'yassin701',
      icon: <GithubIcon className="text-accent" size={28} />,
      actionLabel: t('buttons.github'),
      actionUrl: contactDetails.github,
      isCopyable: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark-bg">
      {/* Background decoration */}
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <framerMotion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-2">
            {t('title')}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            {t('subtitle')}
          </p>
        </framerMotion.div>

        <framerMotion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {cards.map((card) => (
            <framerMotion.div
              key={card.id}
              variants={cardVariants}
              className="glass p-6 rounded-2xl border border-white/5 bg-dark-card/30 flex flex-col justify-between h-full shadow-lg relative overflow-hidden group glass-hover min-h-[220px]"
            >
              {/* Top ambient color glow */}
              <div className="absolute -right-8 -top-8 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all duration-300" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-accent group-hover:scale-105 transition-transform duration-300">
                    {card.icon}
                  </div>

                  {card.isCopyable && (
                    <button
                      onClick={() => copyToClipboard(card.value, card.id)}
                      className="p-2 rounded-lg border border-gray-800 hover:border-gray-700 bg-dark-bg/60 text-gray-400 hover:text-white transition-colors duration-200 relative"
                      title={t('copied')}
                    >
                      {copiedType === card.id ? (
                        <Check size={14} className="text-emerald-400 animate-scale-in" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {card.label}
                </h3>
                
                <p className="text-white font-medium text-sm truncate mb-8 select-all">
                  {card.value}
                </p>
              </div>

              <div className="mt-auto">
                <a
                  href={card.actionUrl}
                  target={card.id !== 'email' && card.id !== 'phone' ? '_blank' : undefined}
                  rel={card.id !== 'email' && card.id !== 'phone' ? 'noopener noreferrer' : undefined}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:scale-[1.02]"
                >
                  <span>{card.actionLabel}</span>
                  {card.id !== 'email' && card.id !== 'phone' && <ExternalLink size={12} />}
                </a>
              </div>

              {/* Toast Copy notification inside card */}
              <AnimatePresence>
                {copiedType === card.id && (
                  <framerMotion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-2 left-6 right-6 text-center py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wide pointer-events-none"
                  >
                    {t('copied')}
                  </framerMotion.span>
                )}
              </AnimatePresence>
            </framerMotion.div>
          ))}
        </framerMotion.div>
      </div>
    </section>
  );
}
