'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ArrowRight, Briefcase, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero() {
  const t = useTranslations('Hero');
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(badgeRef.current, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 })
        .fromTo(avatarRef.current, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: -0.6 })
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: -0.5 })
        .fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: -0.6 })
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: -0.6 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0B0F19]"
    >
      {/* Architectural grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Ambient glow spheres */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">

        {/* Status badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/8 bg-white/3 backdrop-blur-sm text-xs font-semibold text-gray-300 tracking-[0.15em] uppercase mb-10 select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <Briefcase size={12} className="text-gray-400" />
          {t('badge')}
        </div>

        {/* Avatar */}
        <div ref={avatarRef} className="relative mb-8 group">
          <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-xl scale-125 group-hover:bg-blue-600/30 transition-all duration-500" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl group-hover:border-blue-500/30 transition-colors duration-300">
            <Image
              src="/images/profile.jpg"
              alt="Yassine Hamdoune"
              fill
              sizes="128px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] text-white mb-6 leading-[1.05]">
          <span className="block text-sm sm:text-base font-semibold text-blue-400 tracking-[0.2em] uppercase mb-5 opacity-90">
            {t('greeting')}
          </span>
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p ref={contentRef} className="text-gray-400 text-base sm:text-lg max-w-2xl leading-[1.85] mb-12 font-light">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-14">
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="group inline-flex items-center gap-2.5 w-full sm:w-auto justify-center px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t('cta.projects')}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="inline-flex items-center gap-2.5 w-full sm:w-auto justify-center px-8 py-4 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20 text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
          >
            <span>{t('cta.contact')}</span>
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-8 text-gray-600">
          <a href="https://github.com/yassin701" target="_blank" rel="noopener noreferrer"
            className="hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <GithubIcon size={22} />
          </a>
          <div className="w-px h-4 bg-white/10" />
          <a href="https://www.linkedin.com/in/yassine-hamdoune-143526226/" target="_blank" rel="noopener noreferrer"
            className="hover:text-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <LinkedinIcon size={22} />
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none" />
    </section>
  );
}
