'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/app/service/map/_components/search/SearchBar';
import BottomSheetContainer from '@/app/service/map/_components/bottom-sheet/BottomSheetContainer';
import KakaoBackGroundMap from '@/app/service/map/_components/kakao/KakaoBackGroundMap';
import ImageSliderModal from '@/app/_components/modal/ImageSliderModal';
import ImageModal from '@/app/_components/modal/ImageModal';
import type { MapMoveControlType, OneSearchKeywordType } from '@/types/map/map';
import useReviewStore from '@/store/review/reviewStore';
import Image from 'next/image';
import goCurLocation from '$/images/goCurLocation.png';
import ReviewModalContainer from '../../_components/review/review-modal/ReviewModalContainer';
import Location from './_components/kakao/Location';

function Page() {
  const router = useRouter();
  const { reset } = useReviewStore(state => state);
  const keyword = useSearchParams().get('keyword') ?? '';
  const selectId = useSearchParams().get('selectId') ?? '';
  const location: any = Location(); // 처음 현재 내위치 lat, lng
  // 맵상에서 선택된 지도가 있는지 판단하는 state
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  // 검색중인지 판단하는 state
  const [isSearching, setIsSearching] = useState<boolean>(false);
  // mapInfo를 상태관리로 빼야할듯?
  const [mapInfo, setMapInfo] = useState<MapMoveControlType>({
    center: { lat: 37.4991618, lng: 127.0281867 }, // Default center
    isPanto: false, // 현재 지도의 좌표와 이동시 부드럽게 움직이는지 여부를 나타냅니다.
  });

  // 좌표를 이동 시키고 열어주는 함수
  const handleMovePosition = (item: OneSearchKeywordType) => {
    const { latitude, longitude } = item.position;
    setMapInfo({
      center: { lat: latitude, lng: longitude },
      isPanto: true,
    });

    if (isSearching) setIsSearching(false);

    if (keyword) {
      router.push(`?selectId=${item.id}&keyword=${keyword}`);
    } else {
      router.push(`?selectId=${item.id}`);
    }
    setIsSheetOpen(true);
  };

  useEffect(() => {
    if (isSearching && isSheetOpen) setIsSheetOpen(false);
  }, [isSearching]);

  useEffect(() => {
    if (typeof location === 'object' && location !== null) {
      // location이 object 이고 null이 아닌지 확인
      setMapInfo({
        center: location,
        isPanto: false,
      });
    }
  }, [location]);

  return (
    <div className="h-full relative">
      <ReviewModalContainer isMyPage={false} openPosition="right" />
      <ImageModal />
      <ImageSliderModal />
      <KakaoBackGroundMap
        mapInfo={mapInfo}
        handleMovePosition={handleMovePosition}
      />
      <SearchBar
        mapInfo={mapInfo}
        isSearching={isSearching}
        onSearchingFocus={() => setIsSearching(true)}
        onSearchingBlur={() => setIsSearching(false)}
        handleMovePosition={handleMovePosition}
      />
      <button
        type="button"
        className="z-20 absolute top-[88%] right-2 w-[45px] h-[45px] p-3 rounded-full bg-[#855AFF]"
        onClick={() => {
          setMapInfo({
            center: { lat: mapInfo.center.lat, lng: mapInfo.center.lng },
            isPanto: true,
          });
        }}
      >
        <Image src={goCurLocation} alt="goCurLocation" width={22} height={22} />
      </button>
      {selectId && (
        <BottomSheetContainer
          selectId={selectId}
          isSheetOpen={isSheetOpen}
          onDisMiss={() => setIsSheetOpen(false)}
        />
      )}
    </div>
  );
}

export default Page;
