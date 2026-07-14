'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';
import { TechIcon } from './TechIcons';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } }
};

export default function Skills() {
  const t = useTranslations('Skills');

  const categories = [
    {
      id: 'frontend',
      titleKey: 'frontend',
      icon: <Layout size={18} />,
      color: 'blue',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP']
    },
    {
      id: 'backend',
      titleKey: 'backend',
      icon: <Server size={18} />,
      color: 'violet',
      skills: ['PHP', 'Laravel', 'Supabase', 'REST APIs']
    },
    {
      id: 'database',
      titleKey: 'database',
      icon: <Database size={18} />,
      color: 'cyan',
      skills: ['MySQL']
    },
    {
      id: 'tools',
      titleKey: 'tools',
      icon: <Wrench size={18} />,
      color: 'emerald',
      skills: ['Git & GitHub', 'Cloudinary', 'Vercel', 'n8n', 'Figma', 'Jira']
    }
  ];

  const colorMap = {
    blue:    { badge: 'bg-blue-600/8 border-blue-600/15 text-blue-400',    icon: 'text-blue-400 bg-blue-600/10 border-blue-600/15',    skill: 'hover:border-blue-600/30 hover:text-blue-300 hover:bg-blue-600/8' },
    violet:  { badge: 'bg-violet-600/8 border-violet-600/15 text-violet-400', icon: 'text-violet-400 bg-violet-600/10 border-violet-600/15', skill: 'hover:border-violet-600/30 hover:text-violet-300 hover:bg-violet-600/8' },
    cyan:    { badge: 'bg-cyan-600/8 border-cyan-600/15 text-cyan-400',    icon: 'text-cyan-400 bg-cyan-600/10 border-cyan-600/15',    skill: 'hover:border-cyan-600/30 hover:text-cyan-300 hover:bg-cyan-600/8' },
    emerald: { badge: 'bg-emerald-600/8 border-emerald-600/15 text-emerald-400', icon: 'text-emerald-400 bg-emerald-600/10 border-emerald-600/15', skill: 'hover:border-emerald-600/30 hover:text-emerald-300 hover:bg-emerald-600/8' },
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-[#0d1117]">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[400px] rounded-full bg-blue-600/4 blur-[160px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
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

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {categories.map((cat) => {
            const c = colorMap[cat.color];
            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                className="group rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/10 hover:bg-white/4"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2.5 rounded-xl border ${c.icon} transition-all duration-300`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{t(cat.titleKey)}</h3>
                  <span className={`ml-auto px-2.5 py-1 rounded-lg border text-[10px] font-bold tracking-wider uppercase ${c.badge}`}>
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/8 bg-white/3 text-sm font-medium text-gray-400 transition-all duration-300 cursor-default ${c.skill} hover:-translate-y-0.5`}
                    >
                      <TechIcon name={skill} size={14} />
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
