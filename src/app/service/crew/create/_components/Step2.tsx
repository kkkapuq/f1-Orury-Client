import { useEffect } from 'react';
import {
  activeSelectStyles,
  commonSelectStyles,
  inputClass,
  labelClass,
} from './UI/commonClass';
import { StepProps } from '@/types/crew/createFormSteps';
import { twMerge } from 'tailwind-merge';
import { useWatch } from 'react-hook-form';
import { Checkbox } from '@/app/_components/ui/checkbox';

function Step2({ formMethods, setIsStepValid }: StepProps) {
  const { register, setValue, trigger, getValues, control } = formMethods;

  const questionValue = useWatch({ control, name: 'question' });
  const permissionValue = useWatch({ control, name: 'permission_required' });

  useEffect(() => {
    setIsStepValid(false);
    console.log('디폴트 false');
  }, []);

  useEffect(() => {
    const value = getValues('permission_required');
    if (value === false) {
      setValue('question', '');
      setIsStepValid(true);
    }
    if (value === true) {
      setIsStepValid(false);
      if (questionValue) {
        setValue('question', questionValue);
        setIsStepValid(true);
      }
    }
  }, [permissionValue, setValue, setIsStepValid, questionValue]);

  const handleCheckboxChange = (checked: boolean) => {
    setValue('answer_required', checked);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <button
        type="button"
        onClick={() => {
          setValue('permission_required', false);
          trigger('permission_required');
        }}
        className={twMerge(
          commonSelectStyles,
          getValues('permission_required') === false ? activeSelectStyles : '',
        )}
      >
        바로 가입
        <span className="block text-zinc-500 text-sm mt-[6px]">
          누구나 가입할 수 있어요
        </span>
      </button>
      <button
        type="button"
        onClick={() => {
          setValue('permission_required', true);
          trigger('permission_required');
        }}
        className={twMerge(
          commonSelectStyles,
          getValues('permission_required') === true ? activeSelectStyles : '',
        )}
      >
        승인 후 가입
        <span className="block text-zinc-500 text-sm mt-[6px]">
          크루장이 승인해야 가입할 수 있어요
        </span>
      </button>
      {getValues('permission_required') === true ? (
        <div className="mt-[60px]">
          <label className={labelClass} htmlFor="permissionQuestion">
            가입 질문
          </label>
          <textarea
            className={twMerge(inputClass, 'mb-[15px]')}
            id="question"
            rows={5}
            placeholder="ex) 저희 크루에 신청하게 된 계기가 있나요?"
            {...register('question', { required: true })}
          />
          <div className="flex items-center">
            <Checkbox
              id="answer_required"
              {...register('answer_required')}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="answer_required"
              className="ml-[8px] text-xs font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              필수로 답변 받기
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Step2;
