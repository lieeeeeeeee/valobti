import questionsData from '@/app/data/questions.json';
import { Questions, Language, Question, LocalizedText } from '@/app/types/questions';
import { findClosestAgent } from '@/app/lib/i18n';

export function getQuestions(): Questions {
  return questionsData.questions as Questions;
}

export function getQuestion(id: number): Question | undefined {
  return questionsData.questions.find(q => q.id === id) as Question | undefined;
}

export function getLocalizedText(text: LocalizedText, language: Language): string {
  return text[language] ?? text.ja;
}

export function calculateMetrics(selectedOptions: number[]): { agentId: string; metrics: { aggressiveness: number; strategy: number; support: number } } {
  const questions = getQuestions();
  let aggressiveness = 0;
  let strategy = 0;
  let support = 0;

  selectedOptions.forEach((optionIndex, questionIndex) => {
    const question = questions[questionIndex];
    const option = question.options[optionIndex];
    aggressiveness += option.metrics.aggressiveness;
    strategy += option.metrics.strategy;
    support += option.metrics.support;
  });

  const metrics = {
    aggressiveness,
    strategy,
    support
  };

  const agentId = findClosestAgent(metrics);

  return {
    agentId,
    metrics
  };
}