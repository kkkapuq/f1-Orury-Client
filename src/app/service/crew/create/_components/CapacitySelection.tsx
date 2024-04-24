import { CAPACITY } from '@/constants/crew/crewOptions';
import { useEffect, useState } from 'react';
import {
  activeSelectStyles,
  commonSelectStyles,
  inputClass,
} from './UI/commonClass';
import { StepProps } from '@/types/crew/createFormSteps';
import Label from './UI/Label';
import { cn } from '@/lib/utils';

function CapacitySelection({ formMethods, setIsStepValid }: StepProps) {
  const [selectedValue, setSelectedValue] = useState<number>(10);
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState<number>(0);

  const { register, setValue, getValues } = formMethods;

  useEffect(() => {
    const submittedValue = getValues('capacity');
    if (submittedValue) {
      setSelectedValue(0);
      if (!CAPACITY.some(option => option.value === submittedValue)) {
        setIsCustomInput(true)
        setCustomValue(submittedValue)
      } else setSelectedValue(submittedValue);
    }
  }, []);

  const validateSelection = () => {
    const isValid = customValue >= 3 || selectedValue > 0;
    setIsStepValid(isValid);
  };

  const handleButtonClick = (value: number) => {
    setSelectedValue(value);
    setIsCustomInput(false);
    setValue('capacity', value);
    validateSelection();
  };

  const handleCustomInputClick = () => {
    if (!isCustomInput) {
      setIsCustomInput(true);
      setSelectedValue(0);
      setCustomValue(0);
      setValue('capacity', customValue);
      validateSelection();
    } else setIsCustomInput(false);
  };

  useEffect(() => {
    setValue('capacity', isCustomInput ? customValue : selectedValue);
    validateSelection();
  }, [customValue, selectedValue]);

  return (
    <div>
      <Label htmlFor="capacity">
        최대 인원 <span className="font-light text-xs">(3명 ~ 100명)</span>
      </Label>
      {CAPACITY.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleButtonClick(option.value)}
          className={cn(
            commonSelectStyles,
            selectedValue === option.value ? activeSelectStyles : null,
            'w-fit text-[14px] py-[10px] px-[14px] mr-[8px] mb-[8px]',
          )}
        >
          {option.label}
        </button>
      ))}
      <button
        type="button"
        onClick={handleCustomInputClick}
        className={cn(
          commonSelectStyles,
          isCustomInput ? activeSelectStyles : null,
          'w-fit text-[14px] py-[10px] px-[14px] mr-[8px] mb-[8px]',
        )}
      >
        직접 입력
      </button>
      {isCustomInput && (
        <div className="flex">
          <input
            {...register('capacity')}
            type="number"
            value={customValue}
            className={cn(inputClass, 'w-full pr-8')}
            onChange={e => {
              let value = e.target.valueAsNumber;
              if (value > 100) {
                value = 100;
              }
              setCustomValue(value);
              setValue('capacity', value);
              validateSelection();
            }}
            min={2}
            max={100}
            onFocus={() => setCustomValue(0)}
            placeholder="값을 직접 입력하세요"
          />
          <span className="-ml-[30px] pb-[34px] flex items-center text-zinc-500 text-sm">
            명
          </span>
        </div>
      )}
    </div>
  );
}

export default CapacitySelection;
