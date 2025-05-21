'use client';

import { GlobeIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { create } from 'zustand';

interface LanguageStore {
  language: 'ja' | 'ko' | 'en';
  setLanguage: (language: 'ja' | 'ko' | 'en') => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'ja',
  setLanguage: (language) => set({ language }),
}));

export function Header() {
  const { language, setLanguage } = useLanguageStore();

  const languageLabels = {
    ja: '日本語',
    ko: '한국어',
    en: 'English',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
              ValoBTI
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <GlobeIcon className="h-4 w-4 mr-2" />
                {languageLabels[language]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(languageLabels).map(([key, label]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => setLanguage(key as 'ja' | 'ko' | 'en')}
                  className={language === key ? 'bg-accent' : ''}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}