'use client';

import Image from 'next/image';
import Link from 'next/link';

import { UseCrewListItemProps } from '@/types/crew/crewList';
import getTimeDiff from '@/utils/getTimeDiff';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

function CrewListItem({ ...props }: UseCrewListItemProps) {
  const {
    id,
    tags,
    name,
    region,
    member_count,
    capacity,
    icon,
    updated_at,
    user_images,
  } = props;

  return (
    <li className="list-none">
      <Link
        href={`/service/crew/${id}`}
        className="flex justify-between h-fit w-full my-[16px] rounded-[10px] border border-[#EFEFEF] p-[12px] overflow-hidden mx-auto bg-white gap-[10px]"
      >
        {icon && (
          <div className="w-[100px] min-h-full relative">
            <Image
              src={icon}
              alt="크루 대표 이미지"
              fill={true}
              sizes='100px'
              className="rounded-lg my-auto object-cover"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 justify-between gap-[8px]">
          <div className="flex">
            {tags
              ? tags.map(tag => (
                  <span
                    key={tag}
                    className="px-1.5 py-[5px] bg-gray-200 rounded-md font-medium text-black text-[10px] w-fit mr-[5px]"
                  >
                    {tag}
                  </span>
                ))
              : null}
          </div>
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
                    className={cn(
                      'block size-[20px] overflow-hidden rounded-full border border-white',
                      index !== 0 && '-ml-[6px]',
                    )}
                  >
                    <div className="size-[20px] relative">
                      <Image src={img} alt="멤버 프로필사진" fill={true} sizes="20px"/>
                    </div>
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
    </li>
  );
}

export default CrewListItem;
