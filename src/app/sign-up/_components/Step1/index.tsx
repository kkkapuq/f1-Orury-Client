import Button from '@/app/_components/buttons/Button';

import { REGIONS } from '@/constants/crew/regions';
import { useEffect, useState } from 'react';
import type { StepProps } from '@/types/sign-up';

function Step1({
  formMethods,
  onNextClick,
}: Omit<StepProps, 'handleOpenModal'>) {
  const [isStepValid, setIsStepValid] = useState(false);
  const { register, setValue, watch } = formMethods;
  const selectedRegions = watch('regions') || [];

  useEffect(() => {
    const numSelected = selectedRegions.length;
    if (numSelected >= 1 && numSelected <= 3) {
      setIsStepValid(true);
    } else {
      setIsStepValid(false);
    }
  }, [selectedRegions, setIsStepValid]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentRegions = watch('regions') || [];

    if (checked && currentRegions.length >= 3) {
      return;
    }

    if (checked) {
      setValue('regions', [...currentRegions, value]);
    } else {
      setValue(
        'regions',
        currentRegions.filter(region => region !== value),
      );
    }
  };

  return (
    <div>
      <div className="flex-auto">
        <div className="flex flex-col px-10 py-9 gap-3">
          <div className="text-xl font-thin">
            <span>클라이밍 업데이트를 받고 싶은</span>
            <br />
            <span>
              지역 <span className="text-primary font-bold">3곳을&nbsp;</span>
            </span>
            <span>선택해주세요</span>
          </div>

          <div className="text-base font-normal leading-6 tracking-tighter">
            <span>선택한 지역의 암장 정보와</span>
            <br />
            <span>오픈 정보를 빠르게 알려드릴게요.</span>
          </div>
        </div>

        <div className="h-[calc(100dvh-20rem)] flex">
          <div className="w-[120px] flex flex-col flex-0 gap-3 p-[30px] bg-grey-100">
            <button className="font-normal">서울</button>
          </div>
          <div className="flex-1 overflow-scroll bg-white p-[30px]">
            {REGIONS.map(region => (
              <label
                key={region}
                className="flex items-center font-normal mb-3"
              >
                <input
                  type="checkbox"
                  value={region}
                  {...register('regions')}
                  onChange={handleCheckboxChange}
                  checked={selectedRegions.includes(region)}
                  className="w-5 h-5 mr-[10px] rounded-md accent-primary"
                />
                {region}
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 px-4">
          <Button
            content="다음"
            color={isStepValid ? 'primary' : 'none'}
            disabled={!isStepValid}
            onClick={onNextClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Step1;
