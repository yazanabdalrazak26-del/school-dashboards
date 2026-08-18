import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useStudents } from '../../../../hooks/admin/students/useStudents'
// import { useTransferStudent } from '../../../../hooks/admin/transfer/useTransfer'
import StudentsCard from '../cards/StudentsCard'

import type { School } from '../../../../type/school.type'

type StudentSectionProps = {
  schoolId: number;
  school?: School;
}

function StudentSection({ schoolId, school }: StudentSectionProps) {
  const { data, isLoading } = useStudents(schoolId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FaSpinner className="animate-spin text-dark-blue-700 text-4xl mb-4" />
        <p className="text-blue-gray-500">Loading students...</p>
      </div>
    );
  }

  const students = data?.students || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-dark-blue-800">
            Student Transfers
            {school?.name && (
              <span className="text-sm font-normal text-blue-gray-500 ml-2">
                - {school?.name}
              </span>
            )}
          </h3>
          <p className="text-sm text-blue-gray-500">
            {students.length} students available for transfer
          </p>
        </div>

      </div>

      <div className="space-y-3">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentsCard key={student.localStudentNumber} school={school as School} student={student}/>
          ))
        ) : (
          <div className="text-center py-8 text-blue-gray-500">
            No students found in this school
          </div>
        )}
      </div>

    </div>
  )
}

export default StudentSection