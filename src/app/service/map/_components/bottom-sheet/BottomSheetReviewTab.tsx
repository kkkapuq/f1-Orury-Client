/* eslint-disable function-paren-newline */

import { useToast } from '@/app/_components/ui/use-toast';
import { BottomSheetInnerProps } from '@/types/map/BottomSheetProps';
import { ReviewListProps } from '@/types/review/ReviewProps';
import { ReviewResponseType } from '@/types/review/review';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function BottomSheetReviewTab(data: ReviewResponseType) {
  const { reviews, gym_name, cursor } = data; // 리뷰 데이터

  return <div>d</div>;
}
