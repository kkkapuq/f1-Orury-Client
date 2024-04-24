import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

type ButtonType = 'scheduled' | 'finished';

function Schedules() {
  const [selectedButton, setSelectedButton] = useState<ButtonType>('scheduled');

  const handleButtonClick = (button: ButtonType) => {
    setSelectedButton(button);

    if (button === 'scheduled') {
      callScheduledApi();
    } else if (button === 'finished') {
      callFinishedApi();
    }
  };

  const callScheduledApi = () => {
    console.log('예정된 일정 API 호출');
  };

  useEffect(() => {
    callScheduledApi();
  },[])

  const callFinishedApi = () => {
    console.log('종료된 일정 API 호출');
  };
  return (
    <div>

      <div className="flex gap-[10px]">
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
    </div>
  );
}

export default Schedules;
