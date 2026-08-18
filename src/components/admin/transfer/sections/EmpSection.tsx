import { useState } from 'react';
import { FaSpinner, FaExchangeAlt, FaUserTie } from 'react-icons/fa';
// import { useEmployees } from '../../../../hooks/admin/employees/useEmployees';
import type { School } from '../../../../type/school.type';
import EmployeesCard from '../cards/EmpCard';
import { useEmployeesBySchoolId } from '../../../../hooks/admin/employee/useEmployee';


type EmpSectionProps = {
  schoolId: number;
  school?: School;
}

function EmpSection({ schoolId, school }: EmpSectionProps) {
  const { data, isLoading } = useEmployeesBySchoolId(schoolId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FaSpinner className="animate-spin text-dark-blue-700 text-4xl mb-4" />
        <p className="text-blue-gray-500">Loading employees...</p>
      </div>
    );
  }

  const employees = data?.employees || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-dark-blue-800">
            Employee Transfers
            {school?.name && (
              <span className="text-sm font-normal text-blue-gray-500 ml-2">
                - {school?.name}
              </span>
            )}
          </h3>
          <p className="text-sm text-blue-gray-500">
            {employees.length} employees available for transfer
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <EmployeesCard 
              key={employee.localEmployeeNumber} 
              school={school as School} 
              employee={employee}
            />
          ))
        ) : (
          <div className="text-center py-8 text-blue-gray-500">
            No employees found in this school
          </div>
        )}
      </div>
    </div>
  );
}

export default EmpSection;