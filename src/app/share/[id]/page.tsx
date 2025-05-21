import { Metadata } from 'next';
import { getAgent } from '@/app/lib/i18n';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const agent = getAgent(resolvedParams.id);
  
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
      description: `Your VALORANT Agent Personality Test is ${agent.name.en}!`,
      images: [`https://valobti.vercel.app${agent.image}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `VALORANT Agent Personality Test - ${agent.name.en}`,
      description: `Your VALORANT Agent Personality Test is ${agent.name.en}!`,
      images: [`https://valobti.vercel.app${agent.image}`],
    },
  };
}

export default function SharePage() {
  redirect('/');
} 