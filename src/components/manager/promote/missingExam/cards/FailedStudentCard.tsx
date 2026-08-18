import React from 'react'
import type { FailedStudent } from '../../../../../type/manager.type'

function FailedStudentCard({
    student
} : {student: FailedStudent}) {
  return (
    <tr className="hover:bg-blue-gray-50/50 transition-colors">
        <td className="px-4 py-2 text-sm text-dark-blue-800">{student.name}</td>
        <td className="px-4 py-2 text-sm text-blue-gray-600">#{student.localStudentNumber}</td>
        <td className="px-4 py-2 text-sm font-semibold text-red-600">{student.average}%</td>
    </tr>
  )
}

export default FailedStudentCard