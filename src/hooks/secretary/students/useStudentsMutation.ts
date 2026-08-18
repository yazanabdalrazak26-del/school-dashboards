import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  secretary } from "../../../api/apiClient"
import { STUDENT_KEYS } from "./useStudents";
import type { AddStudentPayload, UpdateStudentRequest } from "../../../type/secretary.type";

export const useCreateStudent = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async (data: AddStudentPayload) =>{
            console.log('data: ' ,data)
            const response = await secretary.students.create(data);
            return response.data;
        },
        onSuccess: () =>{
            query.invalidateQueries({queryKey: STUDENT_KEYS.all});
        }
    })
}

export const useUpdateStudent = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async ({id ,data}: {id: number , data: UpdateStudentRequest}) =>{
            console.log('data: ' ,data)
            const response = await secretary.students.update(data , id);
            return response.data;
        },
        onSuccess: (_ , variablies) =>{
            query.invalidateQueries({queryKey: STUDENT_KEYS.all});
            query.invalidateQueries({queryKey: STUDENT_KEYS.detail(variablies.id)})
        }
    })
}

export const useDeleteStudent = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async ({id}: {id: number}) =>{
            const response = await secretary.students.delete(id);
            return response.data;
        },
        onSuccess: (_ , variablies) =>{
            query.invalidateQueries({queryKey: STUDENT_KEYS.all});
            query.invalidateQueries({queryKey: STUDENT_KEYS.detail(variablies.id)})
        }
    })
}