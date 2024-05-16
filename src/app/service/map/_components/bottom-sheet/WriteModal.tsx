/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-duplicates */
import * as React from 'react';
import type { ReviewProps } from '@/types/review/ReviewProps';
import { ChevronDown, ChevronLeft, PenSquare } from 'lucide-react';
import { IconButton, Radio, Tab, Tabs } from '@mui/material';
import { COLOR } from '@/styles/color';
import { cn } from '@/lib/utils';
import useReviewStore from '@/store/review/reviewStore';
import useIntersect from '@/hooks/common/useIntersection';
import useReviewApi from '@/apis/review/hooks/useReview';
import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import ReviewModalSkeleton from '@/app/_components/review/review-modal/ReviwModalSkeleton';
import ReviewRegisterModal from '@/app/_components/review/review-modal/ReviewRegisterModal';
import OneReview from '@/app/_components/review/review-modal/OneReview';
import { Rating } from '@mui/material';
import { ReviewRegisterType } from '@/types/review/review';
import Image from 'next/image';
/**
 * @description 지도 위에 띄위기 위해서 Modal로 구현을 합니다.
 * @param position 어느 방향에서 모달이 열릴지 결정합니다.
 */
function WriteModal({ openPosition }: ReviewProps) {
  const initialValue = {
    newContent: '',
    newImages: [],
    newScore: 3,
    fixId: -1,
  };
  const [registerValue, setRegisterValue] =
    useState<ReviewRegisterType>(initialValue);
  const { isOpen, reset, reviewId } = useReviewStore(state => state);

  const { data, mutate, size, setSize, isLoading, isValidating } =
    useReviewApi.useGetReviews(reviewId as number);

  const reviews = data ? data.flat() : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;

  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (isRefreshing) {
      mutate();
    }
  }, [data?.length, size, isValidating]);

  const modalClassName = cn(
    'w-full max-w-[768px] bg-white overflow-y-scroll duration-1000 h-full top-0 right-0 absolute bg-white',
    { 'opacity-0 z-0': !isOpen },
    { 'opacity-1 z-[100]': isOpen },
    { 'top-1/2': openPosition === 'center' && !isOpen },
    { 'right-1/2': openPosition === 'right' && !isOpen },
  );

  const positionClassName = cn(
    'absolute',
    { ' right-3': openPosition === 'center' },
    { ' left-3': openPosition === 'right' },
  );

  if (isLoadingMore || isEmpty) {
    return <ReviewModalSkeleton openPosition={openPosition} />;
  }
  const [inputData, setInputData] = useState<{ value: string; count: number }>({
    value: '',
    count: 0,
  });
  const [textAreaData, setTextAreaData] = useState<{
    value: string;
    count: number;
  }>({ value: '', count: 0 });

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputData({
      value,
      count: value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length,
    });
  };

  const onTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextAreaData({
      value,
      count: value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length,
    });
  };
  const [postImg, setPostImg] = useState<File[]>([]); // 서버 저장하는 파일 상태
  const [previewImg, setPreviewImg] = useState<string[]>([]); // 미리보기 이미지를 생성하기 위한 상태 (원본이미지용량이 크기에 따로 분리)

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;
    if (fileArr) {
      const files = Array.from(fileArr);
      setPostImg(files);

      const newPreviewImg: string[] = [];

      // 한 번만 생성하고 재사용
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result as string;
        setPreviewImg([...previewImg, result]);
      };

      // 파일마다 미리보기 이미지 생성
      files.forEach(file => {
        fileReader.readAsDataURL(file);
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <>
      <ReviewRegisterModal
        mutate={mutate}
        gym_name={reviews[0].data.data.gym_name}
      />
      <div className={modalClassName}>
        <div className="w-full bg-white max-w-[768px] z-[101] h-[3.5rem] fixed shadow flex items-center justify-center">
          <button type="button" className={positionClassName} onClick={reset}>
            {openPosition === 'center' ? <ChevronDown /> : <ChevronLeft />}
          </button>
          <div className="font-semibold text-lg">글쓰기</div>
        </div>
        <form
          name="profile"
          action="/action_page.php"
          method="get"
          className="p-5"
        >
          {/* Middle */}
          <div className="relative mt-[3.5rem]">
            {/* 운동장소 */}
            <div className="mb-6">
              <div className="font-bold text-base">
                운동장소<span className="font-bold text-[#FF5247] "> *</span>
              </div>
              <div className="w-full rounded-md h-10 bg-[#F4F5F7] text-[#A5A7AE] flex items-center justify-center border border-gray-300">
                {reviews[0].data.data.gym_name}
              </div>
            </div>
            {/* 해당 암장 본인레벨 */}
            <div className="mb-6">
              <div className="font-bold text-base">
                <div>
                  해당 암장 본인레벨
                  <span className="font-bold text-[#FF5247] "> *</span>
                </div>
                <div className="w-full rounded-md h-10 bg-[#F4F5F7] text-[#A5A7AE] flex items-center justify-center border border-gray-300">
                  Click
                </div>
              </div>
            </div>

            {/* 한줄 기록 */}
            <div className="mb-6">
              <div>
                <div className="flex justify-between">
                  <div className="font-bold text-base">
                    한줄 기록
                    <span className="font-bold text-[#FF5247] "> *</span>
                  </div>
                  <p className="font-normal text-sm text-gray-600">
                    <span>{inputData.count}</span>
                    <span>/30</span>
                  </p>
                </div>
                <input
                  className="w-full border-b"
                  required
                  type="text"
                  name="alias"
                  onChange={onInputHandler}
                  maxLength={30}
                  placeholder="운동시설은 어땠나요?"
                />
              </div>
            </div>

            {/* 상세 내용 (선택) */}
            <div className="mb-6">
              <div>
                <div className="flex justify-between">
                  <div className="font-bold text-base">상세 내용 (선택)</div>
                  <p className="font-normal text-sm text-gray-500">
                    <span>{textAreaData.count}</span>
                    <span>/500</span>
                  </p>
                </div>
                <textarea
                  className="w-full border-b"
                  name="opinion"
                  onChange={onTextAreaHandler}
                  maxLength={500}
                  placeholder="다른 유저에게 도움이 될 만한 정보를 입력해주세요."
                />
              </div>
            </div>
          </div>

          {/* Bottom - 사진 및 제출 버튼 */}
          <div className="text-center mb-6">
            <div className="mb-6">
              <div className="font-semibold text-lg">
                이곳에 대해 총 평점은?
              </div>
              <Rating
                name="rating"
                size="large"
                sx={{ color: '#855AFF' }}
                defaultValue={registerValue.newScore}
                onChange={(_, newValue) => {
                  if (typeof newValue === 'number') {
                    setRegisterValue(prev => ({
                      ...prev,
                      newScore: newValue,
                    }));
                  } else {
                    setRegisterValue(prev => ({
                      ...prev,
                      newScore: 1,
                    }));
                  }
                }}
              />
            </div>
            <div className="border-3 flex">
              <input
                accept=".png, .jpg, .jpeg"
                type="file"
                onChange={uploadFile}
                style={{
                  width: '100px',
                  height: '100px',
                  color: '#F0F1F3',
                  border: '1px solid #D1D1D1',
                  borderRadius: '5px',
                }}
              />
              {previewImg &&
                previewImg.map((imgSrc, i) => (
                  <div key={i} className="w-24 h-24">
                    <Image
                      alt={`Uploaded Image ${i}`}
                      src={imgSrc}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
            </div>
            <button
              type="submit"
              className="w-full rounded-md h-10 bg-gray-200 text-gray-600 mt-4"
            >
              작성완료
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default WriteModal;
