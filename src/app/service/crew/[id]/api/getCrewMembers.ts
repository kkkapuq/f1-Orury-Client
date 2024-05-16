import { axiosInstance } from '@/lib/axios/axios-instance';
import { END_POINT } from '@/constants/api/end-point';
import { TResponse } from '@/types/common/response';
import { CrewMembersProps } from '@/types/crew/crew';

import CustomError from '@/error/CustomError';

export const getCrewMembers = async (id: number) => {
  try {
    const { data: crewMembers } = await axiosInstance<
      TResponse<CrewMembersProps[]>
    >(END_POINT.crewController.getCrewMembers(id));

    return crewMembers.data;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw new Error(error.message);
    }
  }
};

export const getCrewApplicants = async (id: number) => {
  try {
    const { data: crewMembers } = await axiosInstance<
      TResponse<CrewMembersProps[]>
    >(END_POINT.crewController.getCrewApplicants(id));

    return crewMembers.data;
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      throw new Error(error.message);
    }
  }
};
