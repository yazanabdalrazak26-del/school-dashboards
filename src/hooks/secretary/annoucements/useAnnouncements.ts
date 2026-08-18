import { useQuery } from "@tanstack/react-query"
import { secretary } from "../../../api/apiClient"


export const ANNOUNCEMENT_KEYS = {
    all: ['announcement-secratrey'],
    detail: (id: number) => [...ANNOUNCEMENT_KEYS.all , 'detail' , id]
}

export const useAnnouncements = () =>{
    return useQuery({
        queryKey: ANNOUNCEMENT_KEYS.all,
        queryFn: async () =>{
            const response = await secretary.announcemets.getAll();
            return response.data;
        },

        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    })
}

export const useAnnouncementById = (id: number) =>{
    return useQuery({
        queryKey: ANNOUNCEMENT_KEYS.detail(id),
        queryFn: async () =>{
            const response = await secretary.announcemets.getById(id);
            return response.data;
        },

        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    })
}