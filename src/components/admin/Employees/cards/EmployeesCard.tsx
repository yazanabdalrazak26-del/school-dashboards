import { FaUserTie, FaEye, FaEdit, FaTrash, FaIdCard, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa'
import type { SchoolEmployee } from '../../../../type/Employee.type';
import { useState } from 'react';
import { formatDate } from '../../../../utils/utils';
import EditEmployeeModal from '../modal/EditEmployeeModal';
import ShowEmployeeModal from '../modal/ShowEmployeeModal';
import DeleteModal from '../../../ui/modal/DeleteModal';
import { useDeleteEmployee } from '../../../../hooks/admin/employee/useEmployeeMutation';

type EmployeesCardProps = {
    employee: SchoolEmployee;
    schoolId: number;
    onSuccess?: () => void;
}

function EmployeesCard({ employee, schoolId, onSuccess }: EmployeesCardProps) {
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getRoleColor = (role: string) => {
        const colors: Record<string, string> = {
            'Principal': 'bg-blue-100 text-blue-700',
            'Teacher': 'bg-green-100 text-green-700',
            'Secretary': 'bg-purple-100 text-purple-700',
            'Counselor': 'bg-yellow-100 text-yellow-700',
            'Librarian': 'bg-pink-100 text-pink-700',
            'ActivitySupervisor': 'bg-indigo-100 text-indigo-700',
            'Admin': 'bg-gray-100 text-gray-700',
        };
        return colors[role] || 'bg-gray-100 text-gray-700';
    };

    const {mutateAsync: deleteEmployee , isPending} = useDeleteEmployee();
    const handleDelete = async () => {
        await deleteEmployee({ schoolId: schoolId , empId: employee.localEmployeeNumber});
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-11 h-11 bg-dark-blue-100 rounded-full flex items-center justify-center">
                            <FaUserTie className="text-dark-blue-700 text-xl" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-dark-blue-800 text-base">{employee.name}</h4>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getRoleColor(employee.role)}`}>
                                {employee.roleName}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-0.5">
                        <button 
                            onClick={() => setShowViewModal(true)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors" 
                            title="View"
                        >
                            <FaEye className="text-base" />
                        </button>
                        <button 
                            onClick={() => setShowEditModal(true)}
                            className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 cursor-pointer rounded-lg transition-colors" 
                            title="Edit"
                        >
                            <FaEdit className="text-base" />
                        </button>
                        <button 
                            onClick={() => setShowDeleteModal(true)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer rounded-lg transition-colors" 
                            title="Delete"
                        >
                            <FaTrash className="text-base" />
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5 pt-2.5 border-t border-blue-gray-100">
                    <div className="flex items-center gap-2 text-sm text-blue-gray-600">
                        <FaIdCard className="text-blue-gray-400 text-xs w-3.5" />
                        <span className="font-mono text-sm">{employee.nationalId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-gray-600">
                        <FaEnvelope className="text-blue-gray-400 text-xs w-3.5" />
                        <span className="text-sm truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-gray-600">
                        <FaPhone className="text-blue-gray-400 text-xs w-3.5" />
                        <span className="text-sm">{employee.phone || 'No phone'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-gray-600">
                        <FaCalendar className="text-blue-gray-400 text-xs w-3.5" />
                        <span className="text-sm">Joined {formatDate(employee.createdAt)}</span>
                    </div>
                </div>
            </div>

            <ShowEmployeeModal
                isOpen={showViewModal}
                setIsOpen={setShowViewModal}
                employee={employee}
            />

            <EditEmployeeModal
                isOpen={showEditModal}
                setIsOpen={setShowEditModal}
                employee={employee}
                schoolId={schoolId}
                onSuccess={onSuccess}
            />

            <DeleteModal
                isOpen={showDeleteModal}
                setIsOpen={setShowDeleteModal}
                item={{ id: employee.employeeId, name: employee.name }}
                title="Delete Employee"
                entityName="employee"
                onDelete={handleDelete}
                isLoading={isPending}
            />
        </>
    )
}

export default EmployeesCard