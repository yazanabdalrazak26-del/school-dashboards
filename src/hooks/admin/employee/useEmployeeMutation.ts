import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EMPLOYEE_KEYS } from "./useEmployee"
import type { CreateEmployeePayload } from "../../../type/Employee.type"
import { admin } from "../../../api/apiClient"


export const useAddEmployee = () => {
    const query = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: CreateEmployeePayload) => {
            console.log('🚀 Adding new employee with data:', data);
            console.log('⏰ Timestamp:', new Date().toISOString());
            
            try {
                const response = await admin.employees.create(data);
                console.log('✅ Employee created successfully:', response);
                console.log('📦 Response data:', response.data);
                return response.data;
            } catch (error: any) {
                console.error('❌ Error creating employee:', error);
                console.error('📡 Error details:', {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                    message: error.message,
                    config: {
                        url: error.config?.url,
                        method: error.config?.method,
                        data: error.config?.data,
                    },
                });
                throw error;
            }
        },
        onSuccess: (data, variables) => {
            console.log('✅ onSuccess - Employee added successfully:', { 
                data, 
                variables,
                employeeId: data?.id || data?.data?.id || 'unknown'
            });
            query.invalidateQueries({ queryKey: EMPLOYEE_KEYS.all });
            // query.invalidateQueries({ queryKey: EMPLOYEE_KEYS.details });
        },
        onError: (error: any) => {
            console.error('❌ onError - Failed to add employee:', error);
            console.error('📡 Error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
        },
        onSettled: (data, error, variables) => {
            console.log('🏁 Mutation settled:', {
                hasData: !!data,
                hasError: !!error,
                variables,
                timestamp: new Date().toISOString(),
            });
        },
    });
};

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
    
    
