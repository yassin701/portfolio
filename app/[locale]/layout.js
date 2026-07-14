import { Plus_Jakarta_Sans, Geist_Mono, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  const titles = {
    en: "Yassine Hamdoune | Premium Full Stack Developer Portfolio",
    fr: "Yassine Hamdoune | Portfolio Développeur Full Stack Premium",
    ar: "ياسين حمدون | معرض أعمال مطور ويب متكامل متميز"
  };
  
  const descriptions = {
    en: "Premium personal portfolio of Yassine Hamdoune, Full Stack Software Engineer. Expert in Next.js, React, Laravel, PHP, Supabase, and high-performance web applications.",
    fr: "Portfolio personnel haut de gamme de Yassine Hamdoune, ingénieur logiciel Full Stack. Expert en Next.js, React, Laravel, PHP, Supabase et applications web haute performance.",
    ar: "معرض أعمال متميز للمطور ياسين حمدون، مهندس برمجيات متكامل متخصص في تقنيات Next.js و React و Laravel و PHP و Supabase وتطبيقات الويب عالية الأداء."
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Validate locale existence
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Load translations for client-side components
  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${jakarta.variable} ${geistMono.variable} ${cairo.variable} h-full scroll-smooth antialiased`}
    >
      <body className={`min-h-full flex flex-col bg-dark-bg text-gray-100 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
