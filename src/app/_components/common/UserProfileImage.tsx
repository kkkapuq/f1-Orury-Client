import Image from 'next/image';
import * as D from '@/app/_components/ui/dropdown-menu';
import defaultImage from '$/images/defaultUserProfile.jpg';

import { Camera } from 'lucide-react';
import { COLOR } from '@/styles/color';
import { useRef } from 'react';
import { UserProfileImageProps } from '@/types/common/profileImage';
import { getFormData } from '@/utils/getFormData';

function UserProfileImage({ ...props }: UserProfileImageProps) {
  const { profileImage, setProfileImage } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 프로필 이미지를 특정 이미지로 변경 핸들러 함수 (기본 이미지 => 특정 이미지)
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = event.target;

    if (files) {
      const targetImage = files[0];
      setProfileImage(targetImage);

      // 더미 값 설정
      event.target.value = '';
    }
  };

  // 프로필 이미지를 기본 이미지로 변경 핸들러 함수 (특정 이미지 => 기본 이미지)
  const handleChangeDefaultImage = () => {
    setProfileImage(defaultImage);
  };

  const isDefaultImage = profileImage === defaultImage;

  return (
    <div className="flex justify-center mt-16">
      <div className="w-24 h-24 relative">
        <Image
          src={
            isDefaultImage
              ? profileImage
              : URL.createObjectURL(profileImage as File)
          }
          alt="프로필 이미지"
          priority
          fill
          className="rounded-full"
        />

        <label
          htmlFor="userProfileImage"
          className="flex justify-center items-center w-9 h-9 absolute right-0 bottom-0 bg-primary rounded-full cursor-pointer border-4 border-white"
        >
          <D.DropdownMenu>
            <D.DropdownMenuTrigger>
              <Camera
                size={20}
                stroke={COLOR.primary}
                strokeWidth={1.5}
                fill={COLOR.white}
              />
            </D.DropdownMenuTrigger>
            <D.DropdownMenuContent className="bg-white">
              <D.DropdownMenuLabel className="text-grey-600 text-xs boder-b border-b-2">
                프로필 이미지 변경
              </D.DropdownMenuLabel>
              <D.DropdownMenuSeparator />
              <D.DropdownMenuItem onClick={handleChangeButtonClick}>
                프로필 이미지 변경하기
              </D.DropdownMenuItem>
              <D.DropdownMenuItem onClick={handleChangeDefaultImage}>
                기본 이미지로 변경
              </D.DropdownMenuItem>
            </D.DropdownMenuContent>
          </D.DropdownMenu>
        </label>
      </div>

      <input
        type="file"
        id="userProfileImage"
        accept="image/*"
        onChange={handleProfileImageChange}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
}

export default UserProfileImage;
