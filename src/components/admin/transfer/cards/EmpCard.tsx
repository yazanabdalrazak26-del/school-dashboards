import { useState } from 'react';
import { FaUserTie, FaSpinner, FaExchangeAlt } from 'react-icons/fa';

import type { School } from '../../../../type/school.type';
import TransferEmployeeModal from '../modal/TransferEmployeeModal';
import type { SchoolEmployee } from '../../../../type/Employee.type';

type EmployeesCardProps = {
    employee: SchoolEmployee;
    school: School;
}

function EmployeesCard({ employee, school }: EmployeesCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="border border-blue-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-dark-blue-100 rounded-full flex items-center justify-center">
                                <FaUserTie className="text-dark-blue-700" />
                            </div>
                            <div>
                                <p className="font-semibold text-dark-blue-800">{employee.name}</p>
                                <p className="text-sm text-blue-gray-500">
                                    {employee.roleName} • #{employee.localEmployeeNumber}
                                </p>
                                <p className="text-xs text-blue-gray-400">
                                    {employee.email || 'No email'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        
                        <button 
                            onClick={() => setIsOpen(true)}
                            disabled={false}
                            className="p-2 text-dark-blue-700 hover:bg-dark-blue-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Transfer employee"
                        >
                            {false ? <FaSpinner className="animate-spin" /> : <FaExchangeAlt />}
                        </button>
                    </div>
                </div>
            </div>

            <TransferEmployeeModal 
                school={school} 
                employee={employee} 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
            />
        </>
    );
}

export default EmployeesCard;