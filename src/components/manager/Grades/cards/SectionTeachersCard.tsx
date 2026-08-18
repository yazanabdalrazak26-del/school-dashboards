
import type { SectionTeacher } from '../../../../type/manager.type'
import { FaBook, FaCalendar } from 'react-icons/fa'
import { formatDate } from '../../../../utils/utils'

function SectionTeachersCard({teacher} : {teacher: SectionTeacher}) {
  return (
        <div 
            className="bg-blue-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-semibold text-dark-blue-800">{teacher.teacherName}</h4>
                    <p className="text-sm text-blue-gray-600">{teacher.subjectName}</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    #{teacher.localTeacherNumber}
                </span>
            </div>
            <div className="mt-2 text-xs text-blue-gray-400">
                <div className="flex items-center gap-1">
                    <FaBook className="text-xs" />
                    Subject ID: {teacher.localSubjectId}
                </div>
                {teacher.createdAt && (
                    <div className="flex items-center gap-1 mt-0.5">
                        <FaCalendar className="text-xs" />
                        Joined: {formatDate(teacher.createdAt)}
                    </div>
                )}
            </div>
        </div>
  )
}

export default SectionTeachersCard