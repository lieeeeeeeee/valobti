'use client';

import { Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header, useLanguageStore } from '@/app/components/layout/header/header';
import { Footer } from '@/app/components/layout/footer/footer';
import { getLabel, getAgent, getRoleName } from '@/app/lib/i18n';
import { calculateMetrics } from '@/app/lib/questions';
import { useEffect, useState } from 'react';
import { toPng } from 'html-to-image';

const ResultsPage = () => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [agentResult, setAgentResult] = useState<any>(null);
  
  useEffect(() => {
    const selectedOptionsStr = localStorage.getItem('selectedOptions');
    if (!selectedOptionsStr) {
      router.push('/');
      return;
    }

    const selectedOptions = JSON.parse(selectedOptionsStr);
    const result = calculateMetrics(selectedOptions);
    const agent = getAgent(result.agentId);
    console.log('Calculated result:', result);
    console.log('Fetched agent:', agent);
    setAgentResult({ ...agent, metrics: result.metrics });
  }, [router]);

  const handleShare = () => {
    const agentName = agentResult?.name[language] || '';
    const shareText = getLabel('results.shareText', language).replace('{agentName}', agentName);
    const shareUrl = `${window.location.origin}/share/${agentResult.agentId}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  if (!agentResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,70,85,0.05)_50%,transparent_75%)] bg-[length:20px_20px] pointer-events-none" />
      
      <Header />

      {/* Main Content */}
      <main className="relative pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {getLabel('results.title', language)}
          </h2>

          {/* Agent Card */}
          <div className="w-full max-w-2xl bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 result-card">
            <div className="flex flex-col md:flex-row">
              {/* Agent Image */}
              <div className="relative w-full md:w-1/2 aspect-[3/4] bg-accent/20">
                <Image
                  src={agentResult.image}
                  alt={agentResult.name[language]}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {/* Agent Info */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">{agentResult.name[language]}</h3>
                    <p className="text-lg text-muted-foreground">{agentResult.name.en}</p>
                  </div>
                  
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                      {getRoleName(agentResult.role, language)}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {agentResult.reason[language]}
                  </p>

                  <div className="space-y-2">
                    {agentResult.traits[language].map((trait: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                        <span>{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/')}
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {getLabel('results.retryButton', language)}
            </Button>
            <Button
              size="lg"
              className="bg-[#1DA1F2] hover:bg-[#1a8cd8]"
              onClick={handleShare}
              disabled={!agentResult}
            >
              <Share2 className="mr-2 h-4 w-4" />
              {getLabel('results.shareButton', language)}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultsPage;