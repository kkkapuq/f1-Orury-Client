import { END_POINT } from '@/constants/api/end-point';
import { axiosInstance } from '@/lib/axios/axios-instance';

const crewApi = {
  WithdrawCrew: async (crewId: number) =>
    axiosInstance.delete(END_POINT.crewController.deleteMyApplication(crewId)),
  DeleteCrew: async (crewId: number) =>
    axiosInstance.delete(END_POINT.crewController.deleteMyCrew(crewId)),
};

export default crewApi;
