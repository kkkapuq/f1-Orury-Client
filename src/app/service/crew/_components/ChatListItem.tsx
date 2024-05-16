// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ChatListItem() {
  const id = 1;
  return (
    <div className="flex justify-between my-[16px] w-full rounded-[10px] border border-[#EFEFEF] p-[12px] overflow-hidden mx-auto bg-white gap-[12px] ">
      {/* {icon && ( */}
      {/* <Image
        src={icon}
        alt="image"
        width={44}
        height={44}
        className="rounded-lg my-auto"
      /> */}
      {/* )} */}
      <Link
        href={`my-chat/${id}`}
        className="flex flex-col flex-1 justify-between"
      >
        <div className="text-[16px]">크루이름</div>
        <div className="flex justify-between">
          <div className="text-[14px] text-neutral-400 content-end">
            안녕하세요
          </div>
          <div className="bg-[#D9CCFF] px-[8px] py-[4px] text-[12px] rounded-lg justify-center items-center">
            +99
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ChatListItem;
