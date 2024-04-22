import useSWR from 'swr';
import { END_POINT } from '@/constants/api/end-point';
import type {
  LatLonType,
  DetailPlaceType,
  OneSearchKeywordType,
  AreaGridType,
} from '@/types/map/map';
import { axiosInstance } from '@/lib/axios/axios-instance';
import { AxiosResponse } from 'axios';
import { TResponse } from '@/types/common/response';

const useMap = {
  useGetSearchList: (itemInfo: LatLonType, search_word: string) =>
    useSWR<AxiosResponse<TResponse<OneSearchKeywordType[]>>>(
      END_POINT.gymController.searchList(itemInfo, search_word),
      axiosInstance.get,
    ),
  // 주변 암장 검색하는 API
  useGetAroundGymList: (itemInfo: LatLonType, areaGrid: AreaGridType) =>
    useSWR<AxiosResponse<TResponse<OneSearchKeywordType[]>>>(
      END_POINT.gymController.aroundGymList(itemInfo, areaGrid),
      axiosInstance.get,
    ),

  useGetDetail: (selectId: string) =>
    useSWR<AxiosResponse<TResponse<DetailPlaceType>>>(
      END_POINT.gymController.detail(selectId),
      axiosInstance.get,
    ),
};

export default useMap;
