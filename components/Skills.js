'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';

export default function Skills() {
  const t = useTranslations('Skills');

  const categories = [
    {
      id: 'frontend',
      titleKey: 'frontend',
      icon: <Layout className="text-accent" size={20} />,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP']
    },
    {
      id: 'backend',
      titleKey: 'backend',
      icon: <Server className="text-accent" size={20} />,
      skills: ['PHP', 'Laravel', 'Supabase', 'REST APIs']
    },
    {
      id: 'database',
      titleKey: 'database',
      icon: <Database className="text-accent" size={20} />,
      skills: ['MySQL']
    },
    {
      id: 'tools',
      titleKey: 'tools',
      icon: <Wrench className="text-accent" size={20} />,
      skills: ['Git & GitHub', 'Cloudinary', 'Vercel', 'n8n', 'Figma', 'Jira']
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
    <section id="skills" className="py-24 relative overflow-hidden bg-dark-bg">
      {/* Background ambient light */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className="glass p-6 rounded-2xl border border-white/5 bg-dark-card/30 flex flex-col h-full shadow-lg group hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800/80">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-accent">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {t(category.titleKey)}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-auto">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-dark-bg/60 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-white hover:border-accent/40 hover:bg-primary/5 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
