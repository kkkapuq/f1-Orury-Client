'use client';

import PostList from '@/app/service/community/_components/PostList';
import SearchBar from '@/app/service/community/_components/SearchBar';
import Tabs from '@/app/_components/common/Tabs';
import Floating from '@/app/_components/buttons/Floating';
import Header from '@/app/_components/common/Header';
import HEADER from '@/constants/ui/common/header';
import BottomSheetContainer from '@/app/_components/common/BottomSheetContainer';
import CommunityModal from '@/app/service/community/_components/CommunityModal';
import Notice from '@/app/service/_components/Notice';
import TABS_COMMUNITY from '@/constants/community/tabs';
import PostForm from '@/app/service/community/_components/PostForm';

import { useState } from 'react';
import { usePostsState } from '@/store/community/postsStore';

function Page() {
  const { categoryId } = usePostsState();
  const bottomSheetTitle = '게시글 작성';
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchingFocus, setIsSearchingFocus] = useState(false);
  const [searchText, setSearchText] = useState('');

  const onDisMiss = () => {
    setIsSheetOpen(false);
  };

  const exitHandler = () => {
    setIsSearchingFocus(false);
  };

  const searchHandler = () => {
    setIsSearchingFocus(true);
  };

  return (
    <div className="relative bg-white pb-16 min-h-screen">
      {!isSearchingFocus && (
        <Header
          isSearching
          title={isSearchingFocus ? HEADER.write : HEADER.community}
          isBack={!isSearchingFocus}
          onSearch={searchHandler}
        />
      )}
      {isSearchingFocus && (
        <SearchBar
          onExit={exitHandler}
          searchText={searchText}
          isSearchingFocus={isSearchingFocus}
          setIsSearchingFocus={setIsSearchingFocus}
          setSearchText={setSearchText}
        />
      )}

      <Tabs tabs={TABS_COMMUNITY} useStateHook={usePostsState} />

      <Notice />

      {!isSearchingFocus && <PostList />}
      {isSearchingFocus && <CommunityModal searchText={searchText} />}
      <BottomSheetContainer
        ContentComponent={PostForm}
        bottomSheetTitle={bottomSheetTitle}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        onDisMiss={onDisMiss}
        isPost
      />
      {!isSearchingFocus && categoryId !== 3 && (
        <Floating setIsSheetOpen={setIsSheetOpen} />
      )}
    </div>
  );
}

export default Page;
