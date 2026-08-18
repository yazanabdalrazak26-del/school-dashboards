import { useQuery } from '@tanstack/react-query';
import { manager } from '../../../api/apiClient';

export const useGetMissingFinalExam = (localGradeNumber: number, semester: number) => {
  return useQuery({
    queryKey: ['missing-final-exam', localGradeNumber, semester],
    queryFn: async () => {
      const response = await manager.marksAndfail.getMissingFinallExam(localGradeNumber, semester);
      return response.data;
    },
    enabled: !!localGradeNumber,
  });
};

export const useGetAllFailingStudents = () => {
  return useQuery({
    queryKey: ['failing-students'],
    queryFn: async () => {
      const response = await manager.marksAndfail.getAllFailingStudents();
      return response.data;
    },
  });
};