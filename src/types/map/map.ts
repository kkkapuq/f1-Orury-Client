export interface PositionType {
  latitude: number;
  longitude: number;
}

export interface URLType {
  label: 'homepage' | 'instagram' | 'kakaomap' | 'phone';
  url: string;
}

export interface SearchKeywordListType {
  data: OneSearchKeywordType[];
}

export interface OneSearchKeywordType {
  doing_business: boolean;
  id: number;
  is_like: boolean;
  name: string;
  review_count: number;
  road_address: string;
  score_average: number;
  thumbnail_image: string | string[];
  position: PositionType;
}

export interface PointChartDataType {
  point: number;
  count: number;
}

export interface AvgChartDataType {
  month: number;
  avg: number;
  count: number;
}

export interface AxisChartPointType {
  index: number;
  x: number;
  y: number;
  data: PointChartDataType[];
}

export interface AxisChartAvgType {
  index: number;
  x: number;
  y: number;
  data: AvgChartDataType[];
}

export interface SearchIdDetailMapType {
  data: DetailPlaceType;
  message: string;
  status: number;
}

export interface BusinessHoursType {
  business_hours: [
    { 월: string },
    { 화: string },
    { 수: string },
    { 목: string },
    { 금: string },
    { 토: string },
    { 일: string },
  ];
}

export interface DetailPlaceType extends BusinessHoursType {
  id: number;
  name: string;
  road_address: string;
  address: string;
  score_average: number;
  review_count: number;
  images: string[];
  position: PositionType;
  brand: string;
  phone_number: string;
  kakao_map_link: string;
  instagram_link: string;
  homepage_link: string;
  setting_day: string;
  doing_business: boolean;
  is_like: boolean;
  bar_chart_data: PointChartDataType[];
  line_chart_data: AvgChartDataType[];
  gym_type?: string;
}

export interface LatLonType {
  lat: number;
  lng: number;
}

export interface AreaGridType {
  bottom_latitude: number;
  top_latitude: number;
  left_longitude: number;
  right_longitude: number;
}

export interface MapMoveControlType {
  center: LatLonType;
  isPanto: boolean;
}
