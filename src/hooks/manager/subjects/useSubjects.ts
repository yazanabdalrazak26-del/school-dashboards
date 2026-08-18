import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import type { ShowSubject } from "../../../type/manager.type"


export const SUBJECT_KEYS = {
    all:['subjects'],
    detail: (id: number) => [...SUBJECT_KEYS.all , 'detail' , id]
}

export const useSubjects = () =>{
    return useQuery({
        queryKey: SUBJECT_KEYS.all,
        queryFn: async() =>{
            const response = await manager.subjects.getAll();
            console.log(response.data)
            return response.data;
        },

        enabled: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })
}

export const useSubjectById = (id: number) =>{
    return useQuery({
        queryKey: SUBJECT_KEYS.detail(id),
        queryFn: async() =>{
            const response = await manager.subjects.getById(id);
            return response.data as ShowSubject;
        },
        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000
    })
}