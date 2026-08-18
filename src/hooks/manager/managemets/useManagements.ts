import { useQuery } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import type { ScheduleSectionResponse, ScheduleTeacherResponse } from "../../../type/manager.type"

export const SCHEDULE_KEYS = {
    detail: (id: number) => ['schedule-images', 'details', id],
    section: (gradeId: number, sectionId: number) => ['schedule-images', 'section', gradeId, sectionId],
}

export const useScheduleTeacherById = (id: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: SCHEDULE_KEYS.detail(id),
        queryFn: async () => {
            try {
                const response = await manager.schedule.getByIdForTeacher(id);
                return response.data as ScheduleTeacherResponse;
            } catch (error: any) {
                if (error?.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        },
        enabled: enabled,
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });
};

export const useScheduleSectionById = (gradeId: number, sectionId: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: SCHEDULE_KEYS.section(gradeId, sectionId),
        queryFn: async () => {
            try {
                const response = await manager.schedule.getByIdForSection(gradeId, sectionId);
                return response.data as ScheduleSectionResponse;
            } catch (error: any) {
                if (error?.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        },
        enabled: enabled,
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });
};

