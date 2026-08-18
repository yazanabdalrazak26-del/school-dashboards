import { useQuery } from "@tanstack/react-query"
import { secretary } from "../../../api/apiClient"

export const STUDENT_KEYS = {
    all: ['students-secretary'],
    allGrades: ['all-grades'], 
    detail: (id: number) => [...STUDENT_KEYS.all , 'detail' , id],

}

export const useStudents = () =>{
    return useQuery({
        queryKey: STUDENT_KEYS.all,
        queryFn: async () =>{
            const response = await secretary.students.getAll();
            console.log(response)
            return response.data;
        },

        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    })
}

export const useGrades = () =>{
    return useQuery({
        queryKey: STUDENT_KEYS.allGrades,
        queryFn: async () =>{
            const response = await secretary.students.getAllGrades();
            return response.data;
        },

        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    })
}