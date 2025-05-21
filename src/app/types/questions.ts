export type Language = 'ja' | 'ko' | 'en';

export type LocalizedText = {
  ja: string;
  en: string;
  ko: string;
};

export type Metrics = {
  aggressiveness: number;
  strategy: number;
  support: number;
};

export interface QuestionOption {
  text: LocalizedText;
  metrics: Metrics;
}

export interface Question {
  id: number;
  text: LocalizedText;
  options: QuestionOption[];
}

export type Questions = Question[];