'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Compass, Target, Heart, MapPin, Code, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function About() {
  const t = useTranslations('About');

  const stats = [
    { value: '3+', label: 'Années d\'expérience', icon: <Code size={16} /> },
    { value: '10+', label: 'Projets livrés', icon: <Zap size={16} /> },
    { value: '5+', label: 'Clients satisfaits', icon: <Heart size={16} /> },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-[#0B0F19]">
      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Background glow - very subtle */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-blue-600/4 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Section header */}
        <motion.div
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
        </motion.div>

        {/* Main content: 2-column layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >

          {/* Left: Bio block — large */}
          <motion.div className="lg:col-span-7 flex flex-col gap-6" variants={fadeUp}>
            <div className="group rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/12 hover:bg-white/4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-600/20">
                  <Heart size={14} className="text-blue-400" />
                  <span className="text-blue-400 text-xs font-semibold tracking-wide">About me</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <MapPin size={12} />
                  <span>Maroc</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Yassine Hamdoune</h3>
              <p className="text-blue-400 text-sm font-semibold mb-6">Full Stack Web Developer</p>

              <p className="text-gray-400 leading-[1.9] font-light text-base">{t('bio')}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label}
                  className="group rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm p-5 transition-all duration-500 hover:border-blue-600/20 hover:bg-blue-600/5 cursor-default">
                  <div className="flex items-center gap-2 mb-3 text-gray-500 group-hover:text-blue-400 transition-colors">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mission + Goals cards */}
          <motion.div className="lg:col-span-5 flex flex-col gap-5" variants={fadeUp}>

            {/* Mission */}
            <div className="group flex-1 rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm p-7 transition-all duration-500 hover:border-blue-600/20 hover:bg-blue-600/5 cursor-default">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-600/15 group-hover:bg-blue-600/20 transition-colors">
                  <Compass size={18} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{t('mission.title')}</h3>
              </div>
              <p className="text-gray-400 leading-[1.8] font-light text-sm">{t('mission.text')}</p>
            </div>

            {/* Goals */}
            <div className="group flex-1 rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm p-7 transition-all duration-500 hover:border-blue-600/20 hover:bg-blue-600/5 cursor-default">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-600/15 group-hover:bg-blue-600/20 transition-colors">
                  <Target size={18} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{t('goals.title')}</h3>
              </div>
              <p className="text-gray-400 leading-[1.8] font-light text-sm">{t('goals.text')}</p>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
