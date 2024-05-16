'use client';

import clsx from 'clsx';
import useUserStore from '@/store/user/userStore';
import Button from '@/app/_components/buttons/Button';
import postSignUp from '@/app/sign-up/api/postSignUp';
import Datepicker from 'react-tailwindcss-datepicker';
import defaultImage from '$/images/defaultUserProfile.jpg';
import TosSummary from '@/app/sign-up/_components/Step2/TosSummary';
import RequiredStar from '@/app/sign-up/_components/Step2/RequiredStar';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { FormSchemaType } from '@/app/sign-up/schema';
import { setTokensInCookies } from '@/utils/setTokensInCookies';
import {
  BIRTHDAY_INPUT,
  GENDER_INPUT,
  NICKNAME_INPUT,
} from '@/constants/sign-up';
import type { DateValueType, SignUpFormProps } from '@/types/sign-up';
import { getFormData } from '@/utils/getFormData';

function SignUpForm({ ...props }: SignUpFormProps) {
  const [isValid, setIsValid] = useState(false);
  const { handleOpenModal, formMethods, onNextClick, profileImage } = props;
  const { signUpType, email } = useUserStore();
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = formMethods;
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: '',
    endDate: '',
  });
  const isDefaultImage = profileImage === defaultImage;
  const nickname = watch('nickname');
  const birthday = watch('birthday');
  const gender = watch('gender');
  const validNickname = nickname?.length >= 2 && nickname.length <= 8;
  const validBirthDay = birthday?.length === 10;

  // 전체 유효성 검사
  useEffect(() => {
    const allFieldFilled = validNickname && validBirthDay && gender;
    if (allFieldFilled) setIsValid(true);
    else setIsValid(false);
  }, [nickname, birthday, gender, setIsValid]);

  const handleButtonClick = (gender: number) => {
    setValue('gender', gender);
    trigger('gender');
  };

  const handleValueChange = (value: DateValueType) => {
    if (value?.startDate) setValue('birthday', value.startDate.toString());
    setDateValue(value);
    trigger('birthday');
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    const formData = getFormData({
      jsonData: JSON.stringify({
        ...data,
        sign_up_type: signUpType,
        email,
      }),
      images: isDefaultImage ? null : [profileImage as File],
    });

    const response = await postSignUp(formData);

    // 회원가입에 성공했을 때
    if (response && response.data) {
      // 응답으로 온 토큰 저장
      setTokensInCookies({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });

      // 세션 스토리지 내 auth token 삭제
      sessionStorage.clear();

      onNextClick();
    }
  };

  const manButtonClassName = clsx(
    'flex rounded-3xl px-4 py-2 border',
    getValues('gender') === GENDER_INPUT.manIdx
      ? 'border-primary text-primary'
      : 'border-disabled',
  );

  const womanButtonClassName = clsx(
    'flex rounded-3xl px-4 py-2 border',
    getValues('gender') === GENDER_INPUT.womanIdx
      ? 'border-primary text-primary'
      : 'border-disabled',
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-4 pt-4 pb-4 justify-between h-[60dvh]"
    >
      <div className="flex flex-col justify-between h-full">
        {/* 닉네임 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex">
              {NICKNAME_INPUT.label}
              <RequiredStar />
            </div>
          </div>
          <input
            {...register('nickname')}
            className={`outline-none border-b border-b-primary py-2 ${
              errors.nickname && 'border-b-warning focus:border-b-warning'
            }`}
            type={NICKNAME_INPUT.type}
            placeholder={NICKNAME_INPUT.placeholder}
            onChange={e => {
              setValue('nickname', e.target.value);
            }}
            onBlur={() => trigger('nickname')}
          />

          {errors.nickname && (
            <span className="text-sm font-normal text-primary">
              {errors.nickname.message}
            </span>
          )}
        </div>

        {/* 생년월일 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex">
              {BIRTHDAY_INPUT.label}
              <RequiredStar />
            </div>
          </div>
          <Datepicker
            {...register('birthday')}
            i18n="ko"
            placeholder={BIRTHDAY_INPUT.placeholder}
            useRange={false}
            asSingle
            primaryColor="violet"
            value={dateValue}
            onChange={handleValueChange}
            maxDate={new Date()}
            readOnly
            inputClassName={`relative p-0 border-b-primary border-b w-full py-2 ${
              errors.birthday && 'border-b-warning focus:border-b-warning'
            }`}
          />
          {errors.birthday && (
            <span className="text-sm font-normal text-primary">
              {errors.birthday.message}
            </span>
          )}
        </div>

        {/* 성별 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex">
              {GENDER_INPUT.label}
              <RequiredStar />
            </div>
            {errors.gender && (
              <p className="text-warning text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleButtonClick(GENDER_INPUT.manIdx)}
              className={manButtonClassName}
            >
              {GENDER_INPUT.man}
            </button>
            <button
              type="button"
              onClick={() => handleButtonClick(GENDER_INPUT.womanIdx)}
              className={womanButtonClassName}
            >
              {GENDER_INPUT.woman}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <TosSummary handleOpenModal={handleOpenModal} />
        <Button
          content="Orury 시작하기"
          color="primary"
          weight="bold"
          disabled={!isValid}
          submit
        />
      </div>
    </form>
  );
}

export default SignUpForm;
