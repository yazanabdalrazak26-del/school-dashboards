export type SchoolType = 'Primary' | 'Preparatory' | 'Secondary' | 'PrimaryPreparatory' | 'PreparatorySecondary' | 'AllStages';

export type Section = {
    id: number;
    name: string;
    localSectionNumber: number;
};

export type Grade = {
    id: number;
    name: string;
    localGradeNumber: number;
    sections?: Section[];
};

export type School = {
    id: number;
    name: string;
    type: SchoolType;
    typeName: string;
    address: string;
    phone: string;
    createdAt: string;
    employeesCount: number;
    sectionsCount: number;
    studentsCount: number;
    grades?: Grade[]; 
};

export type SchoolFormData  = {
    name : string,
    type : SchoolType,
    address : string,
    phone : string
}

