/* eslint-disable import/order */

import Image from 'next/image';
import useCss from '@/hooks/common/useCss';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OneSiteUrl from './OneSiteUrl';
import { Phone, Star, StarHalf, ChevronRight } from 'lucide-react';
import SquarePen from 'public/square-pen.svg';
import { BottomSheetInnerProps } from '@/types/map/BottomSheetProps';
import useReviewStore from '@/store/review/reviewStore';

function BottomSheetHeader({ data }: BottomSheetInnerProps) {
  const {
    address,
    business_hours,
    id,
    instagram_link,
    kakao_map_link,
    road_address,
    score_average,
    setting_day,
    bar_chart_data,
    line_chart_data,
    doing_business,
    images,
    name,
    phone_number,
    position,
    is_like,
    gym_type,
  } = data;
  useCss('https://unpkg.com/react-spring-bottom-sheet/dist/style.css');

  const onClickBookmark = () => {
    // 북마크 클릭, 클릭에따라 api보내야함
  };

  const addressSplit = address.split(' ');
  const handlePhoneClick = () => {};
  const handleWriteClick = () => {};

  const onReview = useReviewStore(state => state.onReview);
  const { isOpen, reset, setCreateMode, reviewId } = useReviewStore(
    state => state,
  );

  const onModalOpen = () => {
    onReview(id);
  };

  return (
    <>
      {/* 인스타 및 북마크 */}
      <section className="flex justify-end">
        {instagram_link && (
          <OneSiteUrl label="instagram" url={instagram_link} />
        )}
        <button type="button" className="ml-2" onClick={onClickBookmark}>
          {is_like ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </button>
      </section>
      {/* 클라이밍 이름 */}
      <section>
        <h1 className="flex items-left text-xl justify-left font-bold text-gray-800">
          {name}
        </h1>
      </section>
      {/* gym_type & 간략주소 */}
      <section className="text-gray-500 font-normal text-sm leading-5 text-left ">
        <div>{`${gym_type} · ${addressSplit[0]} ${addressSplit[1]}`}</div>
      </section>
      {/* 5개 빈 별공간 */}
      <section className="flex text-sm leading-5 font-semibold text-black">
        <div className="relative">
          <div className="flex gap-4px">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} fill="#C3C6CC" strokeWidth={0} />
            ))}
          </div>
          {/* 별 점수에 따라 넣어야함 (로직 아직안함), 별점 점수도 바꿔야함 */}
          <div className="flex gap-4px absolute top-0">
            <Star fill="#FFCB29" strokeWidth={0} />
            <Star fill="#FFCB29" strokeWidth={0} />
            <StarHalf fill="#FFCB29" strokeWidth={0} />
          </div>
        </div>
        별점 점수
        <ChevronRight size={24} strokeWidth={1} />
      </section>

      {/* 버튼 : onClick이벤트 넣어야함 */}
      <section className="flex justify-around h-[36px] mt-10">
        <a
          className="flex items-center justify-center w-[155px] h-[36px] px-6px gap-2 rounded-lg border border-solid border-[#E5E7EB]"
          href={phone_number}
        >
          <Phone size={24} strokeWidth={1} fill="black" />
          <span className="ml-2">전화</span>
        </a>
        <button
          type="button"
          className="flex items-center justify-center w-[155px] h-[36px] px-6px gap-2 rounded-lg border border-solid border-[#E5E7EB]"
          onClick={onModalOpen}
        >
          <Image src={SquarePen} width="24" height="24" alt="글쓰기" />
          <span className="ml-2">글쓰기</span>
        </button>
      </section>
    </>
  );
}

export default BottomSheetHeader;
