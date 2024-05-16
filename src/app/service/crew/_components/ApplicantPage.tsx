import React from 'react';
import type { CrewDetailProps } from '@/types/crew/crew';
import ApplicantForm from './ApplicantForm';

interface ApplicantPageProps {
  crewDetail: CrewDetailProps;
}

function ApplicantPage({ crewDetail }: ApplicantPageProps) {
  const { id, question } = crewDetail;
  return (
    <div className="px-[16px] bg-[#f9f9f9] h-dvh pt-[100px]">
      {question && (
        <div className="font-medium text-black text-[18px] mb-[48px]">
          가입 질문에 답변을 작성해 주세요.
        </div>
      )}
      <div className="border border-gray-200 bg-white rounded-[10px] p-[14px] text-sm font-normal mb-[40px]">
        {question ? question : '크루 소개를 잘 숙지하셨나요?'}
      </div>
      <ApplicantForm id={id} />
    </div>
  );
}

export default ApplicantPage;
