'use client';

import { useCrewListState } from '@/store/crew/crewListStore';
import { useSortByState } from '@/store/crew/sortsStore';
import { v4 } from 'uuid';

import NotSearched from '@/app/service/community/_components/NotSearched';
import PostListSkeleton from '@/app/service/community/_components/PostListSkeleton';
import useIntersect from '@/hooks/common/useIntersection';
import useCrewListApi from '@/hooks/crew/useCrewList';
import CrewListItem from './CrewListItem';
import MyCrewListItem from './MyCrewListItem';
import SortOptions from './SortOptions';
import SortStatus from './SortStatus';
import { useEffect } from 'react';
import SORT_BY from '@/constants/crew/sortBy';

function CrewList() {
  const { categoryId } = useCrewListState();
  const { selectedOption, setSelectedOption } = useSortByState();
  const { data, size, setSize, isValidating, isLoading } = useCrewListApi.useGetCrewList(
    categoryId,
    selectedOption,
  );

  useEffect(() => {
    if (categoryId === 1) {
      setSelectedOption(SORT_BY.recommend);
    }
    if (categoryId === 2) {
      setSelectedOption(SORT_BY.mylist);
    }
  }, [categoryId]);

  const crewList = data ? data.flatMap(page => page.data.data.content) : [];

  const bottomRef = useIntersect(() => {
    if (!isValidating && data && !data[data.length - 1]?.data.data.last) {
      setSize(size + 1);
    }
  });

  let renderedComponent;
  if (isLoading) {
    renderedComponent = <PostListSkeleton />;
  } else if (categoryId === 1) {
    renderedComponent = (
      <>
        <SortOptions />
        {crewList?.map(crew => <CrewListItem key={crew.id} {...crew} />)}
      </>
    );
  } else if (categoryId === 2) {
    renderedComponent = (
      <>
        <SortStatus />
        {crewList?.map(crew => <MyCrewListItem key={crew.id} {...crew} />)}
      </>
    );
  } else {
    renderedComponent = null;
  }

  return (
    <div>
      <ul className="px-4 min-h-3/5">
        {renderedComponent}
        {crewList && !crewList?.length ? (
          <NotSearched content="크루가 존재하지 않습니다." />
        ) : null}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}

export default CrewList;
