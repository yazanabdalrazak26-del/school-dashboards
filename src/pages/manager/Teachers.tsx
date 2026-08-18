import { FaChalkboardTeacher, FaSpinner } from 'react-icons/fa';
import type { Teacher } from '../../type/manager.type';
import { useTeachers } from '../../hooks/manager/teachers/useTeachers';
import TeacherCard from '../../components/manager/teachers/cards/TeacherCard';

const Teachers = () => {
  const { data: teachers, isLoading } = useTeachers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-dark-blue-700 text-5xl mb-4" />
        <p className="text-blue-gray-500 text-sm">Loading teachers...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaChalkboardTeacher className="text-dark-blue-700" />
            Teachers
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Manage teacher assignments • {teachers?.length || 0} teachers
          </p>
        </div>
      </div>

      {!teachers || teachers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-gray-50 rounded-full p-6">
              <FaChalkboardTeacher className="text-5xl text-blue-gray-300" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-dark-blue-800 mb-2">No Teachers Found</h3>
          <p className="text-blue-gray-500 text-sm">
            There are no teachers available in the system yet.
          </p>
          <p className="text-blue-gray-400 text-xs mt-1">
            Teachers will appear here once they are added and assigned.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Teacher</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Subjects</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Sections</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-gray-100">
                  {teachers?.map((teacher: Teacher) => (
                    <TeacherCard key={teacher.employeeId} teacher={teacher} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
              <p className="text-sm text-blue-gray-500">Total Teachers</p>
              <p className="text-2xl font-bold text-dark-blue-800">{teachers.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
              <p className="text-sm text-blue-gray-500">Active Teachers</p>
              <p className="text-2xl font-bold text-green-600">
                {teachers.filter((t: Teacher) => t.isActive).length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
              <p className="text-sm text-blue-gray-500">Inactive Teachers</p>
              <p className="text-2xl font-bold text-red-600">
                {teachers.filter((t: Teacher) => !t.isActive).length}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Teachers;