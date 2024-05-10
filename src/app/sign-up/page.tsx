'use client';

import Header from '@/app/_components/common/Header';
import ProgressBar from '@/app/sign-up/_components/ProgressBar';
import Step1 from '@/app/sign-up/_components/Step1';
import Step2 from '@/app/sign-up/_components/Step2';
import Step3 from '@/app/sign-up/_components/Step3';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormSchemaType, formSchema } from '@/app/sign-up/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from 'use-debounce';

function Page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const lastStep = currentStep === 3;

  const handleBack = () => {
    if (currentStep === 1) router.push('/');
    else setCurrentStep(1);
  };

  const handleNext = useDebouncedCallback(async () => {
    setCurrentStep(currentStep => currentStep + 1);
  }, 300);

  const formMethods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formMethods={formMethods} onNextClick={handleNext} />;
      case 2:
        return <Step2 formMethods={formMethods} onNextClick={handleNext} />;
      default:
        return <Step3 />;
    }
  };

  return (
    <section className="flex flex-col bg-white h-full mb-safe">
      <div>
        {!lastStep && <Header onBack={handleBack} isBack />}
        {!lastStep && <ProgressBar currentStep={currentStep} />}
      </div>
      {renderStepComponent()}
    </section>
  );
}

export default Page;
