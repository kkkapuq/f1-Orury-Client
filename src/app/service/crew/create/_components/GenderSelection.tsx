import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { GENDER } from '@/constants/crew/crewOptions';
import { commonSelectStyles, activeSelectStyles } from './UI/commonClass';
import { StepProps } from '@/types/crew/createFormSteps';
import Label from './UI/Label';

function GenderSelection({ formMethods, setIsStepValid }: StepProps) {
  const [selectedGender, setSelectedGender] = useState<string>('ANY');

  const { setValue, register, getValues } = formMethods;

  const validateSelection = () => {
    const isValid = selectedGender.length > 0;
    setIsStepValid(isValid);
  };

  useEffect(() => {
    const submittedValue = getValues('gender');
    if (submittedValue) {
      setSelectedGender(submittedValue);
    }
  }, []);

  const handleGenderClick = (gender: string) => {
    setSelectedGender(gender);
    setValue('gender', gender);
    validateSelection();
  };

  useEffect(() => {
    setValue('gender', selectedGender);
    validateSelection();
  }, [selectedGender]);

  return (
    <div>
      <Label htmlFor="gender">성별 선택</Label>
      {GENDER.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleGenderClick(option.value)}
          className={twMerge(
            commonSelectStyles,
            selectedGender === option.value ? activeSelectStyles : null,
            'w-fit text-[14px] py-[10px] px-[14px] mr-[8px] mb-[8px]',
          )}
        >
          {option.label}
        </button>
      ))}
      <input
        {...register('gender')}
        type="hidden"
        value={selectedGender || ''}
      />
    </div>
  );
}

export default GenderSelection;
