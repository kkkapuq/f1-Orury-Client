import { REGIONS } from '@/constants/crew/regions';
import { useEffect } from 'react';
import { StepProps } from '@/types/crew/createFormSteps';

function Step1({ formMethods, setIsStepValid }: StepProps) {
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
    <div className="flex-auto">
      <div className="text-lg font-bold mb-4">
        선호하는 지역을 선택해 주세요
        <span className="font-light text-xs">(최대 3개)</span>
      </div>
      <div className="h-[calc(100dvh-16rem)] flex">
        <div className="w-[120px] flex flex-col flex-0 gap-[12px] p-[30px]">
          {/* <div className='text-[#0E0E0F]'>인기 지역</div> */}
          <button className="font-bold">서울</button>
        </div>
        <div className="flex-1 overflow-scroll bg-white p-[30px]">
          {REGIONS.map(region => (
            <label
              key={region}
              className="flex items-center font-normal mb-[12px]"
            >
              <input
                type="checkbox"
                value={region}
                {...register('regions')}
                onChange={handleCheckboxChange}
                checked={selectedRegions.includes(region)}
                className="mr-[10px]"
              />
              {region}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step1;
