import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"


export const EMPLOYEE_KEYS = {
    all: ['employees-manager'],
    allAttendence: ['all-attendence']

}


export const useEmployees = () =>{
    return useQuery({
        queryKey: EMPLOYEE_KEYS.all,
        queryFn: async () =>{
            const response = await manager.employees.getAll();
            return response.data;
        }
    })
}

export const useAllAttendence = () =>{
    return useQuery({
        queryKey: EMPLOYEE_KEYS.allAttendence,
        queryFn: async () =>{
            const response = await manager.employees.getAllAttendence();
            return response.data;
        }
    })
}