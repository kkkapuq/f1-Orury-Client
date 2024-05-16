'use client';

import { useCrewListState } from '@/store/crew/crewListStore';
import { TABS_CREW } from '@/constants/crew/tabs';
import Tabs from '@/app/_components/common/Tabs';
import Header from '@/app/_components/common/Header';
import HEADER from '@/constants/ui/common/header';
import CrewList from './_components/CrewList';
import ChatListFAB from './_components/ChatListFAB';

function Page() {
  return (
    <div className="relative bg-[#F9F9F9] min-h-dvh pb-16">
      <Header title={HEADER.crew} routeTo="/service/crew/create" />
      <Tabs tabs={TABS_CREW} useStateHook={useCrewListState} />
      <CrewList />
      <ChatListFAB />
    </div>
  );
}

export default Page;
