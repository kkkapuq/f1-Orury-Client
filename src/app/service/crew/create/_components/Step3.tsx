import { StepProps } from '@/types/crew/createFormSteps';
import { useEffect, useState } from 'react';
import AgeRangeSelection from './AgeRangeSelection';
import CapacitySelection from './CapacitySelection';
import GenderSelection from './GenderSelection';

function Step3({ formMethods, setIsStepValid }: StepProps) {
  const [capacityValid, setCapacityValid] = useState(false);
  const [ageRangeValid, setAgeRangeValid] = useState(false);
  const [genderValid, setGenderValid] = useState(false);

  useEffect(() => {
    // 모든 하위 컴포넌트의 유효성 상태가 true이면 setIsStepValid(true)를 실행
    const isAllValid = capacityValid && ageRangeValid && genderValid;
    setIsStepValid(isAllValid);
  }, [capacityValid, ageRangeValid, genderValid]);

  return (
    <div>
      {/* 최대 인원 선택 */}
      <CapacitySelection
        formMethods={formMethods}
        setIsStepValid={setCapacityValid}
      />

      {/* 연령대 선택 */}
      <AgeRangeSelection
        formMethods={formMethods}
        setIsStepValid={setAgeRangeValid}
      />

      {/* 성별 선택 */}
      <GenderSelection
        formMethods={formMethods}
        setIsStepValid={setGenderValid}
      />
    </div>
  );
}
export default Step3;
