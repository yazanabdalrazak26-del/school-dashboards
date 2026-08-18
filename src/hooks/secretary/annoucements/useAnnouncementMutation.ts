import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AnnouncementPayload } from "../../../type/secretary.type"
import { secretary } from "../../../api/apiClient"
import { ANNOUNCEMENT_KEYS } from "./useAnnouncements";

export const useAddAnnouncements = () =>{
    const query = useQueryClient();

    return useMutation({
        mutationFn: async(data: AnnouncementPayload) =>{
            const response = await secretary.announcemets.create(data);
            return response.data;
        },

        onSuccess: () =>{
            query.invalidateQueries({queryKey: ANNOUNCEMENT_KEYS.all});
        }
    })
}

export const useUpdateAnnouncements = () =>{
    const query = useQueryClient();

    return useMutation({
        mutationFn: async({id, data} : {id: number , data: AnnouncementPayload} ) =>{
            const response = await secretary.announcemets.update(data , id);
            return response.data;
        },

        onSuccess: (_,variablies) =>{
            query.invalidateQueries({queryKey: ANNOUNCEMENT_KEYS.all});
            query.invalidateQueries({queryKey: ANNOUNCEMENT_KEYS.detail(variablies.id)})
        }
    })
}

export const useDeleteAnnouncements = () =>{
    const query = useQueryClient();

    return useMutation({
        mutationFn: async({id} : {id: number}) =>{
            const response = await secretary.announcemets.delete(id);
            return response.data;
        },

        onSuccess: (_,variablies) =>{
            query.invalidateQueries({queryKey: ANNOUNCEMENT_KEYS.all});
            query.invalidateQueries({queryKey: ANNOUNCEMENT_KEYS.detail(variablies.id)})
        }
    })
}