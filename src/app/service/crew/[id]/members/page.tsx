'use client';

import { CrewMembersProps } from '@/types/crew/crew';
import React, { useEffect, useState } from 'react';
import { getCrewMembers, getCrewApplicants } from '../api/getCrewMembers';
import Header from '@/app/_components/common/Header';
import Tabs from '@/app/_components/common/Tabs';
import { TABS_CREW_MEMBERS } from '@/constants/crew/tabs';
import { useMemberListState } from '@/store/crew/crewListStore';
import Image from 'next/image';
import crewLeader from '$/images/crewLeader.png';
// import {
//   commonSelectStyles,
//   activeSelectStyles,
// } from '../../create/_components/UI/commonClass';
import { cn } from '@/lib/utils';

function Page({ params }: { params: { id: string } }) {
  const [crewMembers, setCrewMembers] = useState<CrewMembersProps[]>([]);

  const { id } = params;
  const crewId = Number(id);

  const { categoryId } = useMemberListState();

  useEffect(() => {
    if (categoryId === 1) {
      const fetchCrewMembers = async () => {
        try {
          const response = await getCrewMembers(crewId);
          if (response) {
            setCrewMembers(response);
          }
        } catch (error) {
          throw new Error('멤버 목록을 받아오는 데 실패했습니다.');
        }
      };

      fetchCrewMembers();
    }

    if (categoryId === 2) {
      const fetchCrewApplicants = async () => {
        try {
          const response = await getCrewApplicants(crewId);
          if (response) {
            setCrewMembers(response);
          }
        } catch (error) {
          throw new Error('멤버 목록을 받아오는 데 실패했습니다.');
        }
      };

      fetchCrewApplicants();
    }
  }, [crewId, categoryId]);

  const sortedCrewMembers = [...crewMembers].sort((a, b) => {
    if (a.is_crew_creator && !b.is_crew_creator) {
      return -1;
    } else if (!a.is_crew_creator && b.is_crew_creator) {
      return 1;
    }
    return 0;
  });

  const commonButtonStyle = 'text-[12px] font-medium rounded-[10px] px-[14px] py-[8px]'

  return (
    <div className="relative bg-[#F9F9F9] min-h-dvh flex flex-col max-h-full-size-omit-nav overflow-hidden">
      <Header title="크루원 관리" isExit />
      <Tabs tabs={TABS_CREW_MEMBERS} useStateHook={useMemberListState} />
      <div className="px-[16px] py-[12px]">
        {categoryId === 1 &&
          sortedCrewMembers.map(member => (
            <li key={member.id} className="list-none pb-[12px]">
              <div className="flex w-full h-fit gap-[10px]">
                <div className="size-[40px] relative shrink-0">
                  <Image
                    src={member.profile_image}
                    alt="크루 멤버 프로필 이미지"
                    fill={true}
                    className="rounded-full my-auto"
                  />
                  {member.is_crew_creator && (
                    <div className="absolute size-[18px] -bottom-1 -right-1">
                      <Image src={crewLeader} fill={true} alt="크루장" />
                    </div>
                  )}
                </div>
                <span className="text-[14px] font-medium flex items-center">
                  {member.nickname}
                </span>
              </div>
            </li>
          ))}
        {categoryId === 2 && (
          <div className="">
            <div className="flex w-full">
              <div className="size-[40px] relative shrink-0">
                <Image
                  src={''}
                  alt="크루 멤버 프로필 이미지"
                  fill={true}
                  className="rounded-full my-auto"
                />
              </div>
              <span className="text-[14px] font-medium flex items-center">
                nickname
              </span>
              <div className="ml-auto flex gap-[8px]">
                <button className={cn(commonButtonStyle, 'bg-[#C7B3FF]')}>
                  승인
                </button>
                <button className={cn(commonButtonStyle, 'bg-[#F4F4F4]')}>거절</button>
              </div>
            </div>
            <div className="w-full text-sm rounded-[10px] border border-[#F0F1F3] p-[14px] mt-[12px]">
              답변
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
