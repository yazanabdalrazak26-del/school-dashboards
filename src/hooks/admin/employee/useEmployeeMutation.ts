import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EMPLOYEE_KEYS } from "./useEmployee"
import type { CreateEmployeePayload } from "../../../type/Employee.type"
import { admin } from "../../../api/apiClient"


export const useAddEmployee = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateEmployeePayload) =>{
            const response = await admin.employees.create(data);
            console.log(response)
            return response.data;
        },
        onSuccess: () =>{
            query.invalidateQueries({queryKey: EMPLOYEE_KEYS.all});
        }
    })
}

export const useDeleteEmployee = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async ({schoolId ,empId }:{schoolId: number , empId: number} ) =>{
            await admin.employees.delete({schoolId: schoolId , empId: empId});
            return ;
        },
        onSuccess: () =>{
            query.invalidateQueries({queryKey: EMPLOYEE_KEYS.all});
        }
    })
}

export const useUpdateEmployee = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async ({schoolId ,empId  , data}:{schoolId: number , empId: number , data: CreateEmployeePayload} ) =>{
            await admin.employees.update({schoolId: schoolId , empId: empId , data:data});
        },
        onSuccess: () =>{
            query.invalidateQueries({queryKey: EMPLOYEE_KEYS.all});
        }
    })
}
    
    
