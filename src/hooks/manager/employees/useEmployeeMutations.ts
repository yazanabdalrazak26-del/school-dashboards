import { useMutation } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import type { EmployeeAttendance } from "../../../type/Employee.type"




export const useEmployeeAttendance = () => {
    return useMutation({
        mutationFn: async (data: EmployeeAttendance) =>{
            const response = await manager.employees.attendence(data);
            return response.data;
        },

        onSuccess: () =>{

        }
    })
}