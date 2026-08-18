import { FaTimes, FaUserTie, FaIdCard, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';
import type { SchoolEmployee } from '../../../../type/Employee.type';
import { formatDate } from '../../../../utils/utils';


type ShowEmployeeModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    employee: SchoolEmployee;
}

function ShowEmployeeModal({ isOpen, setIsOpen, employee }: ShowEmployeeModalProps) {
    if (!isOpen) return null;

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

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark-blue-800">Employee Details</h2>
                        <p className="text-sm text-blue-gray-500 mt-1">View employee information</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <div className="space-y-6">

                    <div className="flex items-center gap-4 p-4 bg-blue-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-dark-blue-100 rounded-full flex items-center justify-center">
                            <FaUserTie className="text-dark-blue-700 text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-dark-blue-800">{employee.name}</h3>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getRoleColor(employee.role)}`}>
                                {employee.roleName}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-gray-50 rounded-lg p-3">
                                <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                    <FaIdCard className="text-xs" />
                                    National ID
                                </p>
                                <p className="text-sm font-medium text-dark-blue-800 mt-1 font-mono">
                                    {employee.nationalId}
                                </p>
                            </div>
                            <div className="bg-blue-gray-50 rounded-lg p-3">
                                <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                    <FaEnvelope className="text-xs" />
                                    Email
                                </p>
                                <p className="text-sm font-medium text-dark-blue-800 mt-1 break-all">
                                    {employee.email}
                                </p>
                            </div>
                            <div className="bg-blue-gray-50 rounded-lg p-3">
                                <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                    <FaPhone className="text-xs" />
                                    Phone
                                </p>
                                <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                    {employee.phone || 'No phone'}
                                </p>
                            </div>
                            <div className="bg-blue-gray-50 rounded-lg p-3">
                                <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                    <FaCalendar className="text-xs" />
                                    Joined
                                </p>
                                <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                    {formatDate(employee.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-blue-gray-100">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowEmployeeModal;