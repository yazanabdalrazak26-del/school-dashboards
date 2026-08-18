import React from 'react'
import type { School } from '../../../type/school.type'
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa'

function TopSchoolCard({
    school,
    index
} : {school: School , index: number}) {
  return (
    <div key={school.id} className="flex items-center justify-between p-4 bg-blue-gray-50 rounded-xl hover:bg-blue-gray-100 transition-colors">
        <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-dark-blue-100 flex items-center justify-center text-dark-blue-700 font-bold text-sm">
            #{index + 1}
        </div>
        <div>
            <p className="font-semibold text-dark-blue-800">{school.name}</p>
            <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-blue-gray-500 flex items-center gap-1">
                <FaUserGraduate className="text-dark-blue-600 text-xs" />
                {school.studentsCount || 0} students
            </span>
            <span className="text-xs text-blue-gray-500 flex items-center gap-1">
                <FaChalkboardTeacher className="text-dark-blue-600 text-xs" />
                {school.employeesCount || 0} employees
            </span>
            </div>
        </div>
        </div>
        <div className="text-right">
        <span className="px-3 py-1 text-xs font-medium bg-dark-blue-100 text-dark-blue-700 rounded-full">
            {school.sectionsCount || 0} sections
        </span>
        </div>
    </div>
  )
}

export default TopSchoolCard