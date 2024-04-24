import CustomError from '@/error/CustomError';
import { axiosInstance } from '@/lib/axios/axios-instance';
import { END_POINT } from '@/constants/api/end-point';
import { TResponse } from '@/types/common/response';

const postCrewData = async (formData: FormData) => {
  try {
    const { data: response } = await axiosInstance.post<TResponse<null>>(
      END_POINT.crewController.main,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.message;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw new Error(error.message);
    }

    throw new Error(error as any);
  }
};

export default postCrewData;
