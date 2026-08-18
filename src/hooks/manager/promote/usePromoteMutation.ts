import { useMutation } from "@tanstack/react-query";
import { manager } from "../../../api/apiClient";
import type { PromoteData } from "../../../type/manager.type";

export const usePromoteStudents = () => {
  return useMutation({
    mutationFn: async (data: PromoteData) => {
      const response = await manager.marksAndfail.promote(data);
      return response.data;
    },
  });
};