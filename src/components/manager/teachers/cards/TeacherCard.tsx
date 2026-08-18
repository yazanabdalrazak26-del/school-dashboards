import { FaUserTie, FaUsers, FaTrash } from 'react-icons/fa'
import type { Teacher } from '../../../../type/manager.type'
import { useState } from 'react'
import AssignSectionModal from '../modal/AssignTeacherToSectionModal';
import UnassignSectionModal from '../modal/UnAssignTeacherToSectionModal';


function TeacherCard({teacher} : {teacher: Teacher}) {
    const [isOpenAssign, setIsOpenAssign] = useState(false);
    const [isOpenUnassign, setIsOpenUnassign] = useState(false);

    const uniqueSubjects = teacher.subjects?.filter(
        (subject, index, self) => 
            index === self.findIndex(s => s.subjectId === subject.subjectId)
    ) || [];

    const uniqueSections = teacher.sections?.filter(
        (section, index, self) => 
            index === self.findIndex(s => s.sectionName === section.sectionName)
    ) || [];

    return (
        <>
            <tr className="hover:bg-blue-gray-50 transition-colors">
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-dark-blue-100 rounded-full flex items-center justify-center">
                            <FaUserTie className="text-dark-blue-700 text-sm" />
                        </div>
                        <span className="font-semibold text-dark-blue-800">{teacher.name}</span>
                    </div>
                </td>
                <td className="px-6 py-4 text-blue-gray-600">{teacher.email}</td>
                
                <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                        {uniqueSubjects.length > 0 ? (
                            uniqueSubjects.map((subject, index) => (
                                <span 
                                    key={index}
                                    className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full"
                                >
                                    {subject.subjectName}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-blue-gray-400">No subjects</span>
                        )}
                    </div>
                </td>

                <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                        {uniqueSections.length > 0 ? (
                            uniqueSections.map((section, index) => (
                                <span 
                                    key={index}
                                    className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full"
                                >
                                    {section.sectionName}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-blue-gray-400">No sections</span>
                        )}
                    </div>
                </td>

                <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        teacher.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {teacher.isActive ? 'Active' : 'Inactive'}
                    </span>
                </td>

                <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                        <button 
                            className="p-2 cursor-pointer text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Assign Section"
                            onClick={() => setIsOpenAssign(true)}
                        >
                            <FaUsers />
                        </button>
                        <button 
                            className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Unassign Section"
                            onClick={() => setIsOpenUnassign(true)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </td>
            </tr>

            <AssignSectionModal 
                teacher={teacher} 
                isOpen={isOpenAssign} 
                onClose={() => setIsOpenAssign(false)}
            />

            <UnassignSectionModal 
                teacher={teacher} 
                isOpen={isOpenUnassign} 
                onClose={() => setIsOpenUnassign(false)}
            />
        </>
    )
}

export default TeacherCard