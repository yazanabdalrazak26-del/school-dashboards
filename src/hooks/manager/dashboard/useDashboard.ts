import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"


export const DASHBOARD_KEYS = {
    allOverview: ['all-overview'],
    allFeeds: ['all-feeds'],
}

export const useOverView = () =>{
    return useQuery({
        queryKey: DASHBOARD_KEYS.allOverview,
        queryFn: async () =>{
            const response = await manager.dashboard.getOverview();
            return response.data;
        },

        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000

    })
}

export const useFeed = () =>{
    return useQuery({
        queryKey: DASHBOARD_KEYS.allFeeds,
        queryFn: async () =>{
            const response = await manager.dashboard.getFeed();
            return response.data;
        },

        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000

    })
}