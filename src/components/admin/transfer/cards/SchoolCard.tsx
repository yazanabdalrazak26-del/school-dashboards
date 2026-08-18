
import { FaSchool, FaArrowRight } from 'react-icons/fa'
import type { School } from '../../../../type/school.type'

type SchoolCardProps = {
    school: School,
    handleSchoolSelect: (value: number) => void
}

function SchoolCard({
    school,
    handleSchoolSelect
}: SchoolCardProps) {
  return (
    <div
        onClick={() => handleSchoolSelect(school.id)}
        className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-dark-blue-300"
    >
        <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
            <div className="bg-dark-blue-100 rounded-xl p-3 group-hover:bg-dark-blue-700 transition-colors duration-200">
            <FaSchool className="text-dark-blue-700 text-2xl group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
            <h3 className="text-lg font-semibold text-dark-blue-800 group-hover:text-dark-blue-700 transition-colors">
                {school.name}
            </h3>
            <p className="text-sm text-blue-gray-500 mt-0.5">
                ID: {school.id}
            </p>
            </div>
        </div>
        <FaArrowRight className="text-blue-gray-300 group-hover:text-dark-blue-700 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-gray-100">
        <div className="flex items-center gap-6">
            <div>
                <p className="text-xs text-blue-gray-400">Students</p>
                <p className="text-sm font-semibold text-dark-blue-800">{school.studentsCount || 0}</p>
            </div>
            <div>
                <p className="text-xs text-blue-gray-400">Employees</p>
                <p className="text-sm font-semibold text-dark-blue-800">{school.employeesCount || 0}</p>
            </div>
            <div className="ml-auto">
                <span className="text-xs text-blue-gray-400">Click to manage</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SchoolCard