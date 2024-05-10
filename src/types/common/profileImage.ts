import { StaticImageData } from 'next/image';

export interface UserProfileImageProps {
  profileImage: File | StaticImageData;
  setProfileImage: React.Dispatch<React.SetStateAction<File | StaticImageData>>;
}
