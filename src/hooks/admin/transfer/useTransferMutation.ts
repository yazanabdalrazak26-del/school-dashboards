import { useMutation, useQueryClient } from "@tanstack/react-query"
import { admin } from "../../../api/apiClient"
import type { TransferStudentData } from "../../../type/Student.type"
import type { TransferEmployeeData } from "../../../type/Employee.type";

import { EMPLOYEE_KEYS } from "../employee/useEmployee";
import { STUDENT_KEYS } from "../students/useStudents";
import { SCHOOL_KEYS } from "../school/useSchool";

export const useTransferStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TransferStudentData) => {
            const response = await admin.transfer.transferStudent(data);
            return response.data;
        },
        onSuccess : () =>{
            queryClient.invalidateQueries({queryKey: STUDENT_KEYS.all})
            queryClient.invalidateQueries({queryKey: SCHOOL_KEYS.all})
        }
    });
};

export const useTransferEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TransferEmployeeData) => {
            const response = await admin.transfer.transferEmployee(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_KEYS.all });
            queryClient.invalidateQueries({queryKey: SCHOOL_KEYS.all})
        },
        
    });
};

