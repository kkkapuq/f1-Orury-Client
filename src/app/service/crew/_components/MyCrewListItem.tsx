'use client';

import Image from 'next/image';
import Link from 'next/link';

import { UseCrewListItemProps } from '@/types/crew/crewList';
import clsx from 'clsx';
import getTimeDiff from '@/utils/getTimeDiff';
import { MapPin } from 'lucide-react';
import { useSortByState } from '@/store/crew/sortsStore';
import crewApi from '../[id]/api/crew';

import { useState } from 'react';
import Modal from '@/app/_components/common/Modal';
import { MODAL } from '@/constants/ui/common/modal';
import { mutate } from 'swr';

function MyCrewListItem({ ...props }: UseCrewListItemProps) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const {
    id,
    name,
    region,
    member_count,
    capacity,
    icon,
    updated_at,
    user_images,
  } = props;

  const { selectedOption } = useSortByState();

  const clickHandler = () => {
    setisModalOpen(isClicked => !isClicked);
  };

  const handleWithdraw = async () => {
    console.log('가입취소');
    await crewApi.WithdrawCrew(id);
    // mutate()
  };

  return (
    <li className="list-none justify-between h-fit w-full my-[16px] rounded-[10px] border border-[#EFEFEF] p-[12px] overflow-hidden mx-auto bg-white">
      <Link href={`/service/crew/${id}`} className="flex  gap-[10px]">
        {icon && (
          <div className="w-[100px] min-h-full relative">
            <Image
              src={icon}
              alt="크루 대표 이미지"
              fill={true}
              className="rounded-lg my-auto object-cover"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 justify-between gap-[8px]">
          <span className="block font-semibold w-3/5 max-w-[250px] truncate text-[16px]">
            {name}
          </span>
          <div className="flex gap-[4px] text-violet-500 ">
            <MapPin className="w-4 h-4" />
            {region &&
              region.map(item => (
                <span key={item} className="text-xs font-medium text-[14px]">
                  {item}
                </span>
              ))}
          </div>
          <div className="flex h-[20px] justify-between">
            <span className="member-wrap flex items-center ">
              {user_images &&
                user_images.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className={clsx(
                      'block size-[20px] overflow-hidden rounded-full border border-white',
                      index !== 0 && '-ml-[6px]',
                    )}
                  >
                    <Image
                      src={img}
                      alt="멤버 프로필사진"
                      width={20}
                      height={20}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                ))}
              <span className="text-xs font-medium ml-[6px]">
                {member_count}/{capacity}
              </span>
            </span>
            <span className="text-cyan-500 text-xs text-[14px] font-medium ">
              {getTimeDiff(updated_at)}
            </span>
          </div>
        </div>
      </Link>
      {selectedOption.title === '참여 대기중' ? (
        <button
          className="w-full h-10 rounded-[10px] border border-gray-200 mt-[12px] text-[#E53A35] text-xs"
          onClick={clickHandler}
        >
          가입 신청 철회
        </button>
      ) : null}
      {isModalOpen && (
        <Modal
          title={MODAL.withdrawCrew.title}
          content={MODAL.withdrawCrew.content}
          okContent={MODAL.withdrawCrew.okContent}
          onCancelClick={clickHandler}
          onOkClick={handleWithdraw}
        />
      )}
    </li>
  );
}

export default MyCrewListItem;
