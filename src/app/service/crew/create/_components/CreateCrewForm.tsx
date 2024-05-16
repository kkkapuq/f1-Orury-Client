import { Inputs } from '@/types/crew/createFormSteps';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SORT_BY from '@/constants/crew/sortBy';
import useCrewListApi from '@/hooks/crew/useCrewList';
import { useRouter } from 'next/navigation';
import { FormDataSchema } from '../schema';
import { useToast } from '@/app/_components/ui/use-toast';
import { cn } from '@/lib/utils';
import { CrewDetailProps } from '@/types/crew/crew';
import { GetCrewCreateData } from '@/utils/getCrewCreateData';
import postCrewData from '../api/createCrew';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

interface EditCrewProps {
  crewDetail?: CrewDetailProps;
}

function CreateCrewForm({ crewDetail }: EditCrewProps) {
  const [, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const [iconImage, setIconImage] = useState<File | null>(null);

  const { toast } = useToast();
  const router = useRouter();
  const { mutate: mutateMyList } = useCrewListApi.useGetCrewList(
    SORT_BY.mylist,
  );
  const { mutate: mutatePopular } = useCrewListApi.useGetCrewList(
    SORT_BY.popular,
  );

  console.log(crewDetail);
  const methods = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const { handleSubmit, reset, getValues, setValue } = methods;


  // useEffect(() => {
  //   if (crewDetail) {
  //     Object.keys(crewDetail).forEach(key => {
  //       setValue(key, crewDetail[key]);
  //     });
  //   }
  // }, [crewDetail]);



  const processForm: SubmitHandler<Inputs> = async data => {
    const formData = GetCrewCreateData({
      jsonData: JSON.stringify(data),
      image: iconImage,
    });
    try {
      const responseMessage = await postCrewData(formData);
      toast({
        variant: 'success',
        description: responseMessage,
        duration: 2000,
      });
      mutateMyList();
      mutatePopular();
      router.push('/service/crew');
    } catch (error) {
      toast({
        variant: 'warning',
        description: '크루를 생성하는데 오류가 발생했습니다.',
        duration: 2000,
      });
    }
    reset();
  };

  const next = () => {
    if (currentStep < 4) {
      setPreviousStep(currentStep);
      setCurrentStep(currentStep + 1);
    } else {
      processForm(getValues());
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep(currentStep - 1);
    }
  };

  // 스텝별 컴포넌트 렌더링
  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <Step0 formMethods={methods} setIsStepValid={setIsStepValid} />;
      case 1:
        return <Step1 formMethods={methods} setIsStepValid={setIsStepValid} />;
      case 2:
        return <Step2 formMethods={methods} setIsStepValid={setIsStepValid} />;
      case 3:
        return <Step3 formMethods={methods} setIsStepValid={setIsStepValid} />;
      case 4:
        return (
          <Step4
            formMethods={methods}
            setIsStepValid={setIsStepValid}
            setIconImage={setIconImage}
          />
        );

      default:
        return null;
    }
  };

  const submitButtonClass = cn(
    'rounded px-2 py-[12px] text-[16px] font-semibold ',
    'disabled:cursor-not-allowed disabled:bg-[#96A2AC]',
  );

  return (
    <div className="p-[16px] flex flex-col overflow-hidden">
      <form onSubmit={handleSubmit(processForm)}>
        {/* 각 스텝 컴포넌트 렌더링 */}
        {renderStepComponent()}
      </form>
      <div className="mt-auto pt-5 flex-none pb-12">
        <div className="flex gap-[6px]">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prev}
              className={cn(submitButtonClass, 'w-[100px] bg-[#F0F1F3]')}
            >
              이전
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={!isStepValid}
            className={cn(submitButtonClass, 'flex-1 bg-[#855AFF] text-white')}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCrewForm;
