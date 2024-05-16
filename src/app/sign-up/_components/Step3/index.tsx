'use client';

import logo from '$/images/loadingLogo.png';
import Image from 'next/image';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CALLBACK_URL from '@/constants/url';

function Step3() {
  const router = useRouter();
  const { service, map } = CALLBACK_URL;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(service + map);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-20 sm:h-full sm:pb-32 sm:pt-0">
      <Image src={logo} alt="로고" width={80} height={80} />
      <div className="flex flex-col text-center text-xl font-thin leading-[28px] tracking-tighter pt-14">
        <span>입력해주신 정보로</span>
        <span className="pb-4">홈 화면을 구성하고 있어요!</span>
        <span className="text-black text-sm font-normal leading-[21px] tracking-tighter">
          잠시만 기다려주세요
        </span>
      </div>
    </div>
  );
}

export default Step3;
