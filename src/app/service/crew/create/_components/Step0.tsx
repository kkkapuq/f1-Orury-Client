import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { TAGS as initialTags } from '@/constants/crew/crewOptions';
import { StepProps } from '@/types/crew/createFormSteps';
import { twMerge } from 'tailwind-merge';
import {
  activeSelectStyles,
  commonSelectStyles,
  inputClass,
  labelClass,
} from './UI/commonClass';

function Step0({ formMethods, setIsStepValid }: StepProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [customTag, setCustomTag] = useState<string>('');
  const [isCustomTag, setIsCustomTag] = useState<boolean>(false);

  const { register, setValue, getValues, watch } = formMethods;

  useEffect(() => {
    const tags = getValues('tags');
    if (tags) {
      setSelectedValues(tags);
    }
  }, []);

  const handleTagClick = (option: string) => {
    const numSelected = selectedValues.length;

    if (selectedValues.includes(option)) {
      setSelectedValues(prev => prev.filter(value => value !== option));
    } else if (numSelected < 3) {
      setSelectedValues(prev => [...prev, option]);
    }
  };

  const handleCustomTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTag(e.target.value);
  };

  const handleCustomTagSubmit = () => {
    if (customTag) {
      setSelectedValues([...selectedValues, customTag]);
      setCustomTag('');
      setIsCustomTag(false);
    }
  };
  useEffect(() => {
    if (selectedValues.length >= 3) {
      setIsCustomTag(false);
    }
  }, [selectedValues]);

  // StepValid 확인 로직
  useEffect(() => {
    const name = watch('name');
    const description = watch('description');

    const allFieldsFilled =
      name?.length >= 3 && description && selectedValues.length >= 1;

    if (allFieldsFilled) {
      setIsStepValid(true);
    } else {
      setIsStepValid(false);
    }
    setValue('name', name);
    setValue('description', description);
    setValue('tags', selectedValues);
  }, [
    watch('name'),
    watch('description'),
    selectedValues,
    setIsStepValid,
    setValue,
  ]);

  const customTags = selectedValues.filter(
    value => !initialTags.includes(value),
  );

  const renderSelectButtons = (tags: string[]) => {
    return tags.map(tag => (
      <button
        key={tag}
        type="button"
        onClick={() => handleTagClick(tag)}
        className={twMerge(
          commonSelectStyles,
          selectedValues.includes(tag) ? activeSelectStyles : null,
          'w-fit text-[14px] py-[10px] px-[14px] mr-[8px] mb-[8px]',
        )}
      >
        {tag}
      </button>
    ));
  };

  return (
    <div>
      <label className={labelClass} htmlFor="name">
        크루명 <span className="font-light text-xs">(3~15글자)</span>
      </label>
      <input
        id="name"
        className={inputClass}
        type="text"
        placeholder="이름을 입력해 주세요."
        maxLength={15}
        {...register('name', { required: true })}
      />

      <label className={labelClass} htmlFor="description">
        크루 소개
      </label>
      <textarea
        className={inputClass}
        id="description"
        rows={5}
        placeholder="소개글을 입력해 주세요."
        {...register('description', { required: true })}
      />

      <label className={labelClass} htmlFor="tags">
        태그 선택 <span className="font-light text-xs">(1~3개)</span>
      </label>
      <div>
        {renderSelectButtons(initialTags)}
        {renderSelectButtons(customTags)}
        <button
          type="button"
          onClick={() => {
            if (isCustomTag === true) {
              setIsCustomTag(false);
            } else if (selectedValues.length < 3) {
              setIsCustomTag(true);
            }
          }}
          className={twMerge(
            commonSelectStyles,
            'w-fit text-[14px] py-[10px] px-[14px] mr-[8px] mb-[8px]',
          )}
        >
          직접입력
        </button>
        {isCustomTag && (
          <div className="flex">
            <input
              type="text"
              value={customTag}
              onChange={handleCustomTagChange}
              maxLength={6}
              className={clsx(inputClass, 'flex-1')}
              placeholder="최대 6글자 입력 가능"
            />
            <button
              type="button"
              onClick={handleCustomTagSubmit}
              className={twMerge(inputClass, 'w-fit ml-2')}
            >
              추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step0;
