'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/layout/header/header';
import { Footer } from '@/app/components/layout/footer/footer';
import { useLanguageStore } from '@/app/components/layout/header/header';
import { getLabel } from '@/app/lib/i18n';

export default function Home() {
  const router = useRouter();
  const { language } = useLanguageStore();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,70,85,0.05)_50%,transparent_75%)] bg-[length:20px_20px] pointer-events-none" />
      
      <Header />

      {/* Hero Section */}
      <main className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8">
            <span className="block">{getLabel('home.title', language)}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            {getLabel('home.subtitle', language)}
          </p>

          <Button
            size="lg"
            className="group relative overflow-hidden bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-8 py-6 text-lg"
            onClick={() => router.push('/diagnostic')}
          >
            {getLabel('home.startButton', language)}
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}