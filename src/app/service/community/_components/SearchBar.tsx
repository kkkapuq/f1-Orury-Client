'use client';

import clsx from 'clsx';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import type { SearchBarProps } from '@/types/community/searchBar';

function SearchBar({ ...props }: SearchBarProps) {
  const { setIsSearchingFocus, setSearchText, isSearchingFocus, onExit } =
    props;
  const [text, setText] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchingFocus) {
      setText('');
      setSearchText('');
    }
  }, [isSearchingFocus]);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleTextBlur = () => {
    setSearchText(text);
  };

  const handleSearchFocus = () => {
    setIsSearchingFocus(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleTextBlur();
  };

  const sectionClassName = clsx(
    'flex justify-between gap-2 relative z-[9] left-1/2 translate-x-[-50%] duration-500 px-4',
    { 'top-0 w-full pt-2': isSearchingFocus },
    { 'top-0 w-[96%] my-2': !isSearchingFocus },
  );

  return (
    <section className={sectionClassName}>
      <div className="w-full">
        <input
          className="w-full h-10 pl-10 pr-10 rounded-xl outline-none bg-grey-100 border-2 border-white placeholder:text-grey-500 focus:border-2 focus:border-primary"
          ref={searchRef}
          placeholder="검색"
          onChange={onTextChange}
          onBlur={handleTextBlur}
          onFocus={handleSearchFocus}
          onKeyDown={handleKeyDown}
          value={text}
        />
        <button type="button" className="absolute left-6 top-4">
          <Search color="#747C84" />
        </button>
      </div>
      <button type="button" onClick={onExit} className="min-w-9">
        취소
      </button>
    </section>
  );
}

export default SearchBar;
