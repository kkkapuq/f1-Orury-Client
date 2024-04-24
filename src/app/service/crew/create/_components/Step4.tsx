import { useEffect, useState } from 'react';

import { StepProps } from '@/types/crew/createFormSteps';
import Label from './UI/Label';
import SingleImageSubmit from './SingleImageSubmit';

function Step4({ setIconImage }: StepProps) {
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (setIconImage) {
      setIconImage(image);
    }
  }, [image, setIconImage]);

  return (
    <div>
      <Label htmlFor="ageRange">대표 사진 설정</Label>
      <SingleImageSubmit image={image} setImage={setImage} />
    </div>
  );
}

export default Step4;
