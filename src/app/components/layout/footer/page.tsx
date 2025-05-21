'use client';

import { useLanguageStore } from '@/app/components/layout/header/page';
import { getLabel } from '@/app/lib/i18n';

export function Footer() {
  const { language } = useLanguageStore();
  
  return (
    <footer className="absolute bottom-0 left-0 right-0 py-6 text-center text-sm text-muted-foreground">
      <p>{getLabel('footer.copyright', language)}</p>
    </footer>
  );
}