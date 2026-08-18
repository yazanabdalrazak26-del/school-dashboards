
export type SectionResponse = {
    id: number;
    name: string;
    localSectionNumber: number;
    gradeId: number;
    gradeName: string;
    localGradeNumber: number;
    counselorId: number;
    localCounselorNumber: number;
    counselorName: string | null;
    createdAt: string;
    studentsCount?: number;
};

export type GradeSectionsResponse = {
    localGradeNumber: number;
    gradeName: string;
    sections: SectionResponse[];
};

export type SectionTeacher = {
    teacherId: number;
    teacherName: string;
    localTeacherNumber: number;
    subjectId: number;
    localSubjectId: number;
    subjectName: string;
    createdAt?: string;
};

export type Section = {
    id: number;
    name: string;
    localSectionNumber: number;
    counselorId: number;
    localCounselorNumber: number;
    counselorName: string;
    teacherName?: string;
    teachers?: SectionTeacher[];
    studentsCount?: number;
    createdAt?: string;
    gradeId?: number;
    gradeName?: string;
    localGradeNumber?: number;
};

export type Grade = {
    id: number;
    name: string;
    localGradeNumber: number;
    schoolId: number;
    level: number;
    sections: Section[];
};

// export type Teacher = {
//     teacherId: number;
//     teacherName: string;
//     localTeacherNumber: number;
//     createdAt: string;
// };

export type ShowTeacher = {
    teacherId: number;
    teacherName: string;
    localTeacherNumber: number;
    createdAt: string;
};

export type ShowSection = {
    sectionId: number;
    sectionName: string;
    localSectionNumber: number;
    gradeId: number;
    localGradeNumber: number;
    gradeName: string;
    teacherId: number;
    teacherName: string;
    localTeacherNumber: number;
    createdAt: string;
};

export type ShowSubject = {
    id: number;
    name: string;
    localSubjectId: number;
    schoolId: number;
    teacherId: number;
    teacherName: string;
    localTeacherNumber: number;
    teachers: ShowTeacher[];
    sections: ShowSection[];
    createdAt: string;
};

export type Subject = {
    id: number;
    name: string;
    localSubjectId: number;
    schoolId: number;
    teacherName?: string,
    localTeacherNumber?: number,
    teachers: Teacher[];
    sections: Section[];
};

export type SubjectsResponse = Subject[];


export type CounselorSection = {
    id: number;
    name: string;
    localSectionNumber: number;
    gradeName: string;
    localGradeNumber: number;
};

export type Counselor = {
    localEmployeeNumber: number;
    employeeId: number;
    name: string;
    email: string;
    nationalId: string;
    phone: string | null;
    address: string;
    birthDate: string | null;
    qualification: string;
    createdAt: string;
    studentsCount: number;
    sectionsCount: number;
    sections: CounselorSection[];
};


export type CounselorsResponse = {
    totalCounselors: number;
    counselors: Counselor[];
};

export type CounselorApiResponse = {
    success: boolean;
    message: string;
    data: CounselorsResponse;
};

export type SectionUpdateData = {
    name: string;
    localCounselorId: number
}

export type TeacherSubject = {
    subjectId: number;
    subjectName: string;
    localSubjectId: number;
};

export type TeacherSection = {
    sectionId: number;
    sectionName: string;
    localSectionNumber: number;
    gradeName: string;
    localGradeNumber: number;
};

export type Teacher = {
    localEmployeeNumber: number;
    employeeId: number;
    name: string;
    email: string;
    nationalId: string;
    phone: string | null;
    address: string;
    birthDate: string | null;
    role: string;
    roleName: string;
    isActive: boolean;
    createdAt: string;
    subjects: TeacherSubject[];
    sections: TeacherSection[];
};

export type TeachersResponse = Teacher[];

export type AssignToSubject ={
    TeacherLocalNumber: number,
    localSubjectId: number,
}

