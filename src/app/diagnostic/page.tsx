'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/app/components/ui/progress';
import { cn } from '@/app/lib/utils';
import { Header } from '@/app/components/layout/header/page';
import { Footer } from '@/app/components/layout/footer/page';
import { getQuestions, getLocalizedText } from '@/app/lib/questions';
import { useLanguageStore } from '@/app/components/layout/header/page';
import { getLabel } from '@/app/lib/i18n';
import { QuestionOption } from '@/app/types/questions';

export default function DiagnosticPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const { language } = useLanguageStore();

  const questions = getQuestions();
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        // 選択結果をローカルストレージに保存
        localStorage.setItem('selectedOptions', JSON.stringify(newSelectedOptions));
        router.push('/results');
      }
    }, 500);
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,70,85,0.05)_50%,transparent_75%)] bg-[length:20px_20px] pointer-events-none" />
      
      <Header />

      {/* Main Content */}
      <main className="relative pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
          {/* Progress Bar */}
          <div className="w-full mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{getLabel('diagnostic.question', language)} {currentQuestion + 1} / {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="w-full text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
              Q. {getLocalizedText(currentQuestionData.text, language)}
            </h2>
            <div className="space-y-4">
              {currentQuestionData.options.map((option: QuestionOption, index: number) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={cn(
                    "w-full p-6 text-left rounded-lg transition-all duration-200",
                    "bg-card hover:bg-accent border border-border/50 hover:border-accent",
                    "focus:outline-none focus:ring-2 focus:ring-red-500/20",
                    selectedOption === index && "border-red-500 bg-red-500/10",
                  )}
                >
                  <span className="text-lg">
                    {String.fromCharCode(65 + index)}. {getLocalizedText(option.text, language)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}