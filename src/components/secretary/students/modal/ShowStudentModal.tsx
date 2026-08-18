import { createPortal } from 'react-dom';
import { FaTimes, FaUserGraduate, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaTint, FaIdCard, FaSchool, FaUser } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import type { Student } from '../../../../type/secretary.type';

type ShowStudentModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    student: Student | null;
    isLoading?: boolean;
}

function ShowStudentModal({ isOpen, setIsOpen, student, isLoading = false }: ShowStudentModalProps) {
    if (!isOpen) return null;

    if (isLoading) {
        return createPortal(
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-dark-blue-800">Student Details</h2>
                            <p className="text-sm text-blue-gray-500 mt-1">View student information</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12">
                        <FaSpinner className="animate-spin text-dark-blue-700 text-4xl mb-4" />
                        <p className="text-blue-gray-500 text-sm">Loading student...</p>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    if (!student) {
        return createPortal(
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-dark-blue-800">Student Details</h2>
                            <p className="text-sm text-blue-gray-500 mt-1">View student information</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="bg-red-50 rounded-full p-4 mb-4">
                            <FaUserGraduate className="text-red-500 text-4xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-dark-blue-800 mb-2">Student Not Found</h3>
                        <p className="text-blue-gray-500 text-sm text-center">
                            The student you're looking for could not be found.
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark-blue-800">Student Details</h2>
                        <p className="text-sm text-blue-gray-500 mt-1">View student information</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:bg-gray-100 rounded-sm cursor-pointer hover:text-gray-600 transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Header Card */}
                    <div className="flex items-center gap-4 p-4 bg-blue-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-dark-blue-100 rounded-full flex items-center justify-center">
                            <FaUserGraduate className="text-dark-blue-700 text-3xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-dark-blue-800 break-words">{student.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                    {student.isActive !== undefined ? (student.isActive ? 'Active' : 'Inactive') : 'Active'}
                                </span>
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                    {student.gradeName}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaIdCard className="text-xs" />
                                Student ID
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                #{student.localStudentNumber}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaEnvelope className="text-xs" />
                                Email
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1 break-all">
                                {student.email}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaSchool className="text-xs" />
                                Grade
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {student.gradeName}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaSchool className="text-xs" />
                                Section
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {student.sectionName}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaUser className="text-xs" />
                                Guardian
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {student.guardianName}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaPhone className="text-xs" />
                                Guardian Phone
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {student.guardianPhone}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaTint className="text-xs" />
                                Blood Type
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {student.bloodType || 'N/A'}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaCalendar className="text-xs" />
                                Birth Date
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {student.birthDate ? new Date(student.birthDate).toLocaleDateString('ar-EG') : 'N/A'}
                            </p>
                        </div>
                        <div className="bg-blue-gray-50 rounded-lg p-3 col-span-2">
                            <p className="text-xs text-blue-gray-400 flex items-center gap-1">
                                <FaMapMarkerAlt className="text-xs" />
                                Address
                            </p>
                            <p className="text-sm font-medium text-dark-blue-800 mt-1">
                                {student.address || 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-blue-gray-100">
                        <p className="text-xs text-blue-gray-400">
                            Record ID: #{student.id}
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default ShowStudentModal;