export type AssignToSection = {
    teacherLocalNumber : number,
    localGradeNumber: number,
    localSubjectId : number,
    localSectionNumber : number
}



export type ScheduleTeahcerPaylod = {
    LocalEmployeeNumber: number;
    Description?: string;
    Image : string;
}

export type ScheduleTeacherResponse = {
    
  localEmployeeNumber: number,
  teacherId: number,
  teacherName: string,
  image: {
    id : number,
    imageUrl : string,
    description : string,
    createdAt : string
  }

}

export type GetAllSectionsResponse = {
  success: boolean;
  message: string;
  data: {
    totalSections: number;
    sections: Section[];
  };
};

export type ScheduleSectionResponse = {
    id: number;
    imageUrl: string;
    description: string;
    createdAt: string;
    localGradeNumber: number;
    gradeName: string;
    localSectionNumber: number;
    sectionName: string;
};

export type AttendanceEmployeeStatus = 'Present' | 'Absent' | 'Late' | 'Excused' | 'Justified';

export type AttendanceEmployee = {
    id: number;
    employeeId: number;
    employeeName: string
    localEmployeeNumber: number;
    date: string;
    status: AttendanceEmployeeStatus
    onLeave: boolean;
};

export type OverView = {
    students: number,
    employees: number,
    sections: number,
    subjects: number,
    studentsWithDismissalWarning: number,
    employeesWithDismissalWarning: number,
    openComplaints: number,
    absentStudentsToday: number
    
}

export type OverViewResponse = {
    statistics: OverView
}

export type FeedItemType = 'announcement' | 'activity';

export type Announcement = {
    id: number;
    localAnnouncementId: number;
    title: string;
    description: string;
    date: string;
    expiryDate: string | null;
    schoolName: string;
    type: 'announcement';
};

export type Activity = {
    id: number;
    localActivityId: number;
    title: string;
    description: string;
    date: string;
    expiryDate: string | null;
    schoolName: string;
    type: 'activity';
};

export type FeedItem = Announcement | Activity;

export type School = {
    schoolId: number;
    schoolName: string;
    localEmployeeNumber: number;
    role: string;
};

export type FeedData = {
    userType: string;
    schools: School[];
    announcements: Announcement[];
    activities: Activity[];
    feed: FeedItem[];
};

export type FeedResponse = {
    success: boolean;
    message: string;
    data: FeedData;
};

export type UnAssignData = {
    teacherLocalNumber: number ;
    localGradeNumber: number ;
    localSectionNumber: number ;
    localSubjectId: number ;
}

export type PromoteData = {
    localGradeNumber : number,
    passPercent : number
}

export type FailedStudent = {
    id: number;
    name: string;
    localStudentNumber: number;
    email: string;
    average?: number;
};

export type FailedStudentsByGrade = {
    grade: {
        id: number;
        name: string;
        level: number;
        localGradeNumber: number;
    };
    totalStudents: number;
    passedCount: number;
    failedCount: number;
    failedStudents: FailedStudent[];
};

export type FailedStudentsStatistics = {
    totalStudents: number;
    totalPassed: number;
    totalFailed: number;
    overallSuccessRate: number;
    overallFailureRate: number;
};

export type FailedStudentsResponse = {
    success: boolean;
    message: string;
    data: {
        passPercent: number;
        semester: number;
        academicYear: number;
        statistics: FailedStudentsStatistics;
        failedByGrade: FailedStudentsByGrade[];
    };
};

export type StudentMissingFinalExam = {
    id: number;
    name: string;
    localStudentNumber: number;
    email: string;
    sectionName: string | null;
    missingSubjects: string[];
    missingCount: number;
};

export type StudentsMissingFinalExamResponse = {
    success: boolean;
    message: string;
    data: {
        gradeName: string;
        gradeLevel: number;
        localGradeNumber: number;
        totalStudents: number;
        studentsWithMissingMarks: number;
        students: StudentMissingFinalExam[];
    };
};
