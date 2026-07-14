'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, BarChart3, Cpu, Link, Zap, FileText } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } }
};

export default function Services() {
  const t = useTranslations('Services');

  const services = [
    { key: 'landingPages',     icon: <FileText size={22} />,    number: '01' },
    { key: 'businessWebsites', icon: <Globe size={22} />,       number: '02' },
    { key: 'ecommerce',        icon: <ShoppingBag size={22} />, number: '03' },
    { key: 'dashboards',       icon: <BarChart3 size={22} />,   number: '04' },
    { key: 'fullstackApps',    icon: <Cpu size={22} />,         number: '05' },
    { key: 'apiIntegration',   icon: <Link size={22} />,        number: '06' },
    { key: 'perfOpt',          icon: <Zap size={22} />,         number: '07' },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-[#0B0F19]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[600px] rounded-full bg-blue-700/4 blur-[180px] pointer-events-none -translate-y-1/2" />

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

        {/* Uniform 4-col grid — small cards side by side */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={fadeUp}
              className="lux-card group p-6 flex flex-col gap-5 cursor-default"
            >
              {/* Number + Icon row */}
              <div className="flex items-start justify-between">
                <div className="lux-icon">
                  {service.icon}
                </div>
                <span className="text-[11px] font-black text-gray-700 tracking-[0.15em] group-hover:text-blue-500/50 transition-colors duration-500 mt-1">
                  {service.number}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 leading-tight tracking-tight group-hover:text-blue-200 transition-colors duration-400">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-gray-500 text-xs leading-[1.75] font-light group-hover:text-gray-400 transition-colors duration-400">
                  {t(`${service.key}.desc`)}
                </p>
              </div>

              {/* Bottom indicator */}
              <div className="h-px bg-white/4 group-hover:bg-blue-500/30 transition-colors duration-500 mt-auto" />
            </motion.div>
          ))}

          {/* Eighth "placeholder" card — CTA */}
          <motion.div
            variants={fadeUp}
            className="lux-card group p-6 flex flex-col items-center justify-center gap-3 cursor-default text-center"
          >
            <div className="w-10 h-10 rounded-xl border border-dashed border-white/10 group-hover:border-blue-500/40 flex items-center justify-center transition-all duration-500">
              <span className="text-gray-600 text-xl group-hover:text-blue-400 transition-colors duration-300">+</span>
            </div>
            <p className="text-gray-600 text-xs font-medium leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
              Et bien plus encore…
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
