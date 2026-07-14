'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Compass, Target, Heart } from 'lucide-react';

export default function About() {
  const t = useTranslations('About');
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dark-bg">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-2">
            {t('title')}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Bio block */}
          <motion.div 
            className="lg:col-span-6 flex flex-col gap-6"
            variants={itemVariants}
          >
            <div className="relative group p-6 rounded-2xl glass border border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/15 text-accent">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Yassine Hamdoune</h3>
                  <p className="text-sm text-accent font-medium">Full Stack Web Developer</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed font-normal text-base">
                {t('bio')}
              </p>
            </div>
          </motion.div>

          {/* Cards for mission & goals */}
          <motion.div 
            className="lg:col-span-6 flex flex-col gap-8"
            variants={itemVariants}
          >
            {/* Mission Card */}
            <div className="gradient-border">
              <div className="glass p-8 rounded-[15px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-accent">
                    <Compass size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t('mission.title')}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {t('mission.text')}
                </p>
              </div>
            </div>

            {/* Goals Card */}
            <div className="gradient-border">
              <div className="glass p-8 rounded-[15px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-accent/15 text-accent">
                    <Target size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t('goals.title')}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {t('goals.text')}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
