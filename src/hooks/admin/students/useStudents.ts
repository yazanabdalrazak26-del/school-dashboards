import { useQuery } from "@tanstack/react-query"
import { admin } from "../../../api/apiClient"

export const STUDENT_KEYS = {
    all: ['students']
}

export const useStudents = (id: number) =>{
    return useQuery({
        queryKey: STUDENT_KEYS.all,
        queryFn: async () =>{
            const response = await admin.students.getAll(id)
            return response.data;
        }
    })
}