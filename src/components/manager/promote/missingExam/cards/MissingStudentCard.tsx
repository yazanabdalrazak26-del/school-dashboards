import React from 'react'
import type { StudentMissingFinalExam } from '../../../../../type/manager.type'

function MissingStudentCard({
    student
}: {student: StudentMissingFinalExam}) {
  return (
    <tr key={student.id} className="hover:bg-blue-gray-50/50 transition-colors">
        <td className="px-4 py-3 text-sm font-medium text-dark-blue-800">{student.name}</td>
        <td className="px-4 py-3 text-sm text-blue-gray-600">#{student.localStudentNumber}</td>
        <td className="px-4 py-3 text-sm text-blue-gray-600">{student.sectionName || 'N/A'}</td>
        <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
            {student.missingSubjects.map((subject: string, idx: number) => (
            <span key={idx} className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">
                {subject}
            </span>
            ))}
        </div>
        </td>
        <td className="px-4 py-3 text-sm font-semibold text-red-600">{student.missingCount}</td>
    </tr>
  )
}

export default MissingStudentCard