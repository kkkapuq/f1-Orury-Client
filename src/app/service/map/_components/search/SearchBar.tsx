/* eslint-disable prefer-destructuring */
/* eslint-disable import/order */
/* eslint-disable function-paren-newline */
import type {
  SearchKeyWordProps,
  SearchResultProps,
} from '@/types/map/BottomSheetProps';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import { COLOR } from '@/styles/color';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchResultModal from './SearchResultModal';
import { OneSearchKeywordType } from '@/types/map/map';
import useMap from '@/apis/map/hooks/useMap';

/**
 * @description 검색을 하기 위한 컴포넌트
 * @param isSearching 현재 검색상태인지 확인하는 state (검색 상태에 따른 css를 적용하기 위해서 필요합니다.)
 * @param setIsSearching 검색 상태를 관리합니다.
 */
function SearchBar({
  mapInfo,
  isSearching,
  onSearchingFocus,
  onSearchingBlur,
  handleMovePosition,
}: SearchKeyWordProps) {
  const [searchName, setSearchName] = useState('');

  const searchRef = useRef<HTMLInputElement>(null);
  const keyword = useSearchParams().get('keyword') ?? '';
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<
    OneSearchKeywordType[] | undefined
  >(undefined);

  const { isLoading, data: mapSearchGymListResponse } = useMap.useGetSearchList(
    mapInfo.center,
    searchName,
  );

  const handleSearchFocus = () => {
    onSearchingFocus();
  };

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchKeyword: {
        value: string;
      };
    };
    // 검색 할때만 useState변경
    setSearchResults(mapSearchGymListResponse?.data.data);
    router.push(`?keyword=${target.searchKeyword.value}`);
  };

  const containerClassName = clsx(
    'z-10 h-8 absolute left-1/2 translate-x-[-50%] duration-500',
    { 'top-0 w-full': isSearching },
    { 'top-2 w-[94%]': !isSearching },
  );
  const formClassName = clsx(
    'relative bg-white pl-3 pr-8 duration-500',
    { 'py-4': isSearching },
    { 'py-2 top-2 rounded-lg': !isSearching },
  );

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.currentTarget.value);
  }, []);

  return (
    <>
      <div className={containerClassName}>
        <form onSubmit={handleSearchSubmit} className={formClassName}>
          <label htmlFor="searchKeyword">
            <input
              defaultValue={keyword}
              name="searchKeyword"
              id="searchKeyword"
              ref={searchRef}
              placeholder="암장 이름으로 검색하세요."
              onFocus={handleSearchFocus}
              className="w-full outline-0"
              onChange={onChangeInput}
            />
          </label>
          <button
            type="submit"
            className="absolute right-2 top-1/2 translate-y-[-50%]"
          >
            <Search stroke={COLOR.primary} />
          </button>
        </form>
      </div>
      <SearchResultModal
        searchResult={searchName ? searchResults : undefined}
        isSearching={isSearching}
        searchLoading={isLoading}
        onSearchingBlur={onSearchingBlur}
        handleMovePosition={handleMovePosition}
      />
    </>
  );
}

export default SearchBar;
