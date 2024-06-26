'use client';

import { useState } from 'react';
import Modal from '@/app/_components/common/Modal';
import { MODAL } from '@/constants/ui/common/modal';

function Withdrawal() {
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked(isClicked => !isClicked);
  };

  return (
    <div className="mt-4 text-red font-semibold pb-16 sm:pb-0">
      <button type="button" onClick={clickHandler}>
        회원 탈퇴
      </button>
      {isClicked && (
        <Modal
          title={MODAL.withdrawal.title}
          content="아직 준비중입니다."
          okContent={MODAL.withdrawal.okContent}
          onCancelClick={clickHandler}
          onOkClick={() => {}}
        />
      )}
    </div>
  );
}

export default Withdrawal;
