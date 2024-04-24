import { getCrewListKey } from '@/utils/getKeys';

import useSWRInfinite from 'swr/infinite';
import { axiosInstance } from '@/lib/axios/axios-instance';
import { AxiosResponse } from 'axios';
import { TResponse } from '@/types/common/response';
import { CrewListData } from '@/types/crew/crewList';
import { UseSortByStateProps } from '@/store/crew/sortsStore';

const useCrewListApi = {
  useGetCrewList: (
    categoryId: number,
    selectedOption: UseSortByStateProps['selectedOption'],
  ) =>
    useSWRInfinite<AxiosResponse<TResponse<CrewListData>>>(
      (pageIndex, previousPageData) =>
        getCrewListKey(categoryId, pageIndex, previousPageData, selectedOption),
      axiosInstance.get,
      { revalidateFirstPage: false },
    ),
};

export default useCrewListApi;
