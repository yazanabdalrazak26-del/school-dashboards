import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserTie, FaEdit, FaTrash, FaEye, FaPlus, FaPhone, FaIdCard, FaEnvelope, FaCalendar } from 'react-icons/fa';
import { useEmployeesBySchoolId } from '../../../hooks/admin/employee/useEmployee';
import EmployeesCard from './cards/EmployeesCard';
import { useState } from 'react';
import AddEmployeeModal from './modal/AddEmployeeModal';
import type { SchoolEmployee } from '../../../type/Employee.type';


function SchoolEmployees() {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading } = useEmployeesBySchoolId(Number(schoolId));
  const [isOpenAdd , setIsOpenAdd] = useState(false);

  const handleBack = () => {
    navigate('/employees');
  };

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue-700"></div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
        <FaUserTie className="text-5xl text-blue-gray-300 mx-auto mb-4" />
        <p className="text-blue-gray-500 text-lg">No employees found</p>
      </div>
    );
  }

  const { schoolName, totalEmployees, employees } = response;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-dark-blue-700 hover:text-dark-blue-900 transition-colors mb-2 font-medium"
          >
            <FaArrowLeft /> Back to Schools
          </button>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaUserTie className="text-dark-blue-700" />
            {schoolName}
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Total Employees: <span className="font-semibold text-dark-blue-700">{totalEmployees}</span>
          </p>
        </div>
        <button 
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors shadow-lg shadow-dark-blue-700/20"
            onClick={() => setIsOpenAdd(true)}
        >
          <FaPlus /> Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {employees.map((employee: SchoolEmployee) => (
          <EmployeesCard employee={employee} key={employee.employeeId} schoolId={Number(schoolId)}/>
        ))}
      </div>

        <AddEmployeeModal isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} schoolId={Number(schoolId)}/>
    </div>
  );
}

export default SchoolEmployees;