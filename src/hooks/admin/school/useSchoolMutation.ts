import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { SchoolFormData } from "../../../type/school.type";
import { admin } from "../../../api/apiClient";
import { SCHOOL_KEYS } from "./useSchool";


export const useCreateSchool = () =>{
    const query = useQueryClient();

    return useMutation({
        mutationFn: async (data: SchoolFormData) =>{
            const response = await admin.schools.create(data);
            console.log(response)
            return;
        },
        onSuccess: () =>{
            query.invalidateQueries({queryKey: SCHOOL_KEYS.all});
        }
    })
}

export const useDeleteSchool = () =>{
    const query = useQueryClient();

    return useMutation({
        mutationFn: async ({id}: {id: number}) =>{
            await admin.schools.delete(id);
            return;
        },
        onSuccess: (_,variables) =>{
            query.invalidateQueries({queryKey: SCHOOL_KEYS.all});
            query.invalidateQueries({queryKey: SCHOOL_KEYS.detail(variables.id)});
        }
    })

}

export const useUpdateSchool = () =>{
    const query = useQueryClient();

    return useMutation({
        mutationFn: async ({id , data}: {id: number , data: SchoolFormData}) =>{
            await admin.schools.update(id , data);
            return;
        },
        onSuccess: (_,variables) =>{
            query.invalidateQueries({queryKey: SCHOOL_KEYS.all});
            query.invalidateQueries({queryKey: SCHOOL_KEYS.detail(variables.id)});
        }
    })
}