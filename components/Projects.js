'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GithubIcon } from './Icons';
import { ArrowUpRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } }
};

export default function Projects() {
  const t = useTranslations('Projects');

  const projects = [
    {
      key: 'smartjob',
      image: '/images/smartjob.png',
      technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Supabase', 'Cloudinary'],
      github: 'https://github.com/yassin701/SmartJobAI',
      number: '01',
      tag: 'SaaS · AI',
    },
    {
      key: 'gym',
      image: '/images/gym.png',
      technologies: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS'],
      github: 'https://github.com/yassin701/Gym_Managment',
      number: '02',
      tag: 'Web App',
    },
    {
      key: 'arabi',
      image: '/images/arabi.png',
      technologies: ['Next.js', 'Framer Motion', 'MySQL', 'Cloudinary'],
      github: 'https://github.com/yassin701/Parfum_Shop',
      number: '03',
      tag: 'E-commerce',
    }
  ];

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-[#0d1117]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/4 blur-[140px] pointer-events-none" />

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

        {/* 3 equal cards side by side */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.key}
              variants={fadeUp}
              className="lux-card group flex flex-col overflow-hidden cursor-default"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={t(`${project.key}.title`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out brightness-60 group-hover:brightness-80 group-hover:scale-105"
                  priority={project.number === '01'}
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-transparent" />

                {/* Tag badge top-right */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-gray-300 tracking-wider">
                  {project.tag}
                </div>

                {/* Number bottom-left */}
                <div className="absolute bottom-4 left-4 text-[11px] font-black text-gray-500 tracking-[0.2em] group-hover:text-blue-400/60 transition-colors duration-500">
                  {project.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                  {t(`${project.key}.title`)}
                </h3>

                <p className="text-gray-500 text-sm leading-[1.75] font-light flex-1 group-hover:text-gray-400 transition-colors duration-300">
                  {t(`${project.key}.desc`)}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/3 border border-white/6 text-[10px] font-semibold text-gray-500 group-hover:border-blue-500/15 group-hover:text-gray-400 transition-all duration-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 group/btn inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-xl border border-white/8 bg-white/3 hover:bg-blue-600/15 hover:border-blue-500/30 text-white text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <GithubIcon size={13} />
                  <span>{t('buttons.code')}</span>
                  <ArrowUpRight size={12} className="text-gray-600 group-hover/btn:text-blue-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
