import { Metadata } from 'next';
import { getAgent } from '@/app/lib/i18n';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agent = getAgent(params.id);
  
  if (!agent) {
    return {
      title: 'VALORANT Agent Personality Test',
      description: 'Find out which VALORANT agent matches your personality!',
    };
  }
  
  return {
    title: `VALORANT Agent Personality Test - ${agent.name.en}`,
    description: `Your VALORANT agent personality is ${agent.name.en}!`,
    openGraph: {
      title: `VALORANT Agent Personality Test - ${agent.name.en}`,
      description: `Your VALORANT agent personality is ${agent.name.en}!`,
      images: [agent.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `VALORANT Agent Personality Test - ${agent.name.en}`,
      description: `Your VALORANT agent personality is ${agent.name.en}!`,
      images: [agent.image],
    },
  };
}

export default function SharePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Loading...</p>
    </div>
  );
} 