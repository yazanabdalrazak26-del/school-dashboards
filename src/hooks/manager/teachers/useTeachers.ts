import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import type { Teacher } from "../../../type/manager.type";

export const TEACHER_KEYS = {
 all:['teachers-manager']
}

export const useTeachers = () =>{
    return useQuery({
        queryKey: TEACHER_KEYS.all,
        queryFn: async () =>{
            const response = await manager.teachers.getAll();
            return response.data as Teacher[];
        }
    })
}