
import { FaUserGraduate } from 'react-icons/fa';
import { useStudents } from '../../../hooks/secretary/students/useStudents';
import StudentCard from './card/StudentCard';
import Skeleton from './Skeleton';
import { useEffect } from 'react';

function StudentLits() {
    const {data: students , isLoading} = useStudents();

    useEffect(() =>{
        console.log(students)
    } , [students])


    if(isLoading){
        return <Skeleton/>
    }

    if (!students?.data || students.data.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 p-12 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-gray-50 rounded-full p-6">
                        <FaUserGraduate className="text-5xl text-blue-gray-300" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-dark-blue-800 mb-2">No Students</h3>
                <p className="text-blue-gray-500">No students available</p>
            </div>
        );
    }
  return (
         <div className="bg-white rounded-xl shadow-sm border border-blue-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-100">
              {students?.data.map((student) => (
                <StudentCard student={student} key={student.localStudentNumber}/>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default StudentLits