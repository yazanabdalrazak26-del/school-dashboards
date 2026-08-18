import { useState } from 'react';
import { FaUserGraduate, FaUserTie, FaSchool, FaArrowRight } from 'react-icons/fa';
import StudentSection from '../../components/admin/transfer/sections/StudentSection';
import EmpSection from '../../components/admin/transfer/sections/EmpSection';
import { useSchools } from '../../hooks/admin/school/useSchool';
import SchoolCard from '../../components/admin/transfer/cards/SchoolCard';

const Transfers = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
  const { data: schools, isLoading: schoolsLoading } = useSchools();

  const handleSchoolSelect = (schoolId: number) => {
    setSelectedSchoolId(schoolId);
  };

  const handleBackToSchools = () => {
    setSelectedSchoolId(null);
  };

  const selectedSchool = schools?.find(s => s.id === selectedSchoolId);

  if (schoolsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue-700"></div>
      </div>
    );
  }

  if (!schools || schools.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100 p-12 text-center">
        <FaSchool className="text-5xl text-blue-gray-300 mx-auto mb-4" />
        <p className="text-blue-gray-500 text-lg">No schools found</p>
        <p className="text-blue-gray-400 text-sm mt-2">Please add a school first to manage transfers</p>
      </div>
    );
  }

  if (!selectedSchoolId) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800">Transfers</h2>
          <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
            Select a school to manage student and employee transfers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schools.map((school) => (
            <SchoolCard school={school} key={school.id} handleSchoolSelect={handleSchoolSelect}/>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToSchools}
              className="text-dark-blue-700 hover:text-dark-blue-500 transition-colors p-2 hover:bg-dark-blue-50 rounded-lg"
              title="Back to schools"
            >
              <FaArrowRight className="rotate-180 text-xl" />
            </button>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-dark-blue-800 flex items-center gap-2">
                <FaSchool className="text-dark-blue-700" />
                {selectedSchool?.name}
              </h2>
              <p className="text-blue-gray-500 mt-1 text-sm lg:text-base">
                Manage student and employee transfers for this school
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-blue-gray-100">
        <div className="border-b border-blue-gray-100">
          <div className="flex gap-3 px-4 py-3">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium ${
                activeTab === 'student' 
                  ? 'bg-dark-blue-700 text-white shadow-lg shadow-dark-blue-700/20' 
                  : 'text-blue-gray-600 hover:bg-blue-gray-50'
              }`}
            >
              <FaUserGraduate /> Student Transfers
            </button>
            <button
              onClick={() => setActiveTab('employee')}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium ${
                activeTab === 'employee' 
                  ? 'bg-dark-blue-700 text-white shadow-lg shadow-dark-blue-700/20' 
                  : 'text-blue-gray-600 hover:bg-blue-gray-50'
              }`}
            >
              <FaUserTie /> Employee Transfers
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'student' ? (
            <StudentSection schoolId={selectedSchoolId} school={selectedSchool} />
          ) : (
            <EmpSection schoolId={selectedSchoolId} school={selectedSchool} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfers;