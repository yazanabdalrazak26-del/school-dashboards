import { useMutation, useQueryClient } from "@tanstack/react-query"
import { manager } from "../../../api/apiClient"
import { SECTION_KEYS } from "./useSection";
import { GRADE_KEYS } from "../grades/useGrades";
import type { SectionUpdateData } from "../../../type/manager.type";

export const useDeleteSection = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async({gradeId , sectionId}: {gradeId: number , sectionId: number}) =>{
            const response = await manager.Sections.delete(gradeId , sectionId);
            return response.data;
        },
        onSuccess: (_,variablies) =>{
            query.invalidateQueries({queryKey: SECTION_KEYS.all});
            query.invalidateQueries({queryKey: GRADE_KEYS.detail(variablies.gradeId)})
            query.invalidateQueries({queryKey: SECTION_KEYS.detail(variablies.sectionId)})
        }
    })
}

export const useUpdateSection = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async({gradeId , sectionId , data}: {gradeId: number , sectionId: number , data: SectionUpdateData}) =>{
            const response = await manager.Sections.update(gradeId , sectionId ,data);
            return response.data;
        },
        onSuccess: (_,variablies) =>{
            query.invalidateQueries({queryKey: SECTION_KEYS.all});
            query.invalidateQueries({queryKey: GRADE_KEYS.detail(variablies.gradeId)})
            query.invalidateQueries({queryKey: SECTION_KEYS.detail(variablies.sectionId)})
        }
    })
}

export const useCreateSection = () =>{
    const query = useQueryClient();
    return useMutation({
        mutationFn: async({gradeId , data}: {gradeId: number  , data: SectionUpdateData}) =>{
            const response = await manager.Sections.create(gradeId  ,data);
            return response.data;
        },
        onSuccess: (_,variablies) =>{
            query.invalidateQueries({queryKey: SECTION_KEYS.all});
            query.invalidateQueries({queryKey: GRADE_KEYS.detail(variablies.gradeId)})
        }
    })
}
