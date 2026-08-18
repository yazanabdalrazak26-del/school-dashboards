import { useQuery } from "@tanstack/react-query"
import { admin } from "../../../api/apiClient"
import type { School } from "../../../type/school.type"

export const SCHOOL_KEYS = {
    all: ['schools'],
    detail: (id: number) => [...SCHOOL_KEYS.all , 'detail' , id],
}

export const useSchools = () =>{
    return useQuery({
        queryKey: SCHOOL_KEYS.all,
        queryFn: async () =>{
            const response = await admin.schools.getAll();
            console.log(response);
            return response.data as School[];
        },

        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    })
}

// export const useSchoolById = (id: number) =>{
//     return useQuery({
//         queryKey: SCHOOL_KEYS.detail(id),
//         queryFn: async () =>{
//             const response = await admin.schools.getById(id);
//             console.log(response);
//             return response.data;
//         },

//         staleTime: 15 * 60 * 1000,
//         gcTime: 30 * 60 * 1000,
//     })
// }