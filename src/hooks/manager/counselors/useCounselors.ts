import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"

const COUNSELOR_KEYS = {
    all: ['counselors']
}

export const useCounselors = () =>{
    return useQuery({
        queryKey: COUNSELOR_KEYS.all,
        queryFn: async () =>{
            const response = await manager.counselor.getAll();
            return response.data;
        }
    })
}