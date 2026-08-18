
import { FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import type { Section } from '../../../../type/manager.type';
import { formatDate } from '../../../../utils/utils';

function GradeSectionCard({section} : {section: Section}) {

    
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
    
        <div className="bg-blue-gray-50 px-6 py-4 border-b border-blue-gray-100 flex justify-between items-center">
            <div>
                <h4 className="font-semibold text-dark-blue-800 text-lg">{section.name}</h4>
                <p className="text-sm text-blue-gray-500">
                    Section #{section.localSectionNumber}
                </p>
            </div>
            <div className="flex items-center gap-4">
                {section.counselorName && (
                    <span className="text-sm text-blue-gray-600 flex items-center gap-1.5">
                        <FaUserTie className="text-blue-gray-400" />
                        Counselor: {section.counselorName}
                    </span>
                )}
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    {section.teachers?.length || 0} Teachers
                </span>
            </div>
        </div>

        <div className="p-4">
            <h5 className="text-sm font-medium text-blue-gray-600 mb-3 flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-gray-400" />
                Teachers
            </h5>
            {section.teachers && section.teachers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 rounded-lg">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Subject</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-gray-50">
                            {section.teachers.map((teacher) => (
                                <tr key={teacher.teacherId} className="hover:bg-blue-gray-50 transition-colors">
                                    <td className="px-4 py-2.5 text-sm font-medium text-dark-blue-800">
                                        {teacher.teacherName}
                                    </td>
                                    <td className="px-4 py-2.5 text-sm text-blue-gray-600">
                                        {teacher.subjectName}
                                    </td>
                                    <td className="px-4 py-2.5 text-sm text-blue-gray-500">
                                        {formatDate(teacher.createdAt as string)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-blue-gray-400 text-center py-4">No teachers assigned</p>
            )}
        </div>
    </div>
  )
}

export default GradeSectionCard