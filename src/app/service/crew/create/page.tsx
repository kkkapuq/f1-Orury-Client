'use client';

import Header from '@/app/_components/common/Header';
import CreateCrewForm from './_components/CreateCrewForm';

function Page() {
  return (
    <div className="relative bg-[#F9F9F9] min-h-dvh flex flex-col max-h-full-size-omit-nav overflow-hidden">
      <Header title="크루 생성" isExit />
      <CreateCrewForm />
    </div>
  );
}

export default Page;
