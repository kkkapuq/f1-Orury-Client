import { getCrewListKey, getMyCrewListKey } from '@/utils/getKeys';

import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';
import { axiosInstance } from '@/lib/axios/axios-instance';
import { AxiosResponse } from 'axios';
import { TResponse } from '@/types/common/response';
import { CrewListData, MyCrewListData } from '@/types/crew/crewList';
import { UseSortByStateProps } from '@/store/crew/sortsStore';

const useCrewListApi = {
  useGetCrewList: (selectedOption: UseSortByStateProps['selectedOption']) =>
    useSWRInfinite<AxiosResponse<TResponse<CrewListData>>>(
      (pageIndex, previousPageData) =>
        getCrewListKey(selectedOption, pageIndex, previousPageData),
      axiosInstance.get,
      { revalidateFirstPage: false },
    ),
  useGetMyCrewList: (
    selectedOption: UseSortByStateProps['selectedOption'],
  ) =>
    useSWR<AxiosResponse<TResponse<MyCrewListData>>>(
      () => getMyCrewListKey(selectedOption),
      axiosInstance.get,
    ),
};

export default useCrewListApi;
