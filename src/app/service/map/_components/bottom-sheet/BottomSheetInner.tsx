/* eslint-disable prefer-destructuring */
import Image from 'next/image';
import OneSiteUrl from '@/app/service/map/_components/bottom-sheet/OneSiteUrl';
import BarRatingChart from '@/app/service/map/_components/chart/BarRatingChart';
import LineRatingChart from '@/app/service/map/_components/chart/LineRatingChart';
import { BottomSheetInnerProps } from '@/types/map/BottomSheetProps';
import { Smartphone, Copy, ChevronDown } from 'lucide-react';
import { COLOR } from '@/styles/color';
import { aBeeZee } from '@/styles/fonts';
import MapCarousel from '@/app/_components/review/review-component/MapCarousel';
import useReviewStore from '@/store/review/reviewStore';
import { cn } from '@/lib/utils';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import { useState } from 'react';
import useReviewApi from '@/apis/review/hooks/useReview';
import noResult from '$/images/noResult.png';
import BottomSheetInfoTab from './BottomSheetInfoTab';
import BottomSheetReviewTab from './BottomSheetReviewTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = () => ({
  indicator: {
    color: 'black',
    backgroundColor: '#F7F5F2',
    margin: '0px auto',
    width: 'fit-content',
    borderRadius: '65px',
  },
  inactiveTab: {
    //  width: '110px',
    borderRadius: '65px',
  },
  // Todo : activeTab스타일 적용이 안되고있음, 추가 확인해봐야함
  activeTab: {
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#855AFF',
  },
});
/**
 * @description 바텀시트의 내부 콘테이너로서 내용물을 보여주는데 초점을 두고 있습니다.
 * @param data 상세정보들을 가져와서 보여주기 위해 상세값들을 가져옵니다.
 */
function BottomSheetInner({ data }: BottomSheetInnerProps) {
  const onReview = useReviewStore(state => state.onReview);
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
  } = data;
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { data: reviewAPIData, isLoading } = useReviewApi.useGetReviews(id);

  let reviewData;
  if (reviewAPIData) reviewData = reviewAPIData.flat()[0];

  return (
    <>
      <div className="relative h-52 w-auto">
        <Image
          alt={`${name} 로고이미지`}
          src={images[0]}
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/*
      <div className="flex justify-end p-[0.75rem]">
        <button type="button" onClick={onModalOpen}>
          리뷰탭 만들어야하지롱 컴포넌트 분리해야하밍
        </button>
      </div>
       */}
      {/* Tab */}
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          sx={{
            ...classes.indicator,
          }}
        >
          <Tab
            sx={{
              ...classes.inactiveTab,
              ...(tabValue === 0 && classes.activeTab),
            }}
            label="정보"
          />
          <Tab
            sx={{
              ...classes.inactiveTab,
              ...(tabValue === 1 && classes.activeTab),
            }}
            label="리뷰"
          />
        </Tabs>

        {/* CustomTabPanel안에 기본적으로 padding이 사방들어감 */}
        <CustomTabPanel value={tabValue} index={0}>
          <BottomSheetInfoTab data={data} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {reviewData && reviewData?.data.data.reviews.length > 0 ? (
            <BottomSheetReviewTab data={reviewData?.data.data} />
          ) : (
            <div className="flex h-full justify-center items-center mt-[20%]">
              <div className="flex flex-col items-center justify-center ">
                <Image
                  src={noResult}
                  alt="no-result"
                  width={100}
                  height={100}
                />
                <p className="mt-4 text-center text-[#C3C6CC]">
                  리뷰가 없습니다.
                </p>
              </div>
            </div>
          )}
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default BottomSheetInner;
