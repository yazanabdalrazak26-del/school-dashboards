import { FaBook, FaPlus} from 'react-icons/fa';
import GradeCard from '../../components/manager/Grades/cards/GradeCard';
import { useGrade } from '../../hooks/manager/grades/useGrades';
import { GradesSkeleton } from '../../components/ui/skeletons/manager/GradesSkeleton';
import { useState } from 'react';
import AddGradeModal from '../../components/manager/Grades/modal/AddGradeModal';

const Grades = () => {

  const {data: grades , isLoading} = useGrade();
  const [isOpen , setIsOpen] = useState(false);


  if(isLoading){
    return <GradesSkeleton/>
  }

  if (!grades || grades.length === 0) {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
                        <FaBook className="text-dark-blue-700" />
                        Grades
                    </h2>
                    <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">Manage all grades in the system</p>
                </div>
                <button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors shadow-lg shadow-dark-blue-700/20"
                    onClick={() => setIsOpen(true)}
                >
                    <FaPlus /> Add Grade
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
                <FaBook className="text-5xl text-blue-gray-300 mx-auto mb-4" />
                <p className="text-blue-gray-500 text-lg">No grades found</p>
                <p className="text-sm text-blue-gray-400 mt-1">Get started by adding your first grade</p>
                <button 
                    onClick={() => setIsOpen(true)}
                    className="mt-4 px-4 py-2 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors shadow-lg shadow-dark-blue-700/20"
                >
                    <FaPlus className="inline mr-2" /> Add First Grade
                </button>
            </div>

            <AddGradeModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-3">
            <FaBook className="text-dark-blue-700" />
            Grades
          </h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">Manage all grades in the system</p>
        </div>
        <button 
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-blue-700 text-white rounded-xl hover:bg-dark-blue-600 transition-colors shadow-lg shadow-dark-blue-700/20"
            onClick={() => setIsOpen(true)}
        >
          <FaPlus /> Add Grade
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-gray-50 border-b border-blue-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Grade Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Level</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Sections</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-blue-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-gray-100">
              {grades?.map((grade) => (
                <GradeCard grade={grade} key={grade.id}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
          <p className="text-sm text-blue-gray-500">Total Grades</p>
          <p className="text-2xl font-bold text-dark-blue-800">{grades?.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-4">
          <p className="text-sm text-blue-gray-500">Total Sections</p>
          <p className="text-2xl font-bold text-dark-blue-800">
            {grades?.reduce((acc, g) => acc + g.sections.length, 0)}
          </p>
        </div>
       
      </div>

      <AddGradeModal isOpen={isOpen} setIsOpen={setIsOpen}/>

    </div>
  );
};

export default Grades;