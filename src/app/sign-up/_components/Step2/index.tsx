import UserProfileImage from '@/app/_components/common/UserProfileImage';
import SignUpForm from '@/app/sign-up/_components/Step2/SignUpForm';
import defaultImage from '$/images/defaultUserProfile.jpg';
import TosModal from '@/app/sign-up/_components/Step2/TosModal';

import { useState } from 'react';
import { StaticImageData } from 'next/image';
import type { StepProps } from '@/types/sign-up';

function Step2({
  formMethods,
  onNextClick,
}: Omit<StepProps, 'handleOpenModal'>) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | StaticImageData>(
    defaultImage,
  );

  const handleOpenModal = () => setIsOpen(isOpen => !isOpen);
  return (
    <div className="flex flex-col justify-between h-full">
      <UserProfileImage
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />
      <SignUpForm
        formMethods={formMethods}
        onNextClick={onNextClick}
        handleOpenModal={handleOpenModal}
        profileImage={profileImage}
      />
      {isOpen && <TosModal handleOpenModal={handleOpenModal} />}
    </div>
  );
}

export default Step2;
