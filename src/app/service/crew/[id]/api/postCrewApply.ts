import CustomError from '@/error/CustomError';
import { axiosInstance } from '@/lib/axios/axios-instance';
import { END_POINT } from '@/constants/api/end-point';

const postCrewApply = async (id: number, content: string) => {
  try {
    await axiosInstance.post(
      `${END_POINT.crewController.main}/${id}/applications`,
      content,
    );
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw new Error(error.message);
    }
  }
};

export default postCrewApply;
