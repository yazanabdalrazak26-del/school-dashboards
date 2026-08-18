import { FaTimes, FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import { MdOutlineClass } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { formatDate } from '../../../../utils/utils';
import { useSubjectById } from '../../../../hooks/manager/subjects/useSubjects';

type SubjectDetailsModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    id: number
}

function SubjectDetailsModal({ isOpen, setIsOpen, id }: SubjectDetailsModalProps) {
    const { data: subject, isLoading } = useSubjectById(id);

    if (!isOpen) return null;

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-3xl">
                    <div className="flex flex-col items-center justify-center py-12">
                        <FaSpinner className="animate-spin text-dark-blue-700 text-4xl mb-4" />
                        <p className="text-gray-500 text-sm">Loading subject details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 rounded-full p-2.5">
                            <FaBook className="text-blue-600 text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark-blue-800">Subject Details</h2>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:bg-gray-100 rounded-lg hover:text-gray-600 transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 mb-1">Subject Name</p>
                        <p className="text-lg font-semibold text-dark-blue-800">{subject?.name}</p>
                    </div>
                    <div className="bg-blue-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 mb-1">Created At</p>
                        <p className="text-lg font-semibold text-dark-blue-800">{formatDate(subject?.createdAt as string)}</p>
                    </div>
                </div>

                {subject?.teachers && subject?.teachers.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-dark-blue-800 mb-3 flex items-center gap-2">
                            <FaChalkboardTeacher className="text-blue-600" />
                            Teachers
                        </h3>
                        <div className="bg-blue-gray-50 rounded-xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-blue-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-gray-200">
                                    {subject.teachers.map((teacher) => (
                                        <tr key={teacher.teacherId} className="hover:bg-blue-gray-50 transition-colors">
                                            <td className="px-4 py-2 text-sm text-dark-blue-800">{teacher.teacherName}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500">{formatDate(teacher.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {subject?.sections && subject?.sections.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-dark-blue-800 mb-3 flex items-center gap-2">
                            <MdOutlineClass className="text-blue-600" />
                            Sections ({subject.sections.length})
                        </h3>
                        <div className="bg-blue-gray-50 rounded-xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-blue-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Section Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Grade</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Teacher</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-gray-200">
                                    {subject.sections.map((section) => (
                                        <tr key={section.sectionId} className="hover:bg-blue-gray-50 transition-colors">
                                            <td className="px-4 py-2 text-sm text-dark-blue-800">{section.sectionName}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{section.gradeName}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{section.teacherName}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500">{formatDate(section.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {!subject?.sections?.length && !subject?.teachers?.length && (
                    <div className="text-center py-8 text-gray-500">
                        No additional information available
                    </div>
                )}

                <div className="flex justify-end pt-4 border-t border-blue-gray-100">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2.5 bg-dark-blue-700 text-white rounded-lg hover:bg-dark-blue-600 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubjectDetailsModal;