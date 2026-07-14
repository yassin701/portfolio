'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GithubIcon } from './Icons';

export default function Projects() {
  const t = useTranslations('Projects');

  const projects = [
    {
      key: 'smartjob',
      image: '/images/smartjob.png',
      technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Supabase', 'Cloudinary', 'REST APIs'],
      github: 'https://github.com/yassin701/SmartJobAI'
    },
    {
      key: 'gym',
      image: '/images/gym.png',
      technologies: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'REST APIs'],
      github: 'https://github.com/yassin701/Gym_Managment'
    },
    {
      key: 'arabi',
      image: '/images/arabi.png',
      technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Framer Motion', 'MySQL', 'Cloudinary'],
      github: 'https://github.com/yassin701/Parfum_Shop'
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-dark-bg">
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.key}
              variants={cardVariants}
              className="glass rounded-2xl overflow-hidden border border-white/5 bg-dark-card/30 flex flex-col h-full group hover:border-accent/20 transition-all duration-300 shadow-xl"
            >
              {/* Project Image Panel */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-900">
                <Image
                  src={project.image}
                  alt={t(`${project.key}.title`)}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.8] group-hover:brightness-100"
                  priority={project.key === 'smartjob'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-60" />
              </div>

              {/* Contents */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {t(`${project.key}.title`)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {t(`${project.key}.desc`)}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded bg-dark-bg text-[10px] font-semibold text-gray-400 border border-gray-800/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Links */}
                <div className="mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:scale-[1.02]"
                  >
                    <GithubIcon size={14} />
                    <span>{t('buttons.code')}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
