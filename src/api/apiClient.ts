
import { type LoginResponse, type LoginData } from "../type/auth.type";
import type { CreateEmployeePayload, EmployeeAttendance, SchoolEmployee, SchoolEmployeesResponse, TransferEmployeeData } from "../type/Employee.type";
import { type SubjectsResponse, type GradeSectionsResponse, type Section, type CounselorApiResponse, type SectionUpdateData, type TeachersResponse, type AssignToSubject, type AssignToSection, type ScheduleTeahcerPaylod, type GetAllSectionsResponse, type AttendanceEmployee,type OverViewResponse,type FeedResponse, type UnAssignData, type PromoteData, type StudentsMissingFinalExamResponse, type FailedStudentsResponse } from "../type/manager.type";
import type { SchoolFormData } from "../type/school.type";
import { type AnnouncementsResponse,  type AnnouncementPayload, type UpdateStudentRequest, type AnnouncementResponse, type AddStudentPayload, type StudentsResponse, type GradeWithSections } from "../type/secretary.type";
import type { SchoolStudents, TransferStudentData } from "../type/Student.type";
import api from "./axios";




export const admin = {
    schools:{
        getAll: () => api.get('/admin/schools'),
        getById: (id: number) => api.get(`admin/schools/${id}`),

        create: (data: SchoolFormData) => api.post('/admin/schools' , data),
        delete: (id: number) => api.delete(`/admin/schools/${id}`),
        update: (id:number , data: SchoolFormData) => api.patch(`/admin/schools/${id}` , data)
    },

    employees:{
        getBySchoolId: (schoolId: number) => api.get<SchoolEmployeesResponse>(`/admin/schools/${schoolId}/employees`),

        create: (data: CreateEmployeePayload) => api.post(`/admin/employees` , data),
        update: ({data , schoolId , empId} : {data: CreateEmployeePayload; empId: number ; schoolId: number}) => api.put(`/admin/schools/${schoolId}/employees/${empId}` , data),
        delete: ({ schoolId, empId }: { schoolId: number; empId: number }) => api.delete(`/admin/schools/${schoolId}/employees/${empId}`)
    },

    students:{
        getAll: (schoolId: number) => api.get<SchoolStudents>(`/admin/schools/${schoolId}/students`)
    },

    transfer: {
        transferStudent: (data: TransferStudentData) => api.patch(`/admin/transfer/student` , data),
        transferEmployee: (data: TransferEmployeeData) => api.patch(`/admin/transfer/employee` , data)
    }
}

export const manager = {
    grades:{
        getAll: () => api.get('/manager/grades'),
        getById: (gradeId: number) => api.get<GradeSectionsResponse>(`/manager/grades/${gradeId}/sections`),

        create: (data: { level: number }) => api.post('/manager/grades', data),
        update: (id:number , data:{level: number}) => api.put(`/manager/grades/${id}` , data),
        delete: (id:number) => api.delete(`/manager/grades/${id}`),
    },

    Sections: {
        getAll: () => api.get<GetAllSectionsResponse>('/manager/sections'),
        getById: (gradeId: number , sectionId: number) => api.get<Section>(`/manager/grades/${gradeId}/sections/${sectionId}`),

        create: (gradeId: number  , data: SectionUpdateData) => api.post(`/manager/grades/${gradeId}/sections` , data),
        update: (gradeId: number , sectionId: number , data: SectionUpdateData) => api.put(`/manager/grades/${gradeId}/sections/${sectionId}` , data),
        delete: (gradeId: number , sectionId: number) => api.delete(`/manager/grades/${gradeId}/sections/${sectionId}`),
    },

    subjects: {
        getAll: () => api.get<SubjectsResponse>(`/manager/subjects`),
        getById: (id: number) => api.get(`/manager/subjects/${id}`),

        create: (data: {Name: string}) => api.post(`/manager/subjects` , data),
        update: (id: number , data: {Name: string}) => api.put(`/manager/subjects/${id}` , data),
        delete: (id: number) => api.delete(`/manager/subjects/${id}`)
    },

    counselor: {
        getAll: () => api.get<CounselorApiResponse>('/manager/counselors'),
        // getById: () => api.get('')
    },

    teachers: {
        getAll: () => api.get<TeachersResponse>('/manager/teachers'),
        // assignToSubject: (data: AssignToSubject) =>api.post('manager/assign-teacher-to-subject' , data),
        assignToSection: (data: AssignToSection) => api.post('manager/assign-teacher-to-section' , data),
        unassignSection: (data: UnAssignData) => api.delete('/manager/unassign-teacher-from-section', {
            params: data
        })
    },

    employees: {
        getAll: () => api.get<SchoolEmployee[]>('/manager/employees'),
        attendence: (data: EmployeeAttendance) => api.post('/manager/employee-attendance' , data),
        getAllAttendence: () => api.get<AttendanceEmployee[]>('/manager/employee-attendance'),
    },

    schedule:{
        addForTeacher: (data: FormData) => api.post('/manager/schedule-images/teacher', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),    

        getByIdForTeacher: (id: number) =>api.get(`/manager/schedule-images/teacher/${id}`),
        delete: (id: number) => api.delete(`/manager/schedule-images/teacher/${id}`),

        addForSection: (data: FormData) => api.post('/manager/schedule-images/section', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),    

        getByIdForSection: (gradId: number , sectionId: number) => api.get(`/manager/schedule-images/section/${gradId}/${sectionId}`),
        deleteSection: (gradId: number , sectionId: number) => api.delete(`/manager/schedule-images/section/${gradId}/${sectionId}`)

    },

    dashboard:{
        getOverview: () => api.get<OverViewResponse>('/manager/reports/overview'),
        getFeed: () => api.get<FeedResponse>('/feed'),
    },

    marksAndfail:{
        promote: (data: PromoteData) => api.post(`/manager/promote-students` , data),
        getMissingFinallExam: (id: number , semester: number) => api.get<StudentsMissingFinalExamResponse>('/manager/students-missing-final-exam' , {
            params: {
                localGradeNumber:id , 
                semester: semester
            }
        }),
        getAllFailingStudents: () => api.get<FailedStudentsResponse>('/manager/all-failed-students')
    }

}

export const auth = {
    login: (data: LoginData) => api.post<LoginResponse>('/auth/login' , data),
}

export const secretary = {
    announcemets:{
        getAll: () => api.get<AnnouncementsResponse>('/secretary/announcements'),
        getById: (id: number) => api.get<AnnouncementResponse>(`/secretary/announcements/${id}`),

        create: (data: AnnouncementPayload) => api.post('/secretary/announcements' , data),
        update: (data: AnnouncementPayload , id: number) => api.put(`/secretary/announcements/${id}` , data),
        delete: (id: number) => api.delete(`/secretary/announcements/${id}`) 
    },

    students: {
        getAll: () => api.get<StudentsResponse>('secretary/students'),
        getById: (id: number) => api.get(`/secretary/students/${id}`),
        getAllGrades: () => api.get<GradeWithSections[]>('/secretary/grades'),

        create: (data: AddStudentPayload) => api.post(`/secretary/students` , data),
        update: (data: UpdateStudentRequest ,id:number) => api.put(`/secretary/students/${id}` , data),
        delete: (id: number) => api.delete(`/secretary/students/${id}`),
    },
}