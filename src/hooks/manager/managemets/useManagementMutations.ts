import { useMutation, useQueryClient } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import { SCHEDULE_KEYS } from "./useManagements"
import { toast } from "react-toastify";


export const useAddScheduleTeacher = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: FormData) => {
            const response = await manager.schedule.addForTeacher(data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            const localEmployeeNumber = variables.get('LocalEmployeeNumber');
            if (localEmployeeNumber) {
                const id = Number(localEmployeeNumber);
                queryClient.invalidateQueries({ 
                    queryKey: SCHEDULE_KEYS.detail(id) 
                });
                queryClient.resetQueries({ 
                    queryKey: SCHEDULE_KEYS.detail(id) 
                });
                toast.success('Image added successfully');
            }
        },
        // onError: (error) => {
        //     toast.error('Failed to add image');
        //     console.error('Error adding image:', error);
        // }
    });
};

export const useDeleteScheduleTeacher = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const response = await manager.schedule.delete(id);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.removeQueries({ 
                queryKey: SCHEDULE_KEYS.detail(variables.id) 
            });
            queryClient.resetQueries({ 
                queryKey: SCHEDULE_KEYS.detail(variables.id) 
            });

        },
    
    });
};

export const useAddScheduleSection = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: FormData) => {
            const response = await manager.schedule.addForSection(data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            const gradeId = variables.get('LocalGradeNumber');
            const sectionId = variables.get('LocalSectionNumber');
            if (gradeId && sectionId) {
                const gId = Number(gradeId);
                const sId = Number(sectionId);
                queryClient.invalidateQueries({ 
                    queryKey: SCHEDULE_KEYS.section(gId, sId) 
                });
                queryClient.resetQueries({ 
                    queryKey: SCHEDULE_KEYS.section(gId, sId) 
                });
                toast.success('Image added successfully');
            }

        },
        // onError: (error) => {
        //     toast.error('Failed to add section image');
        //     console.error('Error adding section image:', error);
        // }
    });
};

export const useDeleteScheduleSection = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ gradeId, sectionId }: { gradeId: number; sectionId: number }) => {
            const response = await manager.schedule.deleteSection(gradeId, sectionId);
            return response.data;
        },
        onSuccess: (_, variables) => {
            queryClient.removeQueries({ 
                queryKey: SCHEDULE_KEYS.section(variables.gradeId, variables.sectionId) 
            });
            queryClient.resetQueries({ 
                queryKey: SCHEDULE_KEYS.section(variables.gradeId, variables.sectionId) 
            });
        },
        onError: (error) => {
            toast.error('Failed to delete section schedule');
            console.error('Error deleting section schedule:', error);
        }
    });
};