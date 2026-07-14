'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, BarChart3, Cpu, Link, Zap, FileText } from 'lucide-react';

export default function Services() {
  const t = useTranslations('Services');

  const services = [
    {
      key: 'landingPages',
      icon: <FileText size={24} className="text-accent" />
    },
    {
      key: 'businessWebsites',
      icon: <Globe size={24} className="text-accent" />
    },
    {
      key: 'ecommerce',
      icon: <ShoppingBag size={24} className="text-accent" />
    },
    {
      key: 'dashboards',
      icon: <BarChart3 size={24} className="text-accent" />
    },
    {
      key: 'fullstackApps',
      icon: <Cpu size={24} className="text-accent" />
    },
    {
      key: 'apiIntegration',
      icon: <Link size={24} className="text-accent" />
    },
    {
      key: 'perfOpt',
      icon: <Zap size={24} className="text-accent" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="services" className="py-24 relative overflow-hidden bg-dark-bg">
      {/* Dynamic ambient decoration */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              variants={cardVariants}
              className={`glass p-8 rounded-2xl border border-white/5 bg-dark-card/30 flex flex-col justify-between shadow-lg glass-hover relative overflow-hidden group ${
                index === services.length - 1 ? 'md:col-span-2 lg:col-span-1 md:mx-auto md:w-1/2 lg:w-full' : ''
              }`}
            >
              {/* Background accent hover glow */}
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-300" />
              
              <div>
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-accent inline-block mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-accent transition-colors duration-300">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t(`${service.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
