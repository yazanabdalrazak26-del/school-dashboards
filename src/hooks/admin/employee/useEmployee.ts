import { useQuery } from "@tanstack/react-query"
import { admin } from "../../../api/apiClient"
import type { SchoolEmployeesResponse } from "../../../type/Employee.type"

export const EMPLOYEE_KEYS = {
    all: ['employees'],
    ById: (id: number) => [...EMPLOYEE_KEYS.all , 'school' , id],
    detail: (id: number) => [...EMPLOYEE_KEYS.all , 'detail' , id],
}

export const useEmployeesBySchoolId = (schoolId: number) =>{
    return useQuery({
        queryKey: EMPLOYEE_KEYS.ById(schoolId),
        queryFn: async () =>{
            const response = await admin.employees.getBySchoolId(schoolId);
            console.log(response);
            return response.data as SchoolEmployeesResponse;
        },

        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    })
}