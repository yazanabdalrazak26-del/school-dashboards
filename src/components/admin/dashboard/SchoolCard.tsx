import React from 'react'
import type { School } from '../../../type/school.type'

function SchoolCard({school} : {school: School}) {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-gray-50 rounded-xl hover:bg-blue-gray-100 transition-colors">
        <div>
        <p className="font-semibold text-dark-blue-800">{school.name}</p>
        <p className="text-sm text-blue-gray-500">
            {school.typeName} • {school.employeesCount || 0} employees
        </p>
        </div>
    </div>
  )
}

export default SchoolCard