import { UseFormReturn } from 'react-hook-form';
import { formSchema } from '@/app/sign-up/schema';
import { z } from 'zod';
import { StaticImageData } from 'next/image';

export type Inputs = z.infer<typeof formSchema>;

export interface SignUpState {
  isValidBirth: boolean;
  isValidGender: boolean;
  setIsValidBirth: (value: boolean) => void;
  setIsValidGender: (value: boolean) => void;
}

export interface PostSignUpProps {
  sign_up_type: number;
  email: string | null;
  nickname: string;
  gender: number;
  birthday: string;
  profile_image?: File | StaticImageData;
}

export interface SetTokensInCookiesProps {
  accessToken: string;
  refreshToken: string;
}

export interface TosProps {
  handleOpenModal: () => void;
}

export interface DateRangeType {
  startDate: string | null | Date;
  endDate: string | null | Date;
}

export interface StepProps extends TosProps {
  formMethods: UseFormReturn<Inputs>;
  onNextClick: () => void;
}

export interface SignUpFormProps extends StepProps {
  profileImage: StaticImageData | File;
}

export type DateValueType = DateRangeType | null;
