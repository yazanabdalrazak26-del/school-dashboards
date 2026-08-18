export type EmployeeRole = "Principal" | "Secretary" | "Counselor" | "Librarian" | "ActivitySupervisor" | "Teacher";


export type SchoolEmployee = {
    localEmployeeNumber: number;
    employeeId: number;
    name: string;
    email: string;
    nationalId: string;
    phone: string | null;
    address?: string;
    birthDate?: string;
    role: EmployeeRole;
    roleName: string;
    isActive?: boolean;
    createdAt: string;

};

export type CreateEmployeePayload = {
    name: string;
    email: string;
    password: string;
    role: EmployeeRole;
    nationalId: string;
    schoolId: number |null;
    phone: string;
    address: string;
    birthDate: string;
    qualification: string;
};

export type SchoolEmployeesResponse = {
    schoolId: number;
    schoolName: string;
    totalEmployees: number;
    employees: SchoolEmployee[];
};

export type TransferEmployeeData = {
    currentSchoolId: number,
    localEmployeeNumber: number,
    newSchoolId: number,
    newRole: EmployeeRole
}

export type EmployeeAttendance = {
    
  date: string,
  entries: [
    {
      localEmployeeNumber: number,
      status: string
    }
  ]

}