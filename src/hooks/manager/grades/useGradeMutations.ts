import { useMutation, useQueryClient } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import { GRADE_KEYS } from "./useGrades";

type AddGradeRequest = {
    level: number; 
}

export const useAddGrade = () => {
    const query = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: AddGradeRequest) => {
            const response = await manager.grades.create(data);
            return response.data;
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: GRADE_KEYS.all });
        }
    });
}

export const useUpdateGrade = () => {
    const query = useQueryClient();
    
    return useMutation({
        mutationFn: async ({id , data}: {id: number , data:{level: number}}) => {
            const response = await manager.grades.update(id , data);
            return response.data;
        },
        onSuccess: (_,variablies) => {
            query.invalidateQueries({ queryKey: GRADE_KEYS.all });
            query.invalidateQueries({queryKey: GRADE_KEYS.detail(variablies.id)})
        }
    });
}

export const useDeleteGrade = () => {
    const query = useQueryClient();
    
    return useMutation({
        mutationFn: async ({id } : {id: number}) => {
            const response = await manager.grades.delete(id);
            return response.data;
        },
        onSuccess: (_,variablies) => {
            query.invalidateQueries({ queryKey: GRADE_KEYS.all });
            query.invalidateQueries({queryKey: GRADE_KEYS.detail(variablies.id)})
        }
    });
}

