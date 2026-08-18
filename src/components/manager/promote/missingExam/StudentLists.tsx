import { FaSpinner, FaFilter, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa"
import type { StudentMissingFinalExam } from "../../../../type/manager.type"
import MissingStudentCard from "./cards/MissingStudentCard"


type StudentListProps = {
    gradeName: string
    isLoading: boolean
    hasSearched: boolean
    selectedGrade: number | null
    missingStudents: StudentMissingFinalExam[]
}

function StudentList({
    gradeName,
    isLoading,
    hasSearched,
    selectedGrade,
    missingStudents
}: StudentListProps) {
  return (
    <>
    {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-dark-blue-700 text-3xl" />
        </div>
        ) : !hasSearched ? (
        <div className="text-center py-12 text-blue-gray-400">
          <FaFilter className="text-4xl mx-auto mb-3" />
          <p>Select a grade and click "Search" to view students</p>
        </div>
      ) : !selectedGrade ? (
        <div className="text-center py-12 text-blue-gray-400">
          <FaExclamationTriangle className="text-4xl mx-auto mb-3" />
          <p>Please select a grade to view students</p>
        </div>
      ) : missingStudents?.length === 0 ? (
        <div className="text-center py-12">
          <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
          <p className="text-green-600 font-medium">All students have completed their final exams!</p>
          <p className="text-sm text-blue-gray-400 mt-1">No missing marks found for {gradeName}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Section</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Missing Subjects</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-100">
              {missingStudents.map((student: StudentMissingFinalExam) => (
                <MissingStudentCard student={student}/>
              ))}
            </tbody>
          </table>
        </div>
        )}
    </>
  )
}

export default StudentList