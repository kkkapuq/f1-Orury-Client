'use client';

import OneSearchResult from '@/app/service/map/_components/search/OneSearchResult';
import type { SearchResultProps } from '@/types/map/BottomSheetProps';
import { Map } from 'lucide-react';
import { COLOR } from '@/styles/color';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import noSerch from '$/images/noSerch.png';
import noResult from '$/images/noResult.png';

/**
 * @description 해당 Modal은 검색의 결과를 나타내기 위한 Modal입니다.
 * @param isSearching 현재 검색중인지 확인합니다. UI를 나타내기 위해서 필요합니다.
 * @param onSearchingBlur 검색창에서 벗어났을 때 실행될 함수입니다.
 * @param handleMovePosition 눌러진 포지션 값에 따라 해당 좌표로 지도의 중심을 이동시킵니다.
 * @param handleCarouselOpen 전달받은 아이디 값의 이미지 모달을 엽니다.
 * @param searchResult 검색된 값의 결과를 받아와서 나타냅니다.
 */
function SearchResultModal({
  isSearching,
  onSearchingBlur,
  handleMovePosition,
  searchResult,
}: SearchResultProps) {
  const router = useRouter();
  const handleSearchModalClose = () => {
    // router.push(' ');
    // router 일단은 보류 --------------------
    onSearchingBlur();
  };

  const modalClassName = cn(
    'absolute border-t-[1px] border-primary left-1/2 overflow-y-scroll translate-x-[-50%] duration-500 p-5 mt-14 h-[calc(100vh-3.5rem)] w-full bg-white',
    { 'opacity-0 top-1/2 z-0': !isSearching },
    { 'z-50 top-0': isSearching },
  );

  return (
    <div className={modalClassName}>
      <div className="flex justify-between">
        <span>장소</span>
        <button
          type="button"
          onClick={handleSearchModalClose}
          className="flex items-center text-sm gap-2"
        >
          <span className="text-sm text-gray-400">지도 보기</span>
          <Map size={20} stroke={COLOR.primary} />
        </button>
      </div>

      {searchResult === undefined ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center">
            <Image src={noSerch} alt="no-serch" width={100} height={100} />
          </div>
          <p className="mt-4 text-[#C3C6CC]">암장을 검색하세요.</p>
        </div>
      ) : (
        <div>
          {searchResult?.length === 0 ? (
            <div className="flex h-full justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <Image src={noResult} alt="no-serch" width={100} height={100} />
                <p className="mt-4">검색 결과가 없습니다.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col pt-2 mt-2 border-t-[1px] gap-2">
              {searchResult.map(value => (
                <OneSearchResult
                  key={value.id}
                  item={value}
                  onMovePosition={() => {
                    console.log('value', value);
                    handleMovePosition(value);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResultModal;
