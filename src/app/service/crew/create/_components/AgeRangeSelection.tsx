import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { AGE_RANGES } from '@/constants/crew/crewOptions';
import {
  commonSelectStyles,
  activeSelectStyles,
  inputClass,
} from './UI/commonClass';
import { StepProps } from '@/types/crew/createFormSteps';
import Label from './UI/Label';
import { cn } from '@/lib/utils';

function AgeRangeSelection({ formMethods, setIsStepValid }: StepProps) {
  const [selectedAgeRange, setSelectedAgeRange] = useState<{
    min: number | null;
    max: number | null;
  }>(AGE_RANGES[0].value);

  const [isCustomInput, setIsCustomInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { setValue, register, getValues } = formMethods;

  useEffect(() => {
    const submittedMinValue = getValues('min_age');
    const submittedMaxValue = getValues('max_age');
    console.log(submittedMinValue, submittedMaxValue);
    if (submittedMinValue && submittedMaxValue) {
      setSelectedAgeRange({
        min: submittedMinValue,
        max: submittedMaxValue,
      });
    }
  }, []);

  useEffect(() => {
    setValue('min_age', selectedAgeRange.min);
    setValue('max_age', selectedAgeRange.max);
    validateSelection();
  }, [selectedAgeRange]);

  const validateSelection = () => {
    if (!errorMessage && selectedAgeRange) {
      const isValid =
        selectedAgeRange.min !== null && selectedAgeRange.max !== null;
      setIsStepValid(isValid);
    }
  };

  const handleAgeRangeClick = (ageRange: { min: number; max: number }) => {
    setIsCustomInput(false);
    setSelectedAgeRange(ageRange);
    setValue('min_age', ageRange.min);
    setValue('max_age', ageRange.max);
    validateSelection();
  };

  const handleCustomInputClick = () => {
    setSelectedAgeRange({ min: null, max: null });
    if (isCustomInput === false) {
      setIsCustomInput(true);
      setValue('min_age', null);
      setValue('max_age', null);
    } else {
      setIsCustomInput(false);
    }
  };

  return (
    <div className="mb-[20px]">
      <Label htmlFor="ageRange">연령대 선택</Label>
      {AGE_RANGES.map(option => (
        <button
          key={option.label}
          type="button"
          onClick={() => handleAgeRangeClick(option.value)}
          className={twMerge(
            commonSelectStyles,
            selectedAgeRange.min === option.value.min &&
              selectedAgeRange.max === option.value.max
              ? activeSelectStyles
              : null,
            'w-fit text-[14px] py-[10px] px-[14px] mr-[8px] mb-[8px]',
          )}
        >
          {option.label}
        </button>
      ))}
      <button
        type="button"
        onClick={handleCustomInputClick}
        className={twMerge(
          commonSelectStyles,
          isCustomInput ? activeSelectStyles : null,
          'w-fit text-[14px] py-[10px] px-[14px] mr-[8px] mb-[8px]',
        )}
      >
        직접 입력
      </button>
      {isCustomInput && (
        <div className=" mb-[20px]">
          <div className="flex items-center">
            <input
              {...register('min_age', {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="최소 연령을 입력하세요"
              value={selectedAgeRange.min ?? ''}
              className={cn(inputClass, 'flex-1 mx-2 mb-0 ml-0')}
              onChange={e => {
                let minAge = e.target.valueAsNumber;
                if (minAge < 12) {
                  setErrorMessage(true);
                } else {
                  setErrorMessage(false);
                }

                setSelectedAgeRange(prev => ({ ...prev, min: minAge }));
                setValue('min_age', minAge);
              }}
              onFocus={() => {
                setSelectedAgeRange(prev => ({ ...prev, min: null }));
                setValue('min_age', null);
              }}
              min={12}
              max={99}
            />
            <span className="h-full">~</span>
            <input
              {...register('max_age', {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="최대 연령을 입력하세요"
              value={selectedAgeRange.max ?? ''}
              className={cn(inputClass, 'flex-1 mx-2 mb-0 mr-0')}
              onFocus={() => {
                setSelectedAgeRange(prev => ({ ...prev, max: null }));
                setValue('max_age', null);
              }}
              onChange={e => {
                let maxAge = e.target.valueAsNumber;
                if (maxAge > 99) {
                  maxAge = 99;
                } else {
                  setErrorMessage(false);
                }

                setSelectedAgeRange(prev => ({ ...prev, max: maxAge }));
                setValue('max_age', maxAge);
              }}
              min={12}
              max={99}
            />
          </div>
          {errorMessage && (
            <div className="m-[6px] text-sm text-[#f00]">
              12~100세까지 설정 가능합니다.
            </div>
          )}
        </div>
      )}
      <input
        {...register('min_age', {
          valueAsNumber: true,
        })}
        type="hidden"
        value={selectedAgeRange.min || 0}
      />
      <input
        {...register('max_age', {
          valueAsNumber: true,
        })}
        type="hidden"
        value={selectedAgeRange.max || 0}
      />
    </div>
  );
}

export default AgeRangeSelection;
