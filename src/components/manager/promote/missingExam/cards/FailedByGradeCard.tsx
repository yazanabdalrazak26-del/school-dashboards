
import type { FailedStudent, FailedStudentsByGrade } from '../../../../../type/manager.type'
import FailedStudentCard from './FailedStudentCard'

function FailedByGradeCard({
    gradeData
}: {gradeData: FailedStudentsByGrade}) {
  return (
    <div className="border border-blue-gray-100 rounded-xl overflow-hidden">
        <div className="bg-blue-gray-50 px-4 py-3 border-b border-blue-gray-100 flex justify-between items-center">
        <div>
            <h3 className="font-semibold text-dark-blue-800">{gradeData.grade.name}</h3>
            <p className="text-xs text-blue-gray-500">
            {gradeData.failedCount} failed out of {gradeData.totalStudents} students
            </p>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            gradeData.failedCount > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
            {gradeData.failedCount} Failed
        </span>
        </div>
        {gradeData.failedStudents.length > 0 && (
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-white border-b border-blue-gray-100">
                <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-gray-600">Student</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-gray-600">Average</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-50">
                {gradeData.failedStudents.map((student: FailedStudent) => (
                    <FailedStudentCard student={student}/>
                ))}
            </tbody>
            </table>
        </div>
        )}
    </div>
  )
}

export default FailedByGradeCard