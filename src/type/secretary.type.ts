
export type AnnouncementAudience = 'All' | 'Students' | 'Teachers' | 'Parents' | 'Staff' | 'Employees' | 'Section' | 'Grade' | 'Administrators';
export type AnnouncementType = 'General' | 'Activity';

export type Announcement = {
    id: number;
    localId: number;
    title: string;
    description: string;
    date: string;
    expiryDate: string | null;
};

export type AnnouncementsResponse = {
    success: boolean;
    message: string;
    data: {
        announcements: Announcement[];
    };
};

export type ShowAnnouncement = {
    id: number;
    localId: number;
    title: string;
    description: string;
    date: string;
    expiryDate: string | null;
    audience: AnnouncementAudience;
    type: AnnouncementType;
    createdBy: string;
    isActive: boolean;
}

export type AnnouncementResponse = {
    success: boolean;
    message: string;
    data: ShowAnnouncement;

};

export type AnnouncementPayload = {
    title: string;
    body: string;
    audience: AnnouncementAudience;
    type: AnnouncementType;
    expiryDate: string;
};

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';


export type Student = {
    id: number;
    name: string;
    email: string;
    localStudentNumber: number;
    schoolId: number;
    sectionId: number;
    sectionName: string;
    sectionLocalNumber: number;
    gradeLocalNumber: number;
    gradeName: string;
    guardianName: string;
    guardianPhone: string;
    bloodType: BloodType;
    birthDate: string | null;
    address: string | null;
    createdAt: string;
    isActive?: boolean
};

export type AddStudentPayload = {
    name: string;
    email: string;
    password: string;
    localGradeNumber: number;
    localSectionNumber: number;
    guardianName: string;
    guardianPhone: string;
    bloodType: BloodType;
    chronicDiseases: string;
    allergies: string;
    healthNotes: string;
    birthDate: string;
    address: string;
};

export type StudentsResponse = {
    success : boolean,
    message : string,
    data: Student[]
};

export type UpdateStudentRequest = {
    name: string;
    email: string;
    password: string;
    localGradeNumber: number;
    localSectionNumber: number;
    guardianName: string;
    guardianPhone: string;
    bloodType: BloodType;
    birthDate: string;
    address: string;
};

export type GradeWithSections = {
    id: number;
    name: string;
    localGradeNumber: number;
    level: number;
    isActive: boolean;
    schoolId: number;
    createdAt: string;
    sections: SectionWithTeachers[];
};

export type SectionWithTeachers = {
    id: number;
    name: string;
    localSectionNumber: number;
    counselorId: number | null;
    localCounselorNumber: number | null;
    counselorName: string | null;
    teachers: TeacherAssignment[];
};

export type TeacherAssignment = {
    teacherId: number;
    teacherName: string;
    localTeacherNumber: number;
    subjectId: number;
    localSubjectId: number;
    subjectName: string;
};

