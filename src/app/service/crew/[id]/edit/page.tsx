'use client';
import Header from '@/app/_components/common/Header';
import CreateCrewForm from '../../create/_components/CreateCrewForm';
import { useEffect, useState } from 'react';
import getCrewDetail from '../api/getCrewDetail';
import { CrewDetailProps } from '@/types/crew/crew';

function Page({ params }: { params: { id: string } }) {
  const [crewDetail, setCrewDetail] = useState<CrewDetailProps>();
  const { id } = params;
  const crewId = Number(id);
  useEffect(() => {
    const fetchCrewDetail = () => {
      getCrewDetail(crewId).then(response => setCrewDetail(response));
    };

    fetchCrewDetail();
  }, [crewId]);


  return (
    <div className="relative bg-[#F9F9F9] min-h-dvh flex flex-col max-h-full-size-omit-nav overflow-hidden">
      <Header title="크루 수정" isExit />
      <CreateCrewForm crewDetail={crewDetail} />
    </div>
  );
}

export default Page;
