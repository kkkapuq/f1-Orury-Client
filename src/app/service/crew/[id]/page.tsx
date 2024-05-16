'use client';

import { CrewDetailProps } from '@/types/crew/crew';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import BottomSheetContainer from '@/app/_components/common/BottomSheetContainer';
import HEADER from '@/constants/ui/common/header';
import useBottomSheetStore, {
  BottomSheetStore,
} from '@/store/crew/bottomSheetStore';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loading from '../../loading';
import ApplicantPage from '../_components/ApplicantPage';
import Label from '../create/_components/UI/Label';
import MemberList from './_components/MemberList';
import Schedules from './_components/Schedules';
import getCrewDetail from './api/getCrewDetail';
import { OptionDrawer } from '../_components/OptionDrawer';
import Modal from '@/app/_components/common/Modal';
import { MODAL } from '@/constants/ui/common/modal';
import crewApi from './api/crew';

function Page({ params }: { params: { id: number } }) {
  const { isSheetOpen, setIsSheetOpen }: BottomSheetStore =
    useBottomSheetStore();

  const router = useRouter();

  const { id } = params;
  const crewId = Number(id);
  const [crewDetail, setCrewDetail] = useState<CrewDetailProps>();
  const [isMemberListClicked, setIsMemberListClicked] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  const {
    name,
    tags,
    head_profile_image,
    user_images,
    icon,
    regions,
    capacity,
    member_count,
    description,
    is_member,
    head_name,
    is_crew_creator,
    gender,
    min_age,
    max_age,
    permission_required,
  } = crewDetail || {};

  useEffect(() => {
    const fetchCrewDetail = () => {
      getCrewDetail(crewId).then(response => setCrewDetail(response));
    };

    fetchCrewDetail();
  }, [crewId]);

  const onDisMiss = () => {
    setIsSheetOpen(false);
  };

  const handleEditCrew = () => {
    router.push(`${crewId}/edit`);
  };

  // 크루 삭제하기
  const deleteCrew = async () => {
    await crewApi.DeleteCrew(id);
    setisModalOpen(isClicked => !isClicked);
  };

  // 크루 신고하기
  const reportCrew = async () => {
    console.log('크루신고 실행');
    setisModalOpen(isClicked => !isClicked);
  };

  const handleCrewMember = () => {
    router.push(`${crewId}/members`);
  };

  if (!crewDetail) {
    return <Loading />;
  }

  if (isMemberListClicked) {
    return (
      <MemberList
        crewId={crewId}
        setIsMemberListClicked={setIsMemberListClicked}
      />
    );
  }

  return (
    <div className="relative min-h-full-size-omit-nav bg-[#f5f5f5]">
      <header className="sticky top-0 flex items-center justify-center h-12 bg-white z-10">
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
          className={'absolute left-4'}
        >
          <ChevronLeft />
        </button>
        {HEADER.crew}
        <OptionDrawer
          handlers={
            is_crew_creator
              ? {
                  '크루 수정하기': { onClick: handleEditCrew },
                  '크루원 관리': { onClick: handleCrewMember },
                  '크루 삭제하기': {
                    onClick: () => {
                      setisModalOpen(isClicked => !isClicked);
                    },
                    color: '#E53A35',
                  },
                }
              : {
                  신고하기: {
                    onClick: () => {
                      setisModalOpen(isClicked => !isClicked);
                    },
                    color: '#E53A35',
                  },
                }
          }
        />
      </header>

      <div className="flex flex-col h-full">
        {icon && (
          <div className="relative h-[250px] overflow-hidden ">
            <Image
              src={icon}
              alt={name || 'Crew Image'}
              fill={true}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        )}

        <div className="p-[16px] bg-white mb-[6px]">
          {tags
            ? tags.map(tag => (
                <span
                  key={tag}
                  className="inline-block px-1.5 py-[5px] bg-gray-200 rounded-md text-black text-[10px] w-fit mr-[5px] mb-[13px]"
                >
                  {tag}
                </span>
              ))
            : null}
          <div className="text-[18px] font-semibold mb-[14px]">{name}</div>
          <div className="flex gap-[4px]">
            <MapPin className="w-4 h-4" />
            {regions &&
              regions.map(region => (
                <span key={region} className="text-xs font-medium text-[14px]">
                  {region}
                </span>
              ))}
          </div>
        </div>
        <div className="p-[16px] bg-white mb-[6px]">
          <div className="flex mb-[12px]">
            <Image
              src={
                head_profile_image ?? '/assets/images/defaultUserProfile.jpg'
              }
              alt="멤버 프로필사진"
              width={22}
              height={22}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              className="overflow-hidden rounded-full border border-white"
            />
            <div className="text-sm font-medium ml-[8px]">{head_name}</div>
          </div>
          <div className="flex h-[20px] justify-between">
            <span className="member-wrap flex items-center ">
              {user_images &&
                user_images.slice(0, 10).map((img, index) => (
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

              <div className="text-xs font-medium ml-[6px] flex">
                {member_count} / {capacity}
                {is_member && (
                  <button
                    onClick={() => {
                      setIsMemberListClicked(true);
                    }}
                  >
                    <ChevronRight className="ml-[6px] h-4 w-4" />
                  </button>
                )}
              </div>
            </span>
          </div>
        </div>
        {is_member ? null : (
          <div>
            <div className="p-[16px] bg-white text-[14px] flex-1 mb-[6px]">
              {description}
            </div>
            <div className="p-[16px] bg-white font-medium text-[14px] flex-1 mb-[6px]">
              <Label className="mb-[16px]">가입 정보</Label>
              <div className="grid grid-cols-[26px_1fr] gap-[12px]">
                <span className="text-[#919191]">성별</span>
                <span>
                  {' '}
                  {gender === 'ANY'
                    ? '누구나'
                    : gender === 'FEMALE'
                      ? '여자만'
                      : '남자만'}
                </span>
                <span className="text-[#919191]">나이</span>
                <span>{`${min_age}~${max_age}세`}</span>
                <span className="text-[#919191]">가입</span>
                <span>
                  {permission_required ? '승인 후 가입' : '바로 가입'}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="p-[16px] mb-12 bg-white">
          {crewDetail && (
            <BottomSheetContainer
              ContentComponent={() => <ApplicantPage crewDetail={crewDetail} />}
              bottomSheetTitle="크루 가입"
              isSheetOpen={isSheetOpen}
              // setIsSheetOpen={setIsSheetOpen}
              onDisMiss={onDisMiss}
            />
          )}
          {is_member ? (
            <div className="">
              <div className="font-semibold mb-[12px]">일정</div>
              <Schedules id={crewId} />
            </div>
          ) : (
            <button
              type="button"
              className="block flex justify-center items-center h-[42px] w-full bg-violet-500 text-white font-semibold rounded-full"
              onClick={() => setIsSheetOpen(true)}
            >
              가입 신청하기
            </button>
          )}
        </div>
        {isModalOpen && (
          <Modal
            title={
              is_crew_creator ? MODAL.deleteCrew.title : MODAL.reportCrew.title
            }
            content={
              is_crew_creator
                ? MODAL.deleteCrew.content
                : MODAL.reportCrew.content
            }
            okContent={
              is_crew_creator
                ? MODAL.deleteCrew.okContent
                : MODAL.reportCrew.okContent
            }
            onCancelClick={() => {
              setisModalOpen(isClicked => !isClicked);
            }}
            onOkClick={is_crew_creator ? deleteCrew : reportCrew}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
