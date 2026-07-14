'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ArrowRight, Download, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('Hero');
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    // GSAP Entrance Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
      .fromTo(avatarRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: -0.6 }
      )
      .fromTo(titleRef.current, 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 1, delay: -0.5 }
      )
      .fromTo(contentRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: -0.6 }
      )
      .fromTo(ctaRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: -0.6 }
      );
    }, heroRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dark-bg"
    >
      {/* Background Grids & Color Blobs */}
      <div className="absolute inset-0 z-0">
        {/* Dark radial grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Subtle Ambient Glowing Spheres */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[80px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse duration-[12000ms]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        {/* Freelance Badge */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-accent tracking-wide uppercase mb-8 select-none shadow-[0_2px_15px_rgba(96,105,250,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
          <Briefcase size={12} className="ml-1" />
          {t('badge')}
        </div>

        {/* Profile Avatar */}
        <div 
          ref={avatarRef}
          className="relative mb-6 group"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/30 transition-all duration-300 animate-pulse" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-primary/40 shadow-2xl shadow-primary/30 group-hover:border-accent/60 transition-colors duration-300">
            <Image
              src="/images/profile.jpg"
              alt="Yassine Hamdoune"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* Dynamic Typography Title */}
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-[1.1] sm:leading-[1.15]"
        >
          <span className="text-gray-400 block text-lg sm:text-2xl font-medium tracking-widest uppercase mb-4 text-glow">
            {t('greeting')}
          </span>
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p 
          ref={contentRef}
          className="text-gray-400 text-base sm:text-xl max-w-2xl leading-relaxed mb-10 font-normal"
        >
          {t('subtitle')}
        </p>

        {/* Call to Actions */}
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-full bg-primary hover:bg-primary/95 text-white font-medium transition-all duration-300 shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_35px_rgba(37,99,235,0.6)] hover:scale-[1.03]"
          >
            <span>{t('cta.projects')}</span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </a>
          
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-4 rounded-full glass border border-white/10 hover:border-accent/40 text-white font-medium hover:bg-white/5 transition-all duration-300 hover:scale-[1.03]"
          >
            <span>{t('cta.contact')}</span>
          </a>
        </div>

        {/* Quick Social Links */}
        <div className="flex items-center gap-6 mt-16 text-gray-500">
          <a 
            href="https://github.com/yassin701" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors duration-200"
          >
            <GithubIcon size={20} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors duration-200"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
