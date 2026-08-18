import { useMutation, useQueryClient } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import type { AssignToSection, UnAssignData } from "../../../type/manager.type"
import { TEACHER_KEYS } from "./useTeachers"

export const useAssignSection = () =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn: async(data: AssignToSection) =>{
            const response = await manager.teachers.assignToSection(data)
            return response.data;
        },
        onSuccess: ()=>{
            query.invalidateQueries({queryKey:TEACHER_KEYS.all});
        }

    })
}

export const useUnAssignSection = () =>{
    const query = useQueryClient()
    return useMutation({
        mutationFn: async(data: UnAssignData) =>{
            const response = await manager.teachers.unassignSection(data)
            return response.data;
        },
        onSuccess: ()=>{
            query.invalidateQueries({queryKey:TEACHER_KEYS.all});
        }

    })
}

