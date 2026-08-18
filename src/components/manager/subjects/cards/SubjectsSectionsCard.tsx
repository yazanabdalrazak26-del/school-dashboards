
import type { Section, SectionTeacher } from '../../../../type/manager.type'

function SubjectsSectionsCard({section} : {section: Section}) {
  return (
    <div 
      className="bg-white border border-blue-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
      >
      <div className="flex justify-between items-start">
          <div>
          <p className="font-medium text-dark-blue-800 text-sm">
              {section.name}
          </p>
          <p className="text-sm text-dark-blue-800">
              {section.gradeName || 'No Grade'}
          </p>
          </div>
          
      </div>
      {/* 
      {section.counselorName && (
          <div className="mt-1 text-xs text-blue-gray-400 flex items-center gap-1">
          <FaUser className="text-[10px]" />
          Counselor: {section.counselorName}
          </div>
      )} */}

      {section.teachers && section.teachers.length > 0 && (
          <div className="mt-1 text-xs text-blue-gray-400">
          Teachers: {section.teachers.map((t: SectionTeacher) => t.teacherName).join(', ')}
          </div>
      )}

      {section.studentsCount !== undefined && (
          <div className="mt-1 text-xs text-blue-gray-400">
          Students: {section.studentsCount}
          </div>
      )}
    </div>
  )
}

export default SubjectsSectionsCard