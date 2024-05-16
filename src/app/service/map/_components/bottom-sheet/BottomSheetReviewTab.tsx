/* eslint-disable @next/next/no-img-element */
/* eslint-disable function-paren-newline */

import { useToast } from '@/app/_components/ui/use-toast';
import { BottomSheetInnerProps } from '@/types/map/BottomSheetProps';
import { ReviewListProps } from '@/types/review/ReviewProps';
import { ReviewResponseType } from '@/types/review/review';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function BottomSheetReviewTab({
  data,
}: {
  data: ReviewResponseType;
}) {
  const { reviews, gym_name, cursor } = data; // 리뷰 데이터
  console.log('reviews', reviews);

  return (
    <div>
      <div>
        {reviews.map(review => (
          <div key={review.id} className="flex flex-col items-center">
            {/* 이미지 */}
            {/* ToDo : 이미지 어떻게 보여질지 라이브러리 찾아봐야함 */}
            {review.images &&
              review.images.map((image, index) => (
                <Image
                  className="rounded-lg w-80 h-80"
                  key={index}
                  src={image}
                  alt="review_img"
                  width={320}
                  height={320}
                />
              ))}
            {/* 리뷰 작성자 */}
            <div className="flex">
              <Image
                className="rounded-full"
                src={review.writer.profile_image}
                alt="profile_img"
                width={24}
                height={24}
              />
              <div>(*등급 정보없음..?)</div>
              <p className="text-gray-900 font-semibold text-sm">
                {review.writer.nickname}
              </p>
              <div className="text-gray-600 font-medium text-sm">
                #(*태그 정보없음..?)
              </div>
            </div>
            {/* 리뷰 내용 */}
            <p>{review.content}</p>
            {/* 리뷰에 대한 반응들 */}
            <ul>
              {review.review_reaction_count.map(reaction => (
                <li key={reaction.type}>
                  {reaction.type}: {reaction.count}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
