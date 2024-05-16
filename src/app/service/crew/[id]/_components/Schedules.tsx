import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ButtonType = 'scheduled' | 'finished';

function Schedules({id}: { id: number }) {
  const [selectedButton, setSelectedButton] = useState<ButtonType>('scheduled');

  const router = useRouter();

  const handleButtonClick = (button: ButtonType) => {
    setSelectedButton(button);

    if (button === 'scheduled') {
      callScheduledApi();
    } else if (button === 'finished') {
      callFinishedApi();
    }
  };

  const callScheduledApi = () => {
    const fetchCrewMeetings = () => {
      // getCrewMeetings(crewId).then(response => setCrewMeetings(response));
      console.log('예정된 일정 호출');
    };
    fetchCrewMeetings();
  };

  useEffect(() => {
    callScheduledApi();
  }, []);

  const callFinishedApi = () => {
    console.log('종료된 일정 API 호출');
  };
  return (
    <div>
      <button
        className="bg-white w-full drop-shadow-md py-[18px] rounded-[10px] text-violet-500 text-sm font-semibold"
        onClick={() => {
          router.push(`${id}/new-meeting`);
        }}
      >
        + 일정 추가하기
      </button>
      <div className="flex gap-[10px] mt-[12px]">
        {/* 예정된 일정 버튼 */}
        <button
          className={cn(
            'p-[10px] rounded-[10px] justify-center items-center text-[12px]',
            selectedButton === 'scheduled'
              ? 'bg-violet-500 text-white'
              : 'border border-gray-200',
          )}
          onClick={() => handleButtonClick('scheduled')}
        >
          예정된 일정
        </button>

        {/* 종료된 일정 버튼 */}
        <button
          className={cn(
            'p-[10px] rounded-[10px] justify-center items-center text-[12px]',
            selectedButton === 'finished'
              ? 'bg-violet-500 text-white'
              : 'border border-gray-200',
          )}
          onClick={() => handleButtonClick('finished')}
        >
          종료된 일정
        </button>
      </div>
      <div className="py-[16px]">
        <div className="rounded-[10px] w-full overflow-hidden drop-shadow">
          <div className="bg-[#E1D7FF] p-[12px] font-semibold">
            3월 4일 (월) 오후 2:00
          </div>
          <div className="p-[12px] bg-white">
            <div className="text-sm">강동클라이밍</div>
            <div className="text-sm">참여인원</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedules;
