import { axiosInstance } from '@/lib/axios/axios-instance';
import { END_POINT } from '@/constants/api/end-point';
import { TResponse } from '@/types/common/response';
import { CrewDetailProps } from '@/types/crew/crew';

import CustomError from '@/error/CustomError';

const getCrewDetail = async (id: number) => {
  try {
    const { data: crewDetail } = await axiosInstance<
      TResponse<CrewDetailProps>
    >(END_POINT.crewController.getCrewDetail(id));

    return crewDetail.data;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw new Error(error.message);
    }
  }
};

export default getCrewDetail;
