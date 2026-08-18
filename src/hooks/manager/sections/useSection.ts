import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"

export const SECTION_KEYS = {
    all: ['sections'],
    getAll: ['sections-all'],
    detail: (id: number) => [...SECTION_KEYS.all , 'detail' , id]
}

export const useSectionById = (id: number , sectionId: number) =>{
    return useQuery({
        queryKey: SECTION_KEYS.all,
        queryFn: async() =>{
            const response = await manager.Sections.getById(id , sectionId);
            return response.data ;
        },

        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    })
}

export const useSections = () =>{
    return useQuery({
        queryKey: SECTION_KEYS.getAll,
        queryFn: async () =>{
            const response = await manager.Sections.getAll();
            return response.data;
        }
    })
}