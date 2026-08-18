import { useMutation, useQueryClient } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import { SUBJECT_KEYS } from "./useSubjects";


export const useCreateSubject = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async({data} : {data:{Name: string}}) =>{
            const response = await manager.subjects.create(data);
            return response.data;
        },
        onSuccess: () =>{
            query.invalidateQueries({queryKey: SUBJECT_KEYS.all});
        }
    })
}


export const useUpdateSubject = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async({id , data} : {id: number , data:{Name: string}}) =>{
            const response = await manager.subjects.update(id , data);
            return response.data;
        },
        onSuccess: (_,variablies) =>{
            query.invalidateQueries({queryKey: SUBJECT_KEYS.all});
            query.invalidateQueries({queryKey: SUBJECT_KEYS.detail(variablies.id)});
        }
    })
}

export const useDeleteSubject = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async({id} : {id: number}) =>{
            const response = await manager.subjects.delete(id);
            return response.data;
        },
        onSuccess: (_,variablies) =>{
            query.invalidateQueries({queryKey: SUBJECT_KEYS.all});
            query.invalidateQueries({queryKey: SUBJECT_KEYS.detail(variablies.id)});
        }
    })
}


