
export type UserType = 'Admin' | 'Employee' | 'Student';
export type Role = 'Admin' | 'Principal' | 'Secretary';

export type LoginData = {
    email: string;
    password: string;
}

export type LoginResponse = {
    id: number
    localId: number
    name: string
    schoolId: number  
    userType: UserType
    role: Role;
    token: string;
}