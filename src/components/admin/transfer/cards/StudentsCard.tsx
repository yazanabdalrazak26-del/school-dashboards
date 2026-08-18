
import { FaUserGraduate, FaSpinner, FaExchangeAlt } from 'react-icons/fa'
import type { Student } from '../../../../type/Student.type'
import TransferStudentModal from '../modal/TransferStudentModal';
import type { School } from '../../../../type/school.type';
import { useState } from 'react';

type StudentsCardProps = {
    student: Student;
    school: School;
}

function StudentsCard({
    student,
    school,
}:StudentsCardProps) {
    const [isOpen , setIsOpen] = useState(false);

    return (
    <>
        <div className="border border-blue-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark-blue-100 rounded-full flex items-center justify-center">
                    <FaUserGraduate className="text-dark-blue-700" />
                </div>
                <div>
                    <p className="font-semibold text-dark-blue-800">{student.name}</p>
                    <p className="text-sm text-blue-gray-500">
                    {student.gradeName} - {student.sectionName}
                    </p>
                    <p className="text-xs text-blue-gray-400">
                    #{student.localStudentNumber} • {student.email}
                    </p>
                </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                
                <button 
                onClick={() => setIsOpen(true)}
                disabled={false}
                className="p-2 text-dark-blue-700 hover:bg-dark-blue-50 rounded-lg transition-colors disabled:opacity-50"
                title="Transfer student"
                >
                {false ? <FaSpinner className="animate-spin" /> : <FaExchangeAlt />}
                </button>
            </div>
            </div>
        </div>
        
        <TransferStudentModal school={school as School} student={student} isOpen={isOpen} onClose={() =>setIsOpen(false)}/>

    </>
  )
}

export default StudentsCard