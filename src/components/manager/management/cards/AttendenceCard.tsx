import React from 'react'
import type { AttendanceEmployee } from '../../../../type/manager.type'

function AttendenceCard({
    attendence
}: {attendence: AttendanceEmployee}) {
  return (

    <tr key={attendence.id} className="hover:bg-blue-gray-50/50 transition-colors">
        <td className="px-4 py-3 text-sm text-dark-blue-700">{attendence.employeeName}</td>
        <td className="px-4 py-3 text-sm text-blue-gray-600">{attendence.date}</td>
        <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            attendence.status === 'Present' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            attendence.status === 'Present' ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            {attendence.status}
        </span>
        </td>
        <td className="px-4 py-3 text-sm text-blue-gray-600">
        {attendence.onLeave ? 'Yes' : 'No'}
        </td>
    </tr>
  )
}

export default AttendenceCard