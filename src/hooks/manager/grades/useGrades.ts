import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import type { Grade } from "../../../type/manager.type"


export const GRADE_KEYS = {
    all: ['grades'],
    detail: (id: number) => ['grades' , 'detail' , id],
}

export const useGrade = () =>{
    return useQuery({
        queryKey: GRADE_KEYS.all,
        queryFn: async() =>{
            const response = await manager.grades.getAll();
            return response.data as Grade[];
        },

        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,

    })
}

export const useGradeDetail= (id: number) =>{
    return useQuery({
        queryKey: GRADE_KEYS.detail(id),
        queryFn: async() =>{
            const response = await manager.grades.getById(id);
            console.log(response.data)
            return response.data;
        },

        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,

    })
}