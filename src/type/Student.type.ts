
export type Student = {
    id: number;
    name: string;
    email: string;
    address: string | null;
    birthDate: string | null;
    localStudentNumber: number;
    localSectionNumber: number;
    sectionName: string;
    localGradeNumber: number;
    gradeName: string;
    isActive: boolean;
    createdAt: string;
};


export type SchoolStudents = {
    schoolId: number;
    schoolName: string;
    totalStudents: number;
    students: Student[];
};

export type TransferStudentData = {
    studentId : number,
    newSchoolId : number,
    localGradeNumber : number,
    localSectionNumber : number
}
