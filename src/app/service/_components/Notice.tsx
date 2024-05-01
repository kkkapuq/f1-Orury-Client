'use client';

import Link from 'next/link';
import CALLBACK_URL from '@/constants/url';

import { COLOR } from '@/styles/color';
import { Bell, X } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/app/_components/ui/use-toast';

function Notice() {
  const [isClosed, setIsClosed] = useState(false);
  const { toast } = useToast();
  const CATEGORY = '공지사항';
  const NOTICE = '성수에 클라이밍 파크가 생겼어요.';

  const { white } = COLOR;

  const handleClick = () => {
    setIsClosed(true);
  };

  // 공지사항 API가 연동되면 사라질 임시 함수
  const handleTemp = () => {
    toast({
      title: '서비스 준비중',
      description: '해당 공지글로의 이동은 준비중입니다',
      duration: 2000,
    });
  };

  return (
    <div>
      {!isClosed && (
        <div className="relative">
          <Link
            className="flex items-center h-8 px-4 mt-3 text-xs overflow-hidden bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
            href={CALLBACK_URL.service + CALLBACK_URL.community}
            onClick={handleTemp}
          >
            <Bell color={white} fill={white} className="min-w-4 max-w-4" />
            <div className="flex items-center">
              <span className="mx-1 px-1 py-[2px] text-white text-xs rounded-[4px] bg-primary font-semibold text-center">
                {CATEGORY}
              </span>
              <span className="h-4 text-white text-xs font-semibold line-clamp-1 overflow-hidden mr-1">
                {NOTICE}
              </span>
            </div>
          </Link>
          <X
            color={white}
            strokeWidth={2}
            className="absolute right-4 top-1 cursor-pointer min-w-4 max-w-4"
            onClick={() => handleClick()}
          />
        </div>
      )}
    </div>
  );
}

export default Notice;
