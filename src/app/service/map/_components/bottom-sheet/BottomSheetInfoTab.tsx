/* eslint-disable function-paren-newline */

import { useToast } from '@/app/_components/ui/use-toast';
import { BottomSheetInnerProps } from '@/types/map/BottomSheetProps';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function BottomSheetInfoTab({ data }: BottomSheetInnerProps) {
  const {
    address,
    business_hours,
    id,
    instagram_link,
    kakao_map_link,
    road_address,
    score_average,
    setting_day,
    bar_chart_data,
    line_chart_data,
    doing_business,
    images,
    name,
    phone_number,
    position,
  } = data;
  // 현재 요일 조회 (암장 영업일을 현재기준으로 상단에 렌더링하기때문)
  const week = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const curDay = week[new Date().getDay()];

  // business_hours에 현재 요일과 일치한것 filter 후 return
  const filteredBusinessHours = business_hours.filter(business_hour => {
    return Object.keys(business_hour).includes(curDay);
  });
  // 주소 복사
  const { toast } = useToast();
  const copyAdd = () => {
    window.navigator.clipboard.writeText(road_address).then(() => {
      // 복사가 완료되면 호출된다.
      toast({
        variant: 'success',
        description: '주소가 복사되었습니다.',
        duration: 2000,
      });
    });
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <main className="h-fit">
        <section className=" gap-[0.75rem] my-5">
          {/* 운영 시간 */}
          <div className="flex">
            <span
              className={`rounded px-1 gap-8px text-[#ffff] ${doing_business ? 'bg-[#B79DFF]' : 'bg-[#C3C6CC]'} mr-1`}
            >
              {doing_business ? '영업중' : '영업 종료'}
            </span>

            <div className="text-gray-900 font-semibold text-base">
              운영 시간
            </div>
          </div>

          <div className="my-2">
            <div className="flex items-center">
              <div>{`[${Object.keys(filteredBusinessHours[0])}] ${Object.values(filteredBusinessHours[0])}`}</div>
              <summary
                className="list-none ml-2 p-1"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen ? 'true' : 'false'}
              >
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </summary>
            </div>
            <ul>
              {isOpen && (
                <div>
                  {business_hours.map(business_hour =>
                    Object.entries(business_hour).map(([day, time]) => (
                      <div key={day}>{`[${day}] ${time}`}</div>
                    )),
                  )}
                  {setting_day && <div>{`[Setting Day] ${setting_day}`}</div>}
                </div>
              )}
            </ul>
          </div>
        </section>
        {/* 회색 줄 */}
        <div className="shadow-custom-line h-[1px] py-1" />
        {/* 센터 정보 */}
        <section className="my-5">
          <div className="text-gray-900 font-semibold text-base">센터 정보</div>
        </section>
        {/* 회색 줄 */}
        <div className="shadow-custom-line h-[1px] py-1" />
        {/* 위치 */}
        <section className="my-5">
          <div className="text-gray-900 font-semibold text-base">위치</div>
          <Map
            center={{ lat: position.latitude, lng: position.longitude }}
            style={{
              width: '90%',
              height: '120px',
              borderRadius: '8px',
              margin: 'auto',
            }}
          >
            <MapMarker
              position={{ lat: position.latitude, lng: position.longitude }}
            />
          </Map>
          <div>{road_address}</div>
          <button
            type="button"
            onClick={copyAdd}
            className="flex items-center justify-center w-[100px] h-[37px] px-6px rounded-lg border border-solid border-[#E5E7EB] font-semibold mt-5"
          >
            <Copy size={14} className="mr-1" />
            <span>주소복사</span>
          </button>
        </section>
      </main>
    </div>
  );
}
