import defaultImage from '$/images/defaultUserProfile.jpg';

import { UserStateProps } from '@/types/sign-in';
import { StaticImageData } from 'next/image';
import { create } from 'zustand';

const useUserStore = create<UserStateProps>(set => ({
  // 1: KAKAO, 2: APPLE
  signUpType: 1,

  // 유저 고유 ID
  id: 0,

  // 유저 고유 EMAIL
  email: null,

  // 유저 프로필 이미지
  profile_image: defaultImage,

  category: null,

  setSignUpType: (value: number) => set({ signUpType: value }),
  setId: (value: number) => set({ id: value }),
  setEmail: (value: string | null) => set({ email: value }),
  setCategory: (value: string | null) => set({ category: value }),
  setProfileImage: (value: File | StaticImageData) =>
    set({ profile_image: value }),
}));

export default useUserStore;